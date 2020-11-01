package stepdefs;

import cucumber.api.PendingException;
import cucumber.api.java.en.And;
import cucumber.api.java.en.Given;
import cucumber.api.java.en.Then;
import cucumber.api.java.en.When;

public class SearchProduct {
  @Given("^the user is on the landing page$")
  public void the_user_is_on_the_landing_page() throws Exception {
  }

  @When("^the user enters the search term \"([^\"]*)\" and clicks search$")
  public void the_user_enters_the_search_term_and_clicks_search(String arg0) throws Exception {
  }

  @Then("^the user should see the error page \"([^\"]*)\"$")
  public void the_user_should_see_the_error_page(String arg0) throws Exception {
  }

  @And("^the user is not logged in$")
  public void the_user_is_not_logged_in() throws Exception {
  }

  @And("^the user is logged in$")
  public void the_user_is_logged_in() throws Exception {
  }
}
