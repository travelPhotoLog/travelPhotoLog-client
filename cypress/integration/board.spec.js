describe("Board Test", () => {
  it("Click 'My Posting', when logged out", () => {
    cy.clearCookie("accessToken");
    cy.clearCookie("refreshToken");

    cy.visit("/board");
    cy.contains("My Posting").click();
    cy.url().should("include", "/auth/login");
  });
});
