function detailsProperties() {
    return "th";
}

module.exports = {
    DETAILSTITLE: "caption",
    DETAILSPROPERTIES: detailsProperties(),
    DETAILSTABLEBODY: "tbody",
    DETAILSVALUES: "td",
    DETAILSROWS: "tr",
    doesPropertyExistInTheWeatherDetails: function(property) {
        let result = false;
        return new Cypress.Promise((resolve) => {
            cy.get(detailsProperties()).each(($el) => {
                cy.wrap($el).invoke('text').then(text => {
                    let rawText = text.replace(`:`, '');
                    if(rawText == property) {
                        result = true;
                    } 
                })
            }).then(() => { 
                resolve(result)
            })
        })
    },
    EXPECTEDDETAILS: {
        Time: "time",
        Summary: "summary"
    }
}