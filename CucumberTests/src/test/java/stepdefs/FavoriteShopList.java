package stepdefs;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class FavoriteShopList {
    @Given("^the user has at least (\\d+) favorite shop$")
    public void the_user_has_at_least_favorite_shop(int arg1) throws Exception {
    }

    @Then("^the profile page should open$")
    public void the_profile_page_should_open() throws Exception {
        WebElement profile_info_text = (new WebDriverWait(Preconditions.driver, Preconditions.delaySeconds))
                .until(ExpectedConditions.elementToBeClickable(By.cssSelector("table.table.table-hover")));
        assert(profile_info_text.isDisplayed());
    }

    @Then("^he should see his favorite shops list$")
    public void he_should_see_his_favorite_shops_list() throws Exception {
    }

    @When("^he clicks on delete a favorite shop entry$")
    public void he_clicks_on_delete_a_favorite_shop_entry() throws Exception {
    }

    @Then("^the favorite shop entry should be deleted$")
    public void the_favorite_shop_entry_should_be_deleted() throws Exception {
    }
}
