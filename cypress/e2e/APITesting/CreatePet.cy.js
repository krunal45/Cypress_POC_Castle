describe("Swagger PetStore API",()=>{
    let petId;
   
    it("Create Pet",()=>{
        cy.fixture('CreatePet').then(requestBody=>{
            cy.request({
                method:'POST',
                url:'api/v3/pet',
                body:requestBody
            }).then((response)=>{
                expect(response.status).equal(200,'Fail: Status code Mis-match!')
                expect(response.body.id).equal(1,'Fail: id value Mis-match!')
                petId = response.body.id
                expect(response.body.category.id).equal(1,'Fail: category Id Mismatch!')
            })
        })
    })

    it("Get Pet Details by id",()=>{
        cy.request({
            method:'GET',
            url:`api/v3/pet/${petId}`
        }).then(response=>{
            expect(response.status).equal(200,'Fail: Status code Mis-match!')
            expect(response.statusText).equal('OK','Fail: statusText Mis-match!')
            expect(response.body.id).equal(petId,'Fail: Pet Id Mis-match!')
            expect(response.body.name).equal('doggie','Fail: pet Name Mis-match!')
            expect(response.body.photoUrls).length(2)
            expect(response.body.status).equal('available','Fail: status Mis-match!')
        })
    })

    it("Get Pet Details by status",()=>{
        const queryParams = {status:'sold'}
        cy.request({
            method:'GET',
            url:'api/v3/pet/findByStatus',
            qs:queryParams
        }).then(response=>{
            expect(response.status).equal(200,'Fail: Status code Mis-match!')
        })
    })
})