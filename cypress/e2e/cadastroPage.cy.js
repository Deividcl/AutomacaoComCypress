/// <reference types="cypress" />
import { elementos } from '../support/elementos/elements.js'
describe('Testes de login e navegação para cadastro de usuário', () => {

    beforeEach(() => {
        cy.login('Admin', 'admin123')
    })
    it('Cadastrar usuário com sucesso:', () => {
        cy.cadastrarUsuario('Teste Deivid - DOT', 'a123456', 'Ranga Akunuri');
    })
    it('Validação das regras de cadastro de usuário: ', () => {
        cy.get(elementos.buttonNewUser).contains(' Add ').click()
        cy.get(elementos.fieldUserName).type('Teste Deivid - DOT')
        cy.get(elementos.validationUsername).contains('Already exists')
        cy.get(elementos.fieldPassword).type('A123456')
        cy.get(elementos.validationPassword).contains('Your password must contain minimum 1 lower-case letter')
        cy.get(elementos.fieldConfirmPassword).type('a123456')
        cy.get(elementos.validationConfirmPassword).contains('Passwords do not match')
    })
    it('Buscar usuário cadastrado e remove-lo: ', () => {
        cy.buscarUsuario('Teste Deivid - DOT');
    })
    it('Buscar usuário não cadastrado: ', () => {
        cy.get(elementos.fieldSearchUserName).type('Teste Deivid - DOT')
        cy.get(elementos.buttonSearch).click()
        cy.get(elementos.alert).should('be.visible').contains('No Records Found')
    })
})
