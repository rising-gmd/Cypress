/// <reference types="Cypress" />

describe('template spec', () => {

  beforeEach(() => {
    cy.visit('/about')
  })

  it('Should submit the Form', () => {
    cy.task('seedDatabase', 'Hello').then((value) => console.log(value))
    cy.getById('contact-input-message').type("Assalam O Alaikum")
    cy.getById('contact-input-name').type("Ghulam Mohiuddin")
    cy.getById('contact-input-email').type("gmd2171@gmail.com")
    cy.getById('contact-btn-submit').contains("Send Message")
    cy.getById('contact-btn-submit').should("not.have.attr", "disabled")
    cy.submitForm()
    cy.getById('contact-btn-submit').contains("Sending...")
    cy.getById('contact-btn-submit').should("have.attr", "disabled")
  })

  it('should validate the form on blur and submit', () => {
    cy.submitForm()
    cy.getById('contact-btn-submit').contains("Send Message")
    cy.getById('contact-btn-submit').should("not.have.attr", "disabled")
    cy.getById('contact-input-message').focus().blur()
    cy.getById('contact-input-message').parent().should("have.attr", "class").and("contain", "invalid")
    cy.getById('contact-input-name').focus().blur()
    cy.getById('contact-input-name').parent().should("have.attr", "class").and("contain", "invalid")
    cy.getById('contact-input-email').focus().blur()
    cy.getById('contact-input-email').parent().should("have.attr", "class").and("contain", "invalid")
  })

})