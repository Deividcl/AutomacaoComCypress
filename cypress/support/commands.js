import { elementos } from '../support/elementos/elements.js'

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
Cypress.Commands.add('login', () => { 
    cy.visit('')
    cy.get(elementos.logingText).type(Cypress.env('CYPRESS_USUARIO')); // Preenche o nome de usuário
    cy.get(elementos.passwordText).type(Cypress.env('CYPRESS_SENHA')); // Preenche a senha
    cy.get(elementos.loginButton).click(); // Clica no botão de login
    cy.get(elementos.menuAdmin).contains('Admin').click()
})

// Comando para cadastrar um novo usuário
Cypress.Commands.add('cadastrarUsuario', (userName, password, employeeName) => {
    cy.get(elementos.buttonNewUser).click();
    cy.get(elementos.dropdownUserRole).click();
    cy.get(elementos.dropdownUserOptionsAdmin).click();
    cy.get(elementos.dropdownEmployeeName).click().type(employeeName);
    cy.get(elementos.dropdownEmployeeOptions).contains(employeeName).should('be.visible').click();
    cy.get(elementos.dropdownStatus).click();
    cy.get(elementos.dropdownStatusOptionsEnabled).click();
    cy.get(elementos.fieldUserName).type(userName);
    cy.get(elementos.fieldPassword).type(password);
    cy.get(elementos.fieldConfirmPassword).type(password);
    cy.get(elementos.buttonSave).contains(' Save ').click();
    cy.get(elementos.alert).should('be.visible');
});

// Comando para buscar um usuário
Cypress.Commands.add('buscarUsuario', (userName) => {
    cy.get(elementos.fieldSearchUserName).type(userName);
    cy.intercept('GET', '**/api/v2/admin/users?limit=50&offset=0&username=Teste+Deivid+-+DOT&sortField=u.userName&sortOrder=ASC').as('getUsers');  
    cy.get(elementos.buttonSearch).click();  
    cy.wait('@getUsers').its('response.statusCode').should('eq', 200);
    cy.get(elementos.textStatus).should('be.visible').contains('Enabled');
    cy.get(elementos.buttonEdit).click();
    cy.get(elementos.dropdownStatus).click();
    cy.get(elementos.dropdownStatusOptionsDisabled).click();
    cy.intercept('GET', '**/web/index.php/api/v2/admin/users?limit=50&offset=0&sortField=u.userName&sortOrder=ASC*').as('getUsers2')
    cy.get(elementos.buttonSave).click();     
    cy.wait('@getUsers2').its('response.statusCode').should('eq', 200);
    cy.get(elementos.fieldSearchUserName).should('be.visible').type(userName);    
    cy.get(elementos.buttonSearch).click();
    cy.get(elementos.textStatus).should('be.visible').contains('Disabled');
    cy.get(elementos.buttonDelete).click();
    cy.get(elementos.mensageDelete).contains('The selected record will be permanently deleted. Are you sure you want to continue?');
    cy.get(elementos.buttonConfirmDelete).contains('Yes, Delete').click();
    cy.get(elementos.alertDelete).should('be.visible').contains('Successfully Deleted');
});

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