beforeEach(() => {
  cy.visit('/');
  cy.clearCookies();
  cy.login_via_ui();
});

describe('main page tests', () => {
  it('main page validation', () => {
    cy.title().should('eq', fixtureData.pageTitle);
    mainPage.getWelcomeHeader().should('have.text', fixtureData.welcomeHeader);
  });
});
