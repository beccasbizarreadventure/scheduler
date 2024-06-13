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

    cy.get("main:contains('Lydia Miller-Jones')")
    .get("main:contains('Sylvia Palmer')")
    .should('have.class', 'appointment__card--show');
  });

});