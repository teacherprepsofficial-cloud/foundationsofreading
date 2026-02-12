/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      // State-specific landing pages: /alabama-foundations-of-reading-test → /states/alabama
      { source: '/alabama-foundations-of-reading-test', destination: '/states/alabama' },
      { source: '/arizona-foundations-of-reading-test', destination: '/states/arizona' },
      { source: '/arkansas-foundations-of-reading-test', destination: '/states/arkansas' },
      { source: '/connecticut-foundations-of-reading-test', destination: '/states/connecticut' },
      { source: '/iowa-foundations-of-reading-test', destination: '/states/iowa' },
      { source: '/massachusetts-foundations-of-reading-test', destination: '/states/massachusetts' },
      { source: '/mississippi-foundations-of-reading-test', destination: '/states/mississippi' },
      { source: '/new-hampshire-foundations-of-reading-test', destination: '/states/new-hampshire' },
      { source: '/north-carolina-foundations-of-reading-test', destination: '/states/north-carolina' },
      { source: '/ohio-foundations-of-reading-test', destination: '/states/ohio' },
      { source: '/rhode-island-foundations-of-reading-test', destination: '/states/rhode-island' },
      { source: '/utah-foundations-of-reading-test', destination: '/states/utah' },
      { source: '/wisconsin-foundations-of-reading-test', destination: '/states/wisconsin' },
    ]
  },

  async redirects() {
    return [
      // Old WordPress URL redirects (301 permanent)
      { source: '/190-test', destination: '/study-guide', permanent: true },
      { source: '/90-test', destination: '/study-guide', permanent: true },
      { source: '/free-practice-test', destination: '/practice-test', permanent: true },
      { source: '/faq', destination: '/#faq', permanent: true },
      { source: '/shop', destination: '/bundle', permanent: true },
    ]
  },
}

export default nextConfig
