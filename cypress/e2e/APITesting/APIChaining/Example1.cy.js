describe("API Chaining",()=>{
    it("Getting all the posts",()=>{
        cy.request({
            method: 'GET',
            url:'https://jsonplaceholder.typicode.com/posts'
        }).then((response)=>{
            expect(response.status).to.eq(200)
            const postId = response.body[0].postId
            return postId
        }).then((postId)=>{
            cy.request({
                method:'GET',
                url: 'https://jsonplaceholder.typicode.com/comments',
                qs:{postId:postId}
            }).then((response)=>{
                expect(response.status).to.eq(200)
            })
        })
    })
})