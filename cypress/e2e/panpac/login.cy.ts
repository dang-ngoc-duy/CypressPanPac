/// <reference types="cypress" />

context("Login", () => {
  it("With Company User", () => {
    // Visit homepage
    cy.goToUrl("/");

    // Login with first user
    cy.login("COMPANY", 0);
    cy.location("pathname").should("eq", "/company-account-details");
  });

  it("With Person User", () => {
    cy.clearCookies();
    cy.goToUrl("/");

    // Login with first user
    cy.login("PERSON", 0);
    cy.location("pathname").should("eq", "/person-account-details");
  });
});
