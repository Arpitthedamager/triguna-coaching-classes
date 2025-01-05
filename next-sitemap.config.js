const fs = require('fs');

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://trigunacoachingclasses.in',
  generateRobotsTxt: true,
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 5000,
  additionalPaths: async (config) => {
    const staticRoutes = [
      '/about',
      '/contact',
      '/signin',
      '/register',
      '/user-dashboard',
      '/admin-dashboard',
    ];
    return staticRoutes.map((route) => ({
      loc: route,
      changefreq: 'daily',
      priority: 0.8,
      lastmod: new Date().toISOString(),
    }));
  },
};
