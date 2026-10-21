/**
 * Confirmed AL MASSAR partner relationships. Rendered as styled wordmarks
 * until official logo files are supplied — see logoHint for the exact asset
 * needed to replace each one (drop the file in public/partners/ and wire it
 * into components/sections/partners.tsx).
 */
export interface Partner {
  name: string
  logoHint: string
}

export const partners: Partner[] = [
  { name: 'Saudi Tourism Authority', logoHint: 'public/partners/saudi-tourism-authority.svg' },
  { name: 'stc', logoHint: 'public/partners/stc.svg' },
  { name: 'Almosafer', logoHint: 'public/partners/almosafer.svg' },
  { name: 'Marriott', logoHint: 'public/partners/marriott.svg' },
  { name: 'Hilton', logoHint: 'public/partners/hilton.svg' },
  { name: 'PwC', logoHint: 'public/partners/pwc.svg' },
]
