module.exports = {
  async rewrites() {
    return [
      {
        source: '/music/:slug*',
        destination: '/:slug*', // This rule will redirect /music/:slug* to /:slug*
      },
      {
        source: '/contact/:slug*', // This rule will match /contact/anything
        destination: '/music/:slug*', // This rule will redirect /contact/:slug* to /contact/:slug*
      },
      {
        source: '/success/:slug*', // This rule will match /success/anything
        destination: '/success/:slug*', // This rule will redirect /success/:slug* to /success/:slug*
      },

      {
        source: '/shop/:slug*',
        destination: '/shop/:slug*', 
      },

      {
        source: '/blog/:slug*',
        destination: '/blog/:slug*', 
      },

    ];
  },
};
