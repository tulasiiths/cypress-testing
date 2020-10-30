import { ENV } from "C:/Users/ZignSec/Repo/test/cypress/util/helpers";


///<reference types = 'Cypress'/>

describe("Income verification testing ", () => {
    it("Finland Bank ID testing", () => {
        var baseUrl = Cypress.env("baseUrl");
        var appId = Cypress.env("appId");
        var body = 'NOT SET';
        var expected;
        if (ENV.isLocal || ENV.isTest || ENV.isDev || ENV.isTest2) {
            body = {
                "PersonalNumber": "​150650003H",
                "LookupPersonAddress": "true",
                "target": "https://www.aftonbladet.se",
                "webhook": "https://webhook.site/9664a03f-a34f-4d87-9754-68f9ebf4d410"
            };

        }

        if (ENV.isStaging || ENV.isProd) {
            body = {
                "PersonalNumber": "​150650003H",
                "LookupPersonAddress": "true",
                "target": "https://www.aftonbladet.se",
                "webhook": "https://webhook.site/9664a03f-a34f-4d87-9754-68f9ebf4d410"
            };

        }



        cy.request({
            method: "POST",
            url: "https://test.zignsec.com/v2/eid/fbid",
            followRedirect: true,
            headers: {
                Authorization: appId,
                //"Content-Type": "application/json",
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: body,


        }).as("Id");



        /* //cy.log("@Id")
        cy.get("@Id").then((redirect) => {
            cy.request({
                method: "GET",
                url: "https://test.zignsec.com/v2/Hosted/e94310e9-dfff-41b4-acdf-8d2801ea2891/iv_cz/",
                //encoding: "base64",
                //form: true,
                headers: {
                    Authorization: appId,
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Content-Type": "application/json",
                    // "Content-Type": "image/jpeg",
                    // "Content-Disposition": 'name="Passport" fileName="example.json"'

                }
            }).as("redirectUrl")
        */

        cy.get("@Id").should("have.property", "status", 200);
        cy.get("@Id").its("body").should("have.a.property", "id")
        cy.get("@Id").its("body").should("have.a.property", "redirect_url")

        //cy.log("Response :" + cy.get("@Id").its("body"))

        //Getting results


        var test
        cy.get("@Id").its("body").
        then((response) => {
            cy.log("Response :" + response.id)
            test = response.id

            cy.visit("https://tunnistus-pp.telia.fi/uas/oauth2/authorization?response_type=code&scope=openid&client_id=7fb547fc-48d2-40d7-93e4-ae9a3c90aecc&redirect_uri=https:%2f%2ftest.zignsec.com%2fv2%2fcallback%2foidcfi&state=" + response.id + "", { failOnStatusCode: false }),

                cy.get('[title="Aktia"]').click()
            cy.get('#defaultSubmitBtn').click()
            cy.get('#defaultSubmitBtn').click()
            cy.get('#defaultSubmitBtn').click()
        })
        cy.get("@Id").then((id) => {
            cy.request({
                method: "GET",
                url: "https://test.zignsec.com/v2/eid/" + response.id + "",
                followRedirect: true,
                //encoding: "base64",
                //form: true,
                headers: {
                    Authorization: appId,
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Content-Type": "application/json",
                    // "Content-Type": "image/jpeg",
                    // "Content-Disposition": 'name="Passport" fileName="example.json"'

                }
            }).as("getStatus")
            cy.get("@getStatus").should("have.property", "status", 200);
            // cy.get("@getStatus").its("body").should("have.a.property", "identity")
            cy.get("@getStatus").its("body").should("have.a.property", "id")
                //return this
                //const session = response.body.session_id,

        })

        /*  cy.log("test:" + test)
cy.visit("https://test.zignsec.com/v2/Hosted/443f02fd-868d-4516-b564-4ff1d3f0a082/iv_se/")


cy.get("#instantor").then(function($ele) {
    const ifele = $ele.contents().find('body')
    cy.wrap(ifele).click().contains('Swedbank').click()
})


cy.switchToIframe('#instantor').wait(1000).type('Fake42!', )

cy.switchToIframe('#instantor').find('#terms_and_conditions').click()
cy.switchToIframe('#instantor').find('[name="privacy_policy"]').click()
cy.switchToIframe('#instantor').find('button').click()

*/


    })
})