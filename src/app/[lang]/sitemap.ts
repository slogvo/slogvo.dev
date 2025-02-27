import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'http://localhost:5000';
  const locales = ['en', 'ar'];

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const, // Explicitly type the string
      priority: 1,
    },
    ...locales.map((locale) => ({
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const, // Explicitly type the string
      priority: 0.8,
    })),
  ];
}
