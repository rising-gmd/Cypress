describe('Share Location', () => {

  beforeEach(() => {

    cy.fixture("location.json").as("locationParams")
    cy.visit('/').then((window) => {

      cy.clock()

      // Btn resuability
      cy.get('[data-cy="get-loc-btn"]').as("locationBtn")
      cy.get('[data-cy="share-loc-btn"]').as("shareLocationBtn")
      cy.get('[data-cy="info-message"]').as("copyMessage")

      cy.get("@locationParams").then((fakeData) => {
        cy.stub(window.navigator.geolocation, "getCurrentPosition").as("getUserPosition")
          .callsFake((cb) => {
            setTimeout(() => {
              cb(fakeData)
            }, 100)
          })
      })
      cy.stub(window.navigator.clipboard, "writeText").as("writeData").resolves()
      cy.spy(window.localStorage, 'setItem').as("setUrl")
      cy.spy(window.localStorage, 'getItem').as("getUrl")
    })
  })

  it('Should get the user location', () => {
    cy.get("@locationBtn").click()
    cy.get("@getUserPosition").should("have.been.called")
    cy.get("@locationBtn").should("be.disabled")
    cy.get('[data-cy="actions"]').should("contain", "Location fetched!")
  })

  it('Should share the user location', () => {
    cy.get("@locationParams").then((fakeApi) => {
      const { latitude, longitude } = fakeApi.coords
      cy.get("@locationBtn").click()
      cy.get('[data-cy="name-input"]').type("Ghulam Mohiuddin")
      cy.get("@shareLocationBtn").click()
      cy.get("@writeData").should("have.been.calledWithMatch", new RegExp(`${latitude}*.${longitude}*.${encodeURI("Ghulam Mohiuddin")}`))
      cy.get("@setUrl").should("have.been.calledWithMatch", /Ghulam Mohiuddin/, new RegExp(`${latitude}*.${longitude}*.${encodeURI("Ghulam Mohiuddin")}`))
      cy.get("@shareLocationBtn").click()
      cy.get("@getUrl").should("have.been.called")
      cy.get("@copyMessage").should("be.visible")
      cy.get("@copyMessage").should("have.class", "visible")
      cy.tick(2000)
      cy.get("@copyMessage").should("not.be.visible")
    })
  })



})