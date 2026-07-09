import testData from '../test-data.json';
import { test, expect } from '@playwright/test';

test('create order @sanity', async ({ page }) => {
  // 1. Go to the main URL and wait for DOM to load
  await page.goto(testData.url);
  await page.waitForLoadState('domcontentloaded');

  const signInNameInput = page.locator('input[aria-label="Enter your username or email address"]');
  await expect(signInNameInput).toBeVisible();
  await expect(signInNameInput).toBeEditable();
  await signInNameInput.fill(testData.enterYourUsernameOrEmail);

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
    await page.waitForTimeout(7000);

  const newOrderButton = page.locator('[data-testid="order-list-new-button"]');
  await expect(newOrderButton).toBeVisible();
  await expect(newOrderButton).toBeEnabled();
  await newOrderButton.click();

  // 11. Stop 1: Select Location
  const stop1LocationButton = page.locator('form[id="stop-1-content-location"] button[type="button"]').first();
  await expect(stop1LocationButton).toBeVisible();
  await expect(stop1LocationButton).toBeEnabled();
  await stop1LocationButton.click();

  const stop1LocationOption = page.locator('li[aria-label="Novapath Supply Chain Systems"]').first();
  await expect(stop1LocationOption).toBeVisible();
  await expect(stop1LocationOption).toBeEnabled();
  await stop1LocationOption.click();

  // 12. Stop 1: Choose Date
  const chooseDateButton = page.locator('button[aria-label="Choose Date"]').first();
  await expect(chooseDateButton).toBeVisible();
  await expect(chooseDateButton).toBeEnabled();
  await chooseDateButton.click();

  const day30Option = page.locator('span').filter({ hasText: /^30$/ }).first();
  await expect(day30Option).toBeVisible();
  await expect(day30Option).toBeEnabled();
  await day30Option.click();

  // 13. Stop 1: Appointment Required - No
  const noDiv = page.locator('div').filter({ hasText: /^No$/ }).first();
  await expect(noDiv).toBeVisible();
  await expect(noDiv).toBeEnabled();
  await noDiv.click();

  const noSpan = page.locator('span').filter({ hasText: /^No$/ }).first();
  await expect(noSpan).toBeVisible();
  await expect(noSpan).toBeEnabled();
  await noSpan.click();

  // 14. Stop 1: Appointment Required Checkbox
  const appointmentRequiredCheckbox = page.locator('#stop-1-content-appointment-required');
  await expect(appointmentRequiredCheckbox).toBeVisible();
  await appointmentRequiredCheckbox.check();
  await expect(appointmentRequiredCheckbox).toBeChecked();

  // 15. Stop 1: Internal Notes
  const internalNotesTextarea = page.locator('#stop-1-content-internal-notes');
  await expect(internalNotesTextarea).toBeVisible();
  await expect(internalNotesTextarea).toBeEditable();
  await internalNotesTextarea.fill(testData.stop1ContentInternalNotes);

  // 16. Stop 2: Select Location
  const stop2LocationButton = page.locator('form[id="stop-2-content-location"] button[type="button"]').first();
  await expect(stop2LocationButton).toBeVisible();
  await expect(stop2LocationButton).toBeEnabled();
  await stop2LocationButton.click();

  const stop2LocationOption = page.locator('li[aria-label="Novapath Supply Chain Systems"]').first();
  await expect(stop2LocationOption).toBeVisible();
  await stop2LocationOption.click();

  // 17. Line Item 1: Select Product/Description
  const lineItemButton = page.locator('div[id="line-item-num-1-content"] button[type="button"]').first();
  await expect(lineItemButton).toBeVisible();
  await expect(lineItemButton).toBeEnabled();
  await lineItemButton.click();

  const productOption = page.locator('li[aria-label="just some garbage"]').first();
  await expect(productOption).toBeVisible();
  await expect(productOption).toBeEnabled();
  await productOption.click();

  // 18. Line Item 1: Handling
  const handlingInput = page.locator('#handling-0');
  await expect(handlingInput).toBeVisible();
  await expect(handlingInput).toBeEnabled();
  await handlingInput.click();

  // 19. Bill To: Select Location
  const billToLocationButton = page.locator('form[id="bill-to-content-location"] button[type="button"]').first();
  await expect(billToLocationButton).toBeVisible();
  await expect(billToLocationButton).toBeEnabled();
  await billToLocationButton.click();

  const billToLocationOption = page.locator('li[aria-label="Novapath Supply Chain Systems"]').first();
  await expect(billToLocationOption).toBeVisible();
  await billToLocationOption.click();

  const directionCombobox = page.locator('span[aria-label="Select Direction"]');
  await expect(directionCombobox).toBeVisible();
  await expect(directionCombobox).toBeEnabled();
  await directionCombobox.click();

  const transferOption = page.locator('li[aria-label="Transfer"]').first();
  await expect(transferOption).toBeVisible();
  await expect(transferOption).toBeEnabled();
  await transferOption.click();

  const billingTermsCombobox = page.locator('span[aria-label="Select Billing Terms"]');
  await expect(billingTermsCombobox).toBeVisible();
  await expect(billingTermsCombobox).toBeEnabled();
  await billingTermsCombobox.click();

  const prepaidOption = page.locator('li[aria-label="Prepaid"]').first();
  await expect(prepaidOption).toBeVisible();
  await expect(prepaidOption).toBeEnabled();
  await prepaidOption.click();

  const requestedModeCombobox = page.locator('span[aria-label="Select Requested Mode"]');
  await expect(requestedModeCombobox).toBeVisible();
  await expect(requestedModeCombobox).toBeEnabled();
  await requestedModeCombobox.click();

  const courierOption = page.locator('li[aria-label="Courier"]').first();
  await expect(courierOption).toBeVisible();
  await expect(courierOption).toBeEnabled();
  await courierOption.click();

  // 23. Create Order
  const createOrderButton = page.locator('button[aria-label="Create Order for Test Client JG"]');
  await expect(createOrderButton).toBeEnabled();
  await createOrderButton.click();

  const successMessage = page.locator('div').filter({ hasText: /^Successfully saved order$/ }).first();
  await expect(successMessage).toBeVisible();
});