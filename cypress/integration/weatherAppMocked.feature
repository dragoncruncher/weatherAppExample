Feature: The Weather App Mocked

Scenario: Searching with a valid known postcode returns correct weather details
    Given I open the weather app
    When I enter a valid known postcode 'A1 1AA' with mocked working response
    And I click the Search button expecting a valid full stubbed response
    Then The valid mocked weather details are presented as expected
