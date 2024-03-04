module.exports = {
  rewrites: async () => [
    {
      source: '/music/:slug*',
      destination: '/:slug*',
    },
    {
      source: '/contact/:slug*',
      destination: '/music/:slug*',
    },
    {
      source: '/success/:slug*',
      destination: '/success/:slug*',
    },
    {
      source: '/shop/:slug*',
      destination: '/shop/:slug*',
    },
    {
      source: '/blog/:slug*',
      destination: '/blog/:slug*',
    },
  ],
};
