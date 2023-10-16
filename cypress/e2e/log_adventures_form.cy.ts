describe('log adventure form', () => {

  beforeEach(() => {
    cy.fixture('dummy_data.json').then((response) => {
      cy.intercept(
        'POST',
        'https://117105e4-6093-4d95-8632-31f93d58b35a.mock.pstmn.io/api/v0/adventures',
        {
          statusCode: 201,
          body: {
            activity: 'White Water Rafting',
            date: '10/14/2023',
            notes: 'Medium water was great',
            image_url: 'https://www.rei.com/adventures/assets/adventures/images/trip/gallery/northamerica/crh_12',
            stress_level: 'Moderate',
            hydration: 'Hydrated',
            diet: 'Average',
            sleep: 'Average',
            extraDietNotes: 'More Protein',
            extraSleepNotes: 'At least 8 hours instead of 6 hours next time',
          }
        }
      )
    });
    cy.visit('http://localhost:3001/logAdventure');
  });

  it('should contain log adventure components', () => {
    cy.url().should('contain', 'localhost:3001/logAdventure')
    cy.get('[for="activity-input"]').contains('Activity')
    cy.get('[name="activity"]').type('White Water Rafting')
      .should('have.value', 'White Water Rafting')
    cy.get('[for="date-input"]')
      .should('be.visible')
    cy.get('[type="date"]').click()
      .type('2023-10-14')
    cy.get('[for="image"]').contains('Add Image')
    cy.get('[name="image"]').should('have.attr', 'placeholder', 'Enter the image URL')
    cy.get('[name="image"]').type('https://www.rei.com/adventures/assets/adventures/images/trip/gallery/northamerica/crh_12')
    cy.get('p').should('contain', 'Over the last 48 hours, how would you describe the following')
    cy.get('[name="stressLevel"]').select('Moderate')
    cy.get('[name="hydration"]').select('Hydrated')
  })
})