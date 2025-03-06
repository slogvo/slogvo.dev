// app/api/posts/[slug]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const API_BASE_URL = process.env.API_ENDPOINT;

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> },
) {
  const slug = (await params).slug;
  try {
    const response = await axios.get(`${API_BASE_URL}/posts/${slug}`);
    return NextResponse.json(response.data);
  } catch (error) {
    console.log('🚀 ~ error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch post' },
      { status: 500 },
    );
  }
}
