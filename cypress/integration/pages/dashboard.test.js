/* eslint-disable no-undef */
describe('Dashboard', () => {
  beforeEach(() => {
    cy.visit(`${Cypress.config().baseUrl}/login`);
    cy.get('body').within(() => {
      cy.get('div').should('contain.text', `Don't have an account? Sign Up`);
    });
    cy.get('div')
      .find('img')
      .should('be.visible')
      .should('have.attr', 'alt')
      .should('contain', 'iPhone with Instaclone app');

    cy.get('form').within(() => {
      cy.get('button').should('be.disabled');
      cy.get('input:first')
        .should('have.attr', 'placeholder', 'Email address')
        .type('jdavidrice@gmail.com');

      cy.get('input:last').should('have.attr', 'placeholder', 'Password').type('test1234');
      cy.get('button').should('contain.text', 'Login');
      cy.get('button').click();
    });

    cy.wait(5000);

    cy.get('div')
      .find('img')
      .should('be.visible')
      .should('have.attr', 'alt')
      .should('contain', 'Instaclone');
  });

  it('logs the user in and shows the dashboard and does basic checks around the UI', () => {
    cy.get('body').within(() => {
      cy.get('div').should('contain.text', 'jeremy');
      cy.get('div').should('contain.text', 'Jeremy Rice');
      cy.get('div').should('contain.text', 'Suggestions for you');
    });
  });

  it('logs the user in and adds a comment to a photo', () => {
    cy.get('[data-testid="add-comment-8MlXApDlrVzYqQEJgDXv"]')
      .should('have.attr', 'placeholder', 'Add a comment...')
      .type('Great photo!');
    cy.get('[data-testid="add-comment-submit-8MlXApDlrVzYqQEJgDXv"]').submit();
  });

  it('logs the user in and likes a photo', () => {
    cy.wait(3000);
    cy.get('[data-testid="like-photo-8MlXApDlrVzYqQEJgDXv"]').click();
  });

  it('logs the user in and the signs out', () => {
    cy.get('[data-testid="sign-out"]').click();
    cy.wait(1000);
    cy.get('div').should('contain.text', `Don't have an account? Sign Up`);
  });
});
