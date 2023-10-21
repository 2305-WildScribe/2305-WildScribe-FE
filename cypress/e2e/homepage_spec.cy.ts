/// <reference types="cypress" />

describe('Homepage', () => {
  beforeEach(() => {
    cy.intercept(
      'POST',
      'https://safe-refuge-07153-b08bc7602499.herokuapp.com/api/v0/user',
      {
        statusCode: 201,
        fixture: 'userInfo.json',
      }
    ).as('login');

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

    cy.fixture('new_adventure.json').then((response) => {
      cy.intercept(
        'POST',
        'https://safe-refuge-07153-b08bc7602499.herokuapp.com/api/v0/adventure',
        {
          statusCode: 201,
          body: response,
        }
      ).as('addNewAdventure');
      console.log('response --->', response);
    });

    cy.fixture('example.json').then((response) => {
    cy.intercept(
      'DELETE',
      'https://safe-refuge-07153-b08bc7602499.herokuapp.com/api/v0/adventure',
      {
        statusCode: 201,
        body: response,
      }
    ).as('deleteRequest');
  console.log('response --->', response);
});

    cy.visit('http://localhost:3000/');
  });

  it('should allow a user to login and see the adventure cards', () => {
    cy.url().should('contain', 'localhost:3000');
    cy.get('.login-form').should('exist');
    cy.get('p').should(
      'contain',
      'Welcome to WildScribe! Please login to continue.'
    );
    cy.get("input[name='email']")
      .should('exist')
      .should('have.value', 'me@gmail.com');
    cy.get("input[name='password']").should('exist').should('have.value', 'hi');
    cy.get('.login-btn').should('exist');
    cy.get('.login-btn').click();

    cy.wait('@login');
    cy.wait('@getUserData');
    cy.url().should('contain', 'localhost:3000/home');

    cy.get('h1').should('contain', 'WildScribe');
    cy.get('.nav-button-container').should('exist');
    cy.get('.adventure-card-container').should('exist');
    cy.get('.home-btn').should('have.class', 'active');
    cy.get('.new-adventure-btn').should('exist');
    cy.get('.log-out-btn').should('exist');
    cy.get('.nav-bar').should('exist');
    cy.get('.adventure-card').should('have.length', 7);
    cy.get('.adventure-card').first().should('have.id', 11);
    cy.get('.adventure-card')
      .first()
      .should('contain', 'Running')
      .should('contain', '10/11/2023')
      .should('contain', 'Good Diet')
      .should('contain', 'Hydrated')
      .should('contain', 'Very High')
      .should('contain', '8')
      .should('contain', 'Some Hydraytion')
      .should('contain', 'notes about sleep and stressnotes about sleep and stressnotes about sleep and stressnotes about sleep and stressnotes about sleep and stressnotes about sleep and stressnotes about sleep and stressnotes about sleep and stressnotes about sleep and stressnotes about sleep and stressnotes about sleep and stress')
      .should('contain', 'Running is real hard');
    cy.get('.adventure-card').last().should('have.id', 17);
    cy.get('.adventure-card')
      .last()
      .should('contain', 'Running')
      .should('contain', '10/11/2023')
      .should('contain', 'Good Diet')
      .should('contain', 'Hydrated')
      .should('contain', 'Very High')
      .should('contain', '8')
      .should('contain', 'Some Hydraytion')
      .should('contain', 'notes about sleep and stress')
      .should('contain', 'Running is real hard');
    cy.get('.adventure-card')
      .get('.card-button-wrapper')
      .get('.pencil-btn').should('exist')
      .get('.trash-btn').should('exist');
    // come back and add more teting about the content on the cards 
  });

  it('should be able to search for a logged adventure', () => {
    cy.wait('@login');
    cy.get('.login-btn').click();

    cy.wait('@getUserData');
    cy.url().should('contain', 'localhost:3000/home');
    cy.get('.search-input').should('have.attr', 'placeholder', 'Search logs here')
      .type('HydraytionSome')
    cy.get('.search-btn').should('exist').click();
    cy.get('.adventure-card').should('have.length', 2);
    cy.get('.adventure-card').first().should('have.id', 12);
    cy.get('.adventure-card')
      .first()
      .should('contain', 'Running')
      .should('contain', '10/11/2023')
      .should('contain', 'Good Diet')
      .should('contain', 'Hydrated')
      .should('contain', 'Very High')
      .should('contain', '8')
      .should('contain', 'notes about sleep and stress')
      .should('contain', 'Some HydraytionSome HydraytionSome HydraytionSome HydraytionSome HydraytionSome HydraytionSome HydraytionSome HydraytionSome HydraytionSome HydraytionSome HydraytionSome HydraytionSome HydraytionSome HydraytionSome HydraytionSome HydraytionSome HydraytionSome HydraytionSome HydraytionSome HydraytionSome HydraytionSome HydraytionSome HydraytionSome HydraytionSome Hydraytion')
      .should('contain', 'Running is real hard');
    cy.get('.adventure-card').last().should('have.id', 15);
    cy.get('.adventure-card')
      .last()
      .should('contain', 'Running')
      .should('contain', '10/11/2023')
      .should('contain', 'Good Diet')
      .should('contain', 'Hydrated')
      .should('contain', 'Very High')
      .should('contain', '8')
      .should('contain', 'notes about sleep and stressnotes about sleep and stressnotes about sleep and stressnotes about sleep and stressnotes about sleep and stressnotes about sleep and stressnotes about sleep and stressnotes about sleep and stressnotes about sleep and stressnotes about sleep and stressnotes about sleep and stress')
      .should('contain', 'Some HydraytionSome HydraytionSome HydraytionSome HydraytionSome HydraytionSome HydraytionSome HydraytionSome HydraytionSome HydraytionSome HydraytionSome HydraytionSome HydraytionSome HydraytionSome HydraytionSome HydraytionSome HydraytionSome HydraytionSome HydraytionSome HydraytionSome HydraytionSome HydraytionSome HydraytionSome HydraytionSome HydraytionSome Hydraytion')
      .should('contain', 'Running is real hardRunning is real hardRunning is real hardRunning is real hardRunning is real hardRunning is real hardRunning is real hardRunning is real hardRunning is real hardRunning is real hardRunning is real hardRunning is real hardRunning is real hardRunning is real hardRunning is real hardRunning is real hardRunning is real hardRunning is real hardRunning is real hardRunning is real hardRunning is real hardRunning is real hardRunning is real hardRunning is real hardRunning is real hard');
    cy.get('.search-bar > :nth-child(1) > .svg-inline--fa').should('exist').click()
  })

  it('should delete a card', () => {
    cy.wait('@login');
    cy.get('.login-btn').click();

    cy.wait('@getUserData');
    cy.url().should('contain', 'localhost:3000/home');
    cy.get('.adventure-card').should('have.length', 7);
    cy.get('#\\31 1 > .inner-card > .card-text-wrapper > .top-line-info > .card-button-wrapper > .trash-btn').click()
    cy.wait('@deleteRequest')
    cy.get('.adventure-card').should('have.length', 6);
  })

  it('should be able to edit card', () => {
    cy.wait('@login');
    cy.get('.login-btn').click();

    cy.wait('@getUserData');
    cy.url().should('contain', 'localhost:3000/home');
  })
});
