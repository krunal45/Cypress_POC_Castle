describe("Create Credit Account",()=>{
    let access_token,applicationId,applicantId,creditFacilityId
    
    before("Generate Token",()=>{
        cy.fixture('CreateOriginationToken').then(requestBody=>{
            cy.request({
                method:'POST',
                url:Cypress.env('Originations_Token_url'),
                body:requestBody,
                form:true
            }).then(response=>{
                expect(response.status).equal(200,'Fail: Status Code Mis-Match!')
                access_token = response.body.access_token
            })
        })
    })

    it("applications - approve",()=>{
        cy.fixture('ApplicationApprove').then(requestBody=>{
            cy.request({
                method:'POST',
                url:Cypress.env('Originations_Base_Url')+'/v1/applications',
                headers:{'Authorization':'Bearer '+access_token,
                'Content-Type':'application/json'},
                body:requestBody
            }).then(response=>{
                //Validating response Code
                expect(response.status).equal(201,'Fail: Status Code Mis-Match!')
                //Fetching applicationId & applicantId
                applicationId = response.body.items[0].applicationId
                applicantId = response.body.items[0].applicant.applicantId
                expect(response.body.items[0].status).to.equal('INCOMPLETE','Fail: Status value mismatch!')
                
//Validating response headers
                expect(response.headers).to.have.property('content-type')
                expect(response.headers['content-type']).to.include('application/json')

                //applicant Details validation
                expect(response.body.items[0].applicant.salutation).equal(requestBody.applicant.salutation,'Fail: salutation value mismatch!')
                expect(response.body.items[0].applicant.firstName).equal(requestBody.applicant.firstName,'Fail: firstName value mismatch!')
                expect(response.body.items[0].applicant.lastName).equal(requestBody.applicant.lastName,'Fail: lastName value mismatch!')
                expect(response.body.items[0].applicant.dateOfBirth).equal(requestBody.applicant.dateOfBirth,'Fail: dateOfBirth value mismatch!')
                expect(response.body.items[0].applicant.phoneNumber).equal(requestBody.applicant.phoneNumber,'Fail: phoneNumber value mismatch!')
                expect(response.body.items[0].applicant.email).equal(requestBody.applicant.email,'Fail: email value mismatch!')

                //address validation
                expect(response.body.items[0].applicant.address.houseNumber).equal(requestBody.applicant.address.houseNumber,'Fail: houseNumber value mismatch!')
                expect(response.body.items[0].applicant.address.flat).equal(requestBody.applicant.address.flat,'Fail: flat value mismatch!')
                expect(response.body.items[0].applicant.address.houseName).equal(requestBody.applicant.address.houseName,'Fail: houseName value mismatch!')
                expect(response.body.items[0].applicant.address.streetAddress1).equal(requestBody.applicant.address.streetAddress1,'Fail: streetAddress1 value mismatch!')
                expect(response.body.items[0].applicant.address.city).equal(requestBody.applicant.address.city,'Fail: city value mismatch!')
                expect(response.body.items[0].applicant.address.county).equal(requestBody.applicant.address.county,'Fail: county value mismatch!')
                expect(response.body.items[0].applicant.address.postCode).equal(requestBody.applicant.address.postCode,'Fail: postCode value mismatch!')
            })  
        })
    })

    it("application/decision - Quote Approved",()=>{
        cy.request({
            method:'POST',
            url:Cypress.env('Originations_Base_Url')+`/v1/applications/${applicationId}/decision`,
            qs:{decision_type:'QUOTE'},
            headers:{'Authorization':'Bearer '+access_token,
            'Content-Type':'application/json'},
            body:{
                "applicantIdentifiers": []
            }
        }).then(response=>{
            expect(response.status).equal(200,'Fail: Status Code Mis-Match!')
            expect(response.headers).to.have.property('content-type')
            expect(response.headers['content-type']).to.include('application/json')

            expect(response.body.items[0].decisions[0].decisionType).equal('QUOTE','Fail: decisionType value mismatch!')
            expect(response.body.items[0].decisions[0].status).equal('APPROVED','Fail: status value mismatch!')
            expect(response.body.items[0].decisions[0].reasons[0]).equal('Accept1','Fail: reasons value mismatch!')
        })
    })

    it("application/decision - Quote Accept",()=>{
        cy.fixture('QuoteAccept').then(requestBody=>{
            cy.request({
                method:'POST',
                url:Cypress.env('Originations_Base_Url')+`/v1/applications/${applicationId}/decision`,
                qs:{decision_type:'QUOTE_ACCEPT'},
                headers:{'Authorization':'Bearer '+access_token,
                'Content-Type':'application/json'},
                body:requestBody
            }).then(response=>{
                expect(response.status).equal(200,'Fail: Status Code Mis-Match!')
                expect(response.headers).to.have.property('content-type')
                expect(response.headers['content-type']).to.include('application/json')

                expect(response.body.items[0].decisions).length(2,'Fail: Length value mismatch!')
                expect(response.body.items[0].decisions[0].decisionType).equal('QUOTE','Fail: decisionType value mismatch!')
                expect(response.body.items[0].decisions[0].status).equal('APPROVED','Fail: status value mismatch!')
                expect(response.body.items[0].decisions[0].reasons[0]).equal('Accept1','Fail: reasons value mismatch!')
            })
        })
    })

    it("applications/documents - PDF - ECA",()=>{
        cy.request({
            method:'GET',
            url:Cypress.env('Originations_Base_Url')+`/v1/applications/${applicationId}/documents`,
            qs:{document_type:'ECA',applicant_id:applicantId},
            headers:{'Authorization':'Bearer '+access_token,'Accept':'application/pdf'}
        }).then(response=>{
            expect(response.status).equal(200,'Fail: Status Code Mis-Match!')
    })
  })

  it("applications/documents - PDF - PCCI",()=>{
    cy.request({
        method:'GET',
        url:Cypress.env('Originations_Base_Url')+`/v1/applications/${applicationId}/documents`,
        qs:{document_type:'PCCI',applicant_id:applicantId},
        headers:{'Authorization':'Bearer '+access_token,'Accept':'application/pdf'}
    }).then(response=>{
        expect(response.status).equal(200,'Fail: Status Code Mis-Match!')
})
})

it("applications/documents - PDF - CAGT",()=>{
    cy.request({
        method:'GET',
        url:Cypress.env('Originations_Base_Url')+`/v1/applications/${applicationId}/documents`,
        qs:{document_type:'CAGT',applicant_id:applicantId},
        headers:{'Authorization':'Bearer '+access_token,'Accept':'application/pdf'}
    }).then(response=>{
        expect(response.status).equal(200,'Fail: Status Code Mis-Match!')
})
})

 it("applications/offer",()=>{
    let createdAt = new Date()
    cy.request({
        method:'PATCH',
        url:Cypress.env('Originations_Base_Url')+`/v1/applications/${applicationId}/offer`,
        headers:{'Authorization':'Bearer '+access_token,
                'Content-Type':'application/json'},
        body:{
            "signingDate": createdAt
        }        
    }).then(response=>{
        expect(response.status).equal(200,'Fail: Status Code Mis-Match!')
})
 })

 it("Create Account",()=>{
    cy.request({
        method:'POST',
        url:Cypress.env('Originations_Base_Url')+`/v1/applications/${applicationId}/accounts`,
        headers:{'Authorization':'Bearer '+access_token,
                'Content-Type':'application/json'},
        body:{
            "cliPreference": "OPT_IN"
            }  
    }).then(response=>{
        expect(response.status).equal(202,'Fail: Status Code Mis-Match!')
})
 })

 it("Search Application",()=>{
    cy.request({
        method:'POST',
        url:Cypress.env('Originations_Base_Url')+`/v1/applications:search`,
        headers:{'Authorization':'Bearer '+access_token,
                'Content-Type':'application/json'},
        body:{
                "applicationId":applicationId
            }
        }).then(response=>{
            expect(response.status).equal(200,'Fail: Status Code Mis-Match!')
            creditFacilityId = response.body.creditAccountId
            response.body
            Cypress.config('creditFacilityId',creditFacilityId)
        })        
    })
 })