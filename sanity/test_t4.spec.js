import testData from '../test-data.json';
import { test, expect } from '@playwright/test';

test('generated flow @sanity', async ({ page }) => {
  // Initial navigation
  await page.goto(testData.url);
  await page.waitForLoadState('domcontentloaded');

  // Username/email input
  const usernameInput = page.locator('input[aria-label="Enter your username or email address"]');
  await expect(usernameInput).toBeVisible();
  await expect(usernameInput).toBeEditable();
  await usernameInput.fill(testData.enterYourUsernameOrEmail);

  // Continue button
  const continueButton = page.locator('button[aria-label="Continue"]');
  await expect(continueButton).toBeEnabled();
  await continueButton.click();

  // Password input
  const passwordInput = page.locator('input[aria-label="Password"]');
  await expect(passwordInput).toBeVisible();
  await expect(passwordInput).toBeEditable();
  await passwordInput.fill(testData.password);

  // Sign in button
  const signInButton = page.locator('#next');
  await expect(signInButton).toBeEnabled();
  await signInButton.click();

  await page.waitForLoadState('domcontentloaded');

  // Search for client
  const searchInput = page.locator('input[aria-label="Search"]');
  await expect(searchInput).toBeVisible();
  await expect(searchInput).toBeEditable();
  await searchInput.fill(testData.search);

  const clientResult = page.locator('span').filter({ hasText: /^Test Client JG$/ }).first();
  await expect(clientResult).toBeVisible();
  await expect(clientResult).toBeEnabled();
  await clientResult.click();

  const shipmentBuilderLink = page.getByRole('link', { name: 'Shipment Builder', exact: true });
  await expect(shipmentBuilderLink).toBeVisible();
  await expect(shipmentBuilderLink).toBeEnabled();
  await shipmentBuilderLink.click();

  // Clear Location Filter
  // const clearLocationFilterButton = page.locator('button[aria-label="Clear Location Filter"]');
  // await expect(clearLocationFilterButton).toBeEnabled();
  // await clearLocationFilterButton.click();

  const originInput = page.locator('#criteria-origin');
  await expect(originInput).toBeVisible();
  await expect(originInput).toBeEnabled();
  await originInput.click();

  // This is the button next to the Origin input, but no stable locator except position in codegen/trace
  // Since no better locator, skip variable and inline as per strict rules
  await expect(page.locator('button[type="button"]').first()).toBeEnabled();
  await page.locator('button[type="button"]').first().click();

  // Focus on location combobox input
  const locationComboboxInput = page.locator('#criteria-origin-location-id');
  await expect(locationComboboxInput).toBeVisible();
  await expect(locationComboboxInput).toBeEditable();

  const locationOption = page.locator('li[aria-label="Novapath Supply Chain Systems"]');
  await expect(locationOption).toBeVisible();
  await expect(locationOption).toBeEnabled();
  await locationOption.click();

  // Focus again on location combobox input (as per trace)
  await expect(locationComboboxInput).toBeVisible();

  const doneButton = page.getByRole('button', { name: 'Done', exact: true }).first();
  await expect(doneButton).toBeEnabled();
  await doneButton.click();

  const addToShipmentButton = page.locator('button[aria-label="Add to Shipment"]');
  await expect(addToShipmentButton).toBeEnabled();
  await addToShipmentButton.click();

  // Scroll before Create Shipment (as per trace)
  // (No actionable element to scroll to, so skip explicit scroll step)

  const createShipmentButton = page.locator('button[aria-label="Create Shipment"]');
  await expect(createShipmentButton).toBeEnabled();
  await createShipmentButton.click();

  const successMessage = page.locator('div').filter({ hasText: /^Successfully saved shipment$/ }).first();
  await expect(successMessage).toBeVisible();
});