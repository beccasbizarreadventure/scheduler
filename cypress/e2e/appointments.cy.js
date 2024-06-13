describe("Appointments", () => {

  beforeEach(() => {
    cy.request("GET", "/api/debug/reset");
    cy.visit("/");
    cy.contains("Monday");
  });

  it("should book an interview", () => {

    cy.get('[alt="Add"]').first().click();

    cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones");

    cy.get('[alt="Sylvia Palmer"]').click();

    cy.get('button').contains("Save").click();

    cy.contains('.appointment__card--show','Lydia Miller-Jones');
    cy.contains('.appointment__card--show','Sylvia Palmer');
  });

  it("should edit an interview", () => {
    cy.get('[alt="Edit"]')
      .first()
      .click({ force: true });
    cy.get('[alt="Tori Malcolm"]').click();
    cy.get("[data-testid=student-name-input]").clear().type("Lydia Miller-Jones");
    cy.get('button').contains("Save").click();

    cy.contains('.appointment__card--show','Lydia Miller-Jones');
    cy.contains('.appointment__card--show','Tori Malcolm');
  });

  it("should cancel an interview", () => {
    cy.get('[alt="Delete"]')
      .first()
      .click({ force: true });
    cy.get('button').contains("Confirm").click();

    cy.server();
    cy.route({
      url: '/',
      onRequest: () => {
        cy.get('[message="Deleting"]');
      },
    });
    cy.contains("Deleting").should("not.exist");

    cy.contains(".appointment__card--show", "Archie Cohen")
      .should('not.exist');
  });


  // First, check that the "Deleting" indicator should exist. Cypress will make sure that we show the "Deleting" indicator before moving to the next command.
  // Then check that the "Deleting" indicator should not exist. Cypress will keep checking until we remove the indicator, or reach a timeout. In this case, it waits until we remove the indicator to move on.
  // Last check that the .appointment__card--show element that contains the text "Archie Cohen" should not exist.
});