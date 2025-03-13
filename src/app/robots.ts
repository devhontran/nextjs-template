import { DOMAIN_URL } from '@Constants/common';
import { isProduction } from '@Utils/utils';
import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  if (!isProduction())
    return {
      rules: {
        userAgent: '*',
        disallow: '/',
      },
      sitemap: `${DOMAIN_URL}/sitemap.xml`,
    };
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/',
    },
    sitemap: `${DOMAIN_URL}/sitemap.xml`,
  };
}
