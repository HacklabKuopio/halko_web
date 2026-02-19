import { withPayload } from '@payloadcms/next/withPayload'
import createNextIntlPlugin from 'next-intl/plugin'
import path from 'path'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const withNextIntl = createNextIntlPlugin()

import redirects from './redirects.js'

const NEXT_PUBLIC_SERVER_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : undefined || process.env.__NEXT_PRIVATE_ORIGIN || 'http://localhost:3000'

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      ...[NEXT_PUBLIC_SERVER_URL /* 'https://example.com' */].map((item) => {
        const url = new URL(item)

        return {
          hostname: url.hostname,
          protocol: url.protocol.replace(':', ''),
        }
      }),
      {
        protocol: 'https',
        hostname: process.env.HOSTNAME || 'localhost',
        port: '',
        pathname: '/api/media/**',
      },
    ],
    localPatterns: [
      {
        pathname: '/**',
        search: '',
      },
      {
        pathname: '/**',
        search: '?**',
      },
    ],
    unoptimized: true,
  },
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    // Suppress verbose Webpack cache warnings (like next-intl's dynamic imports)
    webpackConfig.infrastructureLogging = {
      level: 'error',
    }

    return webpackConfig
  },
  sassOptions: {
    includePaths: [path.join(dirname, 'node_modules')],
  },
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: '/((?!admin).*)',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'index, follow',
          },
        ],
      },
      {
        source: '/admin/:path*',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex, nofollow',
          },
        ],
      },
    ]
  },
  env: {
    HOSTNAME: process.env.HOSTNAME,
  },
  redirects,
}

export default withNextIntl(withPayload(nextConfig))
