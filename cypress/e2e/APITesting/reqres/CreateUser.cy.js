describe('Create User', () => {
    it('Verify User Creation - Approach 1', () => {
        const createUserBody = {
            "name": "morpheus",
            "job": "leader"
        }
        cy.request({
            method: 'POST',
            url: 'https://reqres.in/api/users',
            body: createUserBody
        }).then((response) => {
            expect(response.status).to.eq(201)
            expect(response.body.name).to.eq('morpheus')
            expect(response.body.job).to.eq('leader')
        })
    })

    it.only('Verify User Creation - Approach 2', () => {
        cy.fixture('reqresUserCreate').then((data) => {
            const requestBody = data;

            cy.request({
                method: 'POST',
                url: 'https://reqres.in/api/users',
                body: requestBody
            }).then((response) => {
                expect(response.status).to.eq(201)
                expect(response.body.name).to.eq(requestBody.name)
                expect(response.body.job).to.eq(requestBody.job)
                expect(response.body).has.property('id')
                expect(response.body).has.property('createdAt')
            })

        })
    })
})