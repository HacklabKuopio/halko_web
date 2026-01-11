

/**
 * Processes media resource URL to ensure proper formatting
 * @param url The original URL from the resource
 * @param cacheTag Optional cache tag to append to the URL
 * @returns Properly formatted URL with sanitized cache tag if provided
 */
export const getMediaUrl = (url: string | null | undefined, cacheTag?: string | null): string => {
  if (!url) return ''

  // Sanitize the cacheTag by removing colons, which Next.js Image optimizer rejects
  const sanitizedCacheTag = cacheTag ? cacheTag.replace(/:/g, '-') : null

  // Check if URL already has http/https protocol
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return sanitizedCacheTag ? `${url}?v=${sanitizedCacheTag}` : url
  }

  // Return relative URL for Next.js optimization
  return sanitizedCacheTag ? `${url}?v=${sanitizedCacheTag}` : url
}
