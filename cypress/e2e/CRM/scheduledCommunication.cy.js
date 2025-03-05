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
        cy.get('#scheduled-communications-side-nav').click();

        // Verify the scheduled page
        cy.get('#scheduled-communications-container').should('have.css', 'display', 'flex');
    
        cy.get('#openFiltersModal').click({force:true});
        
        cy.get('#schedCommFiltersForm')
       .should('be.visible')

    })

})