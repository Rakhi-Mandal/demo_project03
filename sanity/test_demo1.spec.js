import testData from '../test-data.json';
import { test, expect } from '@playwright/test';

test('generated flow @sanity', async ({ page }) => {
  // Step 1: Go to the main URL
  await page.goto(testData.url);
  await page.waitForLoadState('domcontentloaded');

  // Step 2: Fill username/email field (TRACE: input[aria-label="Enter your username or email address"])
  const usernameInput = page.locator('input[aria-label="Enter your username or email address"]');
  await expect(usernameInput).toBeVisible();
  await expect(usernameInput).toBeEditable();
  await usernameInput.fill(testData.enterYourUsernameOrEmail);

  // Step 3: Click Continue (TRACE: button[aria-label="Continue"])
  const continueButton = page.locator('button[aria-label="Continue"]');
  await expect(continueButton).toBeEnabled();
  await continueButton.click();

  // Step 4: Fill password (TRACE: input[aria-label="Password"])
  const passwordInput = page.locator('input[aria-label="Password"]');
  await expect(passwordInput).toBeVisible();
  await expect(passwordInput).toBeEditable();
  await passwordInput.fill(testData.password);

  // Step 5: Click Sign in (TRACE: #next)
  const signInButton = page.locator('#next');
  await expect(signInButton).toBeEnabled();
  await signInButton.click();

  // Step 6: Wait for navigation to Microsoft Authentication
  await page.waitForLoadState('domcontentloaded');

  // Step 7: Fill search (TRACE: input[aria-label="Search"])
  const searchInput = page.locator('input[aria-label="Search"]');
  await expect(searchInput).toBeVisible();
  await expect(searchInput).toBeEditable();
  await searchInput.fill(testData.search);

  // Step 8: Click on "Test Client JG" result (TRACE: div with exact text)
  const testClientJGResult = page.locator('div').filter({ hasText: /^Test Client JG$/ }).first();
  await expect(testClientJGResult).toBeVisible();
  await expect(testClientJGResult).toBeEnabled();
  await testClientJGResult.click();

  // Step 9: Click "Shipment Builder" link (TRACE: getByRole('link', { name: "Shipment Builder", exact: true }))
  const shipmentBuilderLink = page.getByRole('link', { name: 'Shipment Builder', exact: true });
  await expect(shipmentBuilderLink).toBeVisible();
  await expect(shipmentBuilderLink).toBeEnabled();
  await shipmentBuilderLink.click();

  // Step 10: Click "Shipment Builder" link again (CODEGEN/TRACE: duplicate, keep as per sequence)
  await expect(shipmentBuilderLink).toBeVisible();
  await shipmentBuilderLink.click();

  // Step 11: Click Origin input (TRACE: #criteria-origin)
  const originInput = page.locator('#criteria-origin');
  await expect(originInput).toBeVisible();
  await expect(originInput).toBeEditable();
  await originInput.click();

  // Step 12: Click overlay div (TRACE: xpath=//section[@id="open-ship-orders-search-builder"]/div[2]/div[1]/div[1]/div[2])
  // Rebuild locator using id attribute from XPath
  const overlayDiv = page.locator('section[id="open-ship-orders-search-builder"] div').nth(1);
  await expect(overlayDiv).toBeVisible();
  await expect(overlayDiv).toBeEnabled();
  await overlayDiv.click();

  // Step 13: Click Cancel button (TRACE: getByRole('button', { name: "Cancel", exact: true }))
  const cancelButton = page.getByRole('button', { name: 'Cancel', exact: true });
  await expect(cancelButton).toBeEnabled();
  await cancelButton.click();

  // Step 14: Click Origin input again
  await originInput.click();

  // Step 15: Click overlay div again
  await overlayDiv.click();

  // Step 16: Click Cancel button again
  await cancelButton.click();

  // Step 17: Click Origin input again
  await originInput.click();

  // Step 18: Scroll (TRACE: scroll to Y=1659, 21%)
  await page.evaluate(() => window.scrollTo(0, 1659));
});