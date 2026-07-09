import testData from '../test-data.json';
import { test, expect } from '@playwright/test';

test('shilpment @sanity', async ({ page }) => {
  // 1. Go to the main URL
  await page.goto(testData.url);
  await page.waitForLoadState('domcontentloaded');

  // 2. Enter username/email
  const usernameInput = page.locator('input[aria-label="Enter your username or email address"]');
  await expect(usernameInput).toBeVisible();
  await expect(usernameInput).toBeEditable();
  await usernameInput.fill(testData.enterYourUsernameOrEmail);

  const continueButton = page.locator('button[aria-label="Continue"]');
  await expect(continueButton).toBeEnabled();
  await continueButton.click();

  // 4. Enter password
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

  // 8. Enter Dashboard iframe
  const dashboardFrame = page.frameLocator('iframe[title="Dashboard"]');

  const shipmentBuilderLink = page.getByRole('link', { name: 'Shipment Builder', exact: true });
  await expect(shipmentBuilderLink).toBeVisible();
  await expect(shipmentBuilderLink).toBeEnabled();
  await shipmentBuilderLink.click();

  const originInput = page.locator('#criteria-origin');
  await expect(originInput).toBeVisible();
  await expect(originInput).toBeEnabled();
  await originInput.click();

  // Since only a structural XPath is given, and no unique attribute, but the next step is to select a location, we keep the sequence.
  // This button is likely the dropdown opener for the location list.
  // As per rules, reconstruct using tagName and type.
  const locationDropdownButton = page.locator('button[type="button"]').first();
  await expect(locationDropdownButton).toBeVisible();
  await expect(locationDropdownButton).toBeEnabled();
  await locationDropdownButton.click();

  const locationOption = page.locator('li[aria-label="Cafe and then Some"]');
  await expect(locationOption).toBeVisible();
  await expect(locationOption).toBeEnabled();
  await locationOption.click();

  const doneButton = page.getByRole('button', { name: 'Done', exact: true }).first();
  await expect(doneButton).toBeEnabled();
  await doneButton.click();

  const addToShipmentButton = page.locator('button[aria-label="Add to Shipment"]');
  await expect(addToShipmentButton).toBeEnabled();
  await addToShipmentButton.click();

  const createShipmentButton = page.locator('button[aria-label="Create Shipment"]');
  await expect(createShipmentButton).toBeEnabled();
  await createShipmentButton.click();

  const successMessage = page.locator('div').filter({ hasText: /^Successfully saved shipment$/ }).first();
  await expect(successMessage).toBeVisible();
});