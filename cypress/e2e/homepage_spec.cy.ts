/// <reference types="cypress" />

describe('Homepage', () => {

  beforeEach(() => {
    cy.fixture('dummy_data.json').then((response) => {
      cy.intercept(
        'POST',
        'https://117105e4-6093-4d95-8632-31f93d58b35a.mock.pstmn.io/api/v0/adventures',
        {
          statusCode: 201,
          body: response,
        }
      ).as('postUser');
    });
    cy.visit('http://localhost:3000/');
  });

  it('should contain the homepage components', () => {
    cy.url().should('contain', 'localhost:3000');
    cy.wait('@postUser');
    cy.get('.nav-bar').should('exist');
    cy.get('.nav-button-container').should('exist');
    cy.get('.home-btn').should('have.class', 'active')

    cy.get('.adventure-card-container').should('exist')
    cy.get('.adventure-card').should('have.length', 5)
    cy.get('.adventure-card').first().should('have.id', 1)
    cy.get('.adventure-card').last().should('have.id', 5)

  });
});
