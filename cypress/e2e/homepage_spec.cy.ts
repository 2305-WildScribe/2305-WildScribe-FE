/// <reference types="cypress" />

describe('Homepage', () => {
  beforeEach(() => {
    // cy.fixture('userInfo.json').then((response)=>{
    cy.intercept(
      'POST',
      'https://safe-refuge-07153-b08bc7602499.herokuapp.com/api/v0/user',
      {
        statusCode: 201,
        fixture: 'userInfo.json',
      }
    ).as('login');
    // })

    // cy.intercept(
    //   'POST',
    //   'https://safe-refuge-07153-b08bc7602499.herokuapp.com/api/v0/user/adventures',
    //   {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       data: {
    //         type: 'adventures',
    //         attributes: {
    //           user_id: '12',
    //         },
    //       },
    //     }),
    //   }
    // ).as('postUserId');

    cy.fixture('dummy_data.json').then((response) => {
      cy.intercept(
        'POST',
        'https://safe-refuge-07153-b08bc7602499.herokuapp.com/api/v0/user/adventures',
        {
          statusCode: 201,
          body: response,
        }
      ).as('getUserData');
      console.log('response --->', response);
    });
    cy.visit('http://localhost:3000/');
  });

  it('should contain the homepage components', () => {
    // cy.wait('@postUserId');
    cy.url().should('contain', 'localhost:3000');
    cy.get('.login-form').should('exist');
    cy.get('.login-btn').should('exist');
    cy.get('.login-btn').click();
    cy.wait('@login');
    cy.wait('@getUserData')
    cy.get('.nav-button-container').should('exist');
    // cy.get('.adventure-card-container').should('exist')

    // cy.get('.nav-bar').should('exist');
    // cy.get('.home-btn').should('have.class', 'active')

    // cy.get('.adventure-card').should('have.length', 5)
    // cy.get('.adventure-card').first().should('have.id', 1)
    // cy.get('.adventure-card').last().should('have.id', 5)
  });
});
