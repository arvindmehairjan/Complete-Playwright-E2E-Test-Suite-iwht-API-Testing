import { Locator, Page, expect } from '@playwright/test'

export class PaymentPage {

    private page: Page
    private creditcardOwnerField: Locator
    private creditCardNumberField: Locator
    private validUntilField: Locator
    private creditcardCVCField: Locator
    private totalValueField: Locator
    private discountField: Locator
    private submitDiscountBtn: Locator
    private discountedMessage: Locator
    private payBtn: Locator

    constructor(page: Page) {
        this.page = page
        this.creditcardOwnerField = page.locator("[data-qa='credit-card-owner']");
        this.creditCardNumberField = page.locator("[data-qa='credit-card-number']");
        this.validUntilField = page.locator("[data-qa='valid-until']");
        this.creditcardCVCField = page.locator("[data-qa='credit-card-cvc']");
        this.totalValueField = page.locator("[data-qa='total-value']");
        this.discountField = page.locator("[data-qa='discount-code-input']");
        this.submitDiscountBtn = page.locator("[data-qa='submit-discount-button']");
        this.discountedMessage = page.locator("[data-qa='discount-active-message']");
        this.payBtn = page.locator("[data-qa='pay-button']");
    }

    async fillPaymentDetails(creditCardDetails) {
        await this.creditcardOwnerField.waitFor();
        await this.creditcardOwnerField.fill(creditCardDetails.creditCardOwner)
        await this.creditCardNumberField.fill(creditCardDetails.creditCardNumber)
        await this.validUntilField.fill(creditCardDetails.validUntil)
        await this.creditcardCVCField.fill(creditCardDetails.creditCardCVC)
    }

    async applyDiscount() {
        try {
          await this.totalValueField.waitFor();
          const totalValueText = await this.totalValueField.innerText();
          expect(totalValueText).toBe("1098$");
      
          const iframeSelector = '.active-discount-container';
          const iframeElement = await this.page.waitForSelector(iframeSelector, { timeout: 10000 });
      
          const iframe = await iframeElement.contentFrame();
      
          if (!iframe) {
            throw new Error('Failed to switch to the iframe or iframe content not found.');
          }
      
          const textValue = String(await iframe.$eval('.discount-code.text-bold.mt-5', (element) => element.textContent));
          
          await this.discountField.waitFor();
          await this.discountField.fill(textValue);

          await this.page.waitForTimeout(2000);
          await this.submitDiscountBtn.click();

          await this.discountedMessage.waitFor({ timeout: 10000 });

          const discountActivatedMsg = await this.discountedMessage.innerText();
          expect(discountActivatedMsg).toBe("Discount activated!");

        } catch (error) {
          console.error('Error in applyDiscount:', error);
          throw error; 
        }
      }

      async payOrder() {
        await this.payBtn.waitFor();
        await this.payBtn.click();
    }
}