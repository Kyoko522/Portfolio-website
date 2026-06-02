/** @type {import('next').NextConfig} */

// The admin portal's backend (Express). Defaults to the local dev server; set
// ADMIN_API_URL in the environment to point at your hosted backend later.
const ADMIN_API_URL = process.env.ADMIN_API_URL || 'http://localhost:4000'

const nextConfig = {
  // Pin the workspace root so Turbopack doesn't walk up to a stray
  // lockfile in the home directory and scan the whole home folder.
  turbopack: { root: __dirname },

  // Proxy /admin-api/* to the admin backend. The browser only ever talks to
  // this site's origin, so the backend's httpOnly auth cookie stays first-party
  // (no CORS, no cross-site cookies). Works in dev and, once ADMIN_API_URL
  // points at a hosted backend, in production too.
  async rewrites() {
    return [
      { source: '/admin-api/:path*', destination: `${ADMIN_API_URL}/api/:path*` },
    ]
  },
}

module.exports = nextConfig
