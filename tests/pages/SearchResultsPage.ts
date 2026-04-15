import { Page, Locator, expect } from '@playwright/test';

export class SearchResultsPage {
  readonly page: Page;
  readonly productTitles: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productTitles = page.locator('.product-title');
  }

  async verifyProductExists(productName: string) {
    const titles = await this.productTitles.allTextContents();
    const trimmedTitles = titles.map(title => title.trim());
    const productExists = trimmedTitles.some(title => title.includes(productName));
    
    expect(productExists).toBeTruthy();
  }

  async getProductList() {
    const titles = await this.productTitles.allTextContents();
    return titles.map(title => title.trim()).filter(title => title.length > 0);
  }
}
