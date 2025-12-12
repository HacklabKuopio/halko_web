// packages/storage-bunny/src/generateURL.ts
import type { GenerateURL } from '@payloadcms/plugin-cloud-storage/types'
import type { BunnyStorageOptions } from './index'

/**
 * Returns a `generateURL` function that composes the fully-qualified Bunny URL
 * for a given filename/prefix.
 */
export const getGenerateURL = (options: BunnyStorageOptions): GenerateURL => {
  return ({ filename, prefix = '' }) => {
    const path = prefix ? `${prefix}/${filename}` : filename
    return `${options.baseUrl}/${options.storageZone}/${path}`
  }
}
