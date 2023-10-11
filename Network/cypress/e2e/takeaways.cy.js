/// <reference types="Cypress" />

describe('Takeaways', () => {

  beforeEach(() => {
    cy.task("seedDatabase")
  })

  it('should display a list of fetched takeaways', () => {
    cy.visit('/')
    cy.get('[data-cy="takeaway-item"]').should("have.length", 2)
  })

  it('should add a takeaway', () => {
    cy.intercept("POST", "/takeaways/new*", "success").as("stopTakeAway")
    cy.visit("/login")
    cy.login()
    cy.visit("/takeaways/new")
    cy.get('[data-cy="title"]').click()
    cy.get('[data-cy="title"]').type("Cypress Ended")
    cy.get('[data-cy="body"]').type("Woah! It Ended")
    cy.get('[data-cy="create-takeaway"]').click()
    cy.contains("Cypress Ended")
    cy.contains("Woah! It Ended")
    cy.wait("@stopTakeAway").its("request.body").should("match", /Ended.*Ended/)
  })

})