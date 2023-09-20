import { Locator, Page } from '@playwright/test'

export class RegisterPage {

    private page: Page
    private emailInput: Locator
    private passwordInput: Locator
    private registerBtn: Locator

    constructor(page: Page) {
        this.page = page
        this.emailInput = page.getByPlaceholder('E-Mail');
        this.passwordInput = page.getByPlaceholder('Password');
        this.registerBtn = page.getByRole('button', { name: 'Register'});
    }

    async signUpAsNewUser(email: string, password: string) {
        await this.emailInput.waitFor();
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.registerBtn.waitFor();
        await this.registerBtn.click();
    }
}