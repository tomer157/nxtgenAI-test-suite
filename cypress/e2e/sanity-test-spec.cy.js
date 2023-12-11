import mainPage from '../support/pages/MainPage';
require('cypress-xpath');

beforeEach(() => {
  cy.visit('/');
  cy.deleteCookies();
});

describe('test main page form  submit valid data ', () => {
  it('sanity should have the correct viewport size', () => {
    cy.viewport(1200, 800);
    cy.window().should('have.property', 'innerWidth', 1200);
    cy.window().should('have.property', 'innerHeight', 800);
  });

  it('sanity should have the correct URL', () => {
    cy.url().should('include', Cypress.config().baseUrl);
  });

  it('sanity ui widgets test', () => {
    mainPage.getForm().should('exist');
    mainPage.getAvatarImg().should('exist');
    mainPage.getOtherRadioBtn().check().should('be.checked');
    mainPage.getUtfCheckBox().check().should('be.checked');
    mainPage.getCodeJavaCheckbox().check().should('be.checked');
    mainPage.getOthersCheckbox().check().should('be.checked');
  });

  it('sanity form test - enter user1 valid inputs to the form as male', () => {
    cy.fixture('users').then((userData) => {
      mainPage.getFirstNameInput().type(userData.user1.firstName);
      mainPage
        .getFirstNameInput()
        .should('have.value', userData.user1.firstName);

      mainPage.getLastNameInput().type(userData.user1.lastName);
      mainPage.getLastNameInput().should('have.value', userData.user1.lastName);

      mainPage.getAddress().type(userData.user1.address.suite);
      mainPage.getAddress().should('have.value', userData.user1.address.suite);

      mainPage.getStreetAddress().type(userData.user1.address.street);
      mainPage
        .getStreetAddress()
        .should('have.value', userData.user1.address.street);

      mainPage.getCity().type(userData.user1.address.city);
      mainPage.getCity().should('have.value', userData.user1.address.city);

      mainPage.getMaleRadioBtn().check();
      mainPage.getMaleRadioBtn().should('be.checked');

      mainPage
        .getCountrySelect()
        .select(userData.user1.country, { force: true });
      mainPage.getCountrySelect().should('have.value', userData.user1.country);

      mainPage.getEmailInput().type(userData.user1.email);
      mainPage.getEmailInput().should('have.value', userData.user1.email);

      mainPage.getDateOfDemo().type(userData.user1.date);
      mainPage.getDateOfDemo().should('have.value', userData.user1.date);

      mainPage.getHourDropDown().click();
      mainPage.getHourContainer().click({ force: true });

      cy.waitUntil(() => mainPage.getHourContainerDropdown().should('exist'));

      mainPage
        .getHourContainerDropdown()
        .type('01')
        .should('have.value', userData.user1.hour);
      mainPage.getHourContainerDropdown().type('{enter}');

      mainPage.getMinContainer().click({ force: true });
      mainPage
        .getMinContainerDropdown()
        .type('15')
        .should('have.value', userData.user1.minutes);
      mainPage.getMinContainerDropdown().type('{enter}');

      mainPage
        .getMobileNumberInput()
        .type(userData.user1.phone)
        .should('have.value', userData.user1.phone);
      mainPage.getSeleniumCheckbox().check().should('be.checked');
      mainPage
        .getQueryTextArea()
        .type(userData.user1.company.catchPhrase)
        .should('have.value', userData.user1.company.catchPhrase);
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
          try {
            const match = text.match(/NXTGEN\d+/);
            cy.wrap(match).should('exist');
            if (match) {
              const transactionID = match[0];
              cy.log(transactionID);
            } else {
              console.log('Transaction ID not found in the generated text.');
            }
          } catch (error) {
            console.error(error);
          }
        });
    });
  });

  it('sanity form test - enter user2 valid inputs to the form as female. with different combinations', () => {
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

      mainPage
        .getHourContainerDropdown()
        .type('01')
        .should('have.value', userData.user2.hour);
      mainPage.getHourContainerDropdown().type('{enter}');

      mainPage.getMinContainer().click({ force: true });
      mainPage
        .getMinContainerDropdown()
        .type('15')
        .should('have.value', userData.user2.minutes);
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
          try {
            const match = text.match(/NXTGEN\d+/);
            cy.wrap(match).should('exist');
            if (match) {
              const transactionID = match[0];
              cy.log(transactionID);
            } else {
              console.log('Transaction ID not found in the generated text.');
            }
          } catch (error) {
            console.error(error);
          }
        });
    });
  });

  it('sanity form test - enter user2 valid inputs to the form as other. with different combinations', () => {
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

      mainPage.getOtherRadioBtn().check();
      mainPage.getOtherRadioBtn().should('be.checked');

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

      mainPage
        .getHourContainerDropdown()
        .type('01')
        .should('have.value', userData.user2.hour);
      mainPage.getHourContainerDropdown().type('{enter}');

      mainPage.getMinContainer().click({ force: true });
      mainPage
        .getMinContainerDropdown()
        .type('15')
        .should('have.value', userData.user2.minutes);
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
          try {
            const match = text.match(/NXTGEN\d+/);
            cy.wrap(match).should('exist');
            if (match) {
              const transactionID = match[0];
              cy.log(transactionID);
            } else {
              console.log('Transaction ID not found in the generated text.');
            }
          } catch (error) {
            console.error(error);
          }
        });
    });
  });
});

after(() => {
  cy.deleteCookies();
  cy.clearStorage();
  cy.closeWindows();
});
