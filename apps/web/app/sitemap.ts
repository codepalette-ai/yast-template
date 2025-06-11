import fs from 'node:fs';
import { env } from '@/env';
import type { MetadataRoute } from 'next';

const appFolders = fs.readdirSync('app', { withFileTypes: true });
const pages = appFolders
  .filter((file) => file.isDirectory())
  .filter((folder) => folder.name.startsWith('(home)'))
  .map((folder) => folder.name);

const sitemap = async (): Promise<MetadataRoute.Sitemap> => [
  {
    url: new URL('/', env.NEXT_PUBLIC_WEB_URL).href,
    lastModified: new Date(),
  },
  ...pages.map((page) => ({
    url: new URL(page, env.NEXT_PUBLIC_WEB_URL).href,
    lastModified: new Date(),
  })),
];

export default sitemap;
