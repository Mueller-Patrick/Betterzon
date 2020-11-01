package stepdefs;

import cucumber.api.PendingException;
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

  @Given("^the user is not logged in$")
  public void the_user_is_not_logged_in() throws Exception {
  }

  @Given("^the user is logged in$")
  public void the_user_is_logged_in() throws Exception {
  }

  @Then("^the user should see a list of products$")
  public void the_user_should_see_a_list_of_products() throws Exception {
  }

  @When("^the user clicks on the first product$")
  public void the_user_clicks_on_the_first_product() throws Exception {
  }

  @Then("^the user should see the product detail page$")
  public void the_user_should_see_the_product_detail_page() throws Exception {
  }

  @Then("^the set price alarm box should show \"([^\"]*)\"$")
  public void the_set_price_alarm_box_should_show(String arg0) throws Exception {
  }

  @When("^the user sets a price alarm$")
  public void the_user_sets_a_price_alarm() throws Exception {
  }

  @Then("^the user should receive an email confirming the price alarm$")
  public void the_user_should_receive_an_email_confirming_the_price_alarm() throws Exception {
  }
}
