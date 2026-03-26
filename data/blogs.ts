export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content?: string;
  category: string;
  date: string;
  author: string;
  imageUrl: string;
  metaDescription?: string;
}

import { nanotechInSoilPost } from './blog-posts/nanotech-in-soil';
import { regenerativeAgriculturePost } from './blog-posts/regenerative-agriculture';
import { aiCropProtectionPost } from './blog-posts/ai-crop-protection';
import { techComing1Post } from './blog-posts/tech-coming-1';
import { techComing2Post } from './blog-posts/tech-coming-2';
import { sustComing1Post } from './blog-posts/sust-coming-1';
import { sustComing2Post } from './blog-posts/sust-coming-2';
import { aiComing1Post } from './blog-posts/ai-coming-1';
import { aiComing2Post } from './blog-posts/ai-coming-2';
import { techComing3Post } from './blog-posts/tech-coming-3';
import { techComing4Post } from './blog-posts/tech-coming-4';
import { sustComing3Post } from './blog-posts/sust-coming-3';
import { sustComing4Post } from './blog-posts/sust-coming-4';
import { aiComing3Post } from './blog-posts/ai-coming-3';
import { aiComing4Post } from './blog-posts/ai-coming-4';

export const blogs: BlogPost[] = [
  nanotechInSoilPost,
  regenerativeAgriculturePost,
  aiCropProtectionPost,
  techComing1Post,
  techComing2Post,
  sustComing1Post,
  sustComing2Post,
  aiComing1Post,
  aiComing2Post,
  techComing3Post,
  techComing4Post,
  sustComing3Post,
  sustComing4Post,
  aiComing3Post,
  aiComing4Post,
];
