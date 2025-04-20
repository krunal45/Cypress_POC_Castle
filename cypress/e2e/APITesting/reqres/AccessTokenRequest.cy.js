
describe('API Test', () => {
    let accessToken = null;
    let orderId = null;
    let customerName = 'Mr Alok1'
    before('Generate Access Token', () => {

        cy.request({
            method: 'POST',
            url: 'https://simple-books-api.glitch.me/api-clients/',
            headers: { 'Content-Type': 'application/json' },
            body: {
                "clientName": "Hakan",
                "clientEmail": Math.random().toString().substring(2) + "@msn.com"
            }
        }).then((response) => {
            accessToken = response.body.accessToken
        })
    })

    before('Create New Order', () => {

        cy.request({
            method: 'POST',
            url: 'https://simple-books-api.glitch.me/orders',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken
            },
            body: {
                "bookId": 1,
                "customerName": customerName
            }
        }).then((response) => {
            expect(response.body.created).to.eq(true)
            expect(response.body).has.property('orderId')
            orderId = response.body.orderId
        })
    })

    it('Fetching orders', () => {

        cy.request(
            {
                method: 'GET',
                url: 'https://simple-books-api.glitch.me/orders/' + orderId,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + accessToken
                }
            }
        ).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).has.property('id')
            expect(response.body.bookId).to.eq(1)
            expect(response.body.customerName).to.eq(customerName)
            expect(response.body).has.property('createdBy')
            expect(response.body).has.property('quantity')
            expect(response.body).has.property('timestamp')
        })
    })
}
)