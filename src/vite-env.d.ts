/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_SITE_URL: string;
  readonly VITE_SUPPORT_EMAIL: string;
  readonly VITE_CASHFREE_SDK_URL: string;
  readonly VITE_SCHEMA_ORG_URL: string;
  readonly VITE_UNSPLASH_PRECONNECT_URL: string;
  readonly VITE_GOOGLE_FONTS_PRECONNECT_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
