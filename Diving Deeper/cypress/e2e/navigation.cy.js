/// <reference types="cypress" />

describe('Checking navigation of pages', () => {

  it('Should navigate forward and backward', () => {
    cy.visit('http://localhost:5173/')
    cy.get(`[data-cy="header-about-link"]`).click()
    cy.location("pathname").should("eq", "/about")
    cy.go("back")
    cy.location("pathname").should("eq", "/")
    cy.get(`[data-cy="header-home-link"]`).click()
    cy.location("pathname").should("eq", "/")
  })

  


})