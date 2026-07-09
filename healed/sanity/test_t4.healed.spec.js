import testData from '../../test-data.json';
const { test, expect } = require('../../fixtures/walker_fixture.js');
const { heal } = require('../../fixtures/inline_healer.js');

test('generated flow @sanity', async ({ page }) => {
  // Initial navigation
  await page.goto(testData.url);
  await page.waitForLoadState('domcontentloaded');

  // Username/email input
  await heal(page, 'username field', 'visible', null,
    () => page.locator('input[aria-label="Enter your username or email address"]'));
  await heal(page, 'username field', 'fill', testData.enterYourUsernameOrEmail,
    () => page.locator('input[aria-label="Enter your username or email address"]'));

  // Continue button
  await heal(page, 'continue button', 'click', null,
    () => page.locator('button[aria-label="Continue"]'));

  // Password input
  await heal(page, 'password field', 'visible', null,
    () => page.locator('input[aria-label="Password"]'));
  await heal(page, 'password field', 'fill', testData.password,
    () => page.locator('input[aria-label="Password"]'));

  // Sign in button
  await heal(page, 'sign in button', 'click', null,
    () => page.locator('#next'));

  await page.waitForLoadState('domcontentloaded');

  // Search for client
  await heal(page, 'search field', 'visible', null,
    () => page.locator('input[aria-label="Search"]'));
  await heal(page, 'search field', 'fill', testData.search,
    () => page.locator('input[aria-label="Search"]'));

  await heal(page, 'client result', 'visible', null,
    () => page.locator('span').filter({ hasText: /^Test Client JG$/ }).first());
  await heal(page, 'client result', 'click', null,
    () => page.locator('span').filter({ hasText: /^Test Client JG$/ }).first());

  await heal(page, 'shipment builder link', 'visible', null,
    () => page.getByRole('link', { name: 'Shipment Builder', exact: true }));
  await heal(page, 'shipment builder link', 'click', null,
    () => page.getByRole('link', { name: 'Shipment Builder', exact: true }));

  // Clear Location Filter
  await heal(page, 'clear location filter button', 'click', null,
    () => page.locator('button[aria-label="Clear Location Filter"]'));

  await heal(page, 'origin field', 'visible', null,
    () => page.locator('#criteria-origin'));
  await heal(page, 'origin field', 'click', null,
    () => page.locator('#criteria-origin'));

  // This is the button next to the Origin input, but no stable locator except position in codegen/trace
  // Since no better locator, skip variable and inline as per strict rules
  await heal(page, 'first origin button', 'click', null,
    () => page.locator('button[type="button"]').first());

  // Focus on location combobox input
  await heal(page, 'location combobox field', 'visible', null,
    () => page.locator('#criteria-origin-location-id'));

  await heal(page, 'location option', 'visible', null,
    () => page.locator('li[aria-label="Novapath Supply Chain Systems"]'));
  await heal(page, 'location option', 'click', null,
    () => page.locator('li[aria-label="Novapath Supply Chain Systems"]'));

  // Focus again on location combobox input (as per trace)
  await heal(page, 'location combobox field', 'visible', null,
    () => page.locator('#criteria-origin-location-id'));

  await heal(page, 'done button', 'click', null,
    () => page.getByRole('button', { name: 'Done', exact: true }).first());

  await heal(page, 'add to shipment button', 'click', null,
    () => page.locator('button[aria-label="Add to Shipment"]'));

  // Scroll before Create Shipment (as per trace)
  // (No actionable element to scroll to, so skip explicit scroll step)

  await heal(page, 'create shipment button', 'click', null,
    () => page.locator('button[aria-label="Create Shipment"]'));

  await heal(page, 'success message', 'visible', null,
    () => page.locator('div').filter({ hasText: /^Successfully saved shipment$/ }).first());
});