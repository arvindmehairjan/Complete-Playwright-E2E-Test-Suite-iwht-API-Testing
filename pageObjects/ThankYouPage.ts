import { Locator, Page, expect } from '@playwright/test'

export class ThankYouPage {

    private page: Page

    constructor(page: Page) {
        this.page = page
    }

    async validateThankYouMsgURL() {
        await this.page.waitForURL("/thank-you");
    }
}