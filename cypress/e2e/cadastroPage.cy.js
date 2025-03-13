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
        cy.get(elementos.botaoNovoUser).contains(' Add ').click()
        cy.get(elementos.campoUserName).type('Teste Deivid - DOT')
        cy.get(elementos.validacaoUsername).contains('Already exists')
        cy.get(elementos.campoPassword).type('A123456')
        cy.get(elementos.validacaoPassword).contains('Your password must contain minimum 1 lower-case letter')
        cy.get(elementos.campoConfirmarPassword).type('a123456')
        cy.get(elementos.validacaoConfirmacaoPassword).contains('Passwords do not match')
    })
    it('Buscar usuário cadastrado e remove-lo: ', () => {
        cy.buscarUsuario('Teste Deivid - DOT');
    })
    it('Buscar usuário não cadastrado: ', () => {
        cy.get(elementos.campoBuscarUserName).type('Teste Deivid - DOT')
        cy.get(elementos.botaoPesquisar).click()
        cy.get(elementos.alerta).should('be.visible').contains('No Records Found')
    })
})
