import React from 'react'

const PlausibleAnalytics = () => {
  const src = process.env.PLAUSIBLE_ANALYTICS_DASHBOARD

  if (!src) {
    return null
  }

  return (
    <div style={{ marginTop: '2rem' }}>
      <iframe
        plausible-embed=""
        src={src}
        scrolling="no"
        frameBorder="0"
        loading="lazy"
        style={{ width: '1px', minWidth: '100%', height: '1600px', colorScheme: 'auto' }}
      />
      <script async src="https://analytics.bittive.com/js/embed.host.js" />
    </div>
  )
}

export default PlausibleAnalytics
