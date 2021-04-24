// / <reference types="cypress" />

const login = (): void => {
  cy.get('#email').type(Cypress.env('email'));
  cy.get('#password').type(Cypress.env('email'));

  cy.get('button').click();
};

Cypress.Commands.add('login', login);
