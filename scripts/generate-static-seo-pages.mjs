import { mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';

const siteUrl = 'https://honhaar.in';
const outDir = 'public';
const today = '2026-06-07';

const boards = {
  cbse: {
    label: 'CBSE',
    full: 'Central Board of Secondary Education',
    slug: 'cbse',
    questionCount: '5,000+',
    focus: 'NCERT pattern, competency questions, case-based questions, MCQ, short answer, and long answer practice',
  },
  'bihar-board': {
    label: 'Bihar Board',
    full: 'Bihar School Examination Board',
    slug: 'bihar-board',
    questionCount: '5,000+',
    focus: 'BSEB objective questions, subjective answer writing, Hindi-medium support, and Matric/Inter exam pattern',
  },
};

const subjects = {
  'class-10': [
    { slug: 'mathematics', name: 'Mathematics', topics: ['Triangles', 'Surface Areas and Volumes', 'Statistics', 'Probability', 'Quadratic Equations'] },
    { slug: 'science', name: 'Science', topics: ['Electricity', 'Light', 'Life Processes', 'Chemical Reactions', 'Heredity'] },
    { slug: 'social-science', name: 'Social Science', topics: ['Nationalism in India', 'Resources', 'Power Sharing', 'Agriculture', 'Money and Credit'] },
    { slug: 'english', name: 'English', topics: ['Reading comprehension', 'Grammar', 'Writing skills', 'Literature', 'Poetry'] },
    { slug: 'hindi', name: 'Hindi', topics: ['Vyakaran', 'Gadya', 'Padya', 'Lekhan', 'Pathya pustak questions'] },
  ],
  'class-12': [
    { slug: 'physics', name: 'Physics', topics: ['Current Electricity', 'Ray Optics', 'Wave Optics', 'Atoms and Nuclei', 'Semiconductors'] },
    { slug: 'chemistry', name: 'Chemistry', topics: ['Solutions', 'Electrochemistry', 'Coordination Compounds', 'Aldehydes and Ketones', 'Amines'] },
    { slug: 'biology', name: 'Biology', topics: ['Reproduction', 'Genetics', 'Biotechnology', 'Ecology', 'Human Welfare'] },
    { slug: 'mathematics', name: 'Mathematics', topics: ['Matrices', 'Determinants', 'Calculus', 'Vectors', 'Probability'] },
    { slug: 'accountancy', name: 'Accountancy', topics: ['Partnership Accounts', 'Company Accounts', 'Cash Flow', 'Financial Statements', 'Journal Entries'] },
    { slug: 'economics', name: 'Economics', topics: ['National Income', 'Money and Banking', 'Government Budget', 'Demand and Supply', 'Development'] },
    { slug: 'history', name: 'History', topics: ['Harappan Civilization', 'Buddhism', 'Mughal Empire', 'Colonial India', 'Partition'] },
    { slug: 'geography', name: 'Geography', topics: ['Population', 'Resources', 'Agriculture', 'Map work', 'Human development'] },
    { slug: 'political-science', name: 'Political Science', topics: ['Cold War', 'Indian Democracy', 'Regional Politics', 'Constitution', 'Globalization'] },
  ],
};

const sampleQuestions = {
  mathematics: [
    'Solve a quadratic equation using factorisation and explain each step.',
    'Find the probability of getting an even number when a dice is thrown once.',
    'Prove that two triangles are similar using the given side ratios.',
  ],
  science: [
    'Define electric current and write the SI unit.',
    'Explain the process of photosynthesis with a labelled diagram.',
    'Write two differences between acids and bases with examples.',
  ],
  'social-science': [
    'Explain the causes of the Non-Cooperation Movement.',
    'Write the importance of resource planning in India.',
    'What is power sharing and why is it important in democracy?',
  ],
  english: [
    'Write a letter to the principal requesting leave for three days.',
    'Read the passage and answer the inference-based questions.',
    'Explain the central idea of the poem in your own words.',
  ],
  hindi: [
    'Nimnalikhit gadyaansh ko padhkar prashno ke uttar likhiye.',
    'Vyakaran ke niyamon ke anusaar vaakya sudhar kijiye.',
    'Pathya pustak ke aadhar par sankshipt uttar likhiye.',
  ],
  physics: [
    'State Ohm law and derive the relation between current, voltage, and resistance.',
    'Draw a ray diagram for image formation by a convex lens.',
    'Explain the working of a semiconductor diode.',
  ],
  chemistry: [
    'Define molarity and solve a numerical based on solution concentration.',
    'Write the IUPAC name of the given coordination compound.',
    'Explain Aldol condensation with one example.',
  ],
  biology: [
    'Explain Mendel law of segregation with an example.',
    'Draw and label the structure of a flower.',
    'Write short notes on PCR and gel electrophoresis.',
  ],
  accountancy: [
    'Prepare journal entries for admission of a new partner.',
    'Explain the treatment of goodwill in partnership accounts.',
    'Prepare a cash flow statement from the given balance sheet.',
  ],
  economics: [
    'Define national income and explain two methods of calculation.',
    'Draw and explain a demand curve.',
    'Write the difference between microeconomics and macroeconomics.',
  ],
  history: [
    'Explain the main features of Harappan urban planning.',
    'Write a short note on the role of Mahatma Gandhi in national movement.',
    'Discuss the causes and effects of Partition.',
  ],
  geography: [
    'Explain the factors affecting population distribution.',
    'Write the importance of map work in board examination.',
    'Describe major types of resources with examples.',
  ],
  'political-science': [
    'Explain the causes of the Cold War.',
    'Write the features of Indian federalism.',
    'Discuss the role of regional parties in Indian politics.',
  ],
};

const mainPages = [
  {
    path: '/cbse-question-bank',
    title: 'CBSE Question Bank 2025-26 | Class 10 & 12 Previous Year Questions | Honhaar',
    description: 'CBSE question bank mein 5,000+ previous year questions, MCQ, subjective, short aur long answer questions. Class 10 aur 12 ke liye Honhaar question practice.',
    h1: 'CBSE Question Bank 2025-26',
    intro: 'Honhaar par CBSE Class 10 aur Class 12 ke previous year questions chapter-wise practice karo. Objective, short answer, long answer, and case-based questions ek organized app experience me milte hain.',
    sections: [
      ['CBSE Class 10 Question Bank', 'Mathematics, Science, Social Science, Hindi, English aur language subjects ke chapter-wise previous year questions. Students repeated topics, NCERT pattern, and exam answer format ko practice kar sakte hain.'],
      ['CBSE Class 12 Question Bank', 'Physics, Chemistry, Biology, Mathematics, Accountancy, Economics, Business Studies aur major subjects ke question sets available hain. High weightage chapters and board-style questions par focus hai.'],
      ['Why Honhaar for CBSE', 'Honhaar generic notes se zyada question practice par focus karta hai. Students previous year questions, mock tests, repeated question insights, and performance tracking ke saath preparation improve karte hain.'],
    ],
  },
  {
    path: '/bihar-board-question-bank',
    title: 'Bihar Board Question Bank 2025-26 | BSEB Class 10 & 12 Previous Year Questions | Honhaar',
    description: 'Bihar Board BSEB question bank mein 5,000+ previous year questions. Class 10 aur 12 ke Objective, Subjective, Short aur Long Answer questions.',
    h1: 'Bihar Board Question Bank 2025-26',
    intro: 'Bihar Board students ke liye Honhaar me Matric aur Inter ke previous year questions, objective MCQ, subjective answers, Hindi support, and chapter-wise practice available hai.',
    sections: [
      ['BSEB Class 10 Matric', 'Vigyan, Ganit, Hindi, English, Samajik Vigyan, Sanskrit aur major subjects ke question bank sets available hain. Bihar Board me objective questions ka weightage strong hota hai, isliye MCQ practice daily important hai.'],
      ['BSEB Class 12 Inter', 'Science, Arts, Commerce streams ke Physics, Chemistry, Biology, Mathematics, History, Geography, Political Science, Economics, Accountancy aur Hindi subjects ke questions included hain.'],
      ['Bihar Board Strategy', 'Previous year questions repeat pattern samjhate hain. Objective practice, subjective answer writing, high weightage chapters, and timed mock tests BSEB preparation ke core steps hain.'],
    ],
  },
  {
    path: '/class-10-question-bank',
    title: 'Class 10 Question Bank 2025-26 | CBSE & Bihar Board 10th Previous Year Questions | Honhaar',
    description: 'Class 10 question bank mein CBSE aur Bihar Board ke previous year questions. Mathematics, Science, Social Science, Hindi, English practice.',
    h1: 'Class 10 Question Bank 2025-26',
    intro: 'Class 10 board exam ke liye Honhaar CBSE aur Bihar Board dono ke question banks ko chapter-wise organize karta hai. Students MCQ, short answer, long answer and repeated questions practice kar sakte hain.',
    sections: [
      ['Class 10 Important Subjects', 'Mathematics, Science, Social Science, Hindi, English and language subjects board score ke liye important hain. Honhaar in subjects ko chapter-wise and question-type wise organize karta hai.'],
      ['Class 10 Preparation Plan', 'Daily MCQ practice, weekly mock test, formula revision, diagram/map practice and writing practice se board exam confidence improve hota hai.'],
      ['Score Better in Class 10', '90 percent plus target ke liye repeated question patterns, high weightage chapters, answer presentation, and time management par focus karo.'],
    ],
  },
  {
    path: '/class-12-question-bank',
    title: 'Class 12 Question Bank 2025-26 | CBSE & Bihar Board 12th Previous Year Questions | Honhaar',
    description: 'Class 12 question bank mein CBSE aur Bihar Board ke previous year questions. Science, Commerce, Arts stream-wise board exam practice.',
    h1: 'Class 12 Question Bank 2025-26',
    intro: 'Class 12 Science, Commerce, and Arts students ke liye Honhaar stream-wise previous year questions, objective practice, and board exam strategy provide karta hai.',
    sections: [
      ['Science Stream', 'Physics, Chemistry, Biology, Mathematics ke numericals, derivations, diagrams, formulas and long answer questions practice karo.'],
      ['Commerce Stream', 'Accountancy, Economics, Business Studies ke journal entries, national income, case studies and theory questions practice karo.'],
      ['Arts Stream', 'History, Geography, Political Science, Economics and Hindi ke board-style answers and source-based questions practice karo.'],
    ],
  },
  {
    path: '/blog/bihar-board-class-12-previous-year-questions',
    title: 'Bihar Board Class 12 Previous Year Questions 2026 | BSEB Inter Question Bank',
    description: 'Bihar Board Class 12 Inter previous year questions, BSEB exam pattern, important subjects, and 2026 preparation strategy.',
    h1: 'Bihar Board Class 12 Previous Year Questions 2026',
    intro: 'BSEB Inter exam ke liye previous year questions sabse useful preparation resource hain. Ye exam pattern, question type, repeated chapters, and answer writing style samjhate hain.',
    sections: [
      ['Bihar Board Class 12 Exam Pattern', 'Objective questions and subjective questions dono important hote hain. Objective section score secure karta hai, while subjective answers presentation and clarity demand karte hain.'],
      ['Science, Arts, Commerce Focus', 'Physics, Chemistry, Biology, Mathematics, History, Geography, Political Science, Economics, Accountancy and Hindi ke important chapters ko previous year pattern se prioritize karo.'],
      ['Preparation Strategy', 'Syllabus mapping, daily objective practice, chapter-wise previous year questions, answer writing, and mock tests se 2026 board preparation strong hoti hai.'],
    ],
  },
  {
    path: '/blog/cbse-class-10-most-repeated-questions',
    title: 'CBSE Class 10 Most Repeated Questions | Board Exam 2026 Guide',
    description: 'CBSE Class 10 board exam ke most repeated questions, important chapters, and subject-wise board preparation guide.',
    h1: 'CBSE Class 10 Most Repeated Questions',
    intro: 'CBSE Class 10 me repeated question patterns ko samajhna revision ko smart banata hai. Honhaar important chapters and question types ko organized form me practice karwata hai.',
    sections: [
      ['Most Repeated Areas', 'Mathematics me Triangles, Surface Areas, Statistics; Science me Electricity, Light, Life Processes; Social Science me Nationalism, Resources, Power Sharing repeated areas hain.'],
      ['How to Practice', 'Questions ko sirf memorize mat karo. Concept, answer format, marking scheme, and timed writing practice par focus karo.'],
      ['Use Previous Year Questions', 'Previous year questions se expected difficulty, question style, and repeated topics ka clear idea milta hai.'],
    ],
  },
];

function titleCase(text) {
  return text.split('-').map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(' ');
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function pageTemplate(page, extra = {}) {
  const canonical = `${siteUrl}${page.path}`;
  const sections = page.sections.map(([heading, body]) => `
    <section class="panel">
      <h2>${escapeHtml(heading)}</h2>
      <p>${escapeHtml(body)}</p>
    </section>`).join('\n');

  const questions = (extra.questions || []).map((question, index) => `
      <li><strong>Q${index + 1}.</strong> ${escapeHtml(question)}</li>`).join('\n');

  const links = (extra.links || [
    ['/cbse-question-bank', 'CBSE Question Bank'],
    ['/bihar-board-question-bank', 'Bihar Board Question Bank'],
    ['/class-10-question-bank', 'Class 10 Question Bank'],
    ['/class-12-question-bank', 'Class 12 Question Bank'],
  ]).map(([href, label]) => `<a href="${href}">${escapeHtml(label)}</a>`).join('');

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        name: page.title,
        description: page.description,
        url: canonical,
        isPartOf: { '@id': `${siteUrl}/#website` },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
          { '@type': 'ListItem', position: 2, name: page.h1, item: canonical },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: `${page.h1} me kya milega?`,
            acceptedAnswer: { '@type': 'Answer', text: page.intro },
          },
          {
            '@type': 'Question',
            name: 'Honhaar ki pricing kya hai?',
            acceptedAnswer: { '@type': 'Answer', text: 'Honhaar question bank access INR 99 me available hai.' },
          },
        ],
      },
    ],
  };

  return `<!DOCTYPE html>
<html lang="en-IN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(page.title)}</title>
  <meta name="description" content="${escapeHtml(page.description)}" />
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
  <link rel="canonical" href="${canonical}" />
  <meta property="og:type" content="article" />
  <meta property="og:site_name" content="Honhaar" />
  <meta property="og:title" content="${escapeHtml(page.title)}" />
  <meta property="og:description" content="${escapeHtml(page.description)}" />
  <meta property="og:url" content="${canonical}" />
  <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>
  <style>
    *{box-sizing:border-box}body{margin:0;background:#f8fafc;color:#0f172a;font-family:Inter,Arial,sans-serif;line-height:1.65}.shell{max-width:1040px;margin:auto;padding:32px 18px 56px}.top{display:flex;justify-content:space-between;gap:16px;align-items:center;margin-bottom:32px}.brand{font-weight:800;color:#0f766e;text-decoration:none}.nav{display:flex;gap:12px;flex-wrap:wrap}.nav a,.links a{color:#0369a1;text-decoration:none;font-weight:600}.hero{padding:34px 0}.eyebrow{color:#0f766e;font-size:13px;font-weight:800;text-transform:uppercase;letter-spacing:.08em}h1{font-size:clamp(32px,6vw,58px);line-height:1.05;margin:10px 0 18px}h2{font-size:24px;line-height:1.2;margin:0 0 12px}.intro{font-size:19px;color:#475569;max-width:850px}.grid{display:grid;gap:18px}.panel{background:#fff;border:1px solid #e2e8f0;border-radius:10px;padding:22px;box-shadow:0 10px 24px rgba(15,23,42,.04)}.facts{grid-template-columns:repeat(auto-fit,minmax(190px,1fr));margin:22px 0}.fact{background:#ecfeff;border:1px solid #99f6e4;border-radius:10px;padding:14px;font-weight:700;color:#115e59}.questions li{margin:10px 0}.cta{background:#0f766e;color:#fff;border-radius:10px;padding:24px;margin-top:24px}.cta a{color:#fff;font-weight:800}.links{display:flex;gap:12px;flex-wrap:wrap;margin-top:28px}@media(max-width:640px){.top{align-items:flex-start;flex-direction:column}.nav{font-size:14px}.shell{padding-top:20px}.panel{padding:18px}}
  </style>
</head>
<body>
  <main class="shell">
    <header class="top">
      <a class="brand" href="/">Honhaar</a>
      <nav class="nav">
        <a href="/cbse-question-bank">CBSE</a>
        <a href="/bihar-board-question-bank">Bihar Board</a>
        <a href="/class-10-question-bank">Class 10</a>
        <a href="/class-12-question-bank">Class 12</a>
      </nav>
    </header>
    <section class="hero">
      <div class="eyebrow">Board Exam Preparation</div>
      <h1>${escapeHtml(page.h1)}</h1>
      <p class="intro">${escapeHtml(page.intro)}</p>
    </section>
    <section class="grid facts">
      <div class="fact">10,000+ previous year questions</div>
      <div class="fact">CBSE + Bihar Board</div>
      <div class="fact">Class 10 + Class 12</div>
      <div class="fact">INR 99 one-time access</div>
    </section>
    ${sections}
    ${questions ? `<section class="panel"><h2>Sample Questions Preview</h2><p>Google aur students dono ke liye Honhaar pages par useful question preview diya gaya hai. Full chapter-wise question bank app me available hai.</p><ol class="questions">${questions}</ol></section>` : ''}
    <section class="cta">
      <h2>Start Practice on Honhaar</h2>
      <p>Board exam preparation ko random notes se nahi, actual previous year question practice se strong banao. Honhaar par Class 10 aur Class 12 ke liye organized question bank available hai.</p>
      <a href="/#pricing">View INR 99 plan</a>
    </section>
    <nav class="links">${links}</nav>
  </main>
</body>
</html>`;
}

function subjectPage(boardKey, classKey, subject) {
  const board = boards[boardKey];
  const classLabel = titleCase(classKey);
  const title = `${board.label} ${classLabel} ${subject.name} Question Bank 2025-26 | Honhaar`;
  const h1 = `${board.label} ${classLabel} ${subject.name} Question Bank`;
  const topicsText = subject.topics.join(', ');
  return {
    path: `/subject/${board.slug}/${classKey}/${subject.slug}`,
    title,
    description: `${board.label} ${classLabel} ${subject.name} previous year questions, important topics, MCQ, short answer and long answer practice on Honhaar.`,
    h1,
    intro: `${board.full} ${classLabel} ${subject.name} ke liye Honhaar par previous year questions, repeated topics, MCQ practice, and board-style answers available hain.`,
    sections: [
      ['Important Topics', `${subject.name} me ${topicsText} jaise topics board exam preparation ke liye high-value hain. Honhaar in topics ko chapter-wise question practice me organize karta hai.`],
      ['Question Types Covered', `${board.label} pattern ke according objective questions, short answer, long answer, and application-based questions practice karo. Har question type exam confidence build karta hai.`],
      ['How to Use This Page', `Pehle important topics revise karo, phir sample questions solve karo, uske baad Honhaar app me full ${subject.name} question bank se timed practice karo.`],
    ],
  };
}

function classBoardPage(boardKey, classKey) {
  const board = boards[boardKey];
  const classLabel = titleCase(classKey);
  const subjectNames = subjects[classKey].map((subject) => subject.name).join(', ');
  return {
    path: `/${board.slug}-${classKey}-question-bank`,
    title: `${board.label} ${classLabel} Question Bank 2025-26 | Previous Year Questions | Honhaar`,
    description: `${board.label} ${classLabel} question bank with previous year questions, subject-wise practice, MCQ, short answer and long answer questions on Honhaar.`,
    h1: `${board.label} ${classLabel} Question Bank`,
    intro: `${board.label} ${classLabel} students ke liye Honhaar par ${subjectNames} ke previous year questions organized hain. ${board.focus}.`,
    sections: [
      ['Subjects Covered', `${subjectNames} subjects ke liye chapter-wise question practice available hai. Students high-weightage chapters and repeated board patterns par focus kar sakte hain.`],
      ['Preparation Method', 'Daily objective practice, weekly mock tests, previous year revision, and answer writing board exam score improve karne ke practical steps hain.'],
      ['Why This Page Matters', 'Search karne wale students ko direct board + class specific information milti hai, isliye ye page topical authority build karta hai.'],
    ],
  };
}

const pages = [...mainPages];

for (const [boardKey] of Object.entries(boards)) {
  for (const classKey of Object.keys(subjects)) {
    pages.push(classBoardPage(boardKey, classKey));
    for (const subject of subjects[classKey]) {
      pages.push(subjectPage(boardKey, classKey, subject));
    }
  }
}

const aliases = [
  ['/about-honhaar', '/about'],
  ['/what-is-honhaar', '/about'],
];

function ensureDir(path) {
  mkdirSync(dirname(path), { recursive: true });
}

function writePage(path, html) {
  const target = join(outDir, path.replace(/^\//, ''), 'index.html');
  ensureDir(target);
  writeFileSync(target, html, 'utf8');
}

for (const page of pages) {
  rmSync(join(outDir, page.path.replace(/^\//, '')), { recursive: true, force: true });
  writePage(page.path, pageTemplate(page, { questions: sampleQuestions[page.path.split('/').at(-1)] || [] }));
}

for (const [alias, canonicalPath] of aliases) {
  const target = join(outDir, alias.replace(/^\//, ''), 'index.html');
  ensureDir(target);
  writeFileSync(target, `<!DOCTYPE html><html lang="en-IN"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Redirecting to Honhaar</title><link rel="canonical" href="${siteUrl}${canonicalPath}"><meta http-equiv="refresh" content="0; url=${canonicalPath}"></head><body><a href="${canonicalPath}">Continue to Honhaar</a></body></html>`, 'utf8');
}

const sitemapUrls = [
  '/',
  '/about',
  '/about-honhaar',
  '/what-is-honhaar',
  '/contact-us',
  '/support',
  '/terms-and-conditions',
  '/refunds-and-cancellations',
  '/privacy-policy',
  ...pages.map((page) => page.path),
];

const uniqueUrls = [...new Set(sitemapUrls)];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${uniqueUrls.map((url) => `  <url>
    <loc>${siteUrl}${url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${url.includes('/subject/') ? 'monthly' : 'weekly'}</changefreq>
    <priority>${url === '/' ? '1.0' : url.includes('/subject/') ? '0.82' : '0.9'}</priority>
  </url>`).join('\n')}
</urlset>
`;

writeFileSync(join(outDir, 'sitemap.xml'), sitemap, 'utf8');
writeFileSync(join(outDir, 'robots.txt'), `User-agent: *
Allow: /

User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: GPTBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: ClaudeBot
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`, 'utf8');

console.log(`Generated ${pages.length} static SEO pages and ${uniqueUrls.length} sitemap URLs.`);
