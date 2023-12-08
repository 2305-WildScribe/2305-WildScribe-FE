/// <reference types="cypress" />

describe('Homepage', () => {
  beforeEach(() => {
    cy.intercept('POST', 'https://wildscribe.azurewebsites.net/api/v0/user', {
      statusCode: 200,
      fixture: 'userInfo.json',
    }).as('login');

    cy.fixture('dummy_data.json').then((response) => {
      cy.intercept(
        'POST',
        'https://wildscribe.azurewebsites.net/api/v0/adventures',
        {
          statusCode: 200,
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

  it('Should allow a user to login and see their dashboard', () => {
    cy.url().should('contain', 'localhost:3000');
    cy.get('.login-form').should('exist');
    cy.get('p').should(
      'contain',
      'Welcome to WildScribe! Please log in to continue.'
    );
    cy.get("input[name='email']")
      .should('exist')
      .should('have.value', 'me3501@gmail.com');
    cy.get("input[name='password']")
      .should('exist')
      .should('have.value', 'Password3501');
    cy.get('.login-btn').should('exist');
    cy.get('.login-btn').click();

    cy.wait('@login');
    cy.wait('@getUserData');
    cy.url().should('contain', 'localhost:3000/home');

    cy.get('h1').should('contain', 'WildScribe');
    cy.get('.nav-bar').should('exist');
    cy.get('.home-btn').should('have.class', 'active');
    cy.get('.log-out-btn').should('exist');
    cy.get('.nav-button-container').should('exist');

    cy.get('.username')
      .should('exist')
      .should('contain', 'Welcome back Mr. Beans!');
    cy.get('.activity-container').should('exist');
    cy.get('.activity-card').should('exist').should('have.length', 3);
    cy.get('.activity-card')
      .first()
      .should('contain', 'Yoga')
      .should('contain', 'Last log: 12-10-2020');
    cy.get('.activity-card')
      .last()
      .should('contain', 'Cycling')
      .should('contain', 'Last log: 05-15-2022');

    cy.get('.user-info-wrapper').should('exist');
    cy.get('.user-info-wrapper').get('input').should('exist');
    cy.get('.add-journal-btn').should('exist');
    cy.get('.user-info-wrapper')
      .get('p')
      .should('exist')
      .should(
        'contain',
        'Your last log was on 10-10-2023 in your Running journal'
      );
    cy.get('svg').should('exist');
  });

  it('Should allow a user to click a journal and see/search their logs', () => {
    cy.url().should('contain', 'localhost:3000');
    cy.get('.login-btn').click();

    cy.wait('@login');
    cy.wait('@getUserData');
    cy.url().should('contain', 'localhost:3000/home');
    cy.get('.activity-card').first().click();

    cy.url().should('contain', 'localhost:3000/Yoga');
    cy.get('.search-bar-wrapper')
      .should('exist')
      .get('p')
      .should('contain', 'Yoga Journal');
    cy.get('.new-adventure-btn').should('exist');
    cy.get('.view-stats-btn').should('exist');
    cy.get('.search-input').should('exist');
    cy.get('.leaflet-container').should('exist');
    cy.get('.adventure-card-container').should('exist');

    cy.get('.adventure-card').should('have.length', 2);
    cy.get('.adventure-card')
      .first()
      .should('have.id', 12)
      .should('contain', 'Date: 12-10-2020')
      .should('contain', 'Hydration: Hydrated')
      .should('contain', 'Calories: 1500')
      .should('contain', 'Stress Level: Low')
      .should('contain', 'Hours Slept: 8')
      .should('contain', 'Notes: These are also some notes on yoga.');

    cy.get('.adventure-card')
      .last()
      .should('have.id', 11)
      .should('contain', 'Date: 04-01-2014')
      .should('contain', 'Hydration: Dehydrated')
      .should('contain', 'Calories: 3490')
      .should('contain', 'Stress Level: Moderate')
      .should('contain', 'Hours Slept: 11')
      .should('contain', 'Notes: These are some notes about yoga.');

    cy.get('.search-input')
      .should('exist')
      .type('also')
      .should('have.value', 'also');
    cy.get('.adventure-card').should('have.length', 1).should('have.id', 12);
  });

  it('Should allow a user to see their stats page', () => {
    cy.url().should('contain', 'localhost:3000');
    cy.get('.login-btn').click();

    cy.wait('@login');
    cy.wait('@getUserData');
    cy.url().should('contain', 'localhost:3000/home');
    cy.get('.activity-card').first().click();

    cy.get('.view-stats-btn').click();
    cy.get('.back-btn-wrapper').should('exist');
    cy.get('.back-button').should('exist');
    cy.get('.graph-wrapper')
      .should('exist')
      .should('contain', 'Hydration levels')
      .should('contain', 'Stress levels')
      .should('contain', 'Hours slept / night')
      .should('contain', 'Calories');
    cy.get('canvas').should('have.length', 4);
    cy.get('.hydro-graph').should('exist');
    cy.get('.stress-graph').should('exist');
    cy.get('.sleep-graph').should('exist');
    cy.get('.diet-graph').should('exist');

    cy.get('.back-button').click();
    cy.get('.map-card-wrapper').should('exist');
  });
});
