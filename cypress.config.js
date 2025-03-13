const { defineConfig } = require("cypress");
const dotenv = require('dotenv');

dotenv.config();

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://opensource-demo.orangehrmlive.com/',
    defaultCommandTimeout: 10000,
    setupNodeEvents(on, config) {
      config.env.CYPRESS_USUARIO = process.env.CYPRESS_USUARIO;
      config.env.CYPRESS_SENHA = process.env.CYPRESS_SENHA;

      return config;
      // implement node event listeners here
    },
  },
});
