/// <reference types="cypress" />

describe("tasks management", () => {

    it("Should open and close the task modal", () => {
        // With Cancel button
        cy.visit('http://localhost:5173/')
        cy.get('[data-cy="start-add-task-button"]').click()
        cy.get(".modal").should("exist")
        cy.get(".modal").find("button").contains("Cancel").click()
        cy.get(".modal").should("not.exist")

        // With Clicking anywhere
        cy.visit('http://localhost:5173/')
        cy.get('[data-cy="start-add-task-button"]').click()
        cy.get(".modal").should("exist")
        cy.get(".modal").get(".backdrop").click({ force: true })
        cy.get(".modal").should("not.exist")
        cy.get(".backdrop").should("not.exist")
    })

    it("Should give error on empty form submission", () => {
        cy.visit('http://localhost:5173/')
        cy.get('[data-cy="start-add-task-button"]').click()
        cy.get(".actions").find("button").contains("Add Task").click()
        cy.get("#new-task-form").find(".error-message").should("exist")
    })

    it("Should add a task", () => {
        cy.visit('http://localhost:5173/')
        cy.get('[data-cy="start-add-task-button"]').click()
        cy.get("#title").type("Going to Gym")
        cy.get("#summary").type("Going to Gym is good for Health")
        cy.get("#category").select("important")
        cy.get(".actions").find("button").contains("Add Task").click()
        cy.get(".modal").should("not.exist")
        cy.get(".backdrop").should("not.exist")
        cy.get(".task-list").should("exist")
        cy.get(".task").should("have.length", 1)
        cy.get(".task h2").contains("Going to Gym")
        cy.get(".task p").contains("Going to Gym is good for Health")
    })

    it("Should add multipe tasks", () => {

        // First Task
        cy.visit('http://localhost:5173/')
        cy.get('[data-cy="start-add-task-button"]').click()
        cy.get("#title").type("First Task")
        cy.get("#summary").type("Perform First Task")
        cy.get("#category").select("important")
        cy.get(".actions").find("button").contains("Add Task").click()
        cy.get(".modal").should("not.exist")
        cy.get(".backdrop").should("not.exist")
        cy.get(".task-list").should("exist")
        cy.get(".task").should("have.length", 1)

        // Second Task
        cy.get('[data-cy="start-add-task-button"]').click()
        cy.get("#title").type("Second Task")
        cy.get("#summary").type("Perform Second Task")
        cy.get("#category").select("important")
        cy.get(".actions").find("button").contains("Add Task").click()
        cy.get(".modal").should("not.exist")
        cy.get(".backdrop").should("not.exist")
        cy.get(".task-list").should("exist")
        cy.get(".task").should("have.length", 2)
        cy.get(".task-list").first().contains("First Task")
        cy.get(".task-list").first().contains("Perform First Task")
        cy.get(".task-list").last().contains("Second Task")
        cy.get(".task-list").last().contains("Perform Second Task")
    })

    it("Should filter tasks by selecting category", () => {
        cy.visit('http://localhost:5173/')
        cy.get('[data-cy="start-add-task-button"]').click()
        cy.get("#title").type("Going to Gym")
        cy.get("#summary").type("Going to Gym is good for Health")
        cy.get("#category").select("important")
        cy.get(".actions").find("button").contains("Add Task").click()
        cy.get(".modal").should("not.exist")
        cy.get(".backdrop").should("not.exist")
        cy.get(".task-list").should("exist")
        cy.get(".task").should("have.length", 1)
        cy.get("#filter").select("urgent")
        cy.get("li").should("have.length", 0)
        cy.get("#filter").select("important")
        cy.get(".task").should("have.length", 1)
        cy.get("#filter").select("All")
        cy.get(".task").should("have.length", 1)
    })

})