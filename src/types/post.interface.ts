import { NotionBlock } from 'react-notion-blocks';

export interface Post {
  id?: string;
  title: string;
  cover?: string;
  slug: string;
  status?: string;
  publishDate?: string;
  excerpt?: string;
  content?: NotionBlock[];
}
