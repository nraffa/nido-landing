import './style.css'
import { Clerk } from '@clerk/clerk-js'
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

// Clerk waitlist
const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (publishableKey) {
  const clerk = new Clerk(publishableKey)
  clerk.load().then(() => {
    const waitlistEl = document.getElementById('waitlist') as HTMLDivElement | null
    if (!waitlistEl) return

    // Clear placeholder content
    waitlistEl.innerHTML = ''

    clerk.mountWaitlist(waitlistEl, {
      afterJoinWaitlistUrl: '/?joined=true',
      signInUrl: 'https://nido.guru/sign-in',
    })
  })
}
