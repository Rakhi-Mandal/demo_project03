import testData from '../../test-data.json';
const { test, expect } = require('../../fixtures/walker_fixture.js');
const { heal } = require('../../fixtures/inline_healer.js');

test('create orders @sanity', async ({ page }) => {
  // 1. Go to main URL
  await page.goto(testData.url);
  await page.waitForLoadState('domcontentloaded');

  // 2. Login: username/email
  await heal(page, 'username field', 'visible', null,
    () => page.locator('input[aria-label="Enter your username or email address"]'));
  await heal(page, 'username field', 'fill', testData.enterYourUsernameOrEmail,
    () => page.locator('input[aria-label="Enter your username or email address"]'));

  await heal(page, 'continue button', 'click', null,
    () => page.locator('button[aria-label="Continue"]'));

  // 4. Login: password
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

  await heal(page, 'order link', 'visible', null,
    () => page.getByRole('link', { name: 'Order', exact: true }));
  await heal(page, 'order link', 'click', null,
    () => page.getByRole('link', { name: 'Order', exact: true }));

  await heal(page, 'new order button', 'visible', null,
    () => page.locator('[data-testid="order-list-new-button"]'));
  await heal(page, 'new order button', 'click', null,
    () => page.locator('[data-testid="order-list-new-button"]'));

  // 10. Stop 1: open location dropdown
  await heal(page, 'stop 1 location button', 'visible', null,
    () => page.locator('form[id="stop-1-content-location"] button[type="button"]').first());
  await heal(page, 'stop 1 location button', 'click', null,
    () => page.locator('form[id="stop-1-content-location"] button[type="button"]').first());

  // 11. Stop 1: select location
  await heal(page, 'stop 1 location option', 'visible', null,
    () => page.locator('li[aria-label="Cafe and then Some"]'));
  await heal(page, 'stop 1 location option', 'click', null,
    () => page.locator('li[aria-label="Cafe and then Some"]'));

  // 12. Stop 1: open date picker
  await heal(page, 'choose date button', 'visible', null,
    () => page.locator('button[aria-label="Choose Date"]'));
  await heal(page, 'choose date button', 'click', null,
    () => page.locator('button[aria-label="Choose Date"]'));

  // 13. Stop 1: select day "30"
  await heal(page, 'day 30 option', 'visible', null,
    () => page.locator('span').filter({ hasText: /^30$/ }).first());
  await heal(page, 'day 30 option', 'click', null,
    () => page.locator('span').filter({ hasText: /^30$/ }).first());

  // 14. Stop 1: check "Appointment Required"
  await heal(page, 'appointment required checkbox', 'check', null,
    () => page.locator('#stop-1-content-appointment-required'));

  // 15. Stop 1: fill internal notes
  await heal(page, 'internal notes textarea', 'visible', null,
    () => page.locator('#stop-1-content-internal-notes'));
  await heal(page, 'internal notes textarea', 'fill', testData.stop1ContentInternalNotes,
    () => page.locator('#stop-1-content-internal-notes'));

  // 16. Stop 2: open location dropdown
  await heal(page, 'stop 2 location button', 'visible', null,
    () => page.locator('form[id="stop-2-content-location"] button[type="button"]').first());
  await heal(page, 'stop 2 location button', 'click', null,
    () => page.locator('form[id="stop-2-content-location"] button[type="button"]').first());

  // 17. Stop 2: select location
  await heal(page, 'stop 2 location option', 'visible', null,
    () => page.locator('li[aria-label="Novapath Supply Chain Systems"]'));
  await heal(page, 'stop 2 location option', 'click', null,
    () => page.locator('li[aria-label="Novapath Supply Chain Systems"]'));

  // 18. Line item: open description/product dropdown
  await heal(page, 'description dropdown button', 'visible', null,
    () => page.locator('div[id="line-item-num-1-content"] button[type="button"]').first());
  await heal(page, 'description dropdown button', 'click', null,
    () => page.locator('div[id="line-item-num-1-content"] button[type="button"]').first());

  // 19. Line item: select product "another one"
  await heal(page, 'product option', 'visible', null,
    () => page.locator('li[aria-label="another one"]'));
  await heal(page, 'product option', 'click', null,
    () => page.locator('li[aria-label="another one"]'));

  // 20. Line item: click handling input
  await heal(page, 'handling input', 'visible', null,
    () => page.locator('#handling-0'));
  await heal(page, 'handling input', 'click', null,
    () => page.locator('#handling-0'));

  // 21. Bill To: open location dropdown
  await heal(page, 'bill to location button', 'visible', null,
    () => page.locator('form[id="bill-to-content-location"] button[type="button"]').first());
  await heal(page, 'bill to location button', 'click', null,
    () => page.locator('form[id="bill-to-content-location"] button[type="button"]').first());

  // 22. Bill To: select location
  await heal(page, 'bill to location option', 'visible', null,
    () => page.locator('li[aria-label="Novapath Supply Chain Systems"]'));
  await heal(page, 'bill to location option', 'click', null,
    () => page.locator('li[aria-label="Novapath Supply Chain Systems"]'));

  await heal(page, 'direction dropdown', 'visible', null,
    () => page.locator('span[aria-label="Select Direction"]'));
  await heal(page, 'direction dropdown', 'click', null,
    () => page.locator('span[aria-label="Select Direction"]'));

  await heal(page, 'outbound option', 'visible', null,
    () => page.locator('li[aria-label="Outbound"]'));
  await heal(page, 'outbound option', 'click', null,
    () => page.locator('li[aria-label="Outbound"]'));

  await heal(page, 'billing terms dropdown', 'visible', null,
    () => page.locator('span[aria-label="Select Billing Terms"]'));
  await heal(page, 'billing terms dropdown', 'click', null,
    () => page.locator('span[aria-label="Select Billing Terms"]'));

  await heal(page, 'third party option', 'visible', null,
    () => page.locator('li[aria-label="3rd Party"]'));
  await heal(page, 'third party option', 'click', null,
    () => page.locator('li[aria-label="3rd Party"]'));

  await heal(page, 'create order button', 'click', null,
    () => page.locator('button[aria-label="Create Order for Test Client JG"]'));

  await heal(page, 'nmfc number input', 'visible', null,
    () => page.locator('#nmfc-number-0'));
  await heal(page, 'nmfc number input', 'fill', testData.nmfcNumber0,
    () => page.locator('#nmfc-number-0'));

  await heal(page, 'create order button', 'click', null,
    () => page.locator('button[aria-label="Create Order for Test Client JG"]'));

  await heal(page, 'success message', 'visible', null,
    () => page.locator('div').filter({ hasText: /^Successfully saved order$/ }).first());
});