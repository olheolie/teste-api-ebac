/// <reference types="cypress" />
import { equal } from 'joi';
import contrato from '../contracts/usuarios.contracts'

describe('Testes da Funcionalidade Usuários', () => {

  it('Deve validar contrato de usuários', () => { 
          cy.request('usuarios').then(response => {
            return contrato.validateAsync(response.body)
          })
  });

  it('Deve listar usuários cadastrados - GET', () => {
    cy.request({
      method: 'GET',
      url: 'usuarios'
    }).then(response => {
      expect(response.body).to.have.property('usuarios')
      expect(response.status).to.equal(200)
    })
  });

  it('Deve cadastrar um usuário com sucesso - POST', () => {
    let email = `joanajo${Math.floor(Math.random()*1000)}@qa.com`
    cy.request({
      method: 'POST',
      url:'usuarios',
      body: {
        "nome": "Joana Joanete",
        "email": email,
        "password": "teste",
        "administrador": "true"
      }
    }).should(response => {
      expect(response.body.message).equal('Cadastro realizado com sucesso')
      expect(response.status).to.equal(201)
    })
  });

  it('Deve validar um usuário com email inválido - POST', () => {
    cy.request({
      method: 'POST',
      url: 'usuarios',
      body: {
        "nome": "Fernanda Pessoa",
        "email": "joanete@qa.com.br",
        "password": "teste",
        "administrador": "true"
      }, 
      failOnStatusCode: false
    }).then(response => {
      expect(response.status).equal(400)
      expect(response.body.message).to.equal('Este email já está sendo usado')
    })
    
  });

  it('Deve editar um usuário previamente cadastrado', () => {
    let password = `teste${Math.floor(Math.random() * 10000000)}`
    let email = `dasilva${Math.floor(Math.random()*1000)}@qa.com`
    cy.CadastrarUsuario( "Fernando Silva", email, password, "true")
    .then(response =>{
      let id =response.body._id

      cy.request({
        method: 'PUT',
        url: `usuarios/${id}`,
        body: {
          "nome": "fernando Silva",
          "email": email,
          "password": password,
          "administrador": "true"        }
      }).should(response =>{
        expect(response.body.message).to.equal('Registro alterado com sucesso')
        expect(response.status).to.equal(200)
      })
    })
 
  });

  it('Deve deletar um usuário previamente cadastrado', () => {
    let email = `dasilva${Math.floor(Math.random()*1000)}@qa.com`
    cy.CadastrarUsuario( "Fernando Silva", email, 'teste@123', "true")
    .then(response => {
      let id =response.body._id

      cy.request({
        method: 'DELETE',
        url:`usuarios/${id}`
      })
    }) 
  });


});
