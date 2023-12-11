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
  cy.clearCookies();
});

Cypress.Commands.add('clearStorage', () => {
  cy.clearLocalStorage();
  cy.window().then((win) => {
    win.sessionStorage.clear();
  });
});

Cypress.Commands.add('closeWindows', () => {
  cy.window().then((win) => {
    win.close();
  });
});

Cypress.Commands.add('extractFormValues', (payload, targetObjectName) => {
  const regex = /name="([^\n]+)"\s*\n*\s*\n*([^-\n]+)/g;
  const extractedValues = [];
  let match;

  while ((match = regex.exec(payload)) !== null) {
    const [, name, value] = match;
    extractedValues.push({ name, value: value.trim() });
  }

  const targetObject = extractedValues.find(
    (obj) => obj.name === targetObjectName
  );
  return targetObject;
});
