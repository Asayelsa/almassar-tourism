export interface ProjectCopy {
  title: string
  category: string
  description: string
  overview: string
  objectives: string[]
  scope: string
  phases: string[]
  outcomes: string
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
      overview: 'A concept itinerary illustrating how AL MASSAR would curate a private, multi-destination journey for a family or small group, from first consultation to in-trip concierge support.',
      objectives: [
        'Design a journey around the travelers’ preferences and pace, not a fixed package',
        'Sequence destinations, accommodation and experiences into one coherent itinerary',
        'Provide concierge-level support throughout the trip',
      ],
      scope: 'Covers destination selection, accommodation tiers, transportation, dining and activity planning, and in-trip assistance.',
      phases: ['Consultation & Preferences', 'Itinerary Design', 'Booking & Coordination', 'In-Trip Support'],
      outcomes: 'A seamless, personally tailored journey with minimal friction for the traveler at every stage.',
    },
    ar: {
      title: 'تجربة وجهة فاخرة',
      category: 'السفر والتجارب',
      description: 'مسار مفاهيمي يوضح كيف يمكن تصميم رحلة خاصة متعددة الوجهات من البداية إلى النهاية.',
      overview: 'مسار مفاهيمي يوضح كيف تصمم المسار رحلة خاصة متعددة الوجهات لعائلة أو مجموعة صغيرة، من الاستشارة الأولى إلى دعم الكونسيرج خلال الرحلة.',
      objectives: [
        'تصميم رحلة حول أولويات المسافرين وإيقاعهم لا باقة جاهزة',
        'ترتيب الوجهات والإقامة والتجارب في مسار واحد مترابط',
        'تقديم دعم بمستوى الكونسيرج طوال الرحلة',
      ],
      scope: 'يشمل اختيار الوجهات وفئات الإقامة والنقل وتخطيط المطاعم والأنشطة، والمساعدة أثناء الرحلة.',
      phases: ['الاستشارة وتحديد الأولويات', 'تصميم المسار', 'الحجز والتنسيق', 'الدعم أثناء الرحلة'],
      outcomes: 'رحلة سلسة ومصممة شخصياً بأقل قدر من العقبات في كل مرحلة.',
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
      overview: 'A concept program showing how AL MASSAR would coordinate a multi-city executive journey as one integrated program.',
      objectives: [
        'Align flights, ground transport and meeting logistics into a single schedule',
        'Minimize downtime and handling for traveling executives',
        'Maintain discretion and flexibility for last-minute changes',
      ],
      scope: 'Covers multi-city flight and ground coordination, meeting logistics and VIP touches across the trip.',
      phases: ['Schedule Mapping', 'Travel & Logistics Coordination', 'On-the-Ground Execution', 'Post-Trip Follow-up'],
      outcomes: 'A smooth, well-paced executive journey that keeps focus on the business purpose of the trip.',
    },
    ar: {
      title: 'رحلة أعمال تنفيذية',
      category: 'السفر المؤسسي والفعاليات',
      description: 'برنامج مفاهيمي يوضح كيف يمكن تنسيق سفر تنفيذي عبر عدة أسواق كمسار رحلة واحد.',
      overview: 'برنامج مفاهيمي يوضح كيف تنسّق المسار رحلة تنفيذية متعددة المدن كبرنامج متكامل واحد.',
      objectives: [
        'مواءمة الطيران والنقل البري ولوجستيات الاجتماعات في جدول واحد',
        'تقليل أوقات الانتظار والعبء على المسؤولين المسافرين',
        'الحفاظ على السرّية والمرونة في التغييرات المفاجئة',
      ],
      scope: 'يشمل تنسيق الطيران والنقل البري متعدد المدن، ولوجستيات الاجتماعات، ولمسات كبار الشخصيات طوال الرحلة.',
      phases: ['رسم الجدول الزمني', 'تنسيق السفر واللوجستيات', 'التنفيذ الميداني', 'المتابعة بعد الرحلة'],
      outcomes: 'رحلة تنفيذية سلسة ومتوازنة تبقي التركيز على الغرض التجاري من الرحلة.',
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
      overview: 'A concept retreat program pairing a distinctive setting with structured team sessions, group activities and quiet downtime.',
      objectives: [
        'Balance structured sessions with informal team time',
        'Match the setting to the purpose of the retreat',
        'Keep logistics invisible to participants',
      ],
      scope: 'Covers venue selection, session scheduling, group activities, accommodation and transport for the group.',
      phases: ['Objectives & Venue Selection', 'Program Design', 'Logistics Coordination', 'On-Site Delivery'],
      outcomes: 'A well-paced retreat that supports the team’s goals without logistics becoming a distraction.',
    },
    ar: {
      title: 'رحلة تنشيطية مؤسسية',
      category: 'السفر المؤسسي والفعاليات',
      description: 'برنامج تنشيطي مفاهيمي يجمع بين وجهة متميزة وجلسات عمل منظمة.',
      overview: 'برنامج تنشيطي مفاهيمي يجمع بين وجهة متميزة وجلسات عمل منظمة وأنشطة جماعية وأوقات راحة هادئة.',
      objectives: [
        'الموازنة بين الجلسات المنظمة والوقت غير الرسمي للفريق',
        'مواءمة الوجهة مع الغرض من الرحلة التنشيطية',
        'إبقاء اللوجستيات غير ظاهرة للمشاركين',
      ],
      scope: 'يشمل اختيار المكان وجدولة الجلسات والأنشطة الجماعية والإقامة والنقل للمجموعة.',
      phases: ['تحديد الأهداف واختيار المكان', 'تصميم البرنامج', 'تنسيق اللوجستيات', 'التنفيذ الميداني'],
      outcomes: 'رحلة تنشيطية متوازنة تدعم أهداف الفريق دون أن تتحول اللوجستيات إلى عامل تشتيت.',
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
      overview: 'A concept walkthrough of how AL MASSAR would research and present a tourism investment opportunity.',
      objectives: [
        'Clarify the market context and destination dynamics around the opportunity',
        'Identify relevant local partners and stakeholders',
        'Prepare a clear, structured presentation of findings',
      ],
      scope: 'Covers market and destination research, competitive context, and coordination of introductions to relevant professionals.',
      phases: ['Opportunity Scoping', 'Market & Destination Research', 'Site Visits & Partner Meetings', 'Findings & Introductions'],
      outcomes: 'A clearer, better-informed view of the opportunity, with the right people identified for next steps.',
    },
    ar: {
      title: 'مفهوم استثمار سياحي',
      category: 'الاستثمار السياحي والاستشارات',
      description: 'عرض مفاهيمي لكيفية بحث فرصة استثمار سياحي وتقديمها.',
      overview: 'عرض مفاهيمي لكيفية بحث المسار لفرصة استثمار سياحي وتقديمها.',
      objectives: [
        'توضيح سياق السوق وديناميكيات الوجهة المرتبطة بالفرصة',
        'تحديد الشركاء وأصحاب المصلحة المحليين ذوي الصلة',
        'إعداد عرض واضح ومنظم للنتائج',
      ],
      scope: 'يشمل أبحاث السوق والوجهة والسياق التنافسي، وتنسيق التعريف بمختصين ذوي صلة.',
      phases: ['تحديد نطاق الفرصة', 'أبحاث السوق والوجهة', 'الزيارات الميدانية ولقاءات الشركاء', 'النتائج والتعريفات'],
      outcomes: 'رؤية أوضح وأكثر استنارة للفرصة، مع تحديد الأطراف المناسبة للخطوات التالية.',
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
      overview: 'A concept overview of the coordination involved in an early-stage destination development.',
      objectives: [
        'Connect developers with relevant local partners and authorities',
        'Surface early planning considerations specific to the destination',
        'Support a structured, well-sequenced approach to early-stage coordination',
      ],
      scope: 'Covers stakeholder introductions, local coordination and early-stage planning support around a destination development.',
      phases: ['Stakeholder Mapping', 'Local Coordination', 'Early Planning Support', 'Partner Introductions'],
      outcomes: 'Stronger early-stage alignment between developers, local partners and relevant authorities.',
    },
    ar: {
      title: 'مفهوم تطوير وجهة سياحية',
      category: 'الاستثمار السياحي والاستشارات',
      description: 'نظرة مفاهيمية على التنسيق المطلوب في مراحل مبكرة من تطوير وجهة سياحية.',
      overview: 'نظرة مفاهيمية على التنسيق المطلوب في مراحل مبكرة من تطوير وجهة سياحية.',
      objectives: [
        'ربط المطورين بالشركاء المحليين والجهات المعنية ذات الصلة',
        'إبراز اعتبارات التخطيط المبكر الخاصة بالوجهة',
        'دعم نهج منظم ومتسلسل للتنسيق في المراحل المبكرة',
      ],
      scope: 'يشمل التعريف بأصحاب المصلحة والتنسيق المحلي ودعم التخطيط المبكر حول تطوير الوجهة.',
      phases: ['تحديد أصحاب المصلحة', 'التنسيق المحلي', 'دعم التخطيط المبكر', 'التعريف بالشركاء'],
      outcomes: 'توافق أقوى في المراحل المبكرة بين المطورين والشركاء المحليين والجهات المعنية.',
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
      overview: 'A concept program for a multi-day conference and exhibition, coordinated across delegations.',
      objectives: [
        'Coordinate delegate travel and accommodation across multiple groups',
        'Align venue logistics with the program schedule',
        'Layer in supporting experiences around the core event',
      ],
      scope: 'Covers delegate travel, venue logistics, scheduling and the experiences surrounding a conference or exhibition.',
      phases: ['Program & Delegate Planning', 'Venue & Logistics Coordination', 'On-Site Delivery', 'Post-Event Wrap-up'],
      outcomes: 'A well-coordinated event experience across delegations, with logistics handled smoothly throughout.',
    },
    ar: {
      title: 'تجربة مؤتمرات وفعاليات دولية',
      category: 'السفر المؤسسي والفعاليات',
      description: 'برنامج مفاهيمي لمؤتمر ومعرض متعدد الأيام، منسّق عبر عدة بعثات.',
      overview: 'برنامج مفاهيمي لمؤتمر ومعرض متعدد الأيام، منسّق عبر عدة بعثات.',
      objectives: [
        'تنسيق سفر المندوبين وإقامتهم عبر عدة مجموعات',
        'مواءمة لوجستيات المكان مع جدول البرنامج',
        'إضافة تجارب مصاحبة حول الفعالية الأساسية',
      ],
      scope: 'يشمل سفر المندوبين ولوجستيات المكان والجدولة والتجارب المصاحبة لمؤتمر أو معرض.',
      phases: ['تخطيط البرنامج والمندوبين', 'تنسيق المكان واللوجستيات', 'التنفيذ الميداني', 'المتابعة بعد الفعالية'],
      outcomes: 'تجربة فعالية منسقة جيداً عبر البعثات، مع إدارة سلسة للوجستيات طوال الوقت.',
    },
  },
]

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug)
}
