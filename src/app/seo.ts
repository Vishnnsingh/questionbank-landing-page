export const SITE_URL = 'https://honhaar.in';
export const SITE_NAME = 'Honhaar';
export const SUPPORT_EMAIL = 'support@honhaar.in';
export const SUPPORT_PHONE = '8084048167';
export const PRODUCT_IMAGE_URL = `${SITE_URL}/images/og-homepage.jpg`;

export const products = [
  {
    name: 'Class 10 Question Bank',
    description:
      'One-year access to CBSE and Bihar Board Class 10 previous year questions, objective practice, mock tests, analytics, and chapter-wise preparation.',
    price: 199,
    currency: 'INR',
    duration: 'One Year',
  },
  {
    name: 'Class 12 Question Bank',
    description:
      'One-year access to CBSE and Bihar Board Class 12 previous year questions, stream-wise practice, mock tests, analytics, and board exam preparation.',
    price: 249,
    currency: 'INR',
    duration: 'One Year',
  },
];

export const pageMeta = {
  home: {
    title: 'Honhaar - CBSE & Bihar Board Question Bank App | Class 10 & 12',
    description:
      'Honhaar par CBSE aur Bihar Board ke 20,000+ previous year questions practice karo. Class 10 aur 12 ke liye Objective, Subjective, Short aur Long Answer questions.',
    path: '/',
  },
  about: {
    title: 'About Honhaar | India Board Exam Preparation App',
    description:
      'Honhaar features explained: 10 years question bank, AI exam prediction, repeated questions, mock tests, topic insights, tracking, syllabus coverage, and career assistant.',
    path: '/about',
  },
  contact: {
    title: 'Contact Us | Honhaar',
    description:
      'Contact Honhaar for app support, payments, refunds, account help, and CBSE or Bihar Board question bank assistance.',
    path: '/contact-us',
  },
  support: {
    title: 'Support | Honhaar',
    description:
      'Get support for Honhaar app access, payments, refunds, question bank plans, and account issues.',
    path: '/support',
  },
  terms: {
    title: 'Terms & Conditions | Honhaar',
    description:
      'Read the terms and conditions for using Honhaar products, services, study material, mock tests, and subscriptions.',
    path: '/terms-and-conditions',
  },
  refunds: {
    title: 'Refunds & Cancellations | Honhaar',
    description:
      'Read the refund and cancellation policy for Honhaar Class 10 and Class 12 question bank plans priced in INR.',
    path: '/refunds-and-cancellations',
  },
  privacy: {
    title: 'Privacy Policy | Honhaar',
    description:
      'Learn how Honhaar handles student account data, support requests, payment records, and app usage information.',
    path: '/privacy-policy',
  },
  cbseQuestionBank: {
    title: 'CBSE Question Bank 2025-26 | Class 10 & 12 Previous Year Questions | Honhaar',
    description:
      'CBSE question bank mein 20,000+ previous year questions, MCQ, subjective, short aur long answer questions. Class 10 aur 12 ke liye Honhaar question practice.',
    path: '/cbse-question-bank',
  },
  biharBoardQuestionBank: {
    title: 'Bihar Board Question Bank 2025-26 | BSEB Class 10 & 12 Questions | Honhaar',
    description:
      'Bihar Board BSEB question bank mein 20,000+ previous year questions. Class 10 aur 12 ke Objective, Subjective, Short aur Long Answer questions.',
    path: '/bihar-board-question-bank',
  },
  class10QuestionBank: {
    title: 'Class 10 Question Bank 2025-26 | CBSE & Bihar Board | Honhaar',
    description:
      'Class 10 question bank mein CBSE aur Bihar Board ke 20,000+ previous year questions. Mathematics, Science, Social Science, Hindi, English practice.',
    path: '/class-10-question-bank',
  },
  class12QuestionBank: {
    title: 'Class 12 Question Bank 2025-26 | CBSE & Bihar Board | Honhaar',
    description:
      'Class 12 question bank mein CBSE aur Bihar Board ke previous year questions. Physics, Chemistry, Biology, Maths, Accountancy, Economics, History practice.',
    path: '/class-12-question-bank',
  },
  blogBiharClass12Questions: {
    title: 'Bihar Board Class 12 Previous Year Questions 2026 | Honhaar Blog',
    description:
      'Bihar Board Class 12 Inter previous year questions, BSEB exam pattern, important subjects, and 2026 preparation strategy.',
    path: '/blog/bihar-board-class-12-previous-year-questions',
  },
  blogCbseClass10RepeatedQuestions: {
    title: 'CBSE Class 10 Most Repeated Questions | Honhaar Blog',
    description:
      'CBSE Class 10 board exam ke most repeated questions, important chapters, and subject-wise board preparation guide.',
    path: '/blog/cbse-class-10-most-repeated-questions',
  },
};

export function absoluteUrl(path: string) {
  return `${SITE_URL}${path === '/' ? '' : path}`;
}

export function buildHomeJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: SITE_NAME,
        url: SITE_URL,
        email: SUPPORT_EMAIL,
        telephone: SUPPORT_PHONE,
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Patna',
          addressRegion: 'Bihar',
          addressCountry: 'IN',
        },
        areaServed: [
          { '@type': 'State', name: 'Bihar' },
          { '@type': 'Country', name: 'India' },
        ],
        sameAs: [],
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        name: SITE_NAME,
        url: SITE_URL,
        publisher: { '@id': `${SITE_URL}/#organization` },
        inLanguage: ['en-IN', 'hi-IN'],
      },
      {
        '@type': 'MobileApplication',
        '@id': `${SITE_URL}/#app`,
        name: SITE_NAME,
        operatingSystem: 'Android',
        applicationCategory: 'EducationalApplication',
        url: SITE_URL,
        description: pageMeta.home.description,
        offers: products.map((product) => ({
          '@type': 'Offer',
          name: product.name,
          price: product.price,
          priceCurrency: product.currency,
          availability: 'https://schema.org/InStock',
          category: 'Education',
        })),
        publisher: { '@id': `${SITE_URL}/#organization` },
      },
      ...products.map((product) => ({
        '@type': 'Product',
        name: product.name,
        description: product.description,
        image: PRODUCT_IMAGE_URL,
        brand: {
          '@type': 'Brand',
          name: SITE_NAME,
        },
        category: 'Bihar Board exam preparation app',
        areaServed: 'IN',
        offers: {
          '@type': 'Offer',
          name: product.name,
          price: product.price,
          priceCurrency: product.currency,
          availability: 'https://schema.org/InStock',
          itemCondition: 'https://schema.org/NewCondition',
          url: absoluteUrl('/#pricing'),
        },
      })),
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
        name: 'What products does Honhaar offer?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Honhaar offers Class 10 and Class 12 one-year question bank plans for CBSE and Bihar Board students with previous year questions, mock tests, repeated question insights, analytics, and syllabus coverage.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is the pricing of Honhaar?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Honhaar Class 10 question bank access is priced at INR 199 for one year, and Class 12 question bank access is priced at INR 249 for one year.',
            },
          },
          {
            '@type': 'Question',
        name: 'Is Honhaar useful for CBSE and Bihar Board Class 10 and Class 12 exams?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. Honhaar is built for CBSE and Bihar Board Class 10 and Class 12 exam preparation with previous year questions, chapter-wise practice, mock tests, and performance tracking.',
            },
          },
        ],
      },
    ],
  };
}
