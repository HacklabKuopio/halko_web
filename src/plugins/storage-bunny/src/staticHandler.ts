// packages/storage-bunny/src/staticHandler.ts
import type { StaticHandler } from '@payloadcms/plugin-cloud-storage/types'
import type { CollectionConfig } from 'payload'
import axios from 'axios'
import path from 'path'

import { getFilePrefix } from '@payloadcms/plugin-cloud-storage/utilities'
import type { BunnyStorageOptions } from './index'

/**
 * The `staticHandler` for 3.0 must return a `Response`.
 * We no longer use Express's `res`/`next`, so we handle streaming with the new fetch-based APIs.
 */
export const getHandler = (
  options: BunnyStorageOptions,
  collection: CollectionConfig,
): StaticHandler => {
  return async (req, { params: { filename } }) => {
    try {
      // 3.0 approach: getFilePrefix() to figure out prefix for this file
      const prefix = await getFilePrefix({ collection, filename, req })
      const fileKey = path.posix.join(prefix, filename)
      const url = `/${options.storageZone}/${fileKey}`

      // Download from Bunny as arraybuffer so we can wrap it in a Response
      const response = await axios.get(url, { responseType: 'arraybuffer' })
      const contentType = response.headers['content-type'] || 'application/octet-stream'
      const contentLength = response.headers['content-length'] || '0'

      return new Response(response.data, {
        headers: {
          'Content-Type': contentType,
          'Content-Length': contentLength,
        },
        status: 200,
      })
    } catch (error) {
      req.payload.logger.error(error)
      return new Response('File not found', { status: 404 })
    }
  }
}
