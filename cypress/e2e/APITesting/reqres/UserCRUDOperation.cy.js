describe("User CRUD operation",()=>{

    it("Get User Details",()=>{
        cy.request('https://reqres.in/api/users/2')
        .its('status')
        .should('equal',200);
    })

    it("Create User",()=>{
        cy.request({
            method: 'POST',
            url: 'https://reqres.in/api/users',
            body: {
                "name": "morpheus",
                "job": "leader"
            }
        })
        .its('status')
        .should('equal',201)
    })

    it('Update User',()=>{
        cy.request({
            method: 'PUT',
            url: 'https://reqres.in/api/users/2',
            body: {
                "name": "morpheus",
                "job": "zion resident"
            }
        })
        .its('status')
        .should('equal',200)
    })

    it('Delete User',()=>{
        cy.request({
            method: 'DELETE',
            url: 'https://reqres.in/api/users/2'
        })
        .its('status')
        .should('equal',204)
    })
})