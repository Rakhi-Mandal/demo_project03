import testData from '../test-data.json';
import { test, expect } from '@playwright/test';

test('generated flow @sanity', async ({ page }) => {
  // 1. Go to main login page
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

  await page.waitForLoadState('domcontentloaded');

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

  // 11. Stop 1: Open location dropdown
  const stop1LocationButton = page.locator('form[id="stop-1-content-location"] button[type="button"]');
  await expect(stop1LocationButton).toBeVisible();
  await expect(stop1LocationButton).toBeEnabled();
  await stop1LocationButton.click();

  // 12. Stop 1: Select location
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
  const dateOption = page.locator('span').filter({ hasText: /^30$/ }).first();
  await expect(dateOption).toBeVisible();
  await expect(dateOption).toBeEnabled();
  await dateOption.click();

  // 15. Stop 1: Fill internal notes (collapse typing progression)
  const stop1NotesInput = page.locator('#stop-1-content-internal-notes');
  await expect(stop1NotesInput).toBeVisible();
  await expect(stop1NotesInput).toBeEditable();
  await stop1NotesInput.fill(testData.stop1ContentInternalNotes);

  // 16. Stop 2: Open location dropdown
  const stop2LocationButton = page.locator('form[id="stop-2-content-location"] button[type="button"]');
  await expect(stop2LocationButton).toBeVisible();
  await expect(stop2LocationButton).toBeEnabled();
  await stop2LocationButton.click();

  // 17. Stop 2: Select location
  const stop2LocationOption = page.locator('li[aria-label="Cafe and then Some"]').first();
  await expect(stop2LocationOption).toBeVisible();
  await expect(stop2LocationOption).toBeEnabled();
  await stop2LocationOption.click();

  // 18. Line Item 1: Open product dropdown
  const lineItem1ProductButton = page.locator('div[id="line-item-num-1-content"] button[type="button"]');
  await expect(lineItem1ProductButton).toBeVisible();
  await expect(lineItem1ProductButton).toBeEnabled();
  await lineItem1ProductButton.click();

  // 19. Line Item 1: Select product
  const lineItem1ProductOption = page.locator('li[aria-label="just some garbage"]').first();
  await expect(lineItem1ProductOption).toBeVisible();
  await expect(lineItem1ProductOption).toBeEnabled();
  await lineItem1ProductOption.click();

  // 20. Line Item 1: Click Handling input
  const handlingInput = page.locator('#handling-0');
  await expect(handlingInput).toBeVisible();
  await expect(handlingInput).toBeEditable();
  await handlingInput.click();

  // 21. Bill To: Open location dropdown
  const billToLocationButton = page.locator('form[id="bill-to-content-location"] button[type="button"]');
  await expect(billToLocationButton).toBeVisible();
  await expect(billToLocationButton).toBeEnabled();
  await billToLocationButton.click();

  // 22. Bill To: Select location
  const billToLocationOption = page.locator('li[aria-label="Novapath Supply Chain Systems"]').nth(1);
  await expect(billToLocationOption).toBeVisible();
  await expect(billToLocationOption).toBeEnabled();
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

  const successMessage = page.locator('div').filter({ hasText: /^Successfully saved order$/ }).first();
  await expect(successMessage).toBeVisible();
});