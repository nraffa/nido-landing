import './style.css'
import { applyTranslations, toggleLang, t, getLang } from './i18n.ts'

// Set initial html lang attribute
document.documentElement.lang = getLang()

// Apply translations on load
applyTranslations()

// Language toggle
const langBtn = document.getElementById('lang-toggle')

function updateLangButton() {
  if (!langBtn) return
  langBtn.textContent = t('lang.toggle')
  langBtn.setAttribute('aria-label', t('lang.label'))
}

langBtn?.addEventListener('click', () => {
  toggleLang()
  updateLangButton()
})

updateLangButton()

// Success toast on ?joined=true
const params = new URLSearchParams(window.location.search)
if (params.get('joined') === 'true') {
  showToast()
  window.history.replaceState({}, '', window.location.pathname)
}

function showToast() {
  const toast = document.createElement('div')
  toast.className =
    'toast-enter fixed top-6 left-1/2 z-50 px-6 py-3 rounded-[var(--radius)] bg-primary text-primary-foreground text-sm font-medium shadow-lg'
  toast.setAttribute('role', 'status')
  toast.setAttribute('aria-live', 'polite')
  toast.textContent = t('waitlist.success')
  document.body.appendChild(toast)

  setTimeout(() => {
    toast.classList.remove('toast-enter')
    toast.classList.add('toast-exit')
    toast.addEventListener('animationend', () => toast.remove())
  }, 4000)
}

// Clerk waitlist — loaded via CDN (npm package doesn't bundle UI components)
const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY as string | undefined

if (publishableKey) {
  let mounted = false

  async function mountWaitlist() {
    if (mounted) return
    const clerk = window.Clerk
    if (!clerk) return

    mounted = true
    await clerk.load()

    const waitlistEl = document.getElementById('waitlist') as HTMLDivElement | null
    if (!waitlistEl) return

    waitlistEl.innerHTML = ''

    clerk.mountWaitlist(waitlistEl, {
      afterJoinWaitlistUrl: '/?joined=true',
      signInUrl: 'https://nido.guru/sign-in',
    })
  }

  // Derive the Clerk Frontend API URL from the publishable key
  const keyPayload = publishableKey.replace(/^pk_(test|live)_/, '')
  const fapiUrl = atob(keyPayload).replace(/\$$/, '')

  // Determine if this is a proxy domain or a native Clerk domain
  const isProxy = !fapiUrl.endsWith('.clerk.accounts.dev')
  const proxyUrl = import.meta.env.VITE_CLERK_PROXY_URL as string | undefined

  // For proxy domains, load from Clerk's main CDN; for dev, load from FAPI
  const scriptHost = isProxy
    ? 'https://cdn.jsdelivr.net/npm/@clerk/clerk-js@5/dist/clerk.browser.js'
    : `https://${fapiUrl}/npm/@clerk/clerk-js@5/dist/clerk.browser.js`

  const script = document.createElement('script')
  script.async = true
  script.crossOrigin = 'anonymous'
  script.dataset.clerkPublishableKey = publishableKey
  if (proxyUrl) script.dataset.clerkProxyUrl = `https://${proxyUrl}`
  script.src = scriptHost

  // When script is loaded, Clerk global exists — call load() then mount
  script.addEventListener('load', async () => {
    const clerk = window.Clerk
    if (!clerk) return
    await clerk.load()
    mountWaitlist()
  })

  document.head.appendChild(script)
}
