/// <reference types="vite/client" />

declare global {
  interface ImportMeta {
    env: {
      VITE_APP_TITLE: string
    }
  }
  interface NodeJS {
    ProcessEnv: {
      VITE_APP_TITLE: string
    }
  }
}

export {}
