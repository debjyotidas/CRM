describe('sms Test', () => {
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

    it('show sms page', () => {
        cy.get('#sms-side-nav').click();

        // Verify the sms page
        cy.get('#sms-list-view').should('have.css', 'display', 'flex');

        // Verify filter button
        cy.get('#sms-filter-container').click();
       
        cy.get('.sms-filter-dropdown')
       .should('be.visible')
       .should('have.css', 'z-index', '50');  // Verifying the z-index from the CSS
       
       cy.get('#sms-filter-direction').click();

       cy.get('input[type="checkbox"][value="incoming"]')
                .check()
                .should('be.checked');

        cy.get('#sms-filter-apply').click();

         // Wait for table to update
         cy.wait(2000);
        
         // Verify the container has the table
         cy.get('#sms-container')
             .find('table')
             .should('exist');

        // For finding a specific status cell
        cy.get('#smsTableBody')
          .find('tr')
          .find('td')
          .contains('Received')
          .should('be.visible');
         
         // Verify the pagination shows filtered results
        cy.get('.sms-pagination-container')
             .should('exist');

        // Verify filter button
        cy.get('#sms-filter-container').click();

        cy.get('.sms-filter-dropdown')
       .should('be.visible')
       .should('have.css', 'z-index', '50');  // Verifying the z-index from the CSS
       
       cy.get('#sms-filter-users').click();

       // Wait for the users list to be visible
      cy.get('.sms-filter-content')
      .should('be.visible')
      .within(() => {
        // Now try to check the checkbox
        cy.get('input[type="checkbox"][value="5"]')
          .should('be.visible')
          .check({force: true})
          .should('be.checked');
      });

        cy.get('#sms-filter-apply').click();

        // Verify filter button
        cy.get('#sms-filter-container').click();

        cy.get('.sms-filter-dropdown')
       .should('be.visible')
       .should('have.css', 'z-index', '50');  // Verifying the z-index from the CSS

       cy.get('#sms-filter-clear').click();
    })

})