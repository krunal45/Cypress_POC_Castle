/// <reference types="Cypress" ///
describe("API Testing",()=>{

    it("Approach 1 - Hard Coded JSON Object",()=>{
        const requestBody = {
            name: "Add your name in the body"
        }

        cy.request({
            method: 'POST',
            url: 'https://postman-rest-api-learner.glitch.me//info',
            body: requestBody
        }).then((response)=>{
            expect(response.status).to.eql(200)
            expect(response.body.message).to.eql('You made a POST request with the following data!')
            expect(response.body.data.name).to.eql('Add your name in the body')
        })
    })

    it.only("Approach 2 - Using Fixture to fetch request Body",()=>{

        cy.fixture('CreatePost').then((requestBody)=>{

            cy.request("https://0f5c8e25-004a-4158-86f2-5a58e37e80ab.mock.pstmn.io/posts",requestBody)
            .then((response)=>{
                expect(response.status).to.eql(200)
                expect(response.body.text).to.eql('A social media post')
                expect(response.body).has.property('id')
                expect(response.body).to.have.property('author_id')
            })
        })
    })
})
