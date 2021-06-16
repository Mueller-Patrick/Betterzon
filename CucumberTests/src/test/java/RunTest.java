import io.cucumber.junit.Cucumber;
import io.cucumber.junit.CucumberOptions;
import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.runner.RunWith;
import org.openqa.selenium.firefox.FirefoxDriver;
import stepdefs.Preconditions;

@RunWith(Cucumber.class)
@CucumberOptions(
        features = {"src/test/resource/searchProduct.feature",
                "src/test/resource/priceAlarms.feature",
                "src/test/resource/favoriteShopList.feature",
                "src/test/resource/manageVendor.feature"}
)

public class RunTest {
    @BeforeClass
    public static void setup() {
        Preconditions.driver = new FirefoxDriver();
    }

    @AfterClass
    public static void teardown() {
        Preconditions.driver.close();
    }
}
