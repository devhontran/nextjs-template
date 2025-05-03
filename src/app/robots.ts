import type { MetadataRoute } from 'next';

import { DOMAIN_URL } from '@/constants/common';
import { isProduction } from '@/utils/utils';

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
