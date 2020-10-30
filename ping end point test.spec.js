///<reference types = 'Cypress'/>
describe("Ping Test ", () => {
    it("Ping end point test", () => {
        var baseUrl = Cypress.env("baseUrl");
        var appId = Cypress.env("appId");

        cy.request({
            method: "POST",
            url: `${baseUrl}v2/ping`,
            encoding: "utf-8",
            headers: {
                "Content-Type": "application/json",
                Authorization: appId,
            },

        }).as("ping");
        cy.get("@ping").should("have.property", "status", 200);

        cy.get("@ping").its("body").should("have.property", "DateTime");
        cy.get("@ping").its("body").should("have.property", "IP")

    })

})