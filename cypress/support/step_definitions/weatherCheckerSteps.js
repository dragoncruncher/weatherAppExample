const url = 'http://serene-mountain-14043.herokuapp.com/'
const { SEARCHBUTTON, SEARCHBOX } = require("../../components/initialPage");
const { POSTCODENOTFOUND } = require("../../components/messages");
const weatherDetails = require("../../components/weatherDetails")

Given('I open the weather app', () => {
  cy.visit(url, {
    onBeforeLoad: (win) => {
      win.fetch = null
    }
  })
});

When('I click the search button', () => {
  cy.get(SEARCHBUTTON).click();
});

When('I enter the postcode {string}', (postcode) => {
  cy.get(SEARCHBOX).type(postcode)
});

then('there is a search box', () => {
  expect(cy.get(SEARCHBOX).should('have.attr', 'placeholder', 'Enter postcode'));
});

then('there is a search button', () => {
  expect(cy.get(SEARCHBUTTON).contains('Search'));
});

then('there is an Invalid Postcode message', () => {
  expect(cy.get(POSTCODENOTFOUND).contains('Invalid postcode.'));
});

then('there are details about the weather', () => {
  expect(cy.get(weatherDetails.DETAILSTITLE).contains('Weather details'));
})

then('there is an Unable to find Postcode message', () => {
  expect(cy.get(POSTCODENOTFOUND).contains('Unable to find the postcode.'));
})

then('there are no properties with no values', () => {
  cy.get(weatherDetails.DETAILSVALUES).each(($el,index,$list) => {
    cy.wrap($el).invoke('text').then((text => {
      expect(text).to.not.equal('');
    }));
  })
});

then('the following properties are displayed', datatable => {
  datatable.rawTable.forEach(property => { 
    cy.wrap(weatherDetails.doesPropertyExistInTheWeatherDetails(property))
      .then(result => {
        expect(result).to.be.true;
      })
  })
});

