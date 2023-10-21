describe('log adventure form', () => {

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

  it('should contain log adventure components', () => {
    cy.wait('@login');
    cy.wait('@getUserData');
    cy.get('.login-btn').click();

    cy.url().should('contain', 'localhost:3000/home');
    cy.get('.new-adventure-btn').click();
    cy.url().should('contain', 'localhost:3000/logAdventure');
    cy.get('[for="activity-input"]').contains('Activity')
    cy.get('[name="activity"]').type('White Water Rafting')
      .should('have.value', 'White Water Rafting')
    cy.get('[for="date-input"]')
      .should('be.visible')
    cy.get("input[name='date']").should('exist').type('2023-10-20');
    cy.get("input[name='date']").should('have.value', '2023-10-20');

    

    // cy.get('[for="image"]').contains('Add Image')
    // cy.get('[name="image"]').should('have.attr', 'placeholder', 'Enter the image URL')
    //   .type('https://www.rei.com/adventures/assets/adventures/images/trip/gallery/northamerica/crh_12')
    // cy.get('p').should('contain', 'Over the last 48 hours, how would you describe the following')
    // cy.get('[name="stressLevel"]').select('Moderate')
    // cy.get('[name="hydration"]').select('Hydrated')
    // cy.get('[name="diet"]').select('Average')
    // cy.get('.second-line-components > div > label').contains('Hours slept')
    // cy.get('.second-line-components > div > input').type('{upArrow}0')
    // cy.get('.sleep-notes-input').should('have.attr', 'placeholder', 'Add any extra notes on sleep or stress')
    //   .type('At least 8 hours instead of 6 hours next time')
    // cy.get('.hydro-notes-input').should('have.attr', 'placeholder', 'Add any extra notes on diet or hydration')
    //   .type('More Water')
    // cy.get('.notes-input').should('have.attr', 'placeholder', 'Add any extra notes on any beta ')
    //   .type('great place')
  })
})