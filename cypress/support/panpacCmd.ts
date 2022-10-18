import panpac from "../fixtures/panpac.json";
import { ACC_TYPE } from "./../constants/index";

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to go to the page via Route.
       * @example
       * cy.goToUrl('/login')
       * cy.goToUrl('/home')
       */
      goToUrl(route: string): Chainable<Cypress.AUTWindow>;
      /**
       * Custom command to Login with type of the user & index.
       * @type
       * `ACC_TYPE`
       * @example
       * cy.login('COMPANY', 0)
       * cy.login('PERSON', 0)
       */
      login(type: ACC_TYPE, index: number): void;
      /**
       * Custom command to get card info.
       * @example
       * cy.addCardDetail()
       */
      addCardDetail(): void;
    }
  }
}

// Get baseURL
Cypress.Commands.add("goToUrl", (route) => {
  return cy.visit(panpac.baseURL + route);
});

// Login with company account
Cypress.Commands.add("login", (type = "COMPANY", index = 0) => {
  let accounts: any[] = [];

  cy.get(".login-btn")
    .should("have.css", "background-color", "rgb(23, 49, 84)")
    .click();

  cy.location("pathname").should("eq", "/login");

  cy.get(".login-confirm-modal-wrapper").should("exist");
  cy.get(".mt-5").should("contain", "Already have an account?");
  cy.get(".login-btn").should("have.css", "height", "35px").click();

  switch (type) {
    case "COMPANY":
      accounts = panpac.data.company.accounts;
      cy.get('[type="checkbox"]')
        .should("have.attr", "title", "Corporate User")
        .check();
      cy.get("[name='companyroc']").type(accounts[index].roc_uen);
      break;
    case "PERSON":
      accounts = panpac.data.person.accounts;
      break;
  }

  cy.get("[name='email']").type(accounts[index].email);
  cy.get("[name='password']").type(accounts[index].password);

  cy.get(".submit-btn").click();
});

// Add card details
Cypress.Commands.add("addCardDetail", () => {
  let cardInfo = panpac.data.card_detail;
  // cy.get(
  //   `[data-elements-stable-field-name="${Object.keys(cardInfo)[0]}"]`
  // ).type(cardInfo.cardNumber);
  // cy.get(
  //   `[data-elements-stable-field-name="${Object.keys(cardInfo)[1]}"]`
  // ).type(cardInfo.cardExpiry);
  // cy.get(
  //   `[data-elements-stable-field-name="${Object.keys(cardInfo)[2]}"]`
  // ).type(cardInfo.cardCvc);

  cy.get(".__PrivateStripeElement > iframe").then(($element) => {
    const $body = $element.contents().find("body");
    cy.log("body", $body);
    let stripe = cy.wrap($body);
    stripe
      .find(`[data-elements-stable-field-name="${Object.keys(cardInfo)[0]}"]`)
      .click()
      .type(cardInfo.cardNumber);
    stripe = cy.wrap($body);
    stripe
      .find(`[data-elements-stable-field-name="${Object.keys(cardInfo)[1]}"]`)
      .click()
      .type(cardInfo.cardExpiry);
    stripe = cy.wrap($body);
    stripe
      .find(`[data-elements-stable-field-name="${Object.keys(cardInfo)[2]}"]`)
      .click()
      .type(cardInfo.cardCvc);
  });
});
