const { SEARCHBUTTON, SEARCHBOX } = require("../../components/initialPage");
const weatherDetails = require("../../components/weatherDetails");

When('I enter a valid known postcode {string} with mocked working response', (postcode) => {
    cy.get(SEARCHBOX).type(postcode);
});

When('I click the Search button expecting a valid full stubbed response', () => {
    cy.server({
        delay: 1000
    });

    cy.route({
        url: "*",
        method: "POST",
        response: "fixture:validFullWeatherDetails.json"
    }).as('getWeather')

    cy.get(SEARCHBUTTON).click().wait('@getWeather') 
})

Then('The valid mocked weather details are presented as expected', () => {
    cy.wait(500);
    cy.get(weatherDetails.DETAILSTABLEBODY).snapshot({ name: 'expected weather details'});
})