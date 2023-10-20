/// <reference types="cypress" />

describe('Homepage', () => {
  beforeEach(() => {
    cy.intercept('POST', 'https://safe-refuge-07153-b08bc7602499.herokuapp.com/api/v0/user', {
      statusCode: 200,
      body: {
        data: {
          type: 'user',
          attributes: {
            user_id: "12",
            name: "Billy Bob",
          },
        },
      },
    }).as('getUserId')
    cy.visit('http://localhost:3001');

    cy.intercept('POST', 'https://safe-refuge-07153-b08bc7602499.herokuapp.com/api/v0/user/adventures', {
      statusCode: 200,
      body: JSON.stringify({
        data: {
          type: 'adventures',
          attributes: {
            user_id: "12",
          },
        },
      })
    }).as('getUserAdventure')
  });
  
  it('should display the login form', () => {
    cy.wait('@getUserId');
    cy.visit('http://localhost:3001');
    cy.get('h1').should('contain', 'WildScribe');
    cy.get('#email').should('exist');
    cy.get('#email').should('have.attr', 'placeholder', 'Email');
    cy.get('#password').should('exist');
    cy.get('#password').should('have.attr', 'placeholder', 'Password');
    cy.get('button').should('exist').should('contain', 'Login');
  });
  
  it('should allow a user to log in', () => {
    cy.wait('@getUserId');
    cy.visit('http://localhost:3001');
    cy.get('#email').type('me@gmail.com');
    // cy.get('#password').type('hi');
    // cy.get('button').click();
    // cy.url().should('contain', '/home');
  });
  // it('should show users adventure', () => {
  //   cy.wait('@getUserAdventure')
  //   cy.visit('http://localhost:3001/home');
  // })
});
