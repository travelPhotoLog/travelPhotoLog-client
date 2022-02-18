describe("Header Test", () => {
  it("Click 'My Travels'", () => {
    cy.visit("/");
    cy.contains("My travels").click();
    cy.url().should("include", "/my-travels");
  });

  it("Click 'Board'", () => {
    cy.visit("/");
    cy.contains("Board").click();
    cy.url().should("include", "/board");
  });
});
