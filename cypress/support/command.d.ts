// / <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    login: () => void;
  }

  type Option = {
    id: string;
    label: string;
  };
}
