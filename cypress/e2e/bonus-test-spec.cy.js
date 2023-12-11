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

        targetObjectName = 'vfb-7';
        cy.extractFormValues(payload, targetObjectName).then((targetObject) => {
          expect(targetObject.value).to.eq(userData.user2.lastName);
        });

        targetObjectName = 'vfb-31';
        cy.extractFormValues(payload, targetObjectName).then((targetObject) => {
          expect(targetObject.value).to.eq(userData.user2.gender);
        });

        targetObjectName = 'vfb-13[address]';
        cy.extractFormValues(payload, targetObjectName).then((targetObject) => {
          expect(targetObject.value).to.eq(userData.user2.address.suite);
        });

        targetObjectName = 'vfb-13[address-2]';
        cy.extractFormValues(payload, targetObjectName).then((targetObject) => {
          expect(targetObject.value).to.eq(userData.user2.address.street);
        });

        targetObjectName = 'vfb-13[zip]';
        cy.extractFormValues(payload, targetObjectName).then((targetObject) => {
          expect(targetObject.value).to.eq(userData.user2.address.city);
        });

        targetObjectName = 'vfb-13[country]';
        cy.extractFormValues(payload, targetObjectName).then((targetObject) => {
          expect(targetObject.value).to.eq(userData.user2.country);
        });

        targetObjectName = 'vfb-14';
        cy.extractFormValues(payload, targetObjectName).then((targetObject) => {
          expect(targetObject.value).to.eq(userData.user2.email);
        });

        targetObjectName = 'vfb-18';
        cy.extractFormValues(payload, targetObjectName).then((targetObject) => {
          expect(targetObject.value).to.eq(userData.user2.date);
        });

        targetObjectName = 'vfb-16[hour]';
        cy.extractFormValues(payload, targetObjectName).then((targetObject) => {
          expect(targetObject.value).to.eq(userData.user2.hour);
        });

        targetObjectName = 'vfb-16[min]';
        cy.extractFormValues(payload, targetObjectName).then((targetObject) => {
          expect(targetObject.value).to.eq(userData.user2.minutes);
        });

        targetObjectName = 'vfb-19';
        cy.extractFormValues(payload, targetObjectName).then((targetObject) => {
          expect(targetObject.value).to.eq(userData.user2.phone);
        });

        targetObjectName = 'vfb-20[]';
        cy.extractFormValues(payload, targetObjectName).then((targetObject) => {
          expect(targetObject.value).to.eq(userData.user2.course);
        });

        targetObjectName = 'vfb-23';
        cy.extractFormValues(payload, targetObjectName).then((targetObject) => {
          expect(targetObject.value).to.eq(userData.user2.company.catchPhrase);
        });
      });
    });
  });
});
