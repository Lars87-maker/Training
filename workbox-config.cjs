module.exports = {
  globDirectory: "dist/",
  globPatterns: ["**/*.{js,css,html,webmanifest,png}"],
  swDest: "dist/sw.js",
  runtimeCaching: [
    {
      urlPattern: ({request}) => request.destination === 'document' || request.destination === 'script' || request.destination === 'style',
      handler: 'NetworkFirst',
      options: { cacheName: 'app-shell' }
    },
    {
      urlPattern: ({url}) => url.pathname.startsWith('/icons/'),
      handler: 'CacheFirst',
      options: { cacheName: 'assets' }
    }
  ]
};
