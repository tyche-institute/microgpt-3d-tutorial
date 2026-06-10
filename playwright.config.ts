import { defineConfig } from '@playwright/test';

const PORT = 4173;

// The site is served at the domain root (no basePath), so the static export
// in `out/` can be served directly.
export default defineConfig({
  testDir: 'tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? 'github' : 'list',
  use: {
    baseURL: `http://localhost:${PORT}`,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  webServer: {
    command: `pnpm exec serve out -l ${PORT} --no-clipboard --no-port-switching`,
    port: PORT,
    timeout: 60_000,
    reuseExistingServer: !process.env.CI,
  },
  projects: [{ name: 'chromium', use: { browserName: 'chromium' } }],
});
