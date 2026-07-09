import testData from '../../test-data.json';
const { test, expect } = require('../../fixtures/walker_fixture.js');
const { heal } = require('../../fixtures/inline_healer.js');

test('shilpment @sanity', async ({ page }) => {
  // 1. Go to the main URL
  await page.goto(testData.url);
  await page.waitForLoadState('domcontentloaded');

  // 2. Enter username/email
  await heal(page, 'username field', 'visible', null,
    () => page.locator('input[aria-label="Enter your username or email address"]'));
  await heal(page, 'username field', 'fill', testData.enterYourUsernameOrEmail,
    () => page.locator('input[aria-label="Enter your username or email address"]'));

  await heal(page, 'continue button', 'click', null,
    () => page.locator('button[aria-label="Continue"]'));

  // 4. Enter password
  await heal(page, 'password field', 'visible', null,
    () => page.locator('input[aria-label="Password"]'));
  await heal(page, 'password field', 'fill', testData.password,
    () => page.locator('input[aria-label="Password"]'));

  await heal(page, 'sign in button', 'click', null,
    () => page.locator('#next'));

  // 6. Search for client
  await heal(page, 'search field', 'visible', null,
    () => page.locator('input[aria-label="Search"]'));
  await heal(page, 'search field', 'fill', testData.search,
    () => page.locator('input[aria-label="Search"]'));

  await heal(page, 'client result', 'visible', null,
    () => page.locator('span').filter({ hasText: /^Test Client JG$/ }).first());
  await heal(page, 'client result', 'click', null,
    () => page.locator('span').filter({ hasText: /^Test Client JG$/ }).first());

  // 8. Enter Dashboard iframe
  const dashboardFrame = page.frameLocator('iframe[title="Dashboard"]');

  await heal(page, 'shipment builder link', 'visible', null,
    () => page.getByRole('link', { name: 'Shipment Builder', exact: true }));
  await heal(page, 'shipment builder link', 'click', null,
    () => page.getByRole('link', { name: 'Shipment Builder', exact: true }));

  await heal(page, 'origin field', 'visible', null,
    () => page.locator('#criteria-origin'));
  await heal(page, 'origin field', 'click', null,
    () => page.locator('#criteria-origin'));

  await heal(page, 'location dropdown button', 'visible', null,
    () => page.locator('button[type="button"]').first());
  await heal(page, 'location dropdown button', 'click', null,
    () => page.locator('button[type="button"]').first());

  await heal(page, 'location option', 'visible', null,
    () => page.locator('li[aria-label="Cafe and then Some"]'));
  await heal(page, 'location option', 'click', null,
    () => page.locator('li[aria-label="Cafe and then Some"]'));

  await heal(page, 'done button', 'click', null,
    () => page.getByRole('button', { name: 'Done', exact: true }).first());

  await heal(page, 'add to shipment button', 'click', null,
    () => page.locator('button[aria-label="Add to Shipment"]'));

  await heal(page, 'create shipment button', 'click', null,
    () => page.locator('button[aria-label="Create Shipment"]'));

  await heal(page, 'success message', 'visible', null,
    () => page.locator('div').filter({ hasText: /^Successfully saved shipment$/ }).first());
});