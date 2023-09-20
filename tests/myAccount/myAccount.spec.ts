import { test } from '@playwright/test';
import { myAccountPage } from '../../pageObjects/MyAccountPage';
import { getLoginToken } from '../../apiCalls/getLoginToken';
import { userDetails } from '../../data/userDetails';

test("Account using cookie injection and mocking network requests", async ({page}) => {
    const loginToken = await getLoginToken(userDetails.username, userDetails.password);
    
    await page.route("**/api/user**",async (route, request) => {
        await route.fulfill({
            status: 500,
            contentType: "application/json",
            body: JSON.stringify({message: "ERROR ERROR"}),
        });
    });

    const myAccount = new myAccountPage(page);
    await myAccount.visit();
    await page.evaluate((loginTokenInsideBrowserCode) => {
        document.cookie = "token=" + loginTokenInsideBrowserCode
    }, [loginToken]);
    await myAccount.visit();
});