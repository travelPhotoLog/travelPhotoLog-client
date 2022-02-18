describe("Map", () => {
  it("Get Map List", () => {
    cy.visit("/my-travels");

    cy.request(
      "http://localhost:8000/user/620b4a0a72a68408b360d18e/maps"
    ).should(response => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("maps");
    });
  });

  it("Map Detail", () => {
    cy.visit("/my-travels/620b4a1a72a68408b360d196");
    cy.get("[data-cy='googleMap']");
  });
});
