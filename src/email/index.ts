import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import { EmailAdapter } from 'payload'

export const email: Promise<EmailAdapter> | undefined = process.env.SMTP_HOST
  ? nodemailerAdapter({
      defaultFromAddress: process.env.SMTP_USER || 'info@bittive.com',
      defaultFromName: process.env.WEBSITE_NAME || 'PayloadCMS',
      transportOptions: {
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 587,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      },
    })
  : undefined
