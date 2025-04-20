describe('Query Parameter test',()=>{
    const queryParam = {page:2};
    it('Get User List',()=>{
        cy.request({
            method: 'GET',
            url: 'https://reqres.in/api/users',
            qs: queryParam
        }).then((response)=>{
            expect(response.status).to.eq(200)
            expect(response.body.page).to.eq(2)
            expect(response.body.data).has.length(6)
            expect(response.body.data[0].id).to.eq(7)
            expect(response.body.data[0].email).to.eq('michael.lawson@reqres.in')
        })
    })
})