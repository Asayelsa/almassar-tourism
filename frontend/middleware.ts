import { NextRequest, NextResponse } from 'next/server'
import { defaultLocale, isLocale } from '@/content/i18n'

export const config = {
  // Skip API routes, Next internals, and any static file (anything with a
  // file extension, e.g. /partners/stc.svg, /favicon.svg, /robots.txt) —
  // only real pages get the locale redirect.
  matcher: ['/((?!api|_next|.*\\..*).*)'],
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
