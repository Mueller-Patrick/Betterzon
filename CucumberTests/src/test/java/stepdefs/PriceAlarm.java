package stepdefs;

import io.cucumber.java.PendingException;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.util.List;

public class PriceAlarm {
    @Given("^the user has at least (\\d+) price alarm set$")
    public void the_user_has_at_least_price_alarm_set(int arg1) throws Exception {
    }

    @When("^the user clicks on the profile icon$")
    public void the_user_clicks_on_the_profile_icon() throws Exception {
        WebElement profileButton = (new WebDriverWait(Preconditions.driver, Preconditions.delaySeconds))
                .until(ExpectedConditions.elementToBeClickable(By.xpath("//*[contains(text(),'profile')]")));
        profileButton.click();
    }

    @Then("^the price alarm list should contain at least (\\d+) entry$")
    public void the_price_alarm_list_should_contain_at_least_entry(int arg1) throws Exception {
        WebElement alarmEntry = (new WebDriverWait(Preconditions.driver, Preconditions.delaySeconds))
                .until(ExpectedConditions.elementToBeClickable(By.cssSelector("table.table.table-hover tr:nth-child(2)")));

        assert (alarmEntry != null);
    }

    @Given("^the user is on the profile page$")
    public void the_user_is_on_the_profile_page() throws Exception {
        Preconditions.driver.get("https://www.betterzon.xyz/profile");

        WebElement profile_info_text = (new WebDriverWait(Preconditions.driver, Preconditions.delaySeconds))
                .until(ExpectedConditions.elementToBeClickable(By.cssSelector("table.table.table-user-information")));
        assert (profile_info_text.isDisplayed());
    }

    @When("^the user clicks on the \"([^\"]*)\" button next to a price alarm$")
    public void the_user_clicks_on_the_button_next_to_a_price_alarm(String arg1) throws Exception {
        if (arg1.equals("remove")) {
            WebElement entry = (new WebDriverWait(Preconditions.driver, Preconditions.delaySeconds))
                    .until(ExpectedConditions.elementToBeClickable(By.cssSelector("table.table.table-hover tr:nth-child(2)")));

            if (entry == null) {
                throw new Exception("Too few price alarm entries found!");
            }

            WebElement btn = entry.findElement(By.cssSelector("img.delete[src='../assets/images/Delete_icon-icons.com_55931.png']"));

            btn.click();
        } else if (arg1.equals("edit")) {
        }
    }

    @Then("^the price alarm should be removed from the database$")
    public void the_price_alarm_should_be_removed_from_the_database() throws Exception {
    }

    @Then("^a popup should open where the user can edit the alarm$")
    public void a_popup_should_open_where_the_user_can_edit_the_alarm() throws Exception {
    }

    @When("^the user clicks on the \"([^\"]*)\" button$")
    public void the_user_clicks_on_the_button(String arg1) throws Exception {
    }

    @Then("^the price alarm should be updated in the database$")
    public void the_price_alarm_should_be_updated_in_the_database() throws Exception {
    }
}
