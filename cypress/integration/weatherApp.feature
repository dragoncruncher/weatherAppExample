Feature: The Weather App

  I want to find out the weather for a postcode

  Scenario: Opening the weather app in a browser
    Given I open the weather app
    Then there is a search box
    And there is a search button

  Scenario: Searching with a valid known postcode returns the weather details
    Given I open the weather app
    When I enter the postcode 'W6 0NW'
    And I click the search button
    Then there are details about the weather
    And there are no properties with no values
    And the following properties are displayed
    | Time |
    | Temp |
    | Humidity |
    
  Scenario: Searching without a postcode shows an Invalid Postcode error to the user
    Given I open the weather app
    When I click the search button
    Then there is an Invalid Postcode message

  Scenario: Searching with an invalid postcode shows an Invalid Postcode error to the user
    Given I open the weather app
    When I enter the postcode 'EC11 AAA'
    And I click the search button
    Then there is an Invalid Postcode message

  Scenario: Searching with a valid unknown postcode shows an Unable to find postcode error to the user
    Given I open the weather app
    When I enter the postcode 'B99 9AA'
    And I click the search button
    Then there is an Unable to find Postcode message

