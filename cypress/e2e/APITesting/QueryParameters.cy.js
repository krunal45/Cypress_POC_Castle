describe("Query Parameters Test",()=>{
    it("Passing Query Parameters",()=>{
        const queryParams = {id:1}

        cy.request({
            method: 'GET',
            url: 'https://postman-rest-api-learner.glitch.me//info',
            qs: queryParams
        }).then((response)=>{
            expect(response.status).to.eql(200,'FAIL: status Code Mismatch!')
            expect(response.status).equal(200,'FAIL: status Code Mismatch!')
            expect(response.body.message).equal('You made a GET request!','FAIL: Message value do not match!')
        })
    })
})