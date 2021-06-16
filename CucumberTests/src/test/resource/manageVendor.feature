Feature: Manage Vendor Shop

  Scenario: Deactivate Product Listing
    Given the user is on the landing page
    And the user is logged in as vendor manager
    When the user opens the shop managing page
    And the user clicks on deactivate a listing
    Then the listing should be deactivated

  Scenario: Deactivate Shop Completely
    Given the user is on the landing page
    And the user is logged in as vendor manager
    When the user opens the shop managing page
    And the user clicks on deactivate the shop
    Then the shop and all related listings should be deactivated
