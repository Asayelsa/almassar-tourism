import { NextRequest, NextResponse } from 'next/server'
import { defaultLocale, isLocale } from '@/content/i18n'

export const config = {
  matcher: ['/((?!api|_next|favicon.ico|favicon.svg|robots.txt|sitemap.xml).*)'],
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const firstSegment = pathname.split('/')[1] || ''

  if (isLocale(firstSegment)) {
    return NextResponse.next()
  }

  const url = request.nextUrl.clone()
  url.pathname = `/${defaultLocale}${pathname === '/' ? '' : pathname}`
  return NextResponse.redirect(url)
}
