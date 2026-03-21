VitePWA({
  registerType: "autoUpdate",
  manifest: {
    id: "/",
    name: "AI Tutor Languages",
    short_name: "AI Tutor",
    description: "Seu professor particular de idiomas interativo",
    start_url: "/",
    scope: "/",
    display: "standalone",
    theme_color: "#7c7ae6",
    background_color: "#ffffff",
    icons: [
      {
        src: "/pwa-192x192.png",
        sizes: "192x192",
        type: "image/png"
      },
      {
        src: "/pwa-512x512.png",
        sizes: "512x512",
        type: "image/png"
      }
    ]
  }
})