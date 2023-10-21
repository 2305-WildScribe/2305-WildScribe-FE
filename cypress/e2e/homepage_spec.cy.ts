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
    cy.get('.adventure-card').last().should('have.id', 17);
    cy.get('.adventure-card')
    // .first()
    // .should('have.id', 21)
    .get('.card-button-wrapper')
    .get('.pencil-btn').should('exist')
    .get('.trash-btn').should('exist');
    // come back and add more teting about the content on the cards 
  });

  // it('should allow a user to add an adventure cards', () => {
  //   cy.visit('http://localhost:3000/');
  //   cy.url().should('contain', 'localhost:3000');
  //   cy.get('.login-btn').click();
  //   cy.wait('@login');
  //   cy.wait('@getUserData');

    // cy.get('.new-adventure-btn').click();
    // cy.url().should('contain', 'localhost:3000/logAdventure');
    // cy.get('.form').should('exist');
    // cy.get('.form')
    //   .get("input[name='activity']")
    //   .should('exist')
    //   .type('Kayaking');
    // cy.get("input[name='activity']").should('have.value', 'Kayaking');

    // cy.get("input[name='date']").should('exist').type('2023-10-20');
    // cy.get("input[name='date']").should('have.value', '2023-10-20');

    // cy.get("input[name='image']")
    //   .should('exist')
    //   .type(
    //     'https://paddlingmagazine-images.s3.amazonaws.com/2021/09/pg13-2021_06_19-Bill-on-Red-Deer-River-Paddling-Magazine_MG_3599.jpg'
    //   );
    // cy.get("input[name='image']").should(
    //   'have.value',
    //   'https://paddlingmagazine-images.s3.amazonaws.com/2021/09/pg13-2021_06_19-Bill-on-Red-Deer-River-Paddling-Magazine_MG_3599.jpg'
    // );
    // cy.get('.submit-button').should('exist');
    // cy.get("select[name='stressLevel']").should('exist').select('Low');
    // cy.get("select[name='stressLevel']").should('have.value', 'Low');

    // cy.get("select[name='hydration']").should('exist').select('Hydrated');
    // cy.get("select[name='hydration']").should('have.value', 'Hydrated');

    // cy.get("select[name='diet']").should('exist').select('Good');
    // cy.get("select[name='diet']").should('have.value', 'Good');

    // cy.get("input[name='sleep']")
    //   .should('exist')
    //   .type('{uparrow}')
    //   .type('{uparrow}')
    //   .type('{uparrow}')
    //   .type('{uparrow}');
    // cy.get("input[name='sleep']").should('have.value', '4');

    // cy.get('.sleep-notes-input')
    //   .should('exist')
    //   .type('I wish I could sleep in one of these days');
    // cy.get('.sleep-notes-input').should(
    //   'have.value',
    //   'I wish I could sleep in one of these days'
    // );

    // cy.get('.hydro-notes-input')
    //   .should('exist')
    //   .type('I should remember to drink more water');
    // cy.get('.hydro-notes-input').should(
    //   'have.value',
    //   'I should remember to drink more water'
    // );

    // cy.get('.notes-input')
    //   .should('exist')
    //   .type('Got pitted and it was freakin sick');
    // cy.get('.notes-input').should(
    //   'have.value',
    //   'Got pitted and it was freakin sick'
    // );

    // cy.get('.submit-button').should('exist').click();
    // cy.wait('@addNewAdventure');

    // cy.get('.adventure-card').should('have.length', 8);
    // cy.get('.adventure-card').first().should('have.id', 21);
    // cy.get('.adventure-card').last().should('have.id', 17);
    // cy.get('.adventure-card')
    //   .first()
    //   .should('have.id', 21)
    //   .should('contain', 'Kayaking')
    //   .should('contain', '10/20/2023')
    //   .should('contain', 'Good')
    //   .should('contain', 'Hydrated')
    //   .should('contain', 'Low')
    //   .should('contain', 'I wish I could sleep in one of these days')
    //   .should('contain', 'Got pitted and it was freakin sick')
    //   .should('contain', 'I should remember to drink more water');
  //   cy.get('.adventure-card')
  //     // .first()
  //     // .should('have.id', 21)
  //     .get('.card-button-wrapper')
  //     .get('.pencil-btn').should('exist')
  //     .get('.trash-btn').should('exist');
  // });
});
