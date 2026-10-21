export interface InsightCopy {
  title: string
  category: string
  summary: string
  body: string[]
}

export interface Insight {
  slug: string
  date: string
  image: string
  imageAlt: { en: string; ar: string }
  en: InsightCopy
  ar: InsightCopy
}

export const insights: Insight[] = [
  {
    slug: 'future-of-luxury-travel',
    date: '2026',
    image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=1800&q=80',
    imageAlt: { en: 'Luxury yacht moving across calm water', ar: 'يخت فاخر يتحرك عبر مياه هادئة' },
    en: {
      title: 'The Future of Luxury Travel',
      category: 'Travel & Experiences',
      summary: 'Luxury travel is shifting from possessions to experiences — what that means for how journeys are designed.',
      body: [
        'Luxury in travel has quietly moved away from visible excess and toward depth: time, access and a sense of being truly known by the people arranging the journey.',
        'For travelers, this shows up as fewer, more considered stops; for the companies designing those journeys, it demands destination knowledge that goes well beyond a brochure — the seasonal rhythm of a desert resort, the protocols of a private island estate, the quiet etiquette of a heritage hotel.',
        'The common thread across the journeys we see resonate most is restraint — a program with room to breathe, built around what matters to the traveler rather than what fills an itinerary.',
      ],
    },
    ar: {
      title: 'مستقبل السفر الفاخر',
      category: 'السفر والتجارب',
      summary: 'يتحول السفر الفاخر من الامتلاك إلى التجربة؛ وما يعنيه ذلك لطريقة تصميم الرحلات.',
      body: [
        'تحوّل مفهوم الفخامة في السفر بهدوء من الإظهار الملموس إلى العمق؛ الوقت والوصول والشعور بأن من يرتّب الرحلة يعرف المسافر فعلاً.',
        'يظهر ذلك لدى المسافرين في محطات أقل وأكثر تدبراً؛ وبالنسبة للشركات التي تصمم هذه الرحلات، يتطلب الأمر معرفة بالوجهات تتجاوز بكثير أي كتيّب سياحي؛ إيقاع المواسم في منتجع صحراوي، بروتوكولات جزيرة خاصة، أو آداب فندق تراثي هادئ.',
        'القاسم المشترك في الرحلات الأكثر تأثيراً هو التمهّل؛ برنامج يتيح مساحة للتنفّس، مبني حول ما يهم المسافر لا حول حشو المسار بالمحطات.',
      ],
    },
  },
  {
    slug: 'emerging-tourism-destinations',
    date: '2026',
    image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1800&q=80',
    imageAlt: { en: 'Scenic mountain landscape at golden hour', ar: 'منظر جبلي خلاب عند الغروب' },
    en: {
      title: 'Emerging Tourism Destinations',
      category: 'Tourism Investment & Advisory',
      summary: 'A look at how new destinations earn their place on the global travel map.',
      body: [
        'Emerging destinations rarely arrive fully formed — whether a coastal heritage town, a desert resort region or a mountain eco-tourism corridor, they build credibility gradually, through infrastructure, access and a growing base of partners willing to vouch for them.',
        'For investors and developers, the opportunity usually sits earlier than it looks comfortable: before the destination is widely known, while access and local relationships still require real groundwork.',
        'Understanding seasonality, competition and demand patterns early is what separates a well-timed opportunity from a speculative one.',
      ],
    },
    ar: {
      title: 'وجهات سياحية ناشئة',
      category: 'الاستثمار السياحي والاستشارات',
      summary: 'نظرة على كيفية اكتساب الوجهات الجديدة مكانتها على خريطة السفر العالمية.',
      body: [
        'نادراً ما تظهر الوجهات الناشئة متكاملة منذ البداية؛ سواء كانت بلدة ساحلية تراثية أو منطقة منتجعات صحراوية أو ممراً سياحياً جبلياً بيئياً، فإنها تبني مصداقيتها تدريجياً من خلال البنية التحتية والوصول وقاعدة متنامية من الشركاء المستعدين للتعريف بها.',
        'بالنسبة للمستثمرين والمطورين، غالباً ما تكون الفرصة الحقيقية في وقت أبكر مما يبدو مريحاً؛ قبل أن تصبح الوجهة معروفة على نطاق واسع، حين لا يزال الوصول والعلاقات المحلية بحاجة إلى عمل حقيقي على الأرض.',
        'فهم الموسمية والمنافسة وأنماط الطلب في وقت مبكر هو ما يميّز الفرصة المحسوبة التوقيت عن الفرصة التخمينية.',
      ],
    },
  },
  {
    slug: 'designing-meaningful-travel-experiences',
    date: '2026',
    image: 'https://images.unsplash.com/photo-1476900543704-4312b78632f8?w=1800&q=80',
    imageAlt: { en: 'Traveler overlooking a scenic coastal view', ar: 'مسافر يتأمل منظراً ساحلياً خلاباً' },
    en: {
      title: 'Designing Meaningful Travel Experiences',
      category: 'Travel & Experiences',
      summary: 'What separates a memorable itinerary from a merely efficient one.',
      body: [
        'An efficient itinerary gets a traveler from one point to the next without friction. A meaningful one gives them a reason to remember the journey at all.',
        'That difference usually comes down to a handful of carefully placed moments — a meal, a meeting, a view — chosen deliberately rather than filled in by default.',
        'Designing for meaning takes more time upfront, but it is what turns a well-organized trip into one worth retelling.',
      ],
    },
    ar: {
      title: 'تصميم تجارب سفر ذات معنى',
      category: 'السفر والتجارب',
      summary: 'ما الذي يميّز مساراً لا يُنسى عن مسار منظّم فقط.',
      body: [
        'يأخذ المسار المنظّم المسافر من نقطة إلى أخرى دون عقبات. أما المسار ذو المعنى، فيمنحه سبباً ليتذكر الرحلة أصلاً.',
        'يعود هذا الفرق غالباً إلى عدد قليل من اللحظات المختارة بعناية؛ وجبة، لقاء، منظر، تُنتقى عمداً لا لمجرد ملء الوقت.',
        'يتطلب التصميم من أجل المعنى وقتاً أكبر مسبقاً، لكنه ما يحوّل رحلة منظمة جيداً إلى رحلة تستحق أن تُروى.',
      ],
    },
  },
  {
    slug: 'corporate-travel-trends',
    date: '2026',
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1800&q=80',
    imageAlt: { en: 'Business traveler walking through an airport terminal', ar: 'مسافر أعمال يسير في صالة مطار' },
    en: {
      title: 'Corporate Travel Trends',
      category: 'Corporate Travel & Events',
      summary: 'How organizations are rethinking travel policy, duty of care and in-person connection.',
      body: [
        'Corporate travel has become more deliberate: fewer trips, but each one expected to justify itself through the relationships or outcomes it produces.',
        'Duty of care has moved from a compliance checkbox to a genuine expectation — organizations want to know their people are accounted for, not just insured.',
        'At the same time, in-person gathering — conferences, retreats, delegations — is being treated as a strategic tool again, not a discretionary expense.',
      ],
    },
    ar: {
      title: 'توجهات السفر المؤسسي',
      category: 'السفر المؤسسي والفعاليات',
      summary: 'كيف تعيد المؤسسات التفكير في سياسات السفر وواجب الرعاية والتواصل المباشر.',
      body: [
        'أصبح السفر المؤسسي أكثر تدبراً؛ رحلات أقل، لكن يُتوقع من كل رحلة أن تبرر نفسها من خلال العلاقات أو النتائج التي تحققها.',
        'تحوّل واجب الرعاية من بند امتثال إلى توقع حقيقي؛ تريد المؤسسات أن تعرف أن موظفيها مُتابَعون فعلاً، لا مجرد مؤمَّن عليهم.',
        'في الوقت نفسه، يُعاد التعامل مع اللقاءات المباشرة؛ المؤتمرات والرحلات التنشيطية والبعثات، كأداة استراتيجية، لا كنفقة اختيارية.',
      ],
    },
  },
  {
    slug: 'tourism-investment-opportunities',
    date: '2026',
    image: 'https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=1800&q=80',
    imageAlt: { en: 'Modern architectural facade in soft light', ar: 'واجهة معمارية حديثة في إضاءة ناعمة' },
    en: {
      title: 'Tourism Investment Opportunities',
      category: 'Tourism Investment & Advisory',
      summary: 'What disciplined opportunity identification looks like in tourism-related investment.',
      body: [
        'Tourism investment opportunities rarely announce themselves — they surface through a combination of market research, site visits and relationships with the people who know a destination best.',
        'Disciplined identification means separating genuine demand signals from short-term enthusiasm, and understanding seasonality before committing to a position.',
        'Where specialized legal, financial or valuation judgment is required, that work belongs with licensed professionals — our role is to help identify the opportunity and make the right introductions.',
      ],
    },
    ar: {
      title: 'فرص الاستثمار السياحي',
      category: 'الاستثمار السياحي والاستشارات',
      summary: 'كيف يبدو تحديد الفرص بشكل منضبط في الاستثمارات المرتبطة بالسياحة.',
      body: [
        'نادراً ما تُعلن فرص الاستثمار السياحي عن نفسها؛ بل تظهر من خلال مزيج من أبحاث السوق والزيارات الميدانية والعلاقات مع من يعرفون الوجهة معرفة حقيقية.',
        'يعني التحديد المنضبط التمييز بين إشارات الطلب الحقيقية والحماس قصير الأمد، وفهم الموسمية قبل الالتزام بأي موقف.',
        'وحين تتطلب الحاجة حكماً قانونياً أو مالياً أو تقييمياً متخصصاً، فإن هذا العمل يبقى من مسؤولية مختصين مرخّصين؛ ودورنا هو المساعدة في تحديد الفرصة وتقديم التعريف المناسب بين الأطراف.',
      ],
    },
  },
  {
    slug: 'evolution-of-destination-development',
    date: '2026',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1800&q=80',
    imageAlt: { en: 'City skyline under development at dusk', ar: 'أفق مدينة قيد التطوير عند الغسق' },
    en: {
      title: 'The Evolution of Destination Development',
      category: 'Tourism Investment & Advisory',
      summary: 'How destination development has shifted from single projects to integrated, long-term thinking.',
      body: [
        'Destination development used to be measured project by project — a resort here, a waterfront business district there, an eco-lodge further along the coast. Increasingly, it is measured by how well those pieces work together.',
        'Developers and authorities are thinking further ahead: transportation, environmental impact, and the long-term identity of a place, not just its opening-day appeal.',
        'For organizations entering this space, the advantage goes to those who coordinate early with the right local partners and authorities — not those who move fastest alone.',
      ],
    },
    ar: {
      title: 'تطوّر تطوير الوجهات السياحية',
      category: 'الاستثمار السياحي والاستشارات',
      summary: 'كيف تحوّل تطوير الوجهات من مشاريع منفردة إلى تفكير متكامل وطويل الأمد.',
      body: [
        'كان تطوير الوجهات يُقاس في الماضي مشروعاً بمشروع؛ منتجع هنا، حي أعمال على الواجهة البحرية هناك، ونُزل بيئي أبعد على الساحل. وبشكل متزايد، أصبح يُقاس بمدى تكامل هذه العناصر معاً.',
        'يفكر المطورون والهيئات الآن بمدى أبعد؛ النقل والأثر البيئي وهوية المكان على المدى الطويل، لا مجرد جاذبيته في يوم الافتتاح.',
        'بالنسبة للمؤسسات الداخلة إلى هذا المجال، تكون الأفضلية لمن ينسّق مبكراً مع الشركاء المحليين والهيئات المناسبة، لا لمن يتحرك بسرعة أكبر بمفرده.',
      ],
    },
  },
]

export function getInsight(slug: string): Insight | undefined {
  return insights.find((insight) => insight.slug === slug)
}
