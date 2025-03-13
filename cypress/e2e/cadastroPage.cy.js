/// <reference types="cypress" />

describe('Testes de login e navegação para cadastro de usuário', () => {
    //Mapeando os elementos da tela para uso nos testes
    const elementos = {
        botaoNovoUser: '.orangehrm-header-container > .oxd-button',
        comboUserRole: ':nth-child(1) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text > .oxd-select-text-input',
        comboUserOptionsAdmin: '.oxd-select-dropdown > :nth-child(2)',
        comboUserOptionsESS: '.oxd-select-dropdown > :nth-child(3)',
        comboEmployeeName: '.oxd-autocomplete-text-input > input',
        comboEmployeeOptions: '.oxd-autocomplete-option',
        comboStatus: ':nth-child(3) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text > .oxd-select-text-input',
        comboStatusOptionsEnabled: '.oxd-select-dropdown > :nth-child(2)',
        comboStatusOptionsDisabled: '.oxd-select-dropdown > :nth-child(3)',
        inputUserName: ':nth-child(4) > .oxd-input-group > :nth-child(2) > .oxd-input',
        inputPassword: '.user-password-cell > .oxd-input-group > :nth-child(2) > .oxd-input',
        inputConfirmarPassword: ':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input',
        botaoSalvar: '.oxd-button--secondary',
        inputBuscarUserName: ':nth-child(2) > .oxd-input',
        botaoPesquisar: '.oxd-form-actions > .oxd-button--secondary',
        alerta: '.oxd-toast',
        alertaDelete: '.oxd-text--toast-message',
        textoStatus: '.oxd-table-card > .oxd-table-row > :nth-child(5)',
        botaoEditar: '.oxd-table-cell-actions > :nth-child(2) > .oxd-icon',
        botaoExcluir: '.oxd-table-cell-actions > :nth-child(1) > .oxd-icon',
        mensagemDelete: '.orangehrm-text-center-align > .oxd-text',
        botaoConfirmarExclusao: '.oxd-button--label-danger'
    }

    beforeEach(() => {
        cy.login('Admin', 'admin123')
    })
    it('Cadastrar usuário com sucesso:', () => {
        cy.get(elementos.botaoNovoUser).contains(' Add ').click()
        cy.get(elementos.comboUserRole).click()
        cy.get(elementos.comboUserOptionsAdmin).contains('Admin').click()
        cy.get(elementos.comboEmployeeName).click().type('Ranga Akunuri')
        cy.get(elementos.comboEmployeeOptions).contains('Ranga Akunuri').should('be.visible').click()
        cy.get(elementos.comboStatus).click()
        cy.get(elementos.comboStatusOptionsEnabled).contains('Enabled').click()
        cy.get(elementos.inputUserName).type('Teste Deivid - DOT')
        cy.get(elementos.inputPassword).type('a123456')
        cy.get(elementos.inputConfirmarPassword).type('a123456')
        cy.get(elementos.botaoSalvar).contains(' Save ').click()
        cy.get(elementos.alerta).should('be.visible')
    })
    it('Buscar usuário cadastrado: ', () => {
        cy.get(elementos.inputBuscarUserName).type('Teste Deivid - DOT')
        cy.get(elementos.botaoPesquisar).click()
        cy.wait(2000)
        cy.get(elementos.textoStatus).should('be.visible').contains('Enabled')
        cy.get(elementos.botaoEditar).click()
        cy.get(elementos.comboStatus).click()
        cy.get(elementos.comboStatusOptionsDisabled).contains('Disabled').click()
        cy.get(elementos.botaoSalvar).click()
        cy.wait(6000)
        cy.get(elementos.inputBuscarUserName, {timeout: 10000}).should('be.visible').type('Teste Deivid - DOT')
        cy.get(elementos.botaoPesquisar).click()
        cy.wait(2000)
        cy.get(elementos.textoStatus).should('be.visible').contains('Disabled')
        cy.get(elementos.botaoExcluir).click()
        cy.get(elementos.mensagemDelete).contains('The selected record will be permanently deleted. Are you sure you want to continue?')
        cy.get(elementos.botaoConfirmarExclusao).contains('Yes, Delete').click()
        cy.get(elementos.alertaDelete).should('be.visible').contains('Successfully Deleted')
        
    })

})
