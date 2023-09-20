import { Locator, Page } from '@playwright/test'

export class LoginPage {

    private page: Page
    private moveToSignupBtn: Locator

    constructor(page: Page) {
        this.page = page
        this.moveToSignupBtn = page.locator("[data-qa='go-to-signup-button']")
    }

    async moveToSignup() {
        await this.moveToSignupBtn.waitFor();
        await this.moveToSignupBtn.click();
        this.page.waitForURL(/\/signup/, {timeout: 3000})
    }
}