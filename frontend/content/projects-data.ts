export interface ProjectCopy {
  title: string
  category: string
  description: string
  body: string[]
}

export interface Project {
  slug: string
  date: string
  image: string
  gallery: string[]
  imageAlt: { en: string; ar: string }
  en: ProjectCopy
  ar: ProjectCopy
}

export const projects: Project[] = [
  {
    slug: 'luxury-destination-experience',
    date: '2026',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1400&q=80',
      'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1400&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1400&q=80',
    ],
    imageAlt: { en: 'Diver exploring a vibrant reef on a private excursion', ar: 'غطّاس يستكشف شعاباً مرجانية نابضة بالحياة في رحلة خاصة' },
    en: {
      title: 'Luxury Destination Experience',
      category: 'Travel & Experiences',
      description: 'A concept itinerary illustrating how a private, multi-destination journey could be curated end to end.',
      body: [
        'This concept outlines how AL MASSAR would approach a private, multi-destination journey for a family or small group — from first consultation to in-trip concierge support.',
        'It is built to demonstrate structure and presentation only: destination sequencing, accommodation tiers, and the experiences that typically anchor a journey of this kind.',
      ],
    },
    ar: {
      title: 'تجربة وجهة فاخرة',
      category: 'السفر والتجارب',
      description: 'مسار مفاهيمي يوضح كيف يمكن تصميم رحلة خاصة متعددة الوجهات من البداية إلى النهاية.',
      body: [
        'يوضح هذا المفهوم الطريقة التي تتعامل بها المسار مع رحلة خاصة متعددة الوجهات لعائلة أو مجموعة صغيرة، من الاستشارة الأولى إلى دعم الكونسيرج خلال الرحلة.',
        'صُمم هذا المحتوى لإظهار البنية والعرض فقط؛ تسلسل الوجهات، فئات الإقامة، والتجارب التي تشكّل عادة محور رحلة من هذا النوع.',
      ],
    },
  },
  {
    slug: 'executive-business-journey',
    date: '2026',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1400&q=80',
      'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1400&q=80',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1400&q=80',
    ],
    imageAlt: { en: 'Executive travel lounge interior', ar: 'صالة سفر تنفيذية من الداخل' },
    en: {
      title: 'Executive Business Journey',
      category: 'Corporate Travel & Events',
      description: 'A concept program showing how executive travel across several markets could be coordinated as one itinerary.',
      body: [
        'This concept demonstrates how AL MASSAR would coordinate a multi-city executive journey — flights, ground transportation, meeting logistics and VIP touches handled as a single program.',
        'As a sample piece, it is intended to show format and tone rather than a completed engagement.',
      ],
    },
    ar: {
      title: 'رحلة أعمال تنفيذية',
      category: 'السفر المؤسسي والفعاليات',
      description: 'برنامج مفاهيمي يوضح كيف يمكن تنسيق سفر تنفيذي عبر عدة أسواق كمسار رحلة واحد.',
      body: [
        'يوضح هذا المفهوم كيف تنسّق المسار رحلة تنفيذية متعددة المدن؛ الطيران والنقل البري ولوجستيات الاجتماعات وتفاصيل كبار الشخصيات، كبرنامج واحد.',
        'بصفته نموذجاً، يهدف إلى إظهار الشكل والأسلوب وليس تعاوناً فعلياً مكتملاً.',
      ],
    },
  },
  {
    slug: 'corporate-retreat',
    date: '2026',
    image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=1800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=1400&q=80',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400&q=80',
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1400&q=80',
    ],
    imageAlt: { en: 'Mountain lodge set up for a corporate retreat', ar: 'نُزل جبلي مُجهّز لرحلة تنشيطية مؤسسية' },
    en: {
      title: 'Corporate Retreat',
      category: 'Corporate Travel & Events',
      description: 'A concept retreat program pairing a distinctive setting with structured team sessions.',
      body: [
        'This concept presents how a corporate retreat could combine a distinctive destination with structured sessions, group activities and quiet downtime.',
        'It is a sample format only, created to show how AL MASSAR would present a retreat program.',
      ],
    },
    ar: {
      title: 'رحلة تنشيطية مؤسسية',
      category: 'السفر المؤسسي والفعاليات',
      description: 'برنامج تنشيطي مفاهيمي يجمع بين وجهة متميزة وجلسات عمل منظمة.',
      body: [
        'يعرض هذا المفهوم كيف يمكن لرحلة تنشيطية مؤسسية أن تجمع بين وجهة متميزة وجلسات منظمة وأنشطة جماعية وأوقات راحة هادئة.',
        'هذا نموذج شكلي فقط، أُنشئ لإظهار كيف تعرض المسار برنامجاً تنشيطياً.',
      ],
    },
  },
  {
    slug: 'tourism-investment-concept',
    date: '2026',
    image: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1400&q=80',
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1400&q=80',
      'https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=1400&q=80',
    ],
    imageAlt: { en: 'Skyline of modern towers at dusk', ar: 'أفق أبراج حديثة عند الغسق' },
    en: {
      title: 'Tourism Investment Concept',
      category: 'Tourism Investment & Advisory',
      description: 'A concept walkthrough of how a tourism investment opportunity could be researched and presented.',
      body: [
        'This concept illustrates the type of research and coordination AL MASSAR provides around a tourism investment opportunity — market context, site considerations, and the professional introductions that typically follow.',
        'No figures, returns or opportunities shown here are real; the piece exists to demonstrate structure and presentation only.',
      ],
    },
    ar: {
      title: 'مفهوم استثمار سياحي',
      category: 'الاستثمار السياحي والاستشارات',
      description: 'عرض مفاهيمي لكيفية بحث فرصة استثمار سياحي وتقديمها.',
      body: [
        'يوضح هذا المفهوم نوع البحث والتنسيق الذي تقدّمه المسار حول فرصة استثمار سياحي؛ سياق السوق واعتبارات الموقع والتعريفات المهنية التي تلي ذلك عادة.',
        'لا تمثّل أي أرقام أو عوائد أو فرص واردة هنا بيانات حقيقية؛ فالغرض من هذا المحتوى هو إظهار البنية والعرض فقط.',
      ],
    },
  },
  {
    slug: 'destination-development-concept',
    date: '2026',
    image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=1800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=1400&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1400&q=80',
      'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1400&q=80',
    ],
    imageAlt: { en: 'Aerial view of a coastal development', ar: 'منظر جوي لتطوير ساحلي' },
    en: {
      title: 'Destination Development Concept',
      category: 'Tourism Investment & Advisory',
      description: 'A concept overview of the coordination involved in an early-stage destination development.',
      body: [
        'This concept shows the kind of coordination AL MASSAR offers around an early-stage destination development — connecting developers, local partners and relevant authorities.',
        'It is presented as a sample only; no development, developer or figures referenced here are real.',
      ],
    },
    ar: {
      title: 'مفهوم تطوير وجهة سياحية',
      category: 'الاستثمار السياحي والاستشارات',
      description: 'نظرة مفاهيمية على التنسيق المطلوب في مراحل مبكرة من تطوير وجهة سياحية.',
      body: [
        'يُظهر هذا المفهوم نوع التنسيق الذي تقدّمه المسار حول تطوير وجهة في مراحله المبكرة؛ الربط بين المطورين والشركاء المحليين والجهات المعنية.',
        'يُقدَّم هذا المحتوى كنموذج فقط؛ ولا يمثّل أي تطوير أو مطوّر أو أرقام مذكورة هنا بيانات حقيقية.',
      ],
    },
  },
  {
    slug: 'international-mice-experience',
    date: '2026',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=1800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1511578314322-379afb476865?w=1400&q=80',
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1400&q=80',
      'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1400&q=80',
    ],
    imageAlt: { en: 'Large conference hall prepared for an international event', ar: 'قاعة مؤتمرات كبرى مُجهّزة لفعالية دولية' },
    en: {
      title: 'International MICE Experience',
      category: 'Corporate Travel & Events',
      description: 'A concept program for a multi-day conference and exhibition, coordinated across delegations.',
      body: [
        'This concept outlines how AL MASSAR would coordinate a multi-day MICE program — delegate travel, venue logistics, and the supporting experiences around a conference or exhibition.',
        'A sample piece only, intended to demonstrate scale and coordination rather than a delivered event.',
      ],
    },
    ar: {
      title: 'تجربة مؤتمرات وفعاليات دولية',
      category: 'السفر المؤسسي والفعاليات',
      description: 'برنامج مفاهيمي لمؤتمر ومعرض متعدد الأيام، منسّق عبر عدة بعثات.',
      body: [
        'يوضح هذا المفهوم كيف تنسّق المسار برنامج فعاليات ومؤتمرات متعدد الأيام؛ سفر المندوبين ولوجستيات المكان والتجارب المصاحبة لمؤتمر أو معرض.',
        'هذا نموذج فقط، يهدف إلى إظهار الحجم والتنسيق وليس فعالية مُنفَّذة فعلياً.',
      ],
    },
  },
]

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug)
}
