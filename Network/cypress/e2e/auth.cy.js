/// <reference types="Cypress" />

describe('Authentication', () => {

    beforeEach(() => {
        cy.task("seedDatabase")
    })

    //could have tested sessions and cookies on sign up login but app is a bit buggy
    it("Should sign up the user", () => {
        cy.visit("/signup")
        cy.get('[data-cy="auth-email"]').click()
        cy.get('[data-cy="auth-email"]').type("testiii@gmail.com")
        cy.get('[data-cy="auth-password"]').type("test123")
        cy.get('[data-cy="auth-submit"]').click()
        cy.location("pathname").should("eq", "/takeaways")
        cy.contains("Logout")
    })

    it("Should login and logout the user", () => {
        cy.visit("/login")
        cy.login() //custom command

        cy.contains("Logout").click()
        cy.location("pathname").should("eq", "/")
    })

})
