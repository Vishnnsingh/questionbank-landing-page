import { useEffect } from 'react';
import { SCHEMA_ORG_URL } from '../config/env';
import { absoluteUrl, buildHomeJsonLd, pageMeta, SITE_URL } from '../seo';

type PageKey = keyof typeof pageMeta;

function upsertMeta(selector: string, create: () => HTMLMetaElement | HTMLLinkElement, value: string) {
  let element = document.head.querySelector(selector) as HTMLMetaElement | HTMLLinkElement | null;
  if (!element) {
    element = create();
    document.head.appendChild(element);
  }

  if (element instanceof HTMLMetaElement) {
    element.content = value;
  } else {
    element.href = value;
  }
}

export function SEO({ page, structuredData }: { page: PageKey; structuredData?: object | object[] }) {
  useEffect(() => {
    const meta = pageMeta[page];
    const canonical = absoluteUrl(meta.path);

    document.title = meta.title;
    upsertMeta('meta[name="description"]', () => {
      const tag = document.createElement('meta');
      tag.name = 'description';
      return tag;
    }, meta.description);
    upsertMeta('meta[property="og:title"]', () => {
      const tag = document.createElement('meta');
      tag.setAttribute('property', 'og:title');
      return tag;
    }, meta.title);
    upsertMeta('meta[property="og:description"]', () => {
      const tag = document.createElement('meta');
      tag.setAttribute('property', 'og:description');
      return tag;
    }, meta.description);
    upsertMeta('meta[property="og:url"]', () => {
      const tag = document.createElement('meta');
      tag.setAttribute('property', 'og:url');
      return tag;
    }, canonical);
    upsertMeta('meta[name="twitter:title"]', () => {
      const tag = document.createElement('meta');
      tag.name = 'twitter:title';
      return tag;
    }, meta.title);
    upsertMeta('meta[name="twitter:description"]', () => {
      const tag = document.createElement('meta');
      tag.name = 'twitter:description';
      return tag;
    }, meta.description);
    upsertMeta('link[rel="canonical"]', () => {
      const tag = document.createElement('link');
      tag.rel = 'canonical';
      return tag;
    }, canonical);

    const schemaId = 'page-json-ld';
    let schema = document.getElementById(schemaId) as HTMLScriptElement | null;
    if (!schema) {
      schema = document.createElement('script');
      schema.id = schemaId;
      schema.type = 'application/ld+json';
      document.head.appendChild(schema);
    }

    schema.text = JSON.stringify(
      structuredData 
        ? structuredData
        : page === 'home'
        ? buildHomeJsonLd()
        : {
            '@context': SCHEMA_ORG_URL,
            '@type': 'WebPage',
            name: meta.title,
            description: meta.description,
            url: canonical,
            isPartOf: { '@id': `${SITE_URL}/#website` },
          }
    );
  }, [page, structuredData]);

  return null;
}
