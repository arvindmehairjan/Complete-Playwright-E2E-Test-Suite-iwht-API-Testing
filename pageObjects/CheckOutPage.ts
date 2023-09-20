import { Locator, Page } from '@playwright/test'

export class CheckOutPage {

    private page: Page
    private basketCards: Locator
    private basketItemPrice: Locator
    private basketItemRemoveButton: Locator
    private continueToCheckoutButton: Locator

    constructor(page: Page) {
        this.page = page
        this.basketCards = page.locator("[data-qa='basket-card']");
        this.basketItemPrice = page.locator("[data-qa='basket-item-price']");
        this.basketItemRemoveButton = page.locator("[data-qa='basket-card-remove-item']");
        this.continueToCheckoutButton = page.locator("[data-qa='continue-to-checkout']")
    }
    async removeCheapestProduct() {
        await this.basketCards.first().waitFor();
        await this.basketItemPrice.first().waitFor();
        const allPriceTexts = await this.basketItemPrice.allInnerTexts();
        const productPrices: number[] = allPriceTexts.map((el) => parseInt(el, 10));
        const cheapestProduct: number = Math.min(...productPrices)
        const placeIndex: number = productPrices.indexOf(cheapestProduct);
        await this.basketItemRemoveButton.nth(placeIndex).click();
    }

    async continueToCheckout() {
        await this.continueToCheckoutButton.waitFor();
        await this.continueToCheckoutButton.click();
        await this.page.waitForURL(/\/login/, {timeout: 5000});
    }
}

