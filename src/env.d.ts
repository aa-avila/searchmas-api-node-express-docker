declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: string;
    readonly PORT: string;
    readonly CORS_ORIGIN: string;
    readonly MONGODB_URL: string;
    readonly EXTERNAL_API_URL: string;
  }
}
