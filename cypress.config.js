const { defineConfig } = require("cypress");

module.exports = defineConfig({
  env: {
    Originations_Token_url:
      "https://api-origination-uat.auth.eu-west-1.amazoncognito.com/oauth2/token",
    Originations_Base_Url: "https://api-origination.uat.castle-test.com",
  },

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
