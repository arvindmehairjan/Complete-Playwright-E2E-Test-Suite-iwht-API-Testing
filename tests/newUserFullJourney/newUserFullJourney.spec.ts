import { test } from '@playwright/test';
import { ProductPage } from '../../pageObjects/ProductPage';
import { HomePage } from '../../pageObjects/HomePage';
import { CheckOutPage } from '../../pageObjects/CheckOutPage';
import { LoginPage } from '../../pageObjects/LoginPage';
import { RegisterPage } from '../../pageObjects/RegisterPage';
import { DeliveryDetailsPage } from '../../pageObjects/DeliveryDetailsPage';
import { PaymentPage } from '../../pageObjects/PaymentPage';
import { ThankYouPage } from '../../pageObjects/ThankYouPage'; 
import { v4 as uuidv4 } from 'uuid';
import { deliveryDetails } from '../../data/deliveryDetails';
import { creditCardDetails } from '../../data/creditCardDetails';

test("New User E2E journey", async ({page}) => {
    const productPage = new ProductPage(page);
    const homepage = new HomePage(page);
    const loginPage = new LoginPage(page);
    const deliveryDetailsPage = new DeliveryDetailsPage(page);
    const checkout = new CheckOutPage(page)
    const registerPage = new RegisterPage(page);
    const paymentPage = new PaymentPage(page);
    const thankyouMessage = new ThankYouPage(page);

    const email = uuidv4() + "@gmail.com"
    const password = uuidv4()

    await homepage.visit();
    await productPage.sortByCheapest();
    await productPage.addProductToBasket(0);
    await productPage.addProductToBasket(1);
    await productPage.addProductToBasket(2);

    await homepage.clickOnLink("Checkout", "/basket");
    await checkout.removeCheapestProduct();
    await checkout.continueToCheckout();

    await loginPage.moveToSignup();

    await registerPage.signUpAsNewUser(email, password);

    await deliveryDetailsPage.fillDetails(deliveryDetails);
    await paymentPage.fillPaymentDetails(creditCardDetails);
    await paymentPage.applyDiscount();
    await paymentPage.payOrder();
    
    await thankyouMessage.validateThankYouMsgURL();
});