import { Locator, Page } from '@playwright/test'

export class DeliveryDetailsPage {

    private page: Page
    private firstNameField: Locator
    private lastNameField: Locator
    private addressField: Locator
    private postcodeField: Locator
    private cityField: Locator
    private countryDropdown: Locator
    private continueToPaymentBtn: Locator

    constructor(page: Page) {
        this.page = page
        this.firstNameField = page.locator("[data-qa='delivery-first-name']");
        this.lastNameField = page.locator("[data-qa='delivery-last-name']");
        this.addressField = page.locator("[data-qa='delivery-address-street']");
        this.postcodeField = page.locator("[data-qa='delivery-postcode']");
        this.cityField = page.locator("[data-qa='delivery-city']");
        this.countryDropdown = page.locator("[data-qa='country-dropdown']");
        this.continueToPaymentBtn = page.locator("[data-qa='continue-to-payment-button']")
    }

    async fillDetails(deliveryDetails) {
        await this.firstNameField.waitFor();
        await this.firstNameField.fill(deliveryDetails.firstName);
        await this.lastNameField.fill(deliveryDetails.lastName);
        await this.addressField.fill(deliveryDetails.street);
        await this.postcodeField.fill(deliveryDetails.postcode);
        await this.cityField.fill(deliveryDetails.city);
        await this.countryDropdown.selectOption(deliveryDetails.country);
        await this.continueToPaymentBtn.click();
    }
}
