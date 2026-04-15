import { Page, Locator } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly searchBox: Locator;
  readonly searchButton: Locator;
  readonly computersMenu: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchBox = page.locator('input[id="small-searchterms"]');
    this.searchButton = page.locator('button[type="submit"][class*="search-box-button"]');
    this.computersMenu = page.getByRole('button', { name: 'Computers' }).first();
  }

  async goto() {
    await this.page.goto('https://demo.nopcommerce.com/');
    await this.page.waitForLoadState('networkidle');
  }

  async searchFor(term: string) {
    await this.searchBox.fill(term);
    await this.searchButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async navigateToComputers() {
    await this.page.goto('https://demo.nopcommerce.com/computers');
    await this.page.waitForLoadState('networkidle');
  }

  async navigateToDesktops() {
    await this.page.goto('https://demo.nopcommerce.com/desktops');
    await this.page.waitForLoadState('networkidle');
  }
}
