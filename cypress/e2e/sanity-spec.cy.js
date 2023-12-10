import mainPage from '../support/pages/MainPage';
require('cypress-xpath');

before(() => {
  cy.visit('/');
  cy.deleteCookies();
});
describe('test main page form  submit valid data', () => {
  it('sanity form test - enter user1 valid inputs to the form as male', () => {
    cy.fixture('users').then((userData) => {
      mainPage.getFirstNameInput().should('exist');
      mainPage.getFirstNameInput().type(userData.user1.firstName);
      mainPage.getLastNameInput().type(userData.user1.lastName);
      mainPage.getAddress().type(userData.user1.address.suite);
      mainPage.getStreetAddress().type(userData.user1.address.street);
      mainPage.getCity().type(userData.user1.address.city);

      mainPage.getMaleRadioBtn().check();

      mainPage
        .getCountrySelect()
        .select(userData.user1.country, { force: true });

      mainPage.getEmailInput().type(userData.user1.email);
      mainPage.getDateOfDemo().type(userData.user1.date);
      mainPage.getHourDropDown().click();
      mainPage.getHourContainer().click({ force: true });
      cy.waitUntil(() => mainPage.getHourContainerDropdown().should('exist'));
      mainPage.getHourContainerDropdown().type('01');
      mainPage.getHourContainerDropdown().type('{enter}');
      mainPage.getMinContainer().click({ force: true });
      mainPage.getMinContainerDropdown().type('15');
      mainPage.getMinContainerDropdown().type('{enter}');

      mainPage.getMobileNumberInput().type(userData.user1.phone);
      mainPage.getSeleniumCheckbox().check();
      mainPage.getQueryTextArea().type(userData.user1.company.catchPhrase);
      mainPage
        .getVerificationLabel()
        .invoke('text')
        .then((text) => {
          const index = text.indexOf(':');
          const extractedText = index !== -1 ? text.slice(index + 1) : '';
          mainPage.getVerificationInput().type(parseInt(extractedText, 10));
        });
      cy.wait(666);
      mainPage.getSubmitBtn().click();

      cy.wait(4500);

      cy.url().should('include', userData.verificationPageURL);
      cy.get('.elementor-widget-container')
        .invoke('text')
        .then((text) => {
          const match = text.match(/NXTGEN\d+/);
          cy.wrap(match).should('exist');
          if (match) {
            const transactionID = match[0];

            cy.log(transactionID);
          } else {
            console.log('Transaction ID not found in the generated text.');
          }
        });
    });
  });
});
