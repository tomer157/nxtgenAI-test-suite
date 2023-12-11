import mainPage from '../support/pages/MainPage';
require('cypress-xpath');

beforeEach(() => {
  cy.visit('/');
  cy.deleteCookies();
});

describe('main page - negative tests ', () => {
  it('try to submit without verification code ', () => {
    cy.fixture('users').then((userData) => {
      mainPage.getFirstNameInput().type(userData.user2.firstName);
      mainPage
        .getFirstNameInput()
        .should('have.value', userData.user2.firstName);

      mainPage.getLastNameInput().type(userData.user2.lastName);
      mainPage.getLastNameInput().should('have.value', userData.user2.lastName);

      mainPage.getAddress().type(userData.user2.address.suite);
      mainPage.getAddress().should('have.value', userData.user2.address.suite);

      mainPage.getStreetAddress().type(userData.user2.address.street);
      mainPage
        .getStreetAddress()
        .should('have.value', userData.user2.address.street);

      mainPage.getCity().type(userData.user2.address.city);
      mainPage.getCity().should('have.value', userData.user2.address.city);

      mainPage.getFemaleRadioBtn().check();
      mainPage.getFemaleRadioBtn().should('be.checked');

      mainPage
        .getCountrySelect()
        .select(userData.user2.country, { force: true });
      mainPage.getCountrySelect().should('have.value', userData.user2.country);

      mainPage.getEmailInput().type(userData.user2.email);
      mainPage.getEmailInput().should('have.value', userData.user2.email);

      mainPage.getDateOfDemo().type(userData.user2.date);
      mainPage.getDateOfDemo().should('have.value', userData.user2.date);

      mainPage.getHourDropDown().click();
      mainPage.getHourContainer().click({ force: true });

      cy.waitUntil(() => mainPage.getHourContainerDropdown().should('exist'));

      mainPage.getHourContainerDropdown().type('01').should('have.value', '01');
      mainPage.getHourContainerDropdown().type('{enter}');

      mainPage.getMinContainer().click({ force: true });
      mainPage.getMinContainerDropdown().type('15').should('have.value', '15');
      mainPage.getMinContainerDropdown().type('{enter}');

      mainPage
        .getMobileNumberInput()
        .type(userData.user2.phone)
        .should('have.value', userData.user2.phone);
      mainPage.getTestNgCheckbox().check().should('be.checked');
      mainPage
        .getQueryTextArea()
        .type(userData.user2.company.catchPhrase)
        .should('have.value', userData.user2.company.catchPhrase);

      cy.wait(666);
      mainPage.getSubmitBtn().click();
      cy.wait(333);
      cy.contains('label', 'This field is required').should('exist');
    });
  });

  it('try to submit without adding required fields', () => {
    cy.wait(666);
    mainPage.getSubmitBtn().click();
    cy.wait(333);
    cy.contains('label[for="vfb-5"]', 'This field is required').should('exist');
    cy.contains('label[for="vfb-7"]', 'This field is required').should('exist');
    cy.contains('label[for="vfb-31"]', 'This field is required').should(
      'exist'
    );
    cy.contains('label[for="vfb-14"]', 'This field is required').should(
      'exist'
    );
  });
});

after(() => {
  cy.deleteCookies();
  cy.clearStorage();
  cy.closeWindows();
});
