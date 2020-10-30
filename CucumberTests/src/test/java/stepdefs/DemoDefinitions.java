package stepdefs;

import cucumber.api.PendingException;
import cucumber.api.java.en.Given;
import cucumber.api.java.en.Then;
import cucumber.api.java.en.When;

public class DemoDefinitions {

  @Given("^I have a configured cucumber-jvm project$")
  public void i_have_a_configured_cucumber_jvm_project() throws Exception {
    // Write code here that turns the phrase above into concrete actions
    //throw new PendingException();
  }

  @When("^I run it within my IDE$")
  public void i_run_it_within_my_IDE() throws Exception {
    // Write code here that turns the phrase above into concrete actions
    //throw new PendingException();
  }

  @Then("^I will be able to run connected step definitions$")
  public void i_will_be_able_to_run_connected_step_definitions() throws Exception {
    // Write code here that turns the phrase above into concrete actions
    //throw new PendingException();
  }

  @When("^the Maker starts a game$")
  public void theMakerStartsAGame() {
  }

  @Then("^the Maker waits for a Breaker to join$")
  public void theMakerWaitsForABreakerToJoin() {
  }

  @Given("^the Maker has started a game with the word \"([^\"]*)\"$")
  public void theMakerHasStartedAGameWithTheWord(String arg0) throws Throwable {
    // Write code here that turns the phrase above into concrete actions
    //throw new PendingException();
  }

  @When("^the Breaker joins the Maker's game$")
  public void theBreakerJoinsTheMakerSGame() {
  }

  @Then("^the Breaker must guess a word with (\\d+) characters$")
  public void theBreakerMustGuessAWordWithCharacters(int arg0) {
  }
}
