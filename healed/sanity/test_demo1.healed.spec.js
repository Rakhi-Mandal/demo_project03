import testData from '../../test-data.json';
const { test, expect } = require('../../fixtures/walker_fixture.js');
const { heal } = require('../../fixtures/inline_healer.js');

test('generated flow @sanity', async ({ page }) => {
  // Step 1: Go to the main URL
  await page.goto(testData.url);
  await page.waitForLoadState('domcontentloaded');

  // Step 2: Fill username/email field (TRACE: input[aria-label="Enter your username or email address"])
  await heal(page, 'username field', 'visible', null,
    () => page.locator('input[aria-label="Enter your username or email address"]'));
  await heal(page, 'username field', 'fill', testData.enterYourUsernameOrEmail,
    () => page.locator('input[aria-label="Enter your username or email address"]'));

  // Step 3: Click Continue (TRACE: button[aria-label="Continue"])
  await heal(page, 'continue button', 'click', null,
    () => page.locator('button[aria-label="Continue"]'));

  // Step 4: Fill password (TRACE: input[aria-label="Password"])
  await heal(page, 'password field', 'visible', null,
    () => page.locator('input[aria-label="Password"]'));
  await heal(page, 'password field', 'fill', testData.password,
    () => page.locator('input[aria-label="Password"]'));

  // Step 5: Click Sign in (TRACE: #next)
  await heal(page, 'sign in button', 'click', null,
    () => page.locator('#next'));

  // Step 6: Wait for navigation to Microsoft Authentication
  await page.waitForLoadState('domcontentloaded');

  // Step 7: Fill search (TRACE: input[aria-label="Search"])
  await heal(page, 'search field', 'visible', null,
    () => page.locator('input[aria-label="Search"]'));
  await heal(page, 'search field', 'fill', testData.search,
    () => page.locator('input[aria-label="Search"]'));

  // Step 8: Click on "Test Client JG" result (TRACE: div with exact text)
  await heal(page, 'test client jg result', 'visible', null,
    () => page.locator('div').filter({ hasText: /^Test Client JG$/ }).first());
  await heal(page, 'test client jg result', 'click', null,
    () => page.locator('div').filter({ hasText: /^Test Client JG$/ }).first());

  // Step 9: Click "Shipment Builder" link (TRACE: getByRole('link', { name: "Shipment Builder", exact: true }))
  await heal(page, 'shipment builder link', 'visible', null,
    () => page.getByRole('link', { name: 'Shipment Builder', exact: true }));
  await heal(page, 'shipment builder link', 'click', null,
    () => page.getByRole('link', { name: 'Shipment Builder', exact: true }));

  // Step 10: Click "Shipment Builder" link again (CODEGEN/TRACE: duplicate, keep as per sequence)
  await heal(page, 'shipment builder link', 'visible', null,
    () => page.getByRole('link', { name: 'Shipment Builder', exact: true }));
  await heal(page, 'shipment builder link', 'click', null,
    () => page.getByRole('link', { name: 'Shipment Builder', exact: true }));

  // Step 11: Click Origin input (TRACE: #criteria-origin)
  await heal(page, 'origin field', 'visible', null,
    () => page.locator('#criteria-origin'));
  await heal(page, 'origin field', 'click', null,
    () => page.locator('#criteria-origin'));

  // Step 12: Click overlay div (TRACE: xpath=//section[@id="open-ship-orders-search-builder"]/div[2]/div[1]/div[1]/div[2])
  // Rebuild locator using id attribute from XPath
  await heal(page, 'overlay div', 'visible', null,
    () => page.locator('section[id="open-ship-orders-search-builder"] div').nth(1));
  await heal(page, 'overlay div', 'click', null,
    () => page.locator('section[id="open-ship-orders-search-builder"] div').nth(1));

  // Step 13: Click Cancel button (TRACE: getByRole('button', { name: "Cancel", exact: true }))
  await heal(page, 'cancel button', 'click', null,
    () => page.getByRole('button', { name: 'Cancel', exact: true }));

  // Step 14: Click Origin input again
  await heal(page, 'origin field', 'click', null,
    () => page.locator('#criteria-origin'));

  // Step 15: Click overlay div again
  await heal(page, 'overlay div', 'click', null,
    () => page.locator('section[id="open-ship-orders-search-builder"] div').nth(1));

  // Step 16: Click Cancel button again
  await heal(page, 'cancel button', 'click', null,
    () => page.getByRole('button', { name: 'Cancel', exact: true }));

  // Step 17: Click Origin input again
  await heal(page, 'origin field', 'click', null,
    () => page.locator('#criteria-origin'));

  // Step 18: Scroll (TRACE: scroll to Y=1659, 21%)
  await page.evaluate(() => window.scrollTo(0, 1659));
});