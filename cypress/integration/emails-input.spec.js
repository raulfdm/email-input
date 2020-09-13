/// <reference types="cypress" />

function runTimes(fn, times) {
  for (let index = 0; index < times; index++) {
    fn();
  }
}

function formIsolationAssertion() {
  cy.get('#awesome-form .email-tag').should('have.length', 0);
}

describe('EmailsInput', () => {
  before(() => {
    cy.visit('/');
  });

  it('renders two sections', () => {
    cy.get('[data-name="emails-input"]').should('have.length', 2);
  });

  it('insert a element hitting enter', () => {
    const inputNode = cy.get('#emails-input input.input');

    inputNode.type('test@gmail.com{enter}');

    const emailNode = cy.get('#emails-input .email-tag');

    emailNode.should('have.length', 1);
    emailNode.should('contain.text', 'test@gmail.com');
  });

  it('element recently added should not be present in the second form', () => {
    formIsolationAssertion();
  });

  it('delete elements when click in the remove button', () => {
    cy.get('.email-tag__remove-button').click();
  });

  it('insert a element hitting comma', () => {
    const inputNode = cy.get('#emails-input input[type="text"]');

    inputNode.type('test2@gmail.com,');

    const emailNode = cy.get('#emails-input .email-tag');

    emailNode.should('have.length', 1);
    emailNode.should('contain.text', 'test2@gmail.com');
  });

  it('insert an invalid email type', () => {
    const inputNode = cy.get('#emails-input input[type="text"]');

    inputNode.type('invalid.email{enter}');

    const invalidNode = cy.get('.email-tag.invalid');

    invalidNode.should('have.length', 1);
    invalidNode.should('contain.text', 'invalid.email');
  });

  it('add a random email when click in the button', () => {
    runTimes(() => {
      cy.get(
        '#emails-input .email-tag:nth-child(1) .email-tag__remove-button'
      ).click();
    }, 2);

    cy.get('.email-tag').should('have.length', 0);

    const randomButtonNode = cy.get('#emails-input footer button:nth-child(1)');
    randomButtonNode.click();
    randomButtonNode.click();
    randomButtonNode.click();
    randomButtonNode.click();

    cy.get('.email-tag').should('have.length', 4);

    formIsolationAssertion();
  });
});
