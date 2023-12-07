describe('Should allow a user to add a new Adventure and a new log', () => {
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
      cy.visit('http://localhost:3000/');
    });

    // cy.fixture('new_adventure.json').then((response) => {
    //   cy.intercept(
    //     'POST',
    //     'https://safe-refuge-07153-b08bc7602499.herokuapp.com/api/v0/adventure',
    //     {
    //       statusCode: 201,
    //       body: response,
    //     }
    //   ).as('addNewAdventure');
    //   console.log('response --->', response);
    // });
  });

  it('should allow a user to add a new activity and a new activity journal', () => {
    cy.url().should('contain', 'localhost:3000');
    cy.get('.login-btn').click();
    cy.wait('@login');
    cy.wait('@getUserData');

    cy.get('.activity-card').should('exist').should('have.length', 3);
    cy.get('.activity-card')
      .first()
      .should('contain', 'Yoga')
      .should('contain', 'Last log: 12-10-2020');
    cy.get('.activity-card')
      .last()
      .should('contain', 'Cycling')
      .should('contain', 'Last log: 05-15-2022');

    cy.get('.user-info-wrapper').get('input').should('exist');
    cy.get('.user-info-wrapper').get('input').type('Hiking');
    cy.get('.user-info-wrapper').get('input').should('have.value', 'Hiking');
    cy.get('.add-journal-btn').should('exist').click();
    cy.get('.activity-card').should('exist').should('have.length', 4);
    cy.get('.activity-card')
      .first()
      .should('contain', 'Yoga')
      .should('contain', 'Last log: 12-10-2020');
    cy.get('.activity-card')
      .last()
      .should('contain', 'Hiking')
      .should('contain', 'Last log: No logs yet');
      
  });
});
