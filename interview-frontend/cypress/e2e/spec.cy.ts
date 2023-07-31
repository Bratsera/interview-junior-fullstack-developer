describe('Testing app functionality', () => {
  it('Should show initial state of page', () => {
    cy.visit('/');
    cy.contains(
      'Please enter the city you are looking for and click search.'
    ).should('exist');
  });

  it('Should return one entry for München', () => {
    cy.visit('/');
    cy.get('[data-cy="city-input"]').type('München');
    cy.get('[data-cy="submit-btn"]').click();

    cy.get('[data-cy="city-input"]').should('have.value', '');
    cy.get('tr').should('have.length', 2);
  });

  it('Should return one entry for München when the umlaut is written with "ue"', () => {
    cy.visit('/');
    cy.get('[data-cy="city-input"]').type('Muenchen');
    cy.get('[data-cy="submit-btn"]').click();

    cy.get('[data-cy="city-input"]').should('have.value', '');
    cy.get('tr').should('have.length', 2);
  });

  it('Should display no entries text', () => {
    cy.visit('/');
    cy.get('[data-cy="city-input"]').type('asdfdgsdfsdaff');
    cy.get('[data-cy="submit-btn"]').click();

    cy.get('.table').should('have.css', 'display', 'none');
    cy.contains('No cities found.');
  });

  it('Should display error text', () => {
    cy.visit('/');
    cy.intercept('http://localhost:3000/cities?cities=', {
      statusCode: 401,
    });
    cy.get('[data-cy="submit-btn"]').click();

    cy.contains(
      'An unexpected error occured while fetching the results. Please try again later'
    );
  });
});
