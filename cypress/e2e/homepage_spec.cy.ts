/// <reference types="cypress" />

describe('template spec', () => {

  // cy.intercept('POST', 'https://117105e4-6093-4d95-8632-31f93d58b35a.mock.pstmn.io/api/v0/adventures',(
  //   status: 201,
  //   body: {
  //     'ls'
  //   }
  // ))

  it('passes', () => {
    cy.visit('http://localhost:3000/')
    cy.url().should('contain', 'localhost:3000')})

  })