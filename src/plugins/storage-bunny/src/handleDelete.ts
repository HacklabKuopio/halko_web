// packages/storage-bunny/src/handleDelete.ts
import type { HandleDelete } from '@payloadcms/plugin-cloud-storage/types'
import axios from 'axios'
import path from 'path'
import type { BunnyStorageOptions } from './index'

/**
 * Returns a `handleDelete` function that deletes the specified file from Bunny.
 * Note the new signature for 3.0, which includes `doc: { prefix = '' }, filename`.
 */
export const getHandleDelete = (options: BunnyStorageOptions): HandleDelete => {
  return async ({ doc: { prefix = '' }, filename }) => {
    const fileKey = path.posix.join(prefix, filename)
    const url = `/${options.storageZone}/${fileKey}`

    await axios.delete(url)
  }
}
