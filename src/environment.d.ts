declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PAYLOAD_SECRET: string
      DATABASE_URI: string
      NEXT_PUBLIC_SERVER_URL: string
      VERCEL_PROJECT_PRODUCTION_URL: string
      HOSTNAME: string
      R2_ACCOUNT_ID: string
      R2_ACCESS_KEY_ID: string
      R2_SECRET_ACCESS_KEY: string
      R2_BUCKET: string
      MATRIX_HOMESERVER_URL?: string
      MATRIX_ACCESS_TOKEN?: string
      MATRIX_ROOM_ID?: string
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}
