// describe('log adventure form', () => {

//   beforeEach(() => {
//     cy.intercept(
//       'POST',
//       'https://safe-refuge-07153-b08bc7602499.herokuapp.com/api/v0/user',
//       {
//         statusCode: 201,
//         fixture: 'userInfo.json',
//       }
//     ).as('login');

//     cy.fixture('dummy_data.json').then((response) => {
//       cy.intercept(
//         'POST',
//         'https://safe-refuge-07153-b08bc7602499.herokuapp.com/api/v0/user/adventures',
//         {
//           statusCode: 201,
//           body: response,
//         }
//       ).as('getUserData');
//       console.log('response --->', response);
//     });

//     cy.fixture('new_adventure.json').then((response) => {
//       cy.intercept(
//         'POST',
//         'https://safe-refuge-07153-b08bc7602499.herokuapp.com/api/v0/adventure',
//         {
//           statusCode: 201,
//           body: response,
//         }
//       ).as('addNewAdventure');
//       console.log('response --->', response);
//     });

//     cy.visit('http://localhost:3000/');
//   });

//   it('should contain log adventure components', () => {
//     cy.wait('@login');
//     cy.wait('@getUserData');
//     cy.get('.login-btn').click();

//     cy.url().should('contain', 'localhost:3000/home');
//     cy.get('.new-adventure-btn').click();
//     cy.url().should('contain', 'localhost:3000/logAdventure');
//     cy.get('[for="activity-input"]').contains('Activity')
//     cy.get('[name="activity"]').type('White Water Rafting')
//       .should('have.value', 'White Water Rafting')
//     cy.get('[for="date-input"]')
//       .should('be.visible')
//     cy.get("input[name='date']").should('exist').type('2023-10-20');
//     cy.get("input[name='date']").should('have.value', '2023-10-20');
//     cy.get('[for="image"]').contains('Add Image')
//     cy.get('[name="image"]').should('have.attr', 'placeholder', 'Enter the image URL')
//       .type('https://www.rei.com/adventures/assets/adventures/images/trip/gallery/northamerica/crh_12')
//     cy.get("input[name='image']").should('have.value','https://www.rei.com/adventures/assets/adventures/images/trip/gallery/northamerica/crh_12');
//     cy.get('.submit-button').should('exist');
//     cy.get('p').should('contain', 'Over the last 48 hours, how would you describe the following')
//     cy.get("select[name='stressLevel']").should('exist').select('Low');
//     cy.get("select[name='stressLevel']").should('have.value', 'Low');
//     cy.get("select[name='hydration']").should('exist').select('Hydrated');
//     cy.get("select[name='hydration']").should('have.value', 'Hydrated');
//     cy.get("select[name='diet']").should('exist').select('Good');
//     cy.get("select[name='diet']").should('have.value', 'Good');
//     cy.get("input[name='sleep']")
//       .should('exist')
//       .type('{uparrow}')
//       .type('{uparrow}')
//       .type('{uparrow}')
//       .type('{uparrow}')
//   cy.get("input[name='sleep']").should('have.value', '4');
//   cy.get('.sleep-notes-input').should('have.attr', 'placeholder', 'Add any extra notes on sleep or stress')
//     .type('At least 8 hours instead of 6 hours next time')
//   cy.get('.hydro-notes-input').should('have.attr', 'placeholder', 'Add any extra notes on diet or hydration')
//     .type('Have a lighter lunch next time')
//   cy.get('.notes-input').should('have.attr', 'placeholder', 'Add any extra notes on any beta ')
//     .type('I should remember to drink more water')
//   cy.get('.submit-button').should('exist').click();
//   cy.wait('@addNewAdventure');
//   cy.get('.adventure-card').should('have.length', 8);
//   cy.get('.adventure-card').first().should('have.id', 21);
//   cy.get('.adventure-card').last().should('have.id', 17);
//   cy.get('.adventure-card')
//     .first()
//     .should('have.id', 21)
//     .should('contain', 'White Water Rafting')
//     .should('contain', '10/20/2023')
//     .should('contain', 'Good')
//     .should('contain', 'Hydrated')
//     .should('contain', 'Low')
//     .should('contain', 'At least 8 hours instead of 6 hours next time')
//     .should('contain', 'Have a lighter lunch next time')
//     .should('contain', 'I should remember to drink more water');
//   })

//   it('should display error message when user doesnt fill out required fields', () => {
//     cy.wait('@login');
//     cy.wait('@getUserData');
//     cy.get('.login-btn').click();

//     cy.url().should('contain', 'localhost:3000/home');
//     cy.get('.new-adventure-btn').click();
//     cy.url().should('contain', 'localhost:3000/logAdventure');
//     cy.get("input[name='date']").should('exist').type('2023-10-20');
//     cy.get("input[name='date']").should('have.value', '2023-10-20');
//     cy.get('.submit-button').should('exist').click();
//     cy.get('.form-btn-wrapper > p').should('contain', 'Please specify the activity you\'re logging')
//   })
// })