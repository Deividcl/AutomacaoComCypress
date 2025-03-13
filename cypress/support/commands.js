// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add('login', (usuario, password) => { 
    const elementos ={
    logingText: ':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input',
    passwordText: ':nth-child(3) > .oxd-input-group > :nth-child(2) > .oxd-input',
    loginButton: '.oxd-button',
    menuAdmin: ':nth-child(1) > .oxd-main-menu-item > .oxd-text',
};
    cy.visit('')
    cy.get(elementos.logingText).type(usuario); // Preenche o nome de usuário
    cy.get(elementos.passwordText).type(password); // Preenche a senha
    cy.get(elementos.loginButton).click(); // Clica no botão de login
    cy.get(elementos.menuAdmin).contains('Admin').click()
})
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })