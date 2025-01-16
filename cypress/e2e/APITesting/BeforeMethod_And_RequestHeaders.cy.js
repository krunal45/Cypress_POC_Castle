describe("Before Method & Request Headers Demo",()=>{
    const authToken = "18c9caaf7a49d07943da5306092cdb8c759e03df2e98c282c2b4ab03177ecc8d";
    let userId;
    before("Create User",()=>{

       cy.request({
                method: 'POST',
                url:'https://gorest.co.in/public/v2/users',
                headers:{Authorization:'Bearer '+authToken},
                body:{
                    "name": "Ajay Sharma",
                    "gender": "male",
                    "email": "ajay3.sharma@gmail.com",
                    "status": "active"
                }
            }).then((response)=>{
                expect(response.status).equal(201,'Fail: Status Code Mismatch!')
                userId = response.body.id;
                expect(response.body.name).equal('Ajay Sharma','Fail: name mismatches!')
                expect(response.body.email).equal('ajay3.sharma@gmail.com','Fail: email mismatches!')
            })
    
   })

    it("Get User Details",()=>{

        cy.request({
            method: 'GET',
            path:'public/v2/users/${userId}',
            url: `https://gorest.co.in/${path}`,
            headers:{Authorization:'Bearer '+authToken}
        }).then((response)=>{
            console.log(response.body);
            expect(response.status).equal(200,'Fail: Status Code Mismatch!')
            expect(response.body.id).equal(userId,'Fail: userId Mismatch!')
            // expect(response.body).has.property('name',requestBody.name)
})
    })
})