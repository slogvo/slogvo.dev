import { NotionBlock } from 'react-notion-blocks';

export interface IPost {
  id?: string;
  title: string;
  icon?: {
    type: string;
    emoji: string;
  };
  cover?: string;
  author?: string;
  slug: string;
  status?: string;
  publishDate?: string;
  excerpt?: string;
  content?: NotionBlock[];
}
