import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const { pathname } = url;
  const defaultLocale = 'en';
  const locales = ['en', 'vi'];

  // Kiểm tra nếu đã có ngôn ngữ trong URL
  const hasLocale = locales.some((locale) => pathname.startsWith(`/${locale}`));

  if (!hasLocale) {
    // Chuyển hướng về ngôn ngữ mặc định
    return NextResponse.redirect(
      new URL(`/${defaultLocale}${pathname}`, req.url),
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/((?!api|_next|.*\\..*).*)',
};
