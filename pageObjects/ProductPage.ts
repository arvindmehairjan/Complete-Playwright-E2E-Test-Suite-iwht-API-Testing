import { Locator, Page, expect } from '@playwright/test'
import { HomePage } from './HomePage';

type ValidIndex = number;

export class ProductPage {

    private page: Page
    private addButtons: Locator
    private sortDropdown: Locator
    private productTitle: Locator

    constructor(page: Page) {
        this.page = page
        this.addButtons = page.locator("[data-qa='product-button']");
        this.sortDropdown = page.locator("[data-qa='sort-dropdown']");
        this.productTitle = page.locator("[data-qa='product-title']")
    }

    async addProductToBasket(index: ValidIndex) {
        const homepage = new HomePage(this.page);
        const specificAddButton = this.addButtons.nth(index);
        await specificAddButton.waitFor();
        await expect(specificAddButton).toHaveText("Add to Basket");
    
        // Get the basket count before adding
        const basketCountBeforeAdding = await homepage.getBasketCount();
    
        await specificAddButton.click();
        await expect(specificAddButton).toHaveText("Remove from Basket");
    
        // Get the basket count after adding
        const basketCountAfterAdding = await homepage.getBasketCount();
    
        if (basketCountBeforeAdding !== null && basketCountAfterAdding !== null) {
            // Check if both values are not null
            expect(basketCountAfterAdding).toBeGreaterThan(basketCountBeforeAdding);
        } else {
            // Handle the case where one or both counts are null
            console.warn('Basket counts are null. Unable to perform comparison.');
        }
    }
    

    async sortByCheapest() {
        await this.sortDropdown.waitFor();
        await this.productTitle.first().waitFor();

        const productTitlesBeforeSorting = await this.productTitle.allInnerTexts();
        await this.sortDropdown.selectOption("price-asc");
        const productTitlesAfterSorting = await this.productTitle.allInnerTexts();
        expect(productTitlesAfterSorting).not.toEqual(productTitlesBeforeSorting);
    }
}

