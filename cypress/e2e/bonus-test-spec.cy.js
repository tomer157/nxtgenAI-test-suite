import mainPage from '../support/pages/MainPage';
require('cypress-xpath');

let userData;
let payloadSchema;

beforeEach(() => {
  cy.visit('/');
  cy.deleteCookies();

  // Load fixture data and save it to the userData and payloadschema variable
  cy.fixture('users').then((data) => {
    userData = data;
  });

  cy.fixture('payloadData').then((data) => {
    payloadSchema = data;
  });
});

describe('bonus tests  ', () => {
  it('try to sniff and intercept a valid form submission and query the packet payload', () => {
    // first initiate listener, then populate and submit the form. lastly process the request payload.
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

        // assert payload fields based on user2 fixture json...
        let targetObjectName = payloadSchema.firstName;
        cy.extractFormValues(payload, targetObjectName).then((targetObject) => {
          console.log(targetObject);
          expect(targetObject.value).to.eq(userData.user2.firstName);
        });

        targetObjectName = payloadSchema.lastName;
        cy.extractFormValues(payload, targetObjectName).then((targetObject) => {
          expect(targetObject.value).to.eq(userData.user2.lastName);
        });

        targetObjectName = payloadSchema.gender;
        cy.extractFormValues(payload, targetObjectName).then((targetObject) => {
          expect(targetObject.value).to.eq(userData.user2.gender);
        });

        targetObjectName = payloadSchema.addressSuite;
        cy.extractFormValues(payload, targetObjectName).then((targetObject) => {
          expect(targetObject.value).to.eq(userData.user2.address.suite);
        });

        targetObjectName = payloadSchema.addressStreet;
        cy.extractFormValues(payload, targetObjectName).then((targetObject) => {
          expect(targetObject.value).to.eq(userData.user2.address.street);
        });

        targetObjectName = payloadSchema.addressCity;
        cy.extractFormValues(payload, targetObjectName).then((targetObject) => {
          expect(targetObject.value).to.eq(userData.user2.address.city);
        });

        targetObjectName = payloadSchema.addressCountry;
        cy.extractFormValues(payload, targetObjectName).then((targetObject) => {
          expect(targetObject.value).to.eq(userData.user2.country);
        });

        targetObjectName = payloadSchema.email;
        cy.extractFormValues(payload, targetObjectName).then((targetObject) => {
          expect(targetObject.value).to.eq(userData.user2.email);
        });

        targetObjectName = payloadSchema.date;
        cy.extractFormValues(payload, targetObjectName).then((targetObject) => {
          expect(targetObject.value).to.eq(userData.user2.date);
        });

        targetObjectName = payloadSchema.hour;
        cy.extractFormValues(payload, targetObjectName).then((targetObject) => {
          expect(targetObject.value).to.eq(userData.user2.hour);
        });

        targetObjectName = payloadSchema.minutes;
        cy.extractFormValues(payload, targetObjectName).then((targetObject) => {
          expect(targetObject.value).to.eq(userData.user2.minutes);
        });

        targetObjectName = payloadSchema.phone;
        cy.extractFormValues(payload, targetObjectName).then((targetObject) => {
          expect(targetObject.value).to.eq(userData.user2.phone);
        });

        targetObjectName = payloadSchema.course;
        cy.extractFormValues(payload, targetObjectName).then((targetObject) => {
          expect(targetObject.value).to.eq(userData.user2.course);
        });

        targetObjectName = payloadSchema.catchPhrase;
        cy.extractFormValues(payload, targetObjectName).then((targetObject) => {
          expect(targetObject.value).to.eq(userData.user2.company.catchPhrase);
        });
      });
    });
  });
});
