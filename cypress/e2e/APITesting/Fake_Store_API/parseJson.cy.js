describe('Parse Json',()=>{
    it("Fetch all products",()=>{
        cy.request('https://fakestoreapi.com/products').then((response)=>{
            expect(response.status).to.equal(200)
            expect(response.body).to.have.lengthOf(20,'FAIL')
            expect(response.body[0].id).to.equal(1)
            expect(response.body[0].title).to.equal('Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops')
            expect(response.body[0].rating.rate).to.equal(3.9)
        })
    })

    it('Calculate price',()=>{
        let totalPrice = 0
        cy.request({
            url:'https://fakestoreapi.com/products',
            qs:{limit:3}
        }).then((response)=>{
            expect(response.status).to.equal(200)
            expect(response.body).to.have.lengthOf(3)
            response.body.forEach(element => {
                totalPrice = totalPrice + element.price
            })
            expect(totalPrice).to.equal(188.24)
        })
    })
})