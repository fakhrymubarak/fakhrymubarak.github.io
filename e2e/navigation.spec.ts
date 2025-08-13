import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should navigate to all sections', async ({ page }) => {
    // Check that all navigation items are present
    await expect(page.getByRole('button', { name: 'Home' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Projects' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Experience' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Contact' })).toBeVisible();
  });

  test('should navigate to projects section', async ({ page }) => {
    await page.getByRole('button', { name: 'Projects' }).click();
    
    // Wait for a smooth scroll to complete
    await page.waitForTimeout(1000);
    
    // Check if we're in the projects section
    await expect(page.locator('#projects')).toBeVisible();
  });

  test('should navigate to experience section', async ({ page }) => {
    await page.getByRole('button', { name: 'Experience' }).click();
    
    await page.waitForTimeout(1000);
    
    await expect(page.locator('#experience')).toBeVisible();
  });

  test('should navigate to contact section', async ({ page }) => {
    await page.getByRole('button', { name: 'Contact' }).click();
    
    await page.waitForTimeout(1000);
    
    await expect(page.locator('#contact')).toBeVisible();
  });

  test('should toggle mobile menu', async ({ page }) => {
    // Set viewport to mobile size
    await page.setViewportSize({ width: 375, height: 667 });
    
    const menuButton = page.getByRole('button', { name: /toggle mobile menu/i });
    await expect(menuButton).toBeVisible();
    
    // Open menu
    await menuButton.click();
    await expect(page.getByRole('navigation', { name: /mobile navigation/i })).toBeVisible();
    
    // Close menu
    await menuButton.click();
    await expect(page.getByRole('navigation', { name: /mobile navigation/i })).not.toBeVisible();
  });

  test('should close mobile menu when navigation item is clicked', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    
    const menuButton = page.getByRole('button', { name: /toggle mobile menu/i });
    await menuButton.click();
    
    await expect(page.getByRole('navigation', { name: /mobile navigation/i })).toBeVisible();
    
    // Click a navigation item
    await page.getByRole('button', { name: 'Projects' }).click();
    
    await expect(page.getByRole('navigation', { name: /mobile navigation/i })).not.toBeVisible();
  });
});
