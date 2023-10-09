/// <reference types="cypress" />

describe("Contact Form Flow", () => {

    it("should change text of btn and disable it", () => {
        cy.visit("http://localhost:5173/")
        cy.get(`[data-cy="header-about-link"]`).click()
        cy.get('[data-cy="contact-input-message"]').type("My message is very clear")
        cy.get('[data-cy="contact-input-name"]').type("Ghulam Mohiuddin")
        cy.get('[data-cy="contact-btn-submit"').as("submitBtn")
        // Use of then and Alias
        cy.get("@submitBtn").then((element) => {
            expect(element.attr("disabled")).to.be.undefined;
            expect(element.text()).equal("Send Message")
        })
        //Use of keys
        cy.get('[data-cy="contact-input-email"]').type("ghulammohiuddin2171@gmail.com{enter}")
        // cy.get('@submitBtn').contains("Send Message").click()
        cy.get('@submitBtn').contains("Sending...").should("have.attr", "disabled")
    })

    it("Should validate the form in all edge cases", () => {
        cy.visit("http://localhost:5173/about")
        cy.get(`[data-cy="header-about-link"]`).click()
        cy.screenshot()
        cy.get('[data-cy="contact-btn-submit"').as("submitBtn")
        cy.get("@submitBtn").then((element) => {
            expect(element).to.not.have.attr("disabled")
            expect(element).not.to.be.equal("Sending...")
        })
        cy.get('[data-cy="contact-input-message"]').as("yourMessage")
        cy.get('[data-cy="contact-input-name"]').as("yourName")
        cy.get('[data-cy="contact-input-email"]').as("yourEmail")
        cy.get('@yourMessage').focus().blur()
        cy.get('@yourMessage')
            .parent()
            .should((ele) => {
                expect(ele.attr("class")).to.contains("invalid")
            })
        cy.get('@yourName').focus().blur()
        cy.get('@yourName').parent().should('have.attr', 'class').and('include', 'invalid')
        cy.get('@yourEmail').focus().blur()
        cy.get('@yourEmail').parent().should('have.attr', 'class').and('include', 'invalid')
    })



})