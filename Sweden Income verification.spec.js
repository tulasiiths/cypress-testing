import { ENV } from "C:/Users/ZignSec/Repo/test/cypress/util/helpers";


///<reference types = 'Cypress'/>

describe("Income verification testing ", () => {
    it("Sweden Bank ID testing", () => {
        var baseUrl = Cypress.env("baseUrl");
        var appId = Cypress.env("appId");
        var body = 'NOT SET';
        var expected;


        expected = {
            person: {
                CountryCode: "SE",
                Currency: "SEK"

            }
        };


        cy.request({
            method: "POST",
            url: "https://test.zignsec.com/v2/eid/iv_se",
            followRedirect: true,
            headers: {
                Authorization: appId,
                "Content-Type": "application/json",
                //"Content-Type": "application/x-www-form-urlencoded",
            },
            body: expected,


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

            cy.visit("https://test.zignsec.com/v2/Hosted/" + response.id + "/iv_se/")
            cy.get("#instantor").then(function($ele) {
                const ifele = $ele.contents().find('body')
                cy.wrap(ifele).click().contains('Swedbank').click()
                cy.switchToIframe('#instantor').wait(1000).type('Fake42!', )

                cy.switchToIframe('#instantor').find('#terms_and_conditions').click()
                cy.switchToIframe('#instantor').find('[name="privacy_policy"]').click()
                cy.switchToIframe('#instantor').find('button').click()
                cy.wait(3000)
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
})