// One-off: copy every file from the Bunny storage zone to the R2 bucket, keeping keys.
// Safe to re-run — objects already in R2 with the same size are skipped.
//
//   node --env-file=.env scripts/migrate-bunny-to-r2.mjs [--dry-run]
//
// Needs BUNNY_API_KEY, BUNNY_STORAGE_ZONE_NAME (optional BUNNY_REGION) and the R2_* vars.
import { HeadObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3'

const dryRun = process.argv.includes('--dry-run')

const required = [
  'BUNNY_API_KEY',
  'BUNNY_STORAGE_ZONE_NAME',
  'R2_ACCOUNT_ID',
  'R2_ACCESS_KEY_ID',
  'R2_SECRET_ACCESS_KEY',
  'R2_BUCKET',
]
const missing = required.filter((key) => !process.env[key])
if (missing.length) {
  console.error(`Missing env vars: ${missing.join(', ')}`)
  process.exit(1)
}

const zone = process.env.BUNNY_STORAGE_ZONE_NAME
const bunnyBase = `https://${process.env.BUNNY_REGION ? `${process.env.BUNNY_REGION}.` : ''}storage.bunnycdn.com/${zone}`
const bunnyHeaders = { AccessKey: process.env.BUNNY_API_KEY }
const bucket = process.env.R2_BUCKET

const s3 = new S3Client({
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  region: 'auto',
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
  requestChecksumCalculation: 'WHEN_REQUIRED',
  responseChecksumValidation: 'WHEN_REQUIRED',
})

const encodeKey = (key) => key.split('/').map(encodeURIComponent).join('/')

/** Recursively lists files in the zone, yielding { key, size }. */
async function* listBunny(dir = '') {
  const res = await fetch(`${bunnyBase}/${dir ? `${encodeKey(dir)}/` : ''}`, {
    headers: { ...bunnyHeaders, Accept: 'application/json' },
  })
  if (!res.ok) throw new Error(`Bunny list "${dir}" failed: ${res.status} ${await res.text()}`)

  for (const entry of await res.json()) {
    const key = dir ? `${dir}/${entry.ObjectName}` : entry.ObjectName
    if (entry.IsDirectory) yield* listBunny(key)
    else yield { key, size: entry.Length }
  }
}

async function existsInR2(key, size) {
  try {
    const head = await s3.send(new HeadObjectCommand({ Bucket: bucket, Key: key }))
    return head.ContentLength === size
  } catch (error) {
    if (error.$metadata?.httpStatusCode === 404) return false
    throw error
  }
}

async function copy({ key, size }) {
  if (await existsInR2(key, size)) return 'skipped'
  if (dryRun) return 'would copy'

  const res = await fetch(`${bunnyBase}/${encodeKey(key)}`, { headers: bunnyHeaders })
  if (!res.ok) throw new Error(`Bunny download failed: ${res.status}`)
  const body = Buffer.from(await res.arrayBuffer())

  await s3.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: body,
      ContentType: res.headers.get('content-type') || 'application/octet-stream',
    }),
  )
  return 'copied'
}

async function withRetry(fn, attempts = 3) {
  for (let i = 1; ; i++) {
    try {
      return await fn()
    } catch (error) {
      if (i >= attempts) throw error
      await new Promise((resolve) => setTimeout(resolve, 1000 * i))
    }
  }
}

const files = []
for await (const file of listBunny()) files.push(file)
console.log(`Found ${files.length} files in Bunny zone "${zone}"${dryRun ? ' (dry run)' : ''}`)

const counts = { copied: 0, skipped: 0, 'would copy': 0, failed: 0 }
const concurrency = 8
let next = 0

await Promise.all(
  Array.from({ length: concurrency }, async () => {
    while (next < files.length) {
      const file = files[next++]
      try {
        const result = await withRetry(() => copy(file))
        counts[result]++
        if (result !== 'skipped') console.log(`${result}: ${file.key}`)
      } catch (error) {
        counts.failed++
        console.error(`FAILED: ${file.key} — ${error.name}: ${error.message || error.Code || ''}`)
      }
    }
  }),
)

console.log(counts)
if (counts.failed) process.exit(1)
