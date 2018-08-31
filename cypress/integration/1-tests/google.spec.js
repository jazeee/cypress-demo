context('Google Search', () => {
  beforeEach(() => {
    cy.visit('https://www.google.com?t=' + Date.now());
  });
  it("Google can find Jaz", () => {
    cy.server();
    cy.get("input.gLFyf").as("input-field");

    cy.route("GET", /complete\/search?.*q=Jaz Singh/)
      .as("search-me");
    cy.get("@input-field")
      .type("Jaz Singh")
      .should("have.value", "Jaz Singh");
    cy.get("body").click("left");

    cy.get('.FPdoLc > center > [value="Google Search"]').click();

    cy.wait("@search-me");

    cy.get('.rc > .r > a')
    .then(elements => {
      for ( let i = 0 ; i < 2; i++){
        cy.wrap(Cypress.$(elements[i]))
          .should("contain", "Jaz Singh");
      }
    });
      // .first()
      // // .next()
      // .should("contain", "Jaz Singh");
  });
});
