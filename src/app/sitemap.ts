import type { MetadataRoute } from 'next';

import { DOMAIN_URL } from '@/constants/common';
import { isProduction } from '@/utils/utils';

export default function sitemap(): MetadataRoute.Sitemap {
  if (!isProduction()) return [];
  return [
    {
      url: DOMAIN_URL,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
  ];
}
