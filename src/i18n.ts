const translations = {
  en: {
    'hero.title': 'Your household finances, organized.',
    'hero.subtitle':
      'Budget together as a family. Track accounts in multiple currencies, import bank statements, and let AI handle the rest.',
    'waitlist.placeholder': 'Join the waitlist',
    'waitlist.success':
      "You're on the list! We'll be in touch.",
    'feature.multicurrency.title': 'Multi-currency',
    'feature.multicurrency.desc':
      'Track accounts in 28+ currencies with automatic exchange rate conversion. Perfect for families abroad or with international accounts.',
    'feature.pdf.title': 'Statement import',
    'feature.pdf.desc':
      'Upload PDF or CSV bank statements and extract transactions automatically. Saved mappings for your banks make re-imports instant.',
    'feature.ai.title': 'AI categorization',
    'feature.ai.desc':
      'Transactions categorized automatically using AI. Set up custom rules, and Nido learns your spending patterns over time.',
    'feature.shared.title': 'Shared household',
    'feature.shared.desc':
      'Invite family members to manage finances together. Everyone sees the full picture, or switch to a personal view of your own spending.',
    'footer.signin': 'Already have access? Sign in',
    'lang.toggle': 'ES',
    'lang.label': 'Cambiar a español',
  },
  es: {
    'hero.title': 'Las finanzas de tu hogar, organizadas.',
    'hero.subtitle':
      'Presupuestá en familia. Gestioná cuentas en múltiples monedas, importá extractos bancarios y dejá que la IA haga el resto.',
    'waitlist.placeholder': 'Unite a la lista de espera',
    'waitlist.success':
      '¡Estás en la lista! Te contactaremos pronto.',
    'feature.multicurrency.title': 'Multi-moneda',
    'feature.multicurrency.desc':
      'Gestioná cuentas en más de 28 monedas con conversión automática de tipo de cambio. Ideal para familias en el exterior o con cuentas internacionales.',
    'feature.pdf.title': 'Importar extractos',
    'feature.pdf.desc':
      'Subí extractos bancarios en PDF o CSV y extraé transacciones automáticamente. Guardá los mapeos de tus bancos para re-importar al instante.',
    'feature.ai.title': 'Categorización con IA',
    'feature.ai.desc':
      'Transacciones categorizadas automáticamente con IA. Creá reglas personalizadas y Nido aprende tus patrones de gasto.',
    'feature.shared.title': 'Hogar compartido',
    'feature.shared.desc':
      'Invitá a tu familia a gestionar las finanzas juntos. Todos ven el panorama completo, o cambiá a una vista personal de tus propios gastos.',
    'footer.signin': '¿Ya tenés acceso? Iniciar sesión',
    'lang.toggle': 'EN',
    'lang.label': 'Switch to English',
  },
} as const

type Lang = keyof typeof translations
type Key = keyof (typeof translations)['en']

function getDefaultLang(): Lang {
  const stored = localStorage.getItem('nido-lang') as Lang | null
  if (stored && stored in translations) return stored
  return navigator.language.startsWith('es') ? 'es' : 'en'
}

let currentLang: Lang = getDefaultLang()

export function getLang(): Lang {
  return currentLang
}

export function setLang(lang: Lang) {
  currentLang = lang
  localStorage.setItem('nido-lang', lang)
  document.documentElement.lang = lang
  applyTranslations()
}

export function toggleLang() {
  setLang(currentLang === 'en' ? 'es' : 'en')
}

export function t(key: Key): string {
  return translations[currentLang][key]
}

export function applyTranslations() {
  document.querySelectorAll<HTMLElement>('[data-i18n]').forEach((el) => {
    const key = el.dataset.i18n as Key
    if (key in translations[currentLang]) {
      el.textContent = translations[currentLang][key]
    }
  })
}
