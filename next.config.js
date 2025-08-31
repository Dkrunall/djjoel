const nextConfig = {
  images: { 
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'trae-api-sg.mchost.guru' }
    ] 
  }
}
module.exports = nextConfig