// packages/storage-bunny/src/handleUpload.ts
import type { HandleUpload } from '@payloadcms/plugin-cloud-storage/types'
import type { CollectionConfig } from 'payload'
import axios from 'axios'
import fs from 'fs'
import path from 'path'

import type { BunnyStorageOptions } from './index'

/**
 * Returns a `handleUpload` function that PUTs the file to Bunny.
 * The 3.0 signature is { data, file }, and we return `data`.
 */
export const getHandleUpload = (
  options: BunnyStorageOptions,
  collection: CollectionConfig,
  globalPrefix?: string,
): HandleUpload => {
  return async ({ data, file }) => {
    // For Bunny, we just do a straightforward PUT to the file key:
    const prefix = data.prefix || globalPrefix || ''
    const fileKey = path.posix.join(prefix, file.filename)
    const url = `/${options.storageZone}/${fileKey}`

    // If the file was written to disk, stream from it:
    let fileBufferOrStream: Buffer | fs.ReadStream = file.buffer
    if (file.tempFilePath) {
      fileBufferOrStream = fs.createReadStream(file.tempFilePath)
    }

    await axios.put(url, fileBufferOrStream, {
      headers: {
        'Content-Type': file.mimeType,
      },
    })

    // Return `data` so Payload can store doc info in the DB.
    return data
  }
}
