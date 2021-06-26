Feature: Price Alarms

    Scenario: Show a list of price alarms
        Given the user is on the landing page
        And the user is logged in
        And the user has at least 1 price alarm set
        When the user clicks on the profile icon
        Then the profile page should open
        And the price alarm list should contain at least 1 entry

    Scenario: Remove a price alarm
        Given the user is on the landing page
        And the user is logged in
        When the user clicks on the profile icon
        Then the profile page should open
        When the user clicks on the "remove" button next to a price alarm
        Then the price alarm should be removed from the database

    Scenario: Edit a price alarm
        Given the user is on the landing page
        And the user is logged in
        When the user clicks on the profile icon
        Then the profile page should open
        When the user clicks on the "edit" button next to a price alarm
        Then a popup should open where the user can edit the alarm
        When the user clicks on the "save changes" button
        Then the price alarm should be updated in the database
