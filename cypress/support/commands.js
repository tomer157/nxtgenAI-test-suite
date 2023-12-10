// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
// -- This is a parent command --
Cypress.Commands.add('deleteCookies', () => {
  cy.clearCookie('__stripe_mid');
  cy.clearCookie('__stripe_sid');
});

Cypress.Commands.add('selectCountry', (country) => {
  const countryOption = `//li[contains(@class, "select2-results__option") and text()="${country}"]`;
  cy.xpath(countryOption).click();
});
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
