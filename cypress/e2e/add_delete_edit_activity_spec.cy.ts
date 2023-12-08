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
      cy.get('.login-btn').click();
      cy.wait('@login');
      cy.wait('@getUserData');
    });
  });

  it('should allow a user to add a new journal and a new log', () => {
    cy.fixture('new_adventure.json').then((response) => {
      cy.intercept(
        'POST',
        'https://wildscribe.azurewebsites.net/api/v0/adventure',
        {
          statusCode: 200,
          body: response,
        }
      ).as('addNewAdventure');
    });

    cy.url().should('contain', 'localhost:3000/home');

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
      .should('contain', 'Last log: No logs yet')
      .click();

    cy.url().should('contain', 'localhost:3000/Hiking');
    cy.get('.search-bar-wrapper')
      .should('exist')
      .should('contain', 'Hiking Journal');
    cy.get('.new-adventure-btn').should('exist');
    cy.get('.view-stats-btn').should('exist');
    cy.get('.search-input').should('exist');
    cy.get('.leaflet-container').should('exist');
    cy.get('.adventure-card-container')
      .should('exist')
      .should(
        'contain',
        "It looks like you don't have any hiking logs yet, go ahead and add a log to get started!"
      );

    cy.get('.adventure-card').should('have.length', 0);

    cy.get('.new-adventure-btn').click();
    cy.url().should('contain', 'localhost:3000/Hiking/newLog');
    cy.get('.form').should('exist');
    cy.get('.top-line-data').should('contain', 'Activity: Hiking');
    cy.get('.top-line-data:has(label:contains("Date"))');
    cy.get("input[name='date']").should('exist').type('2023-10-20');
    cy.get("input[name='date']").should('have.value', '2023-10-20');
    cy.get('.top-line-data:has(label:contains("Add Image"))');
    cy.get('[for="image"]').contains('Add Image');
    cy.get('[name="image"]')
      .should('have.attr', 'placeholder', 'Enter the image URL')
      .type(
        'https://www.rei.com/adventures/assets/adventures/images/trip/gallery/northamerica/crh_12'
      );
    cy.get("input[name='image']").should(
      'have.value',
      'https://www.rei.com/adventures/assets/adventures/images/trip/gallery/northamerica/crh_12'
    );
    cy.get('.submit-button').should('exist');
    cy.get('.stress:has(label:contains("Stress Level"))');
    cy.get("select[name='stressLevel']").should('exist').select('Low');
    cy.get("select[name='stressLevel']").should('have.value', 'Low');
    cy.get('.hydration:has(label:contains("Hydration Level"))');
    cy.get("select[name='hydration']").should('exist').select('Hydrated');
    cy.get("select[name='hydration']").should('have.value', 'Hydrated');
    cy.get('.calories:has(label:contains("Calories"))');
    cy.get("input[name='diet']").should('exist').type('1500');
    cy.get("input[name='diet']").should('have.value', '1500');
    cy.get('.sleep:has(label:contains("Hours Slept"))');
    cy.get("input[name='sleep']")
      .should('exist')
      .type('{uparrow}')
      .type('{uparrow}');
    cy.get("input[name='sleep']").should('have.value', '2');
    cy.get('.lat:has(label:contains("Latitude"))');
    cy.get("input[name='latitude']").should('exist').type('47.999999');
    cy.get("input[name='latitude']").should('have.value', '47.999999');
    cy.get('.long:has(label:contains("Longitude"))');
    cy.get("input[name='longitude']").should('exist').type('-109.9999999');
    cy.get("input[name='longitude']").should('have.value', '-109.9999999');
    cy.get('.notes-input')
      .should('have.attr', 'placeholder', 'Notes on activity, diet, beta, etc.')
      .type('These are some notes about my hike');
    cy.get('.notes-input').should(
      'have.value',
      'These are some notes about my hike'
    );
    cy.get('.submit-button').click();
    cy.wait('@addNewAdventure');

    cy.url().should('contain', 'localhost:3000/Hiking');
    cy.get('.adventure-card')
      .should('have.length', 1)
      .should('have.attr', 'id', '5');
    cy.get('#5')
      .should('exist')
      .should('contain', 'Date: 10-20-2023')
      .should('contain', 'Hydration: Hydrated')
      .should('contain', 'Calories: 1500')
      .should('contain', 'Stress Level: Low')
      .should('contain', 'Notes: These are some notes about my hike');
  });

  it('Should allow a user to edit a log and update the message on the dashboard', () => {
    cy.fixture('edit_card.json').then((response) => {
      cy.intercept(
        'PATCH',
        'https://wildscribe.azurewebsites.net/api/v0/adventure',
        {
          statusCode: 200,
          body: response,
        }
      ).as('editRequest');
    });

    cy.url().should('contain', 'localhost:3000/home');
    cy.get('.activity-card').should('exist').should('have.length', 3);
    cy.get('.user-info-wrapper')
      .get('p')
      .should(
        'contain',
        'Your last log was on 10-10-2023 in your Running journal'
      );
    cy.get('.activity-card').first().click();

    cy.url().should('contain', 'localhost:3000/Yoga');

    cy.get('.adventure-card').should('have.length', 2);
    cy.get('.adventure-card').first().should('have.id', 12);
    cy.get('.adventure-card').last().should('have.id', 11);
    cy.get('.adventure-card').last().find('.edit-btn').should('exist').click();

    cy.url().should('contain', 'localhost:3000/edit');
    cy.get('.edit-activity:has(label:contains("Activity"))')
      .find('input')
      .should('have.value', 'Yoga');
    cy.get('.edit-activity').within(() => {
      cy.contains('label', 'Date').should('exist');
      cy.get("input[name='date']")
        .should('exist')
        .and('have.value', '2014-04-01');
      cy.contains('label', 'Add Image').should('exist');
      cy.get("input[name='image']")
        .should('exist')
        .and('have.value', 'http://xyebjez.net/');
    });
    cy.get('.submit-button').should('exist');
    cy.get('.edit-stress:has(label:contains("Stress Level"))')
      .find('select')
      .should('have.value', 'Moderate');
    cy.get('.edit-hydration:has(label:contains("Hydration Level"))')
      .find('select')
      .should('have.value', 'Dehydrated');
    cy.get('.edit-calories:has(label:contains("Calories"))')
      .find('input')
      .should('have.value', '3490');
    cy.get('.edit-sleep:has(label:contains("Hours Slept"))')
      .find('input')
      .should('have.value', '11');
    cy.get('.edit-lat:has(label:contains("Latitude"))')
      .find('input')
      .should('have.value', '-87.03984832763672');
    cy.get('.edit-long:has(label:contains("Longitude"))')
      .find('input')
      .should('have.value', '-7.9888153076171875');
    cy.get('.edit-notes')
      .should('exist')
      .and('have.value', 'These are some notes about yoga.');

    cy.get("input[name='date']").type('2023-12-07');
    cy.get("input[name='date']").should('have.value', '2023-12-07');
    cy.get('.edit-notes').clear().type('These notes have been edited.');
    cy.get('.edit-notes').should('have.value', 'These notes have been edited.');
    cy.get('.submit-button').click();
    cy.wait('@editRequest');

    cy.url().should('contain', 'localhost:3000/Yoga');
    cy.get('.adventure-card')
      .first()
      .should('have.id', 11)
      .should('contain', 'Date: 12-07-2023')
      .should('contain', 'These notes have been edited.');
    cy.get('.adventure-card').last().should('have.id', 12);
    cy.get('.home-btn').click();

    cy.get('.user-info-wrapper').should(
      'contain',
      'Your last log was on 12-07-2023 in your Yoga journal'
    );
  });

  it('Should allow a user to delete a log', () => {
    cy.fixture('example.json').then((response) => {
      cy.intercept(
        'DELETE',
        'https://wildscribe.azurewebsites.net/api/v0/adventure',
        {
          statusCode: 200,
          body: response,
        }
      ).as('deleteRequest');
    });
    cy.url().should('contain', 'localhost:3000/home');
    cy.get('.activity-card').should('exist').should('have.length', 3);
    cy.get('.activity-card').first().should('contain', 'Yoga');
    cy.get('.activity-card').last().should('contain', 'Cycling').click();

    cy.url().should('contain', 'localhost:3000/Cycling');
    cy.get('.adventure-card').should('have.length', '1');
    cy.get('.adventure-card').first().should('have.id', '14');
    cy.get('#14').find('.trash-btn').should('exist').click();
    cy.wait('@deleteRequest');

    cy.get('.adventure-card-container')
      .get('p')
      .should(
        'contain',
        "It looks like you don't have any cycling logs yet, go ahead and add a log to get started!"
      );
    cy.get('.home-btn').click();

    cy.url().should('contain', 'localhost:3000/home');
    cy.get('.activity-card').should('exist').should('have.length', 2);
    cy.get('.activity-card').first().should('contain', 'Yoga');
    cy.get('.activity-card').last().should('contain', 'Running');
  });
});
