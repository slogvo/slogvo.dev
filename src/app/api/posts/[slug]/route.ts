// app/api/posts/[slug]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const DB_API_ENDPOINT =
  process.env.DB_API_ENDPOINT || 'https://blog-express-jf74.onrender.com/api';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> },
) {
  const slug = (await params).slug;
  try {
    const response = await axios.get(`${DB_API_ENDPOINT}/posts/${slug}`);
    return NextResponse.json(response.data);
  } catch (error) {
    console.log('🚀 ~ error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch post' },
      { status: 500 },
    );
  }
}
