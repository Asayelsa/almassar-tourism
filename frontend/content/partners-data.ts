/** Confirmed AL MASSAR partner relationships, with official logo assets. */
export interface Partner {
  name: string
  logo: string
  /** Tailwind max-height class. Square/icon marks (stc, Saudi Tourism
   * Authority) need a taller box than wide wordmarks to read as the same
   * visual size — object-contain alone under-renders a 1:1 logo. */
  maxH?: string
}

export const partners: Partner[] = [
  { name: 'Saudi Tourism Authority', logo: '/partners/saudi-tourism-authority.svg', maxH: 'max-h-16' },
  { name: 'stc', logo: '/partners/stc.svg', maxH: 'max-h-16' },
  { name: 'Almosafer', logo: '/partners/almosafer.svg' },
  { name: 'Marriott', logo: '/partners/marriott.svg' },
  { name: 'Hilton', logo: '/partners/hilton.svg' },
  { name: 'PwC', logo: '/partners/pwc.svg' },
]
