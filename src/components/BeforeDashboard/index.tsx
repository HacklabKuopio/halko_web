import { Banner } from '@payloadcms/ui/elements/Banner'
import React from 'react'

import RedeployButton from './RedeployButton'
import './index.scss'

const baseClass = 'before-dashboard'

const BeforeDashboard: React.FC = () => {
  return (
    <div className={baseClass}>
      <Banner className={`${baseClass}__banner`} type="info">
        <h4>Website Management Dashboard</h4>
      </Banner>

      <div className={`${baseClass}__instructions`}>
        <p>
          Manage your content (Pages, Posts, Projects, etc.) using the collections below.
          Since the website runs inside Payload, changes to content are usually immediate.
        </p>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          marginTop: '1.5rem',
          padding: '1.5rem',
          backgroundColor: 'var(--theme-elevation-50)',
          border: '1px solid var(--theme-elevation-100)',
          borderRadius: '4px'
        }}>
          <strong>Quick Actions</strong>

          <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
            <li style={{ marginBottom: '1rem' }}>
              <a href="/" target="_blank" rel="noreferrer">
                <strong>View Live Website &rarr;</strong>
              </a>
              <div style={{ fontSize: '0.9em', color: 'var(--theme-elevation-400)', marginTop: '5px' }}>
                Open the homepage in a new tab to preview your changes.
              </div>
            </li>

            <li>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                <span>Trigger a new build:</span>
                <RedeployButton />
              </div>
              <div style={{ fontSize: '0.9em', color: 'var(--theme-elevation-400)', marginTop: '5px' }}>
                Use this if you have modified code or site configuration that requires a rebuild.
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default BeforeDashboard
