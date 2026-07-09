import testData from '../test-data.json';
import { test, expect } from '@playwright/test';

test('create orders @sanity', async ({ page }) => {
  // 1. Go to main URL
  await page.goto(testData.url);
  await page.waitForLoadState('domcontentloaded');

  // 2. Login: username/email
  const usernameInput = page.locator('input[aria-label="Enter your username or email address"]');
  await expect(usernameInput).toBeVisible();
  await expect(usernameInput).toBeEditable();
  await usernameInput.fill(testData.enterYourUsernameOrEmail);

  const continueButton = page.locator('button[aria-label="Continue"]');
  await expect(continueButton).toBeEnabled();
  await continueButton.click();

  // 4. Login: password
  const passwordInput = page.locator('input[aria-label="Password"]');
  await expect(passwordInput).toBeVisible();
  await expect(passwordInput).toBeEditable();
  await passwordInput.fill(testData.password);

  const signInButton = page.locator('#next');
  await expect(signInButton).toBeEnabled();
  await signInButton.click();

  // 6. Search for client
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

  // 10. Stop 1: open location dropdown
  const stop1LocationButton = page.locator('form[id="stop-1-content-location"] button[type="button"]').first();
  await expect(stop1LocationButton).toBeVisible();
  await expect(stop1LocationButton).toBeEnabled();
  await stop1LocationButton.click();

  // 11. Stop 1: select location
  const stop1LocationOption = page.locator('li[aria-label="Cafe and then Some"]');
  await expect(stop1LocationOption).toBeVisible();
  await expect(stop1LocationOption).toBeEnabled();
  await stop1LocationOption.click();

  // 12. Stop 1: open date picker
  const chooseDateButton = page.locator('button[aria-label="Choose Date"]');
  await expect(chooseDateButton).toBeVisible();
  await expect(chooseDateButton).toBeEnabled();
  await chooseDateButton.click();

  // 13. Stop 1: select day "30"
  const day30Option = page.locator('span').filter({ hasText: /^30$/ }).first();
  await expect(day30Option).toBeVisible();
  await expect(day30Option).toBeEnabled();
  await day30Option.click();

  // 14. Stop 1: check "Appointment Required"
  const appointmentRequiredCheckbox = page.locator('#stop-1-content-appointment-required');
  await appointmentRequiredCheckbox.check();
  await expect(appointmentRequiredCheckbox).toBeChecked();

  // 15. Stop 1: fill internal notes
  const internalNotesTextarea = page.locator('#stop-1-content-internal-notes');
  await expect(internalNotesTextarea).toBeVisible();
  await expect(internalNotesTextarea).toBeEditable();
  await internalNotesTextarea.fill(testData.stop1ContentInternalNotes);

  // 16. Stop 2: open location dropdown
  const stop2LocationButton = page.locator('form[id="stop-2-content-location"] button[type="button"]').first();
  await expect(stop2LocationButton).toBeVisible();
  await expect(stop2LocationButton).toBeEnabled();
  await stop2LocationButton.click();

  // 17. Stop 2: select location
  const stop2LocationOption = page.locator('li[aria-label="Novapath Supply Chain Systems"]');
  await expect(stop2LocationOption).toBeVisible();
  await expect(stop2LocationOption).toBeEnabled();
  await stop2LocationOption.click();

  // 18. Line item: open description/product dropdown
  const descriptionDropdownButton = page.locator('div[id="line-item-num-1-content"] button[type="button"]').first();
  await expect(descriptionDropdownButton).toBeVisible();
  await expect(descriptionDropdownButton).toBeEnabled();
  await descriptionDropdownButton.click();

  // 19. Line item: select product "another one"
  const productOption = page.locator('li[aria-label="another one"]');
  await expect(productOption).toBeVisible();
  await expect(productOption).toBeEnabled();
  await productOption.click();

  // 20. Line item: click handling input
  const handlingInput = page.locator('#handling-0');
  await expect(handlingInput).toBeVisible();
  await expect(handlingInput).toBeEnabled();
  await handlingInput.click();

  // 21. Bill To: open location dropdown
  const billToLocationButton = page.locator('form[id="bill-to-content-location"] button[type="button"]').first();
  await expect(billToLocationButton).toBeVisible();
  await expect(billToLocationButton).toBeEnabled();
  await billToLocationButton.click();

  // 22. Bill To: select location
  const billToLocationOption = page.locator('li[aria-label="Novapath Supply Chain Systems"]');
  await expect(billToLocationOption).toBeVisible();
  await billToLocationOption.click();

  const directionDropdown = page.locator('span[aria-label="Select Direction"]');
  await expect(directionDropdown).toBeVisible();
  await expect(directionDropdown).toBeEnabled();
  await directionDropdown.click();

  const outboundOption = page.locator('li[aria-label="Outbound"]');
  await expect(outboundOption).toBeVisible();
  await expect(outboundOption).toBeEnabled();
  await outboundOption.click();

  const billingTermsDropdown = page.locator('span[aria-label="Select Billing Terms"]');
  await expect(billingTermsDropdown).toBeVisible();
  await expect(billingTermsDropdown).toBeEnabled();
  await billingTermsDropdown.click();

  const thirdPartyOption = page.locator('li[aria-label="3rd Party"]');
  await expect(thirdPartyOption).toBeVisible();
  await expect(thirdPartyOption).toBeEnabled();
  await thirdPartyOption.click();

  const createOrderButton = page.locator('button[aria-label="Create Order for Test Client JG"]');
  await expect(createOrderButton).toBeEnabled();
  await createOrderButton.click();

  const nmfcNumberInput = page.locator('#nmfc-number-0');
  await expect(nmfcNumberInput).toBeVisible();
  await expect(nmfcNumberInput).toBeEditable();
  await nmfcNumberInput.fill(testData.nmfcNumber0);

  await expect(createOrderButton).toBeEnabled();
  await createOrderButton.click();

  const successMessage = page.locator('div').filter({ hasText: /^Successfully saved order$/ }).first();
  await expect(successMessage).toBeVisible();
});