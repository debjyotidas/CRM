describe('Team Account Switching Test', () => {
    beforeEach(() => {
      // Visit the application URL before each test
      cy.visit('https://crm5.matrackinc.com/crm/login.php');
      
      // Login
      cy.get('#email').type('dev.trivan22@gmail.com');
      cy.get('#password').type('12341234');
      cy.get('button').contains('Login').click();
      
      // Wait for the dashboard to be fully loaded
      cy.wait(6000);
      
      // Verify we're on the dashboard
      cy.url().should('equal', 'https://crm5.matrackinc.com/crm/dashboard.php');
    });
  
    it('should switch between team accounts successfully', () => {
      // Click the profile switcher to open the dropdown
      cy.get('#profile-switcher').click();
  
      // Verify the team-accounts-dropdown becomes visible with flex display
      cy.get('.team-accounts-dropdown')
        .should('be.visible')
        .and('have.css', 'display', 'block');
  
      // Click on the team account item
      //   cy.get('.team-account-item[data-account-id="3"]').click();
      cy.get('.team-account-item').click()
  
      // Wait for the page reload and verify we're still on dashboard
      cy.url().should('include', '/dashboard.php');
  
      // Verify the account switch was successful by checking the current profile
      cy.get('.current-profile')
        .should('be.visible')
        .and('contain', 'dev'); // Adjust the text based on what should be displayed
  
      // Open dropdown
      cy.get('#profile-switcher').click();
      cy.get('.team-accounts-dropdown').should('be.visible');
  
      // Close dropdown by clicking switcher again
      cy.get('#profile-switcher').click();
      cy.get('.team-accounts-dropdown').should('not.be.visible');
  
      // Switch account first
      cy.get('#profile-switcher').click();
      cy.get('.team-account-item[data-account-id="3"]').click();
      
      // Wait for reload
      cy.wait(5000);
      
      // Refresh page
      cy.reload();
      
      // Verify the correct account is still selected
      cy.get('.current-profile')
        .should('be.visible')
        .and('contain', 'test user');
    });
  });