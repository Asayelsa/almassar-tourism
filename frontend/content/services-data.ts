export interface Capability {
  title: string
  description: string
}

export interface ServiceCopy {
  title: string
  summary: string
  description: string
  capabilities: Capability[]
}

export interface Service {
  slug: string
  number: string
  image: string
  imageAlt: { en: string; ar: string }
  en: ServiceCopy
  ar: ServiceCopy
}

export const services: Service[] = [
  {
    slug: 'travel-experiences',
    number: '01',
    image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1800&q=80',
    imageAlt: {
      en: 'Infinity pool overlooking the ocean at a luxury resort',
      ar: 'مسبح لا نهائي يواجه المحيط في منتجع فاخر',
    },
    en: {
      title: 'Travel & Experiences',
      summary: 'Tailored travel experiences for individuals, families, executives, and private clients.',
      description:
        'We design travel around the traveler — leisure, business or special occasion — drawing on destination knowledge and trusted local relationships to deliver journeys that feel personal from the first conversation to the final mile.',
      capabilities: [
        { title: 'Tailored Travel Planning', description: 'A single point of coordination for the entire trip, built around your schedule and priorities rather than a fixed package.' },
        { title: 'Personalized Itineraries', description: 'Day-by-day plans that sequence accommodation, transport, dining and activities into one coherent, easy-to-follow schedule.' },
        { title: 'Flights & Accommodation', description: 'Booking and coordination across flights and stays, matched to the itinerary and adjusted as plans change.' },
        { title: 'Transportation', description: 'Airport transfers, private drivers and inter-city movement arranged so every connection runs on time.' },
        { title: 'Restaurants & Experiences', description: 'Reservations and recommendations suited to the occasion, from quiet family dinners to notable addresses.' },
        { title: 'Activities & Events', description: 'Tours, excursions and event access coordinated around the rest of the itinerary, not arranged separately.' },
        { title: 'Visa & Travel Support', description: 'Guidance on visa and entry requirements, with document coordination to keep the trip on schedule.' },
        { title: 'VIP & Concierge Services', description: 'On-call support for requests that come up before or during the trip, handled discreetly.' },
        { title: 'In-trip Assistance', description: 'A point of contact while traveling, so changes or issues are resolved without disrupting the plan.' },
        { title: 'Leisure, Business and Special Occasion Travel', description: 'The same level of care applied whether the trip is a family holiday, a business visit or a milestone celebration.' },
      ],
    },
    ar: {
      title: 'السفر والتجارب',
      summary: 'تجارب سفر مصممة خصيصاً للأفراد والعائلات والمسؤولين التنفيذيين والعملاء الخاصين.',
      description:
        'نصمم السفر حول المسافر نفسه؛ ترفيهياً أو مؤسسياً أو لمناسبة خاصة، معتمدين على معرفة الوجهات والعلاقات المحلية الموثوقة لتقديم رحلات تبدو شخصية من أول محادثة إلى آخر لحظة.',
      capabilities: [
        { title: 'تخطيط سفر مخصص', description: 'نقطة تنسيق واحدة لكامل الرحلة، مبنية حول جدولكم وأولوياتكم لا باقة جاهزة.' },
        { title: 'مسارات رحلات شخصية', description: 'خطة يومية تُرتّب الإقامة والنقل والمطاعم والأنشطة في جدول واحد مترابط وسهل المتابعة.' },
        { title: 'الطيران والإقامة', description: 'حجز وتنسيق للطيران والإقامة بما يتوافق مع المسار، ويُعدَّل كلما تغيّرت الخطط.' },
        { title: 'النقل', description: 'تنظيم الانتقال من وإلى المطار والسائقين الخاصين والتنقل بين المدن بحيث يسير كل موعد في وقته.' },
        { title: 'المطاعم والتجارب', description: 'حجوزات وتوصيات تناسب المناسبة، من عشاء عائلي هادئ إلى عناوين مميزة.' },
        { title: 'الأنشطة والفعاليات', description: 'جولات وأنشطة وتذاكر فعاليات تُنسَّق ضمن باقي المسار لا بمعزل عنه.' },
        { title: 'دعم التأشيرات والسفر', description: 'إرشاد بشأن متطلبات التأشيرة والدخول، مع تنسيق المستندات لإبقاء الرحلة في موعدها.' },
        { title: 'خدمات كبار الشخصيات والكونسيرج', description: 'دعم جاهز لأي طلب يظهر قبل الرحلة أو خلالها، يُدار بسرّية.' },
        { title: 'المساعدة خلال الرحلة', description: 'جهة تواصل أثناء السفر لحل أي تغيير أو طارئ دون تعطيل الخطة.' },
        { title: 'سفر ترفيهي ومؤسسي ولمناسبات خاصة', description: 'المستوى نفسه من العناية سواء كانت الرحلة عائلية أو زيارة عمل أو احتفالاً بمناسبة.' },
      ],
    },
  },
  {
    slug: 'corporate-travel-events',
    number: '02',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=1800&q=80',
    imageAlt: {
      en: 'Modern conference hall set up for a corporate event',
      ar: 'قاعة مؤتمرات حديثة مُجهّزة لفعالية مؤسسية',
    },
    en: {
      title: 'Corporate Travel & Events',
      summary: 'Integrated travel and event solutions for companies and organizations.',
      description:
        'From a single executive trip to a multi-market delegation, we manage corporate travel and events as one coordinated program — reliable, discreet, and built around the organization’s priorities.',
      capabilities: [
        { title: 'Corporate Travel Management', description: "Ongoing coordination of a company's travel needs, so every trip follows the same standard without starting from scratch." },
        { title: 'Executive Travel', description: 'Travel arrangements for senior leadership that account for tight schedules, privacy and last-minute changes.' },
        { title: 'Business Trips', description: 'End-to-end coordination of individual trips — flights, stays and ground transport — aligned to the purpose of the visit.' },
        { title: 'Delegations & Business Visits', description: 'Movement, accommodation and schedules coordinated across a group traveling together for meetings or official visits.' },
        { title: 'MICE', description: 'Coordination for meetings, incentives, conferences and exhibitions, from delegate travel to on-site logistics.' },
        { title: 'Conferences & Events', description: 'Planning support for the logistics around a conference or event, including venues, delegate movement and scheduling.' },
        { title: 'Corporate Retreats', description: 'A distinctive setting paired with structured sessions, group activities and the logistics to support both.' },
        { title: 'Corporate Experiences', description: 'Curated experiences layered into a business trip or event, suited to the group and the occasion.' },
        { title: 'VIP Services', description: 'Discreet, elevated handling for senior guests or delegates who require closer attention.' },
        { title: 'Group Travel, Accommodation & Transportation', description: 'Coordinated booking and movement for groups of any size, kept consistent from arrival to departure.' },
      ],
    },
    ar: {
      title: 'السفر المؤسسي والفعاليات',
      summary: 'حلول سفر وفعاليات متكاملة للشركات والمؤسسات.',
      description:
        'من رحلة تنفيذية واحدة إلى بعثة في أسواق متعددة، نُدير السفر المؤسسي والفعاليات كبرنامج واحد منسّق؛ موثوق وسرّي ومبني حول أولويات المؤسسة.',
      capabilities: [
        { title: 'إدارة السفر المؤسسي', description: 'تنسيق مستمر لاحتياجات سفر الشركة، بحيث تسير كل رحلة بالمعيار نفسه دون البدء من الصفر في كل مرة.' },
        { title: 'سفر المسؤولين التنفيذيين', description: 'ترتيبات سفر تراعي ضيق الجدول والخصوصية واحتمال التغييرات في آخر لحظة.' },
        { title: 'رحلات العمل', description: 'تنسيق كامل للرحلة؛ الطيران والإقامة والنقل البري، بما يتوافق مع غرض الزيارة.' },
        { title: 'البعثات والزيارات التجارية', description: 'تنسيق التنقل والإقامة والجداول لمجموعة تسافر معاً لاجتماعات أو زيارات رسمية.' },
        { title: 'فعاليات واجتماعات ومؤتمرات (MICE)', description: 'تنسيق الاجتماعات والحوافز والمؤتمرات والمعارض، من سفر المندوبين إلى لوجستيات الموقع.' },
        { title: 'المؤتمرات والفعاليات', description: 'دعم تخطيطي للوجستيات المؤتمر أو الفعالية، من المكان إلى تنقل المندوبين والجدولة.' },
        { title: 'الرحلات التنشيطية المؤسسية', description: 'وجهة متميزة مقترنة بجلسات منظمة وأنشطة جماعية، مع اللوجستيات الداعمة لكليهما.' },
        { title: 'التجارب المؤسسية', description: 'تجارب مختارة تُضاف إلى رحلة عمل أو فعالية، بما يناسب المجموعة والمناسبة.' },
        { title: 'خدمات كبار الشخصيات', description: 'تعامل سرّي ومرتقى لكبار الضيوف أو المندوبين الذين يحتاجون عناية أقرب.' },
        { title: 'سفر المجموعات والإقامة والنقل', description: 'حجز وتنقل منسّق لمجموعات من أي حجم، بانتظام من الوصول حتى المغادرة.' },
      ],
    },
  },
  {
    slug: 'tourism-investment-advisory',
    number: '03',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1800&q=80',
    imageAlt: {
      en: 'Contemporary architecture against a clear sky',
      ar: 'عمارة معاصرة تحت سماء صافية',
    },
    en: {
      title: 'Tourism Investment & Advisory',
      summary: 'Helping investors and organizations explore tourism opportunities and destination-related investments.',
      description:
        'We help investors and organizations understand tourism opportunities — market context, destination dynamics, and the right people to meet — while referring specialized, regulated advice to qualified professionals.',
      capabilities: [
        { title: 'Tourism Opportunity Identification', description: 'Surfacing tourism-related opportunities worth a closer look, based on destination context rather than speculation.' },
        { title: 'Market & Destination Research', description: "Research into a destination's tourism market — context, dynamics and relevant conditions — to inform early decisions." },
        { title: 'Sector and Competition Analysis', description: "A view of the existing tourism offering in a destination, to understand where an opportunity sits relative to others." },
        { title: 'Demand and Seasonality Analysis', description: 'Research into demand patterns and seasonality to help set realistic expectations before committing further.' },
        { title: 'Site Visits', description: 'Coordinated visits to relevant sites and locations, arranged alongside the right local contacts.' },
        { title: 'Developer & Partner Meetings', description: 'Introductions and coordinated meetings with developers and partners relevant to the opportunity.' },
        { title: 'Local Partner Access', description: 'Access to on-the-ground relationships that can be difficult to establish independently.' },
        { title: 'Investment Support', description: 'Coordination support through the early stages of exploring a tourism-related investment.' },
        { title: 'Professional Advisor Connections', description: 'Introductions to qualified legal, financial, technical and valuation professionals when specialized advice is required.' },
      ],
    },
    ar: {
      title: 'الاستثمار السياحي والاستشارات',
      summary: 'مساعدة المستثمرين والمؤسسات على استكشاف الفرص السياحية والاستثمارات المرتبطة بالوجهات.',
      description:
        'نساعد المستثمرين والمؤسسات على فهم الفرص السياحية؛ سياق السوق وديناميكيات الوجهة والأطراف المناسبة للقاء، مع إحالة الاستشارات المتخصصة والخاضعة للتنظيم إلى مختصين مؤهلين.',
      capabilities: [
        { title: 'تحديد الفرص السياحية', description: 'إبراز فرص سياحية تستحق النظر، بالاستناد إلى سياق الوجهة لا إلى التخمين.' },
        { title: 'أبحاث السوق والوجهات', description: 'بحث في سوق السياحة بالوجهة؛ سياقها وديناميكياتها وظروفها ذات الصلة، لإثراء القرارات المبكرة.' },
        { title: 'تحليل القطاع والمنافسة', description: 'نظرة على العرض السياحي القائم في الوجهة، لفهم موقع الفرصة مقارنة بغيرها.' },
        { title: 'تحليل الطلب والموسمية', description: 'بحث في أنماط الطلب والموسمية للمساعدة على ضبط التوقعات قبل أي التزام إضافي.' },
        { title: 'الزيارات الميدانية', description: 'زيارات منسّقة للمواقع ذات الصلة، تُرتَّب إلى جانب جهات الاتصال المحلية المناسبة.' },
        { title: 'لقاءات مع المطورين والشركاء', description: 'تعريف ولقاءات منسّقة مع مطورين وشركاء ذوي صلة بالفرصة.' },
        { title: 'الوصول إلى شركاء محليين', description: 'وصول إلى علاقات ميدانية قد يصعب بناؤها بشكل مستقل.' },
        { title: 'دعم الاستثمار', description: 'دعم تنسيقي خلال المراحل الأولى من استكشاف استثمار مرتبط بالسياحة.' },
        { title: 'التواصل مع مستشارين مهنيين', description: 'تعريف بمختصين قانونيين وماليين وتقنيين وتقييميين مؤهلين عند الحاجة إلى استشارة متخصصة.' },
      ],
    },
  },
]

export function getService(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug)
}
