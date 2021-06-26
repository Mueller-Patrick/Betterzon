Feature: Favorite Shop List

  Scenario: Access Favorite Shop List
    Given the user is on the landing page
    And the user is logged in
    And the user has at least 1 favorite shop
    When the user clicks on the profile icon
    Then the profile page should open
    Then he should see his favorite shops list

  Scenario: Remove Favorite Shop Entry
    Given the user is on the landing page
    And the user is logged in
    And the user has at least 1 favorite shop
    When the user clicks on the profile icon
    Then the profile page should open
    When he clicks on delete a favorite shop entry
    Then the favorite shop entry should be deleted
