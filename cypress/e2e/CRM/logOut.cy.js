describe('Logout Test', () => {
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

    it('should not show logout', () => {
        cy.get('#logout-link').click();

        // Verify the logout confirmation page
        cy.url().should('include', 'crm/logout.php');
        cy.get('#logout-button').should('be.visible');

        // Confirm the logout
        cy.get('#return-dashboard').click();

        // Verify that the user is redirected to the login page
        cy.url().should('include', 'crm/dashboard.php');
    })
    it('should show logout', () => {
        cy.get('#logout-link').click();

        // Verify the logout confirmation page
        cy.url().should('include', 'crm/logout.php');
        cy.get('#logout-button').should('be.visible');

        // Confirm the logout
        cy.get('#logout-button').click();

        // Verify that the user is redirected to the login page
        cy.url().should('include', 'crm/login.php');
    })
})