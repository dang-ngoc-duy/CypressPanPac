/// <reference types="cypress" />

import dayjs from "dayjs";

context("Booking", () => {
  it("With Company User", () => {
    // Visit homepage
    cy.goToUrl("/");

    // Login with first user
    cy.login("COMPANY", 0);
    cy.location("pathname").should("eq", "/company-account-details");

    // Go to Booking page
    cy.goToUrl("/#Vehicles");
    cy.get(
      `.available-vehicle-sec 
      > div > div.row > div:nth-child(1) > 
      .vehicle-card-wrapper > [href="/vehicle-booking"] > button`
    ).click();

    cy.location("pathname").should("eq", "/vehicle-booking");

    // Booking date - (ex: 1 day)
    cy.get(".react-date-picker__calendar-button").click({
      multiple: true,
      force: true,
    });
    cy.get(".react-calendar__tile--now").click({ multiple: true, force: true });

    // Select documents
    cy.get('[name="DLicenseFront"]').selectFile({
      fileName: "DLicenseFront.pdf",
      contents: [{ name: "Justin Dang" }],
    });
    cy.get('[name="DLicenseBack"]').selectFile({
      fileName: "DLicenseBack.pdf",
      contents: [{ name: "Justin Dang" }],
    });
    cy.get('[name="ICFront"]').selectFile({
      fileName: "ICFront.pdf",
      contents: [{ name: "Justin Dang" }],
    });
    cy.get('[name="ICBack"]').selectFile({
      fileName: "ICBack.pdf",
      contents: [{ name: "Justin Dang" }],
    });

    // Confirm checkbox
    cy.get("#privacy").check();

    // Next to payment step
    cy.get('button[type="submit"]').click();

    // Check out with payment
    cy.wait(10000)
      .get("button.check-btn")
      .should("have.text", "CHECK OUT WITH PAYMENT")
      .click();

    // Add card details
    cy.addCardDetail();

    // Pay
    // cy.get('button[type="submit"]').click();
  });
});
