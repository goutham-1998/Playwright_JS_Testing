const { test, expect } = require('@playwright/test');

test("Browser Fixture Test One", async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://www.youtube.com/");


});

test("Browser Fixture Test Two", async ({ page }) => {

    // steps to validate when entered incorrect username and password
    const userName = page.locator('#username');
    const signIn = page.locator('#signInBtn');
    const pwd = page.locator("[name='password']");
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await userName.fill('rahulshettyacademy');
    await pwd.fill('Learning@830$3mK2000');
    await signIn.click({ timeout: 1000 });
    console.log(await page.locator("[style*='block']").textContent()); //textContent() - Used to extract text from the message
    await expect(page.locator("[style*='block']")).toContainText("Incorrect") //An assertion to compare the text with the sub-string



    // Steps to validate correct login & extract the text from the first two titles (PRODUCT NAMES) inside the login page
    await userName.fill("");
    await userName.fill("rahulshettyacademy");
    await pwd.fill("");
    await pwd.fill("Learning@830$3mK2");
    await signIn.click();
    console.log(await page.locator(".card-body a").first().textContent()); //first() - Method that selects the FIRST matching element from a group of elements.
    console.log(await page.locator(".card-body a").nth(1).textContent()); //nth(index) - Element at index (0-based) 
    console.log(await page.locator(".card-body a").last().textContent()); //last() - Method that selects the LAST matching element from a group of elements.
    const allTitles = await page.locator(".card-body a").allTextContents();
    console.log(allTitles);
    await expect(page.locator(".card-body a").nth(0)).toContainText("iphone X");




});

test("Login Practice - 1", async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.locator("#userEmail").fill("ggummadipudi@gmail.com");
    await page.locator("#userPassword").fill("Password123");
    await page.locator("#login").click();
    //console.log(await page.locator("[style*='text-transform']").first().textContent()); 

    //While using allTextContents() method the return type is Array. Array[0] is also valid. While the page is loading, this method won't auto-wait and returns the blank page as an Array without any elements

    // await page.waitForLoadState("networkidle"); // To overome the allTextContents() method issue, we can use waitForLoadState("networkidle") which waits until the network calls halt
    await page.locator("[style*='text-transform']").last().waitFor(); // As waitForLoadState("networkidle") sometimes might lead to flaky, we can use waitfor() method and we can hint that until which element it has to wait before auto-timing out.
    const allTitles = await page.locator("[style*='text-transform']").allTextContents();
    console.log(allTitles)


});


test("UI Controls", async ({ page }) => {

    const userName = page.locator('#username');
    const signIn = page.locator('#signInBtn');
    const pwd = page.locator("[name='password']");
    const blinkText = page.locator("[href*= 'documents-request']");
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await userName.fill('rahulshettyacademy');
    await pwd.fill('Learning@830$3mK2000');
    await page.locator(".radiotextsty").last().click();
    await expect(page.locator(".radiotextsty").last()).toBeChecked();
    //console.log(expect(page.locator(".radiotextsty").last().isChecked()));
    await page.locator("#okayBtn").click();
    const dropDown = await page.locator("select.form-control")
    await dropDown.selectOption("Consultant");
    await page.locator("#terms").click();
    await expect(page.locator("#terms")).toBeChecked();
    //await page.locator("#terms").uncheck();
    await expect(blinkText).toHaveAttribute("class", "blinkingText");




});

test.only("Handling Child Windows", async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const blinkText = await page.locator("[href*= 'documents-request']");

    const [newPage] = await Promise.all([context.waitForEvent("page"), blinkText.click(),]);

    const redText = await newPage.locator("[class='im-para red']").textContent();
    console.log(redText);








});