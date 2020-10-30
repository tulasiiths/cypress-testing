///<reference types = 'Cypress'/>
describe("WEB Hook", () => {
    it("Webhook test", () => {
        var baseUrl = Cypress.env("baseUrl");
        var appId = Cypress.env("appId");

        cy.request({
            method: "POST",
            url: `${baseUrl}v2/webhook/test`,
            encoding: "utf-8",
            headers: {
                "Content-Type": "application/json",
                Authorization: appId,
            },
            body: {
                "Url": "https://webhook.site/480d113a-83fe-47b1-8c83-3d2479465348"
            },
        }).as("webHook");
        cy.get("@webHook").should("have.property", "status", 200);

        cy.get("@webHook").its("body").should("have.property", "elapsed");
        cy.get("@webHook").its("body").should("have.property", "error", null);

    })

})