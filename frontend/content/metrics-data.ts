export interface Metric {
  value: string
  en: string
  ar: string
}

/** Company-provided figures, shown as verified minimums (with "+"). Edit
 * values/labels here only — do not add percentages, dates, or figures not
 * supplied by AL MASSAR. */
export const homeMetrics: Metric[] = [
  { value: '500+', en: 'Services Delivered', ar: 'خدمة مقدمة' },
  { value: '100+', en: 'Clients Served', ar: 'عميل تمت خدمته' },
  { value: '50+', en: 'Business Relationships', ar: 'علاقة مع شركات وجهات' },
  { value: '100+', en: 'Travel Experiences Coordinated', ar: 'رحلة وتجربة منسقة' },
]

export const corporateEventsMetric: Metric = {
  value: '50+',
  en: 'Corporate Events & Conferences Supported',
  ar: 'فعالية ومؤتمر تم دعمهما',
}
