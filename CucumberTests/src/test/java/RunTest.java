import cucumber.api.CucumberOptions;
import cucumber.api.junit.Cucumber;
import org.junit.runner.RunWith;

@RunWith(Cucumber.class)
@CucumberOptions(
  features = {"src/test/resource/searchProduct.feature",
    "src/test/resource/priceAlarms.feature"}
)

public class RunTest {
}
