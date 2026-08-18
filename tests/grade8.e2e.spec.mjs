import { test, expect } from '@playwright/test';

const baseURL = process.env.BASE_URL;
test.skip(!baseURL, 'BASE_URL is not configured; static smoke test still runs.');

test('Grade 8 entry page loads without a fatal browser error', async ({ page }) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  const response = await page.goto(baseURL, { waitUntil: 'networkidle', timeout: 30000 });
  expect(response?.ok()).toBeTruthy();
  expect(errors, `Page errors: ${errors.join('\n')}`).toEqual([]);
});

test('Grade 8 links do not return HTTP errors', async ({ page, request }) => {
  await page.goto(baseURL, { waitUntil: 'domcontentloaded', timeout: 30000 });
  const hrefs = await page.locator('a[href]').evaluateAll(els => els.map(e => e.href));
  const grade8Links = [...new Set(hrefs)].filter(h => /grade[-_]?8|grade[-_]?8|second[-_]?prep|second.*prep/i.test(h));
  for (const url of grade8Links) {
    const res = await request.get(url, { timeout: 20000 });
    expect(res.status(), url).toBeLessThan(400);
  }
});
