/// <reference types="cypress" />
import { elements } from '../support/elementos/elements.js'
describe('Testes de login e navegação para cadastro de usuário', () => {
    beforeEach(() => {
        cy.loginSuccess()
    })

    it(`Cadastrar usuário com sucesso:
        Buscar usuário cadastrador:
        Exclusão de usuário cadastrado:
        Buscar usuário inexistente:
        `, () => {
        cy.registerUser('Ranga Akunuri', 'a123456')
        cy.searchUser('Admin')
        cy.get(elements.buttonEdit).click()
        cy.get(elements.dropdownStatus).click()
        cy.get(elements.dropdownStatusOptionsDisabled).click()
        cy.intercept('GET', '**/web/index.php/api/v2/admin/users*').as('getUsers2')
        cy.get(elements.buttonSave).click()     
        cy.wait('@getUsers2').its('response.statusCode').should('eq', 200)  
        cy.get(elements.buttonSearch).click()
        cy.get(elements.buttonDelete).eq(2).click()
        cy.get(elements.mensageDelete).contains('The selected record will be permanently deleted. Are you sure you want to continue?')
        cy.get(elements.buttonConfirmDelete).contains('Yes, Delete').click()
        cy.get(elements.alertDelete).should('be.visible').contains('Successfully Deleted').click()
        cy.get(elements.fieldSearchUserName).type('Usuario não existente')
        cy.get(elements.buttonSearch).click()
        cy.get(elements.alert).should('be.visible')
        cy.get(elements.menuLogout).should('be.visible').click()
        cy.get(elements.buttonLogout).click()
    })
    it('Teste de validação de regras: ', () => {
        cy.get(elements.menuAdmin).click()
        cy.get(elements.buttonNewUser).should('be.visible').click()
        cy.get(elements.fieldUserName).type('Admin')
        cy.get(elements.validationUsername).contains('Already exists')
        cy.get(elements.fieldPassword).type('A123456')
        cy.get(elements.validationPassword).contains('Your password must contain minimum 1 lower-case letter')
        cy.get(elements.fieldConfirmPassword).type('a123456')
        cy.get(elements.validationConfirmPassword).contains('Passwords do not match')
        cy.get(elements.buttonCancel).click()
       
    })
    it('Teste de login: ', () => {
        cy.get(elements.menuLogout).should('be.visible').click()
        cy.get(elements.buttonLogout).click()
        cy.loginFailure('ErroUser', 'ErroSenha')
        cy.get(elements.alertLogin).should('be.visible').contains('Invalid credentials')
        cy.loginFailure('Admin', ' ')
        cy.get(elements.textRequired).should('be.visible').contains('Required')
    })
})
