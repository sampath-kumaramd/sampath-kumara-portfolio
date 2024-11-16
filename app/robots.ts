import { MetadataRoute } from 'next';
import { siteConfig } from './metadata.config';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/',
    },
    sitemap: `${siteConfig.siteUrl}/sitemap.xml`,
  };
}
