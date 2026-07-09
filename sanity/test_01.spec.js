import testData from '../test-data.json';
import { test, expect } from '@playwright/test';

test('2026 06 30T07 58 02', async ({ page }) => {
  // 1. Go to login page
  await page.goto(testData.url);
  await page.waitForLoadState('domcontentloaded');

  const usernameInput = page.locator('input[aria-label="Enter your username or email address"]');
  await expect(usernameInput).toBeVisible();
  await expect(usernameInput).toBeEditable();
  await usernameInput.fill(testData.enterYourUsernameOrEmail);

  const continueButton = page.locator('button[aria-label="Continue"]');
  await expect(continueButton).toBeEnabled();
  await continueButton.click();

  const passwordInput = page.locator('input[aria-label="Password"]');
  await expect(passwordInput).toBeVisible();
  await expect(passwordInput).toBeEditable();
  await passwordInput.fill(testData.password);

  const signInButton = page.locator('#next');
  await expect(signInButton).toBeEnabled();
  await signInButton.click();

  // 7. Search for client
  const searchInput = page.locator('input[aria-label="Search"]');
  await expect(searchInput).toBeVisible();
  await expect(searchInput).toBeEditable();
  await searchInput.fill(testData.search);

  const clientResult = page.locator('span').filter({ hasText: /^Test Client JG$/ }).first();
  await expect(clientResult).toBeVisible();
  await expect(clientResult).toBeEnabled();
  await clientResult.click();

  const orderLink = page.getByRole('link', { name: 'Order', exact: true });
  await expect(orderLink).toBeVisible();
  await expect(orderLink).toBeEnabled();
  await orderLink.click();

  const newOrderButton = page.locator('[data-testid="order-list-new-button"]');
  await expect(newOrderButton).toBeVisible();
  await expect(newOrderButton).toBeEnabled();
  await newOrderButton.click();

  // 11. Stop 1: Open Location dropdown
  const stop1LocationDropdownButton = page.locator('form[id="stop-1-content-location"] button[type="button"]').first();
  await expect(stop1LocationDropdownButton).toBeVisible();
  await expect(stop1LocationDropdownButton).toBeEnabled();
  await stop1LocationDropdownButton.click();

  // 12. Stop 1: Select location option
  const stop1LocationOption = page.locator('li[aria-label="Novapath Supply Chain Systems"]').first();
  await expect(stop1LocationOption).toBeVisible();
  await expect(stop1LocationOption).toBeEnabled();
  await stop1LocationOption.click();

  // 13. Stop 1: Open date picker
  const chooseDateButton = page.locator('button[aria-label="Choose Date"]').first();
  await expect(chooseDateButton).toBeVisible();
  await expect(chooseDateButton).toBeEnabled();
  await chooseDateButton.click();

  // 14. Stop 1: Select date "30"
  const dateOption30 = page.locator('span').filter({ hasText: /^30$/ }).first();
  await expect(dateOption30).toBeVisible();
  await expect(dateOption30).toBeEnabled();
  await dateOption30.click();

  // 15. Stop 1: Fill internal notes
  const stop1InternalNotes = page.locator('#stop-1-content-internal-notes');
  await expect(stop1InternalNotes).toBeVisible();
  await expect(stop1InternalNotes).toBeEditable();
  await stop1InternalNotes.fill(testData.stop1ContentInternalNotes);

  // 16. Stop 2: Open Location dropdown
  const stop2LocationDropdownButton = page.locator('form[id="stop-2-content-location"] button[type="button"]').first();
  await expect(stop2LocationDropdownButton).toBeVisible();
  await expect(stop2LocationDropdownButton).toBeEnabled();
  await stop2LocationDropdownButton.click();

  // 17. Stop 2: Select location option
  const stop2LocationOption = page.locator('li[aria-label="Cafe and then Some"]').first();
  await expect(stop2LocationOption).toBeVisible();
  await expect(stop2LocationOption).toBeEnabled();
  await stop2LocationOption.click();

  // 18. Line Item 1: Open product dropdown
  const lineItem1DropdownButton = page.locator('div[id="line-item-num-1-content"] button[type="button"]').first();
  await expect(lineItem1DropdownButton).toBeVisible();
  await expect(lineItem1DropdownButton).toBeEnabled();
  await lineItem1DropdownButton.click();

  // 19. Line Item 1: Select product option
  const lineItem1ProductOption = page.locator('li[aria-label="just some garbage"]').first();
  await expect(lineItem1ProductOption).toBeVisible();
  await expect(lineItem1ProductOption).toBeEnabled();
  await lineItem1ProductOption.click();

  // 20. Line Item 1: Click Handling input
  const handlingInput = page.locator('#handling-0');
  await expect(handlingInput).toBeVisible();
  await expect(handlingInput).toBeEditable();
  await handlingInput.click();

  // 21. Bill To: Open Location dropdown
  const billToLocationDropdownButton = page.locator('form[id="bill-to-content-location"] button[type="button"]').first();
  await expect(billToLocationDropdownButton).toBeVisible();
  await expect(billToLocationDropdownButton).toBeEnabled();
  await billToLocationDropdownButton.click();

  // 22. Bill To: Select location option
  const billToLocationOption = page.locator('li[aria-label="Novapath Supply Chain Systems"]').first();
  await expect(billToLocationOption).toBeVisible();
  await billToLocationOption.click();

  const directionDropdown = page.locator('span[aria-label="Select Direction"]');
  await expect(directionDropdown).toBeVisible();
  await expect(directionDropdown).toBeEnabled();
  await directionDropdown.click();

  const outboundOption = page.locator('li[aria-label="Outbound"]').first();
  await expect(outboundOption).toBeVisible();
  await expect(outboundOption).toBeEnabled();
  await outboundOption.click();

  const billingTermsDropdown = page.locator('span[aria-label="Select Billing Terms"]');
  await expect(billingTermsDropdown).toBeVisible();
  await expect(billingTermsDropdown).toBeEnabled();
  await billingTermsDropdown.click();

  const collectOption = page.locator('li[aria-label="Collect"]').first();
  await expect(collectOption).toBeVisible();
  await expect(collectOption).toBeEnabled();
  await collectOption.click();

  // 25. Create Order
  const createOrderButton = page.locator('button[aria-label="Create Order for Test Client JG"]');
  await expect(createOrderButton).toBeEnabled();
  await createOrderButton.click();

  const orderSavedBanner = page.locator('div').filter({ hasText: /^Successfully saved order$/ }).first();
  await expect(orderSavedBanner).toBeVisible();
});