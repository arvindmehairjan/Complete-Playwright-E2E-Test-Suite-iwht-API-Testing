import { Locator, Page } from '@playwright/test'

const isDesktopViewport = (page) => {
    const size = page.viewportSize();
    size.width >= 600;
}

export class HomePage {

    private page: Page
    private basketCounter: Locator

    constructor(page: Page) {
        this.page = page
        this.basketCounter = page.locator("[data-qa='header-basket-count']");

    }
    async visit() {
        await this.page.goto("/");
    }

    async clickOnLink(linkToBeClicked: string, URLtoBeLoaded: string) {
        const getLink = this.page.getByRole('link', { name: linkToBeClicked });
        await getLink.click();
        await this.page.waitForURL(URLtoBeLoaded);
    }

    async getBasketCount() {
        await this.basketCounter.waitFor();
        const text = await this.basketCounter.innerText();
        return parseInt(text, 10);
    }
}

