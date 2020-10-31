///<reference types = "cypress"/>

import "cypress-file-upload"

describe("Look up person tests", () => {
    var appId = "af5cd36b-83d0-43fb-bfe8-22a8addea553";
    Cypress.config('baseUrl', 'https://test.zignsec.com/')
    it("Look up Person SE", () => {

        cy.request({
            method: "POST",
            url: "/v3/eid/scanningsessions",

            headers: {
                Authorization: appId,
                "Content-Type": "application/json",
            },
            body: {
                "relay_state": "client_state",
                "analysis_types": [
                    "document",
                    "fraud",
                    "selfie"
                ],
                "target": "https://landing.mysite.com",
                "target_error": "https://landing.mysite.com/problem",
                "webhook": "https://webhook.site/"
            },


        }).as("sessionId");


        //cy.log("@sessionId")
        cy.get("@sessionId").should("have.property", "status", 201);
        cy.get("@sessionId").its("body").should("have.a.property", "session_id")



        //Adding documents

        var test

        cy.get("@sessionId").its("body").
        then((data) => {
            cy.log("Response :" + data.session_id)
            test = data.session_id

            //cy.get("@sessionId").then((response) => {
            //return response.body.session_id
            //const session = response.body.session_id,


            //const special = 'example.json';

            // const yourFixturePath = 'example.json';
            //cy.get(data).attachFile(yourFixturePath)
            const special = 'users.json';


            /* cy.fixture(special, 'binary')
                 .then(Cypress.Blob.binaryStringToBlob)
                 .then((fileContent) => {
                     cy.fixture(special, 'binary')
                         .then(Cypress.Blob.binaryStringToBlob)
                         .then(fileContent => */
            cy.request({
                method: "POST",
                url: "https://test.zignsec.com/v3/eid/scanningsessions/" + data.session_id + "/documents?documentType=sample&reference=user.json",

                "fixture": "users.json",

                //encoding: "utf8",
                form: true,
                headers: {
                    Authorization: appId,
                    "Content-Type": "multipart/form-data; boundary=12345",
                    //"Content-Type": "application/x-www-form-urlencoded",

                    "Content-Type": "application/json",
                    "Content-Type": "image/jpeg",
                    "Content-Disposition": 'name="sample" fileName="users.json"',




                },
                qs: {
                    "documentType": "Passport",
                    "reference": "users.json"

                },


                body: {
                    'Content-type': 'multipart/form-data',
                    //"fixture": "users.json",
                    'fileName': 'users.json'



                } // body: body,

            }).then((response) => {
                cy.readFile("users.json", response.body, "base64")

            })


            //cy.log("Response:" + data.id)

            //cy.log('Body:' + response.body)
        })
    })
})