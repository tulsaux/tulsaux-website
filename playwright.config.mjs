import { defineConfig } from '@playwright/test';

const baseURL = 'http://127.0.0.1:4173';

export default defineConfig({
  testDir: './e2e',
  reporter: process.env.CI ? 'github' : 'list',
  use: { baseURL, browserName: 'chromium' },
  webServer: {
    command: 'vite preview --host 127.0.0.1 --port 4173 --strictPort',
    url: baseURL,
  },
});
