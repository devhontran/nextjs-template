import { DOMAIN_URL } from '@Constants/common';
import { isProduction } from '@Utils/utils';
import { MetadataRoute } from 'next';

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
