/// <reference types="cypress" />
import { elementos } from '../support/elementos/elements.js'
describe('Testes de login e navegação para cadastro de usuário', () => {
    beforeEach(() => {
        cy.loginSucesso()
    })

    it(`Cadastrar usuário com sucesso:
        Buscar usuário cadastrador:
        Exclusão de usuário cadastrado:
        Buscar usuário inexistente:
        `, () => {
        cy.cadastrarUsuario('Ranga Akunuri', 'a123456')
        cy.buscarUsuario('Admin')
        cy.get(elementos.buttonEdit).click()
        cy.get(elementos.dropdownStatus).click()
        cy.get(elementos.dropdownStatusOptionsDisabled).click()
        cy.intercept('GET', '**/web/index.php/api/v2/admin/users*').as('getUsers2')
        cy.get(elementos.buttonSave).click()     
        cy.wait('@getUsers2').its('response.statusCode').should('eq', 200)  
        cy.get(elementos.buttonSearch).click()
        cy.get(elementos.buttonDelete).eq(2).click()
        cy.get(elementos.mensageDelete).contains('The selected record will be permanently deleted. Are you sure you want to continue?')
        cy.get(elementos.buttonConfirmDelete).contains('Yes, Delete').click()
        cy.get(elementos.alertDelete).should('be.visible').contains('Successfully Deleted').click()
        cy.get(elementos.fieldSearchUserName).type('Usuario não existente')
        cy.get(elementos.buttonSearch).click()
        cy.get(elementos.alert).should('be.visible')
        cy.get(elementos.menuLogout).should('be.visible').click()
        cy.get(elementos.buttonLogout).click()
    })
    it('Teste de validação de regras: ', () => {
        cy.get(elementos.menuAdmin).click()
        cy.get(elementos.buttonNewUser).should('be.visible').click()
        cy.get(elementos.fieldUserName).type('Admin')
        cy.get(elementos.validationUsername).contains('Already exists')
        cy.get(elementos.fieldPassword).type('A123456')
        cy.get(elementos.validationPassword).contains('Your password must contain minimum 1 lower-case letter')
        cy.get(elementos.fieldConfirmPassword).type('a123456')
        cy.get(elementos.validationConfirmPassword).contains('Passwords do not match')
        cy.get(elementos.buttonCancel).click()
       
    })
    it('Teste de login: ', () => {
        cy.get(elementos.menuLogout).should('be.visible').click()
        cy.get(elementos.buttonLogout).click()
        cy.loginFalha('ErroUser', 'ErroSenha')
        cy.get(elementos.alertLogin).should('be.visible').contains('Invalid credentials')
        cy.loginFalha('Admin', ' ')
        cy.get(elementos.textRequired).should('be.visible').contains('Required')
    })
})
