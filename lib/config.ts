// Configuration settings for DJ JOEL website

export const config = {
  // Exclusive content settings
  exclusivePassword: process.env.NEXT_PUBLIC_EXCLUSIVE_PASSWORD || 'JOEL2025!',
  
  // Media settings
  audioBaseUrl: process.env.NEXT_PUBLIC_AUDIO_BASE_URL || '/audio',
  imageBaseUrl: process.env.NEXT_PUBLIC_IMAGE_BASE_URL || '/images',
  
  // Contact information
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'booking@djjoel.com',
  managementEmail: process.env.NEXT_PUBLIC_MANAGEMENT_EMAIL || 'management@djjoel.com',
  pressEmail: process.env.NEXT_PUBLIC_PRESS_EMAIL || 'press@djjoel.com',
  
  // Social media links
  socialLinks: {
    spotify: 'https://open.spotify.com/artist/djjoel',
    appleMusic: 'https://music.apple.com/artist/djjoel',
    soundcloud: 'https://soundcloud.com/djjoel',
    youtube: 'https://youtube.com/@djjoel',
    instagram: 'https://instagram.com/djjoel',
    twitter: 'https://twitter.com/djjoel',
    facebook: 'https://facebook.com/djjoel',
    tiktok: 'https://tiktok.com/@djjoel',
    beatport: 'https://beatport.com/artist/dj-joel/123456',
    residentAdvisor: 'https://ra.co/dj/djjoel'
  },
  
  // Site metadata
  site: {
    name: 'DJ JOEL',
    title: 'DJ JOEL - Electronic Music Producer & DJ',
    description: 'Official website of DJ JOEL - Electronic music producer and DJ specializing in cyberpunk, synthwave, and underground electronic music.',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://djjoel.com',
    image: '/images/og-image.jpg',
    keywords: ['DJ JOEL', 'electronic music', 'cyberpunk', 'synthwave', 'techno', 'house music', 'DJ', 'producer']
  },
  
  // Audio player settings
  player: {
    defaultVolume: 0.8,
    fadeInDuration: 1000, // ms
    fadeOutDuration: 500, // ms
    crossfadeDuration: 2000, // ms
    bufferSize: 4096,
    preloadNext: true
  },
  
  // UI settings
  ui: {
    animationDuration: 300, // ms
    glitchIntensity: 0.7,
    particleCount: 50,
    autoplayVideos: false,
    enableParallax: true,
    mobileBreakpoint: 768 // px
  },
  
  // Performance settings
  performance: {
    lazyLoadImages: true,
    imageQuality: 85,
    enableServiceWorker: true,
    cacheAudioFiles: false, // Due to size
    prefetchPages: ['/', '/music', '/tour']
  },
  
  // Analytics and tracking
  analytics: {
    googleAnalyticsId: process.env.NEXT_PUBLIC_GA_ID,
    facebookPixelId: process.env.NEXT_PUBLIC_FB_PIXEL_ID,
    hotjarId: process.env.NEXT_PUBLIC_HOTJAR_ID
  },
  
  // Feature flags
  features: {
    enableExclusiveContent: true,
    enableNewsletterSignup: true,
    enableContactForm: true,
    enableDownloads: true,
    enableSharing: true,
    enableComments: false,
    enableLiveChat: false
  },
  
  // API endpoints (for future backend integration)
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || '/api',
    endpoints: {
      tracks: '/tracks',
      albums: '/albums',
      tours: '/tours',
      gallery: '/gallery',
      videos: '/videos',
      contact: '/contact',
      newsletter: '/newsletter',
      downloads: '/downloads'
    }
  },
  
  // Third-party services
  services: {
    emailService: process.env.NEXT_PUBLIC_EMAIL_SERVICE || 'emailjs',
    emailServiceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
    emailTemplateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
    emailPublicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
    
    // Newsletter service (e.g., Mailchimp, ConvertKit)
    newsletterService: process.env.NEXT_PUBLIC_NEWSLETTER_SERVICE,
    newsletterApiKey: process.env.NEXT_PUBLIC_NEWSLETTER_API_KEY,
    
    // File storage (e.g., AWS S3, Cloudinary)
    storageService: process.env.NEXT_PUBLIC_STORAGE_SERVICE,
    storageApiKey: process.env.NEXT_PUBLIC_STORAGE_API_KEY
  }
};

// Environment-specific overrides
if (process.env.NODE_ENV === 'development') {
  config.ui.animationDuration = 100; // Faster animations in dev
  config.performance.lazyLoadImages = false; // Disable lazy loading in dev
}

if (process.env.NODE_ENV === 'production') {
  config.performance.enableServiceWorker = true;
  config.analytics.googleAnalyticsId = config.analytics.googleAnalyticsId || 'GA_MEASUREMENT_ID';
}

export default config;