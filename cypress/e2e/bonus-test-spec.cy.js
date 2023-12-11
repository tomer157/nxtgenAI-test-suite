import mainPage from '../support/pages/MainPage';
require('cypress-xpath');

let userData;

beforeEach(() => {
  cy.visit('/');
  cy.deleteCookies();

  // Load fixture data and save it to the userData variable
  cy.fixture('users').then((data) => {
    userData = data;
  });
});

describe('main page - negative tests ', () => {
  it('sanity form test - enter user2 valid inputs to the form as female', () => {
    cy.intercept('/demo-site/').as('submit-intercept');

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
      cy.wait(700);

      cy.wait('@submit-intercept').then(({ request }) => {
        const payload = request.body;

        // Define a regular expression to match the values
        const regex = /name="([^\n]+)"\s*\n*\s*\n*([^-\n]+)/g;

        // Extract values using the regular expression
        const extractedValues = [];
        let match;
        while ((match = regex.exec(payload)) !== null) {
          const [, name, value] = match;
          extractedValues.push({ name, value: value.trim() });
        }

        console.log(extractedValues);
        const targetObjectName = 'vfb-7';
        const targetObject = extractedValues.find(
          (obj) => obj.name === targetObjectName
        );
        console.log(targetObject);
        expect(targetObject.value).to.equal(userData.user2.lastName);
        // continue the rest of all the other fields in the form
      });
    });
  });
});
