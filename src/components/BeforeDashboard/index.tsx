'use client'
import React from 'react'
import { useLocale } from '@payloadcms/ui'

import RedeployButton from './RedeployButton'
import './index.scss'

const baseClass = 'before-dashboard'

const translations = {
  en: {
    title: 'Dashboard',
    subtitle: 'Manage your website content and deployments.',
    liveWebsite: 'Live Website',
    liveWebsiteDesc: 'View the production site as visitors see it.',
    openWebsite: 'Open Website',
    deployment: 'Deployment',
    deploymentDesc: 'Trigger a new build to apply code changes.',
  },
  fi: {
    title: 'Hallintapaneeli',
    subtitle: 'Hallitse verkkosivuston sisältöä ja julkaisuja.',
    liveWebsite: 'Julkinen sivusto',
    liveWebsiteDesc: 'Tarkastele sivustoa kuten vierailijat sen näkevät.',
    openWebsite: 'Avaa sivusto',
    deployment: 'Julkaisu',
    deploymentDesc: 'Käynnistä uusi julkaisu ottaaksesi koodimuutokset käyttöön.',
  },
}

const BeforeDashboard: React.FC = () => {
  const locale = useLocale()
  const t = translations[locale.code === 'fi' ? 'fi' : 'en']

  return (
    <div className={baseClass}>
      <div className={`${baseClass}__header`}>
        <h2 className={`${baseClass}__title`}>{t.title}</h2>
        <p className={`${baseClass}__subtitle`}>{t.subtitle}</p>
      </div>

      <div className={`${baseClass}__grid`}>
        <div className={`${baseClass}__card`}>
          <div className={`${baseClass}__card-content`}>
            <h4>{t.liveWebsite}</h4>
            <p>{t.liveWebsiteDesc}</p>
          </div>
          <div className={`${baseClass}__card-actions`}>
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="btn btn--style-secondary btn--size-small"
            >
              {t.openWebsite}
            </a>
          </div>
        </div>

        <div className={`${baseClass}__card`}>
          <div className={`${baseClass}__card-content`}>
            <h4>{t.deployment}</h4>
            <p>{t.deploymentDesc}</p>
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
