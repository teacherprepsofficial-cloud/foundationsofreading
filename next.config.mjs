/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return {
      beforeFiles: [
        // Hide exam code from URL: /dashboard → internal /dashboard/190
        { source: '/dashboard', destination: '/dashboard/190' },
        // /dashboard/study-guide → /dashboard/190/study-guide (skip if already /dashboard/190/... or /dashboard/890/...)
        { source: '/dashboard/:path((?!190|890).+)', destination: '/dashboard/190/:path' },
      ],
      afterFiles: [
        // State-specific landing pages
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
      ],
      fallback: [],
    }
  },

  async redirects() {
    return [
      // Remove exam code from browser URL (190 and 890 are the same content)
      { source: '/dashboard/190', destination: '/dashboard', permanent: false },
      { source: '/dashboard/890', destination: '/dashboard', permanent: false },
      { source: '/dashboard/190/:path+', destination: '/dashboard/:path+', permanent: false },
      { source: '/dashboard/890/:path+', destination: '/dashboard/:path+', permanent: false },
      // Retired product pages — redirect to homepage
      { source: '/study-guide',    destination: '/', permanent: true },
      { source: '/bundle',         destination: '/', permanent: true },
      { source: '/practice-test',  destination: '/', permanent: true },
      // Old WordPress URL redirects (301 permanent)
      { source: '/190-test',           destination: '/', permanent: true },
      { source: '/90-test',            destination: '/', permanent: true },
      { source: '/free-practice-test', destination: '/', permanent: true },
      { source: '/faq',  destination: '/#faq', permanent: true },
      { source: '/shop', destination: '/',     permanent: true },
    ]
  },
}

export default nextConfig
