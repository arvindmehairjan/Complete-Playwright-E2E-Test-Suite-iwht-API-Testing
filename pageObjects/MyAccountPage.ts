import { Locator, Page } from '@playwright/test'

export class myAccountPage {

    private page: Page

    constructor(page: Page) {
        this.page = page
    }

    async visit() {
        await this.page.goto("/my-account")
    }
}