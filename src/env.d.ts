/// <reference types="vite/client" />

declare global {
  interface Window {
    Clerk?: {
      load(): Promise<void>
      mountWaitlist(
        node: HTMLDivElement,
        props?: {
          afterJoinWaitlistUrl?: string
          signInUrl?: string
          appearance?: Record<string, unknown>
        },
      ): void
    }
  }
}

export {}
