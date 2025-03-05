describe('scheduled Test', () => {
  beforeEach(() => {
    // Visit the application URL before each test
    cy.visit('https://crm5.matrackinc.com/crm/login.php');

    cy.get('#email').type('dev.trivan22@gmail.com');
    cy.get('#password').type('12341234');
    cy.get('button').contains('Login').click();

    // Wait for the dashboard to be fully loaded
    cy.wait(6000); // Add a small wait for the dashboard to stabilize

    cy.url().should('equal', 'https://crm5.matrackinc.com/crm/dashboard.php');
  })

  it('show scheduled comm page', () => {
    // Intercept the API call
  cy.intercept('POST', '**/api.php').as('getReportsAPI');
  
      cy.get('#reports-side-nav').click();

      // Verify the scheduled page
      cy.get('#reports-container').should('have.css', 'display', 'flex');
      
      // cy.get('#dateFilterBtn').click();

      // Click the date filter button
      cy.get('#dateFilterBtn')
        .should('be.visible')
        .click();

        // Wait for dropdown to be visible and click "This Week"
      cy.get('#dateFilterMenu')  // Using the correct parent menu ID from error
      .should('be.visible')
      .within(() => {
        cy.contains('This Month').click({force:true});
        cy.wait(3000);
      });

      // Wait for the API call and verify the response
      cy.wait('@getReportsAPI').then((interception) => {
        // Verify it's a POST request
        expect(interception.request.method).to.equal('POST');
        
        // Verify status code is 200
        expect(interception.response.statusCode).to.equal(200);
        
        // Verify content type is application/json
        expect(interception.response.headers['content-type']).to.include('application/json');
        
        // Verify the response body contains expected data
        expect(interception.response.body).to.exist;
      });

  
      cy.get('.metric').eq(0).click({force:true});
      cy.wait(3000);
      
      cy.get('#search-container').should('be.visible')

      cy.get('.filter-button').should('be.visible').click();
      cy.get('#statusFilter').should('be.visible').and('have.css', 'display', 'block');

      // Click outside the statusFilter modal
      cy.get('#statusFilter').parent().parent()  // Going up to a parent container
      .click('bottomRight', { force: true });  // Click in the bottom right corner outside the modal

      // Verify the modal is closed
      cy.get('#statusFilter')
      .should('have.css', 'display', 'none');



      cy.get('.workflow-button').click();
      
      
      // cy.get('#search-container').should('be.visible')

      // cy.get('#outboundCallsCard').click();
      
      // cy.get('#search-container').should('be.visible')
      
      // cy.get('#averageCallDurationCard').click();
      
      // cy.get('#search-container').should('be.visible')
      
      // cy.get('#sentEmailsCard').click();
      
      // cy.get('#search-container').should('be.visible')
      
      // cy.get('#receivedEmailsCard').click();
      
      // cy.get('#search-container').should('be.visible')
  })

})