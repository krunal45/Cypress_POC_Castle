const ajv = require('ajv')
// const { random } = require('cypress/types/lodash')
const ajv1 = new ajv()

describe("Schema Validation",()=>{
    const bearerToken = "18c9caaf7a49d07943da5306092cdb8c759e03df2e98c282c2b4ab03177ecc8d"
    
    it("Create User",()=>{
        cy.fixture('CreateGoRestUser').then(requestBody=>{
          let request = requestBody
          const randomEmail = Math.random().toString(36).substring(2, 10) + '@test.com';
          request.email = randomEmail
            cy.request({
                method: 'POST',
                url:'https://gorest.co.in/public/v2/users',
                headers:{Authorization:'Bearer '+bearerToken},
                body:request
            }).then(responseBody=>{
                const schema = {
                    "$schema": "http://json-schema.org/draft-07/schema#",
                    "type": "object",
                    "properties": {
                      "id": {
                        "type": "integer"
                      },
                      "name": {
                        "type": "string"
                      },
                      "email": {
                        "type": "string"
                      },
                      "gender": {
                        "type": "string",
                        "enum": ["male", "female", "other"]
                      },
                      "status": {
                        "type": "string",
                        "enum": ["active", "inactive"]
                      }
                    },
                    "required": ["id", "name", "email", "gender", "status"]
                  } //schema ends here
                
                const validate = ajv1.compile(schema)
                const isValid = validate(responseBody.body)
                expect(isValid).to.be.true
  })
        })
    })
})