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
    cy.get(elementos.botaoNovoUser).click();
    cy.get(elementos.comboUserRole).click();
    cy.get(elementos.comboUserOptionsAdmin).click();
    cy.get(elementos.comboEmployeeName).click().type(employeeName);
    cy.get(elementos.comboEmployeeOptions).contains(employeeName).should('be.visible').click();
    cy.get(elementos.comboStatus).click();
    cy.get(elementos.comboStatusOptionsEnabled).click();
    cy.get(elementos.campoUserName).type(userName);
    cy.get(elementos.campoPassword).type(password);
    cy.get(elementos.campoConfirmarPassword).type(password);
    cy.get(elementos.botaoSalvar).contains(' Save ').click();
    cy.get(elementos.alerta).should('be.visible');
});

// Comando para buscar um usuário
Cypress.Commands.add('buscarUsuario', (userName) => {
    cy.get(elementos.campoBuscarUserName).type(userName);
    cy.get(elementos.botaoPesquisar).click();
    cy.get(elementos.textoStatus).should('be.visible').contains('Enabled');
    cy.get(elementos.botaoEditar).click();
    cy.get(elementos.comboStatus).click();
    cy.get(elementos.comboStatusOptionsDisabled).click();
    cy.get(elementos.botaoSalvar).click();
    cy.wait(4000);
    cy.get(elementos.campoBuscarUserName, { timeout: 10000 }).should('be.visible').type(userName);
    cy.get(elementos.botaoPesquisar).click();
    cy.wait(2000);
    cy.get(elementos.textoStatus).should('be.visible').contains('Disabled');
    cy.get(elementos.botaoExcluir).click();
    cy.get(elementos.mensagemDelete).contains('The selected record will be permanently deleted. Are you sure you want to continue?');
    cy.get(elementos.botaoConfirmarExclusao).contains('Yes, Delete').click();
    cy.get(elementos.alertaDelete).should('be.visible').contains('Successfully Deleted');
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