describe('Mailbox Composition', () => {
    beforeEach(() => {
      cy.visit('https://crm5.matrackinc.com/crm/login.php');
      cy.get('#email').type('dev.trivan22@gmail.com');
      cy.get('#password').type('12341234');
      cy.get('button').contains('Login').click();
      cy.wait(10000);
      cy.url().should('equal', 'https://crm5.matrackinc.com/crm/dashboard.php');
    });
  
    it('should create client and test deactivation', () => {
      // Navigate to settings
      cy.get('#settings-link').click();
      cy.get('#settings-container').should('have.css', 'display', 'flex');
      cy.get('#settings-tenant-nav').click();
      cy.get('#settings-content').should('be.visible');
      cy.get('#create-client-btn').click();
  
      // Create client
      cy.get('#createTenantModal').should('be.visible');
      cy.get('#tenantName')
        .should('be.visible')
        .and('not.be.disabled')
        .type('mytest', { force: true });
      cy.get('#adminEmail').type('testclient123@example.com');
      cy.get('#adminPassword').type('SecurePass123');
      cy.contains('button', 'Create Client').click();
  
      // Click outside modal to close it
      cy.get('body').click(0, 0);
  
      // Verify new client appears in table with Active status
      cy.get('#tenantTable')
        .contains('tr', 'mytest')
        .within(() => {
          cy.contains('testclient123@example.com').should('exist');
          cy.get('button').contains('Deactivate').should('exist').click();
        });
  
      // Click Deactivate button for the new client
      cy.get('#tenantTable')
        .contains('tr', 'mytest')
        .within(() => {
          cy.get('button').contains('Activate').click();
        });
  
      // Verify the Activate button appears after deactivation
      cy.get('#tenantTable')
        .contains('tr', 'mytest')
        .within(() => {
          cy.get('button').contains('Activate').should('exist', { timeout: 10000 });
          cy.get('.badge').contains('Inactive').should('exist');
        });
  
      // Delete the client
      cy.get('#tenantTable')
        .contains('tr', 'mytest')
        .within(() => {
          cy.get('button.btn-danger').first().click();
        });
  
      // Handle the confirmation dialog
    //   cy.contains('Are you sure you want to delete tenant "mytest"?')
    //     .parent()
    //     .contains('button', 'OK')
    //     .click();
  
      // Verify the client is removed from the table
      cy.get('#tenantTable')
        .contains('tr', 'mytest')
        .within(() => {
            cy.contains('testclient123@example.com').should('not.exist');
          });
    });
  });