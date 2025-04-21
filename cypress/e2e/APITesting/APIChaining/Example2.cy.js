describe("Go Rest API Chaining",()=>{
    const authToken = 'Bearer 3345dbb24f1d49db4a482b6eeb11ae938320b54a6fa505903863fca4befef311'

    it('Create, Update, Delete user in Go Rest API',()=>{
        cy.request({
            method: 'POST',
            url: 'https://gorest.co.in/public/v2/users',
            body: 
                {
                    "name": "Tenali Ramakrishna",
                    "gender": "male",
                    "email": Math.random().toString(5).substring(2)+"@15ce.com",
                    "status": "active"
                },
            headers:{Authorization:authToken}    
        }).then((response)=>{
            expect(response.status).to.eq(201)
            const userId = response.body.id
            // Update userName
            cy.request({
                method:'PATCH',
                url:`https://gorest.co.in/public/v2/users/${userId}`,
                body:{name:'Scott12'},
                headers:{Authorization:authToken}
            }).then((response)=>{
                expect(response.status).to.eq(200)
                expect(response.body.name).to.eq('Scott12')

                // Delete resource
                cy.request({
                    method:'DELETE',
                    url:`https://gorest.co.in/public/v2/users/${userId}`,
                    headers:{Authorization:authToken}
                }).then((response)=>{
                    expect(response.status).to.equal(204)
                })
            })
        })
    })
})