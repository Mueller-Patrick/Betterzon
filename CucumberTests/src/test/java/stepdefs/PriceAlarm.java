package stepdefs;

import cucumber.api.java.en.Given;
import cucumber.api.java.en.Then;
import cucumber.api.java.en.When;

public class PriceAlarm {
  @Given("^the user has at least (\\d+) price alarm set$")
  public void the_user_has_at_least_price_alarm_set(int arg1) throws Exception {
  }

  @When("^the user clicks on the profile icon$")
  public void the_user_clicks_on_the_profile_icon() throws Exception {
  }

  @Then("^the profile details popup should open$")
  public void the_profile_details_popup_should_open() throws Exception {
  }

  @When("^the user clicks on price alarms$")
  public void the_user_clicks_on_price_alarms() throws Exception {
  }

  @Then("^the price alarm list should open$")
  public void the_price_alarm_list_should_open() throws Exception {
  }

  @Then("^the price alarm list should contain at least (\\d+) entry$")
  public void the_price_alarm_list_should_contain_at_least_entry(int arg1) throws Exception {
  }

  @Then("^the price alarm list should contain a maximum of (\\d+) entries per page$")
  public void the_price_alarm_list_should_contain_a_maximum_of_entries_per_page(int arg1) throws Exception {
  }

  @Given("^the user is on the price alarm list page$")
  public void the_user_is_on_the_price_alarm_list_page() throws Exception {
  }

  @When("^the user clicks on the \"([^\"]*)\" button next to a price alarm$")
  public void the_user_clicks_on_the_button_next_to_a_price_alarm(String arg1) throws Exception {
  }

  @Then("^a popup should open asking the user to confirm the removal$")
  public void a_popup_should_open_asking_the_user_to_confirm_the_removal() throws Exception {
  }

  @When("^the user confirms the removal of the price alarm$")
  public void the_user_confirms_the_removal_of_the_price_alarm() throws Exception {
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
