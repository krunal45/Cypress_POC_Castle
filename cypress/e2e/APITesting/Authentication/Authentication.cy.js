describe("Authentication", () => {

    it('Basic Auth Test', () => {
        cy.request({
            method: 'GET',
            url: 'https://postman-echo.com/basic-auth',
            auth: {
                user: 'postman',
                pass: 'password'
            }
        }).then((response) => {
            expect(response.status).to.eq(200, 'FAIL: Response code is not 200')
            expect((response.body.authenticated)).to.eq(true)
        })
    })

    it('Digest Auth Test', () => {
        cy.request({
            method: 'GET',
            url: 'https://postman-echo.com/basic-auth',
            auth: {
                username: 'postman',
                password: 'password',
                method: 'digest'

            }
        }).then((response) => {
            expect(response.status).to.eq(200, 'FAIL: Response code is not 200')
            expect((response.body.authenticated)).to.eq(true)
        })
    })

    const token = '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'
    it('Bearer Token Authentication', () => {
        cy.request({
            method: 'GET',
            url: 'https://api.github.com/user/repos',
            headers: {
                Authorization: 'Bearer ' + token
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
        })
    })

    it('API Key Auth',()=>{
        cy.request({
            method: 'GET',
            url: 'api.openweathermap.org/data/2.5/forecast/daily',
            qs:{q:'Delhi',appid: 'fe9c5cddb7e01d747b4611c3fc9eaf2c'}
        }).then((response)=>{
            expect(response.status).to.eq(200)
        })
    })
})