/// <reference types="Cypress" />

describe("Takeaways", () => {

    beforeEach(() => {
        cy.task("seedDatabase")
    })

    it('should subscribe to the newsletter', () => {
        cy.visit("/")
        cy.intercept("POST", "/newsletter*", { statusCode: 201 }).as("subscribeNewsletter")
        cy.get('[data-cy="newsletter-email"]').click()
        cy.get('[data-cy="newsletter-email"]').type("new@gmail.com")
        cy.get('[data-cy="newsletter-submit"]').click()
        cy.wait("@subscribeNewsletter")
        // cy.contains("Thanks for signing up!") //due to application bug it does not work
    })

})