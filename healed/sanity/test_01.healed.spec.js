import testData from '../../test-data.json';
const { test, expect } = require('../../fixtures/walker_fixture.js');
const { heal } = require('../../fixtures/inline_healer.js');

test('2026 06 30T07 58 02', async ({ page }) => {
  // 1. Go to login page
  await page.goto(testData.url);
  await page.waitForLoadState('domcontentloaded');

  await heal(page, 'username field', 'visible', null,
    () => page.locator('input[aria-label="Enter your username or email address"]'));
  await heal(page, 'username field', 'fill', testData.enterYourUsernameOrEmail,
    () => page.locator('input[aria-label="Enter your username or email address"]'));

  await heal(page, 'continue button', 'click', null,
    () => page.locator('button[aria-label="Continue"]'));

  await heal(page, 'password field', 'visible', null,
    () => page.locator('input[aria-label="Password"]'));
  await heal(page, 'password field', 'fill', testData.password,
    () => page.locator('input[aria-label="Password"]'));

  await heal(page, 'sign in button', 'click', null,
    () => page.locator('#next'));

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

  // 11. Stop 1: Open Location dropdown
  await heal(page, 'stop 1 location dropdown button', 'visible', null,
    () => page.locator('form[id="stop-1-content-location"] button[type="button"]').first());
  await heal(page, 'stop 1 location dropdown button', 'click', null,
    () => page.locator('form[id="stop-1-content-location"] button[type="button"]').first());

  // 12. Stop 1: Select location option
  await heal(page, 'stop 1 location option', 'visible', null,
    () => page.locator('li[aria-label="Novapath Supply Chain Systems"]').first());
  await heal(page, 'stop 1 location option', 'click', null,
    () => page.locator('li[aria-label="Novapath Supply Chain Systems"]').first());

  // 13. Stop 1: Open date picker
  await heal(page, 'choose date button', 'visible', null,
    () => page.locator('button[aria-label="Choose Date"]'));
  await heal(page, 'choose date button', 'click', null,
    () => page.locator('button[aria-label="Choose Date"]'));

  // 14. Stop 1: Select date "30"
  await heal(page, 'date option 30', 'visible', null,
    () => page.locator('span').filter({ hasText: /^30$/ }).first());
  await heal(page, 'date option 30', 'click', null,
    () => page.locator('span').filter({ hasText: /^30$/ }).first());

  // 15. Stop 1: Fill internal notes
  await heal(page, 'stop 1 internal notes', 'visible', null,
    () => page.locator('#stop-1-content-internal-notes'));
  await heal(page, 'stop 1 internal notes', 'fill', testData.stop1ContentInternalNotes,
    () => page.locator('#stop-1-content-internal-notes'));

  // 16. Stop 2: Open Location dropdown
  await heal(page, 'stop 2 location dropdown button', 'visible', null,
    () => page.locator('form[id="stop-2-content-location"] button[type="button"]').first());
  await heal(page, 'stop 2 location dropdown button', 'click', null,
    () => page.locator('form[id="stop-2-content-location"] button[type="button"]').first());

  // 17. Stop 2: Select location option
  await heal(page, 'stop 2 location option', 'visible', null,
    () => page.locator('li[aria-label="Cafe and then Some"]').first());
  await heal(page, 'stop 2 location option', 'click', null,
    () => page.locator('li[aria-label="Cafe and then Some"]').first());

  // 18. Line Item 1: Open product dropdown
  await heal(page, 'line item 1 dropdown button', 'visible', null,
    () => page.locator('div[id="line-item-num-1-content"] button[type="button"]').first());
  await heal(page, 'line item 1 dropdown button', 'click', null,
    () => page.locator('div[id="line-item-num-1-content"] button[type="button"]').first());

  // 19. Line Item 1: Select product option
  await heal(page, 'line item 1 product option', 'visible', null,
    () => page.locator('li[aria-label="just some garbage"]').first());
  await heal(page, 'line item 1 product option', 'click', null,
    () => page.locator('li[aria-label="just some garbage"]').first());

  // 20. Line Item 1: Click Handling input
  await heal(page, 'handling field', 'visible', null,
    () => page.locator('#handling-0'));
  await heal(page, 'handling field', 'click', null,
    () => page.locator('#handling-0'));

  // 21. Bill To: Open Location dropdown
  await heal(page, 'bill to location dropdown button', 'visible', null,
    () => page.locator('form[id="bill-to-content-location"] button[type="button"]').first());
  await heal(page, 'bill to location dropdown button', 'click', null,
    () => page.locator('form[id="bill-to-content-location"] button[type="button"]').first());

  // 22. Bill To: Select location option
  await heal(page, 'bill to location option', 'visible', null,
    () => page.locator('li[aria-label="Novapath Supply Chain Systems"]').first());
  await heal(page, 'bill to location option', 'click', null,
    () => page.locator('li[aria-label="Novapath Supply Chain Systems"]').first());

  await heal(page, 'direction dropdown', 'visible', null,
    () => page.locator('span[aria-label="Select Direction"]'));
  await heal(page, 'direction dropdown', 'click', null,
    () => page.locator('span[aria-label="Select Direction"]'));

  await heal(page, 'outbound option', 'visible', null,
    () => page.locator('li[aria-label="Outbound"]').first());
  await heal(page, 'outbound option', 'click', null,
    () => page.locator('li[aria-label="Outbound"]').first());

  await heal(page, 'billing terms dropdown', 'visible', null,
    () => page.locator('span[aria-label="Select Billing Terms"]'));
  await heal(page, 'billing terms dropdown', 'click', null,
    () => page.locator('span[aria-label="Select Billing Terms"]'));

  await heal(page, 'collect option', 'visible', null,
    () => page.locator('li[aria-label="Collect"]').first());
  await heal(page, 'collect option', 'click', null,
    () => page.locator('li[aria-label="Collect"]').first());

  // 25. Create Order
  await heal(page, 'create order button', 'click', null,
    () => page.locator('button[aria-label="Create Order for Test Client JG"]'));

  await heal(page, 'order saved banner', 'visible', null,
    () => page.locator('div').filter({ hasText: /^Successfully saved order$/ }).first());
});