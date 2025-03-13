/// <reference types="cypress" />
import { elementos } from '../support/elementos/elements.js'
describe('Testes de login e navegação para cadastro de usuário', () => {
    beforeEach(() => {
        cy.loginSucesso()
    })

    it(`Cadastrar usuário com sucesso:
        Validação de regras no cadastro de usuários:
        Buscar usuário cadastrador:
        Exclusão de usuário cadastrado:
        Buscar usuário inexistente:
        Testes de login: 
        `, () => {
        cy.cadastrarUsuario('Ranga Akunuri', 'a123456')
        cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/admin/users?limit=50&offset=0&sortField=u.userName&sortOrder=ASC').as('getAdmin')
        cy.get(elementos.menuAdmin).click()
        cy.wait('@getAdmin').its('response.statusCode').should('eq', 200)
        cy.get(elementos.buttonNewUser).should('be.visible').click()
        cy.get(elementos.fieldUserName).type('Admin')
        cy.get(elementos.validationUsername).contains('Already exists')
        cy.get(elementos.fieldPassword).type('A123456')
        cy.get(elementos.validationPassword).contains('Your password must contain minimum 1 lower-case letter')
        cy.get(elementos.fieldConfirmPassword).type('a123456')
        cy.get(elementos.validationConfirmPassword).contains('Passwords do not match')
        cy.get(elementos.buttonCancel).click()
        cy.buscarUsuario('Admin')
        cy.get(elementos.buttonEdit).click()
        cy.get(elementos.dropdownStatus).click()
        cy.get(elementos.dropdownStatusOptionsDisabled).click()
        cy.intercept('GET', '**/web/index.php/api/v2/admin/users?limit=50&offset=0&sortField=u.userName&sortOrder=ASC*').as('getUsers2')
        cy.get(elementos.buttonSave).click()     
        cy.wait('@getUsers2').its('response.statusCode').should('eq', 200)  
        cy.get(elementos.dropDownUserRoleHome).click()
        cy.get(elementos.dropdownUserOptionsESS).click()
        cy.get(elementos.buttonSearch).click()
        cy.get(elementos.buttonDelete).first().click()
        cy.get(elementos.mensageDelete).contains('The selected record will be permanently deleted. Are you sure you want to continue?')
        cy.get(elementos.buttonConfirmDelete).contains('Yes, Delete').click();
        cy.get(elementos.alertDelete).should('be.visible').contains('Successfully Deleted').click()
        cy.get(elementos.fieldSearchUserName).type('Usuario não existente')
        cy.get(elementos.buttonSearch).click()
        cy.get(elementos.alert).should('be.visible').contains('No Records Found')
        cy.get(elementos.menuLogout).click()
        cy.get(elementos.buttonLogout).click()
        cy.loginFalha('ErroUser', 'ErroSenha')
        cy.get(elementos.alertLogin).should('be.visible').contains('Invalid credentials')
        cy.loginFalha('Admin', ' ')
        cy.get(elementos.textRequired).should('be.visible').contains('Required')
    })
})
