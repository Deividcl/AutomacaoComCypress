import { elements } from '../support/elementos/elements.js'
import { faker } from '@faker-js/faker'
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
Cypress.Commands.add('loginSuccess', () => { 
    cy.visit('')
    cy.get(elements.logingText).type(Cypress.env('CYPRESS_USUARIO')) 
    cy.get(elements.passwordText).type(Cypress.env('CYPRESS_SENHA')) 
    cy.get(elements.loginButton).click() 
    cy.get(elements.menuAdmin).contains('Admin').click()
})

Cypress.Commands.add('loginFailure', (user, password) => { 
    cy.visit('')
    cy.get(elements.logingText).type(user) 
    cy.get(elements.passwordText).type(password) 
    cy.get(elements.loginButton).click() 
})

// Comando para cadastrar um novo usuário
Cypress.Commands.add('registerUser', (employeeName, password) => {
    const userName = faker.internet.userName()
    cy.get(elements.buttonNewUser).click()
    cy.get(elements.dropdownUserRole).click()
    cy.get(elements.dropdownUserOptionsAdmin).click()
    cy.get(elements.dropdownEmployeeName).click().type(employeeName)
    cy.get(elements.dropdownEmployeeOptions).contains(employeeName).should('be.visible').click()
    cy.get(elements.dropdownStatus).click()
    cy.get(elements.dropdownStatusOptionsEnabled).click()
    cy.get(elements.fieldUserName).type(userName)
    cy.get(elements.fieldPassword).type(password)
    cy.get(elements.fieldConfirmPassword).type(password)
    cy.get(elements.buttonSave).contains(' Save ').click()
    cy.get(elements.alert).should('be.visible')
})

// Comando para buscar um usuário
Cypress.Commands.add('searchUser', (userName) => {
    cy.get(elements.menuAdmin).click()
    cy.get(elements.fieldSearchUserName).should('be.visible').type(userName)
    cy.intercept('GET', '**/web/index.php/api/v2/admin/users*').as('getUsers')  
    cy.get(elements.buttonSearch).click()  
    cy.wait('@getUsers').its('response.statusCode').should('eq', 200)
    cy.get(elements.textStatus).should('be.visible').contains('Enabled')
    
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