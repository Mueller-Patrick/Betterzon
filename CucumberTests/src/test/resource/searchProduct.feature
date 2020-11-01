Feature: Search a Product

  Scenario: User searches for unknown product
    Given the user is on the landing page
    When the user enters the search term "iPhone 13" and clicks search
    Then the user should see the error page "No products found"

  Scenario: User is not logged in, searches for known product
    Given the user is on the landing page
    And the user is not logged in
    When the user enters the search term "iPhone 12" and clicks search
    Then the user should see a list of products
    When the user clicks on the first product
    Then the user should see the product detail page
    And the set price alarm box should show "Log in to continue"

  Scenario: User is logged in, searches for known product
    Given the user is on the landing page
    And the user is logged in
    When the user enters the search term "iPhone 12" and clicks search
    Then the user should see a list of products
    When the user clicks on the first product
    Then the user should see the product detail page
    And the set price alarm box should show "Set price alarm"
    When the user sets a price alarm
    Then the user should receive an email confirming the price alarm
