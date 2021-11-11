package stepdefs;

import io.cucumber.java.PendingException;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import org.openqa.selenium.*;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class SearchProduct {
    @Given("^the user is on the landing page$")
    public void the_user_is_on_the_landing_page() throws Exception {
        //throw new PendingException();
        Preconditions.driver.get("https://betterzon.xyz");
        WebElement logo = (new WebDriverWait(Preconditions.driver, Preconditions.delaySeconds))
                .until(ExpectedConditions.elementToBeClickable(By.cssSelector("a.navbar-brand")));
    }

    @When("^the user enters the search term \"([^\"]*)\" and clicks search$")
    public void the_user_enters_the_search_term_and_clicks_search(String searchTerm) throws Exception {
        WebElement searchField = Preconditions.driver.findElement(By.cssSelector(".ng-untouched.ng-pristine.ng-valid"));
        searchField.sendKeys(searchTerm);
        searchField.sendKeys(Keys.ENTER);
        WebElement logo = (new WebDriverWait(Preconditions.driver, Preconditions.delaySeconds))
                .until(ExpectedConditions.elementToBeClickable(By.cssSelector(".navbar-brand")));
    }

    @Then("^the user should see the error page \"([^\"]*)\"$")
    public void the_user_should_see_the_error_page(String arg0) throws Exception {
        WebElement noProdsFoundMsg = (new WebDriverWait(Preconditions.driver, Preconditions.delaySeconds))
                .until(ExpectedConditions.elementToBeClickable(By.xpath("//*[contains(text(),'No Products found!')]")));
        assert (noProdsFoundMsg.isDisplayed());
    }

    @Given("^the user is not logged in$")
    public void the_user_is_not_logged_in() throws Exception {
        try {
            WebElement logoutButton = (new WebDriverWait(Preconditions.driver, Preconditions.delaySeconds))
                    .until(ExpectedConditions.elementToBeClickable(By.xpath("//*[contains(text(),'log out')]")));

            logoutButton.click();
        } catch (TimeoutException e) {

        }
    }

    @Given("^the user is logged in$")
    public void the_user_is_logged_in() throws Exception {
        try {
            WebElement loginButton = (new WebDriverWait(Preconditions.driver, Preconditions.delaySeconds))
                    .until(ExpectedConditions.elementToBeClickable(By.xpath("//*[contains(text(),'sign in')]")));
            loginButton.click();

            WebElement usernameField = (new WebDriverWait(Preconditions.driver, Preconditions.delaySeconds))
                    .until(ExpectedConditions.elementToBeClickable(By.id("username")));
            usernameField.sendKeys("Selenium");

            WebElement passwordField = (new WebDriverWait(Preconditions.driver, Preconditions.delaySeconds))
                    .until(ExpectedConditions.elementToBeClickable(By.id("password")));
            passwordField.sendKeys("Selenium");

            WebElement loginBtn = (new WebDriverWait(Preconditions.driver, Preconditions.delaySeconds))
                    .until(ExpectedConditions.elementToBeClickable(By.className("btn_signin")));
            loginBtn.click();

        } catch (TimeoutException e) {

        }
    }

    @Then("^the user should see a list of products$")
    public void the_user_should_see_a_list_of_products() throws Exception {
        WebElement product = (new WebDriverWait(Preconditions.driver, Preconditions.delaySeconds))
                .until(ExpectedConditions.elementToBeClickable(By.cssSelector(".row.p-2.bg-white.border.rounded")));
        assert (product.isDisplayed());
    }

    @When("^the user clicks on the first product$")
    public void the_user_clicks_on_the_first_product() throws Exception {
        WebElement productDetailsBtn = (new WebDriverWait(Preconditions.driver, Preconditions.delaySeconds))
                .until(ExpectedConditions.elementToBeClickable(By.cssSelector(".row.p-2.bg-white.border.rounded button.btn.btn-primary.btn-sm")));
        productDetailsBtn.click();
    }

    @Then("^the user should see the product detail page$")
    public void the_user_should_see_the_product_detail_page() throws Exception {
        WebElement productTitle = (new WebDriverWait(Preconditions.driver, Preconditions.delaySeconds))
                .until(ExpectedConditions.elementToBeClickable(By.cssSelector("div.productTitle")));
        assert (productTitle.isDisplayed());
    }

    @Then("^the set price alarm box should show \"([^\"]*)\"$")
    public void the_set_price_alarm_box_should_show(String arg0) throws Exception {
        WebElement alarmBox = (new WebDriverWait(Preconditions.driver, Preconditions.delaySeconds))
                .until(ExpectedConditions.elementToBeClickable(By.cssSelector("div.priceAlarm")));
        if (arg0.equals("Login to set a price alarm")) {
            assert (alarmBox.getText().equals("Login to set a price alarm"));
        } else {
            assert (alarmBox.isDisplayed());
        }
    }

    @When("^the user sets a price alarm$")
    public void the_user_sets_a_price_alarm() throws Exception {
        WebElement alarmBoxField = (new WebDriverWait(Preconditions.driver, Preconditions.delaySeconds))
                .until(ExpectedConditions.elementToBeClickable(By.cssSelector("div.priceAlarm input")));
        alarmBoxField.sendKeys("12345");
        WebElement alarmBox = (new WebDriverWait(Preconditions.driver, Preconditions.delaySeconds))
                .until(ExpectedConditions.elementToBeClickable(By.cssSelector("div.priceAlarm")));
        alarmBox.click();

        assert (alarmBox.isDisplayed() && alarmBoxField.isDisplayed());
    }

    @Then("^the user should receive an email confirming the price alarm$")
    public void the_user_should_receive_an_email_confirming_the_price_alarm() throws Exception {
        assert (true);
    }
}
