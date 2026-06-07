export const SITE_URL = 'https://biharboardsmartprep.com';
export const SITE_NAME = 'Bihar Board Smart Prep';
export const SUPPORT_EMAIL = 'support@honhaar.in';
export const SUPPORT_PHONE = '8084048167';

export const products = [
  {
    name: 'Class 10th Bihar Board Question Bank',
    description:
      'One-year access to 10 years question bank, AI exam prediction, mock tests, analytics, chapter-wise practice, repeated questions, and doubt support for Bihar Board Class 10 students.',
    price: 199,
    currency: 'INR',
    duration: 'One Year',
  },
  {
    name: 'Class 12th Bihar Board Question Bank',
    description:
      'One-year access to 10 years question bank, AI exam prediction, mock tests, analytics, chapter-wise practice, repeated questions, doubt support, career guidance, and college information for Bihar Board Class 12 students.',
    price: 249,
    currency: 'INR',
    duration: 'One Year',
  },
];

export const pageMeta = {
  home: {
    title: 'Bihar Board Smart Prep | Class 10 & 12 Question Bank App',
    description:
      'Prepare for Bihar Board Class 10 and Class 12 exams with 10 years question bank, AI exam prediction, mock tests, analytics, and affordable INR pricing.',
    path: '/',
  },
  about: {
    title: 'About Us | Bihar Board Smart Prep',
    description:
      'Learn about Bihar Board Smart Prep, a focused exam preparation app for Bihar Board Class 10 and Class 12 students.',
    path: '/about',
  },
  contact: {
    title: 'Contact Us | Bihar Board Smart Prep',
    description:
      'Contact Bihar Board Smart Prep for app support, payments, refunds, account help, and Bihar Board question bank assistance.',
    path: '/contact-us',
  },
  support: {
    title: 'Support | Bihar Board Smart Prep',
    description:
      'Get support for Bihar Board Smart Prep app access, payments, refunds, question bank plans, and account issues.',
    path: '/support',
  },
  terms: {
    title: 'Terms & Conditions | Bihar Board Smart Prep',
    description:
      'Read the terms and conditions for using Bihar Board Smart Prep products, services, study material, mock tests, and subscriptions.',
    path: '/terms-and-conditions',
  },
  refunds: {
    title: 'Refunds & Cancellations | Bihar Board Smart Prep',
    description:
      'Read the refund and cancellation policy for Bihar Board Smart Prep Class 10 and Class 12 question bank plans priced in INR.',
    path: '/refunds-and-cancellations',
  },
  privacy: {
    title: 'Privacy Policy | Bihar Board Smart Prep',
    description:
      'Learn how Bihar Board Smart Prep handles student account data, support requests, payment records, and app usage information.',
    path: '/privacy-policy',
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
        brand: { '@id': `${SITE_URL}/#organization` },
        category: 'Bihar Board exam preparation app',
        areaServed: 'IN',
        offers: {
          '@type': 'Offer',
          price: product.price,
          priceCurrency: product.currency,
          availability: 'https://schema.org/InStock',
          url: absoluteUrl('/#pricing'),
        },
      })),
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What products does Bihar Board Smart Prep offer?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Bihar Board Smart Prep offers Class 10th and Class 12th one-year question bank plans with mock tests, AI exam prediction, repeated question insights, analytics, and syllabus coverage.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is the pricing of Bihar Board Smart Prep?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The Class 10th plan is priced at INR 199 for one year and the Class 12th plan is priced at INR 249 for one year.',
            },
          },
          {
            '@type': 'Question',
            name: 'Is Bihar Board Smart Prep useful for Bihar Board Class 10 and Class 12 exams?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. The app is built for Bihar Board Class 10 and Class 12 exam preparation with previous year questions, chapter-wise practice, mock tests, and performance tracking.',
            },
          },
        ],
      },
    ],
  };
}
