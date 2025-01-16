```javascript /// <reference types="Cypress" /> ```

// describe("GET Request",()=>{
//     it("GET Call",()=>{
//         cy.request("https://postman-rest-api-learner.glitch.me/info?id=1")
//         .its('status')
//         .should('equal',200)
//     })



// })
describe("GET Request",()=>{
    it("GET Call",()=>{
        cy.request("https://postman-rest-api-learner.glitch.me/info?id=1")
        .its('status')
        .should('equal',200)
    })

    it("POST Call",()=>{
        cy.request(
            {
                method:'POST',
                url: 'https://postman-rest-api-learner.glitch.me/info',
                body: {
                    name: "Add your name in the body"
                }
            }
        )
        .its('status')
        .should('equal',200)
    })

    it("PUT Call",()=>{
        cy.request(
            {
                method:'PUT',
                url:'https://postman-rest-api-learner.glitch.me//info?id=1',
                body:{
                    name: "Add your name in the body"
                }
            }
        )
        .its('status')
        .should('equal',200)
    })

    it("DELETE Call",()=>{
        cy.request(
            {
                method:'DELETE',
                url:'https://postman-rest-api-learner.glitch.me//info?id=1'
            }
        )
        .its('status')
        .should('equal',200)
    })

    
})