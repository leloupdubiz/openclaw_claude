/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // CSP frame-ancestors (seul header supporté par Chrome pour les iframes)
          // X-Frame-Options ALLOW-FROM est déprécié et ignoré par Chrome
          {
            key: "Content-Security-Policy",
            value: "frame-ancestors 'self' http://localhost:3002 http://localhost:3001 http://localhost:3000;",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
