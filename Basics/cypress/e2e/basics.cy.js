/// <reference types="cypress" />

describe('Main page', () => {

  it('should render the main image', () => {
    cy.visit('http://localhost:5173/')
    cy.get(".main-header img").should("exist")
  })

  it('should render the main title', () => {
    cy.visit('http://localhost:5173/')
    cy.get(".main-header h1").contains("React Tasks")
    cy.get(".main-header h1").should("have.length", 1)
  })

})