import React from 'react'

import RedeployButton from './RedeployButton'
import './index.scss'

const baseClass = 'before-dashboard'

const BeforeDashboard: React.FC = () => {
  return (
    <div className={baseClass}>
      <div className={`${baseClass}__header`}>
        <h2 className={`${baseClass}__title`}>Dashboard</h2>
        <p className={`${baseClass}__subtitle`}>
          Manage your website content and deployments.
        </p>
      </div>

      <div className={`${baseClass}__grid`}>
        <div className={`${baseClass}__card`}>
          <div className={`${baseClass}__card-content`}>
            <h4>Live Website</h4>
            <p>View the production site as visitors see it.</p>
          </div>
          <div className={`${baseClass}__card-actions`}>
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="btn btn--style-secondary btn--size-small"
            >
              Open Website
            </a>
          </div>
        </div>

        <div className={`${baseClass}__card`}>
          <div className={`${baseClass}__card-content`}>
            <h4>Deployment</h4>
            <p>Trigger a new build to apply code changes.</p>
          </div>
          <div className={`${baseClass}__card-actions`}>
            <RedeployButton />
          </div>
        </div>
      </div>
    </div>
  )
}

export default BeforeDashboard
