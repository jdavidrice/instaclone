/* eslint-disable no-undef */
describe('Profile', () => {
  beforeEach(() => {
    cy.visit(`${Cypress.config().baseUrl}/p/brendan`);
  });

  it('goes to a profile page and validates the UI', () => {
    cy.get('body').within(() => {
      cy.get('div').should('contain.text', 'brendan');
      cy.get('div').should('contain.text', 'Brendan Hofrashan');
      cy.get('div').should('contain.text', '5 photos');
      cy.get('div').should('contain.text', '3 followers');
      cy.get('div').should('contain.text', '0 following');
    });
  });
});
