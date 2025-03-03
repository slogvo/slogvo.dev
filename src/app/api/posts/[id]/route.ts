// app/api/posts/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const API_BASE_URL = 'http://blog-express-jf74.onrender.com/api';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id } = params;
  try {
    const response = await axios.get(`${API_BASE_URL}/posts/${id}`);
    return NextResponse.json(response.data);
  } catch (error) {
    console.log('🚀 ~ error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch post' },
      { status: 500 },
    );
  }
}
