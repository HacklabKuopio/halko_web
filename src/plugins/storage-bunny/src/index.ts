import type {
  Adapter,
  PluginOptions as CloudStoragePluginOptions,
  CollectionOptions,
  GeneratedAdapter,
} from '@payloadcms/plugin-cloud-storage/types'
import type { Config, Plugin, UploadCollectionSlug } from 'payload'
import axios from 'axios'
import { cloudStoragePlugin } from '@payloadcms/plugin-cloud-storage'

import { getGenerateURL } from './generateURL'
import { getHandleDelete } from './handleDelete'
import { getHandleUpload } from './handleUpload'
import { getHandler } from './staticHandler'

export interface BunnyStorageOptions {
  /**
   * Bunny API key (required).
   */
  apiKey: string

  /**
   * Bunny storage zone name (required).
   */
  storageZone: string

  /**
   * Provide a region if using a specific Bunny region, for example: `uk`.
   * This is used only if you do not specify a `baseUrl`.
   */
  region?: string

  /**
   * Complete base URL if you want to override how we build it.
   * Defaults to `https://${region ? `${region}.` : ''}storage.bunnycdn.com`.
   */
  baseUrl?: string

  /**
   * For each collection, either `true` to use default options or a partial
   * override of @payloadcms/plugin-cloud-storage's CollectionOptions.
   *
   * The key is the collection slug, and the value can be `true` or a partial config.
   *
   * Importantly, this allows *any* slug, not just `"media"`.
   */
  collections: Partial<Record<UploadCollectionSlug, Omit<CollectionOptions, 'adapter'> | true>>

  /**
   * Whether or not to disable local storage for the specified collections.
   * @default true
   */
  disableLocalStorage?: boolean

  /**
   * Whether or not the plugin should be enabled.
   * @default true
   */
  enabled?: boolean
}

type BunnyStoragePlugin = (uploadthingStorageOptions: BunnyStorageOptions) => Plugin

/**
 * The main plugin function for Payload 3.0.
 * Provides an adapter to @payloadcms/plugin-cloud-storage
 */
export const bunnyStorage: BunnyStoragePlugin =
  (bunnyOptions: BunnyStorageOptions) =>
  (incomingConfig: Config): Config => {
    if (bunnyOptions.enabled === false) {
      return incomingConfig
    }

    // Construct a default baseUrl if not specified
    const baseUrl =
      bunnyOptions.baseUrl ||
      `https://${bunnyOptions.region ? `${bunnyOptions.region}.` : ''}storage.bunnycdn.com`

    // Globally set Axios defaults for Bunny
    axios.defaults.baseURL = baseUrl
    axios.defaults.headers.common['AccessKey'] = bunnyOptions.apiKey

    // Build a shared internal adapter
    const adapter = bunnyStorageInternal(bunnyOptions)

    // Add adapter to each collection option object
    const collectionsWithAdapter: CloudStoragePluginOptions['collections'] = Object.entries(
      bunnyOptions.collections,
    ).reduce(
      (acc, [slug, collOptions]) => ({
        ...acc,
        [slug]: {
          ...(collOptions === true ? {} : collOptions),

          // Disable payload access control if the ACL is public-read or not set
          // ...(uploadthingStorageOptions.options.acl === 'public-read'
          //   ? { disablePayloadAccessControl: true }
          //   : {}),

          adapter,
        },
      }),
      {} as Record<string, CollectionOptions>,
    )

    // Optionally disable local storage
    const config = {
      ...incomingConfig,
      collections: (incomingConfig.collections || []).map((collection) => {
        // If this collection isn't in your bunny collections, do nothing
        // @ts-ignore
        if (!collectionsWithAdapter[collection.slug]) {
          return collection
        }

        return {
          ...collection,
          upload: {
            ...(typeof collection.upload === 'object' ? collection.upload : {}),
            disableLocalStorage: bunnyOptions.disableLocalStorage ?? true,
          },
        }
      }),
    }

    // Finally, invoke the official plugin with your updated config
    return cloudStoragePlugin({
      collections: collectionsWithAdapter,
    })(config)
  }

/**
 * Internal function returning the standard adapter for Bunny.
 */
function bunnyStorageInternal(options: BunnyStorageOptions): Adapter {
  return ({ collection, prefix }): GeneratedAdapter => {
    return {
      /** Required in 3.0: used by Payload to identify your adapter. */
      name: 'bunny',
      generateURL: getGenerateURL(options),
      handleDelete: getHandleDelete(options),
      handleUpload: getHandleUpload(options, collection, prefix),
      staticHandler: getHandler(options, collection),
    }
  }
}
