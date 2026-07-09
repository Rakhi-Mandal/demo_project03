import testData from '../../test-data.json';
const { test, expect } = require('../../fixtures/walker_fixture.js');
const { heal } = require('../../fixtures/inline_healer.js');

test('create order @sanity', async ({ page }) => {
  // 1. Go to the main URL and wait for DOM to load
  await page.goto(testData.url);
  await page.waitForLoadState('domcontentloaded');

  await heal(page, 'sign in name field', 'visible', null,
    () => page.locator('input[aria-label="Enter your username or email address"]'));
  await heal(page, 'sign in name field', 'fill', testData.enterYourUsernameOrEmail,
    () => page.locator('input[aria-label="Enter your username or email address"]'));

  await heal(page, 'continue button', 'click', null,
    () => page.locator('button[aria-label="Continue"]'));

  await heal(page, 'password field', 'visible', null,
    () => page.locator('input[aria-label="Password"]'));
  await heal(page, 'password field', 'fill', testData.password,
    () => page.locator('input[aria-label="Password"]'));

  await heal(page, 'sign in button', 'click', null,
    () => page.locator('#next'));

  await page.waitForLoadState('domcontentloaded');

  // 7. Search for client
  await heal(page, 'search field', 'visible', null,
    () => page.locator('input[aria-label="Search"]'));
  await heal(page, 'search field', 'fill', testData.search,
    () => page.locator('input[aria-label="Search"]'));

  await heal(page, 'client result', 'visible', null,
    () => page.locator('span').filter({ hasText: /^Test Client JG$/ }).first());
  await heal(page, 'client result', 'click', null,
    () => page.locator('span').filter({ hasText: /^Test Client JG$/ }).first());

  await heal(page, 'order link', 'visible', null,
    () => page.getByRole('link', { name: 'Order', exact: true }));
  await heal(page, 'order link', 'click', null,
    () => page.getByRole('link', { name: 'Order', exact: true }));

  await heal(page, 'new order button', 'visible', null,
    () => page.locator('[data-testid="order-list-new-button"]'));
  await heal(page, 'new order button', 'click', null,
    () => page.locator('[data-testid="order-list-new-button"]'));

  // 11. Stop 1: Select Location
  await heal(page, 'stop 1 location button', 'visible', null,
    () => page.locator('form[id="stop-1-content-location"] button[type="button"]').first());
  await heal(page, 'stop 1 location button', 'click', null,
    () => page.locator('form[id="stop-1-content-location"] button[type="button"]').first());

  await heal(page, 'stop 1 location option', 'visible', null,
    () => page.locator('li[aria-label="Novapath Supply Chain Systems"]').first());
  await heal(page, 'stop 1 location option', 'click', null,
    () => page.locator('li[aria-label="Novapath Supply Chain Systems"]').first());

  // 12. Stop 1: Choose Date
  await heal(page, 'choose date button', 'visible', null,
    () => page.locator('button[aria-label="Choose Date"]'));
  await heal(page, 'choose date button', 'click', null,
    () => page.locator('button[aria-label="Choose Date"]'));

  await heal(page, 'day 30 option', 'visible', null,
    () => page.locator('span').filter({ hasText: /^30$/ }).first());
  await heal(page, 'day 30 option', 'click', null,
    () => page.locator('span').filter({ hasText: /^30$/ }).first());

  // 13. Stop 1: Appointment Required - No
  await heal(page, 'no div', 'visible', null,
    () => page.locator('div').filter({ hasText: /^No$/ }).first());
  await heal(page, 'no div', 'click', null,
    () => page.locator('div').filter({ hasText: /^No$/ }).first());

  await heal(page, 'no span', 'visible', null,
    () => page.locator('span').filter({ hasText: /^No$/ }).first());
  await heal(page, 'no span', 'click', null,
    () => page.locator('span').filter({ hasText: /^No$/ }).first());

  // 14. Stop 1: Appointment Required Checkbox
  await heal(page, 'appointment required checkbox', 'visible', null,
    () => page.locator('#stop-1-content-appointment-required'));
  await heal(page, 'appointment required checkbox', 'check', null,
    () => page.locator('#stop-1-content-appointment-required'));

  // 15. Stop 1: Internal Notes
  await heal(page, 'internal notes textarea', 'visible', null,
    () => page.locator('#stop-1-content-internal-notes'));
  await heal(page, 'internal notes textarea', 'fill', testData.stop1ContentInternalNotes,
    () => page.locator('#stop-1-content-internal-notes'));

  // 16. Stop 2: Select Location
  await heal(page, 'stop 2 location button', 'visible', null,
    () => page.locator('form[id="stop-2-content-location"] button[type="button"]').first());
  await heal(page, 'stop 2 location button', 'click', null,
    () => page.locator('form[id="stop-2-content-location"] button[type="button"]').first());

  await heal(page, 'stop 2 location option', 'visible', null,
    () => page.locator('li[aria-label="Novapath Supply Chain Systems"]').first());
  await heal(page, 'stop 2 location option', 'click', null,
    () => page.locator('li[aria-label="Novapath Supply Chain Systems"]').first());

  // 17. Line Item 1: Select Product/Description
  await heal(page, 'line item button', 'visible', null,
    () => page.locator('div[id="line-item-num-1-content"] button[type="button"]').first());
  await heal(page, 'line item button', 'click', null,
    () => page.locator('div[id="line-item-num-1-content"] button[type="button"]').first());

  await heal(page, 'product option', 'visible', null,
    () => page.locator('li[aria-label="just some garbage"]').first());
  await heal(page, 'product option', 'click', null,
    () => page.locator('li[aria-label="just some garbage"]').first());

  // 18. Line Item 1: Handling
  await heal(page, 'handling input', 'visible', null,
    () => page.locator('#handling-0'));
  await heal(page, 'handling input', 'click', null,
    () => page.locator('#handling-0'));

  // 19. Bill To: Select Location
  await heal(page, 'bill to location button', 'visible', null,
    () => page.locator('form[id="bill-to-content-location"] button[type="button"]').first());
  await heal(page, 'bill to location button', 'click', null,
    () => page.locator('form[id="bill-to-content-location"] button[type="button"]').first());

  await heal(page, 'bill to location option', 'visible', null,
    () => page.locator('li[aria-label="Novapath Supply Chain Systems"]').first());
  await heal(page, 'bill to location option', 'click', null,
    () => page.locator('li[aria-label="Novapath Supply Chain Systems"]').first());

  await heal(page, 'direction combobox', 'visible', null,
    () => page.locator('span[aria-label="Select Direction"]'));
  await heal(page, 'direction combobox', 'click', null,
    () => page.locator('span[aria-label="Select Direction"]'));

  await heal(page, 'transfer option', 'visible', null,
    () => page.locator('li[aria-label="Transfer"]').first());
  await heal(page, 'transfer option', 'click', null,
    () => page.locator('li[aria-label="Transfer"]').first());

  await heal(page, 'billing terms combobox', 'visible', null,
    () => page.locator('span[aria-label="Select Billing Terms"]'));
  await heal(page, 'billing terms combobox', 'click', null,
    () => page.locator('span[aria-label="Select Billing Terms"]'));

  await heal(page, 'prepaid option', 'visible', null,
    () => page.locator('li[aria-label="Prepaid"]').first());
  await heal(page, 'prepaid option', 'click', null,
    () => page.locator('li[aria-label="Prepaid"]').first());

  await heal(page, 'requested mode combobox', 'visible', null,
    () => page.locator('span[aria-label="Select Requested Mode"]'));
  await heal(page, 'requested mode combobox', 'click', null,
    () => page.locator('span[aria-label="Select Requested Mode"]'));

  await heal(page, 'courier option', 'visible', null,
    () => page.locator('li[aria-label="Courier"]').first());
  await heal(page, 'courier option', 'click', null,
    () => page.locator('li[aria-label="Courier"]').first());

  // 23. Create Order
  await heal(page, 'create order button', 'click', null,
    () => page.locator('button[aria-label="Create Order for Test Client JG"]'));

  await heal(page, 'success message', 'visible', null,
    () => page.locator('div').filter({ hasText: /^Successfully saved order$/ }).first());
});