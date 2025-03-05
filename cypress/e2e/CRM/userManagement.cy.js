describe('Mailbox Composition', () => {
  beforeEach(() => {
    cy.visit('https://crm5.matrackinc.com/crm/login.php');
    cy.get('#email').type('dev.trivan22@gmail.com');
    cy.get('#password').type('12341234');
    cy.get('button').contains('Login').click();
    cy.wait(10000);
    cy.url().should('equal', 'https://crm5.matrackinc.com/crm/dashboard.php');
  });

  it('should create team and user accounts and verify table entry', () => {
    // Navigate to User Management
    cy.get('#userMgmt-side-nav').click();
    cy.wait(2000);

    cy.get('#userMgmt-container')
      .should('be.visible')
      .and('have.css', 'display', 'flex');

     cy.get('.btn_secondary_icon').eq(1).click()

    // Create User Account
    cy.get('#userMgmtType').select('user', { force: true });

    // Fill User Account Details
    cy.get('#userMgmtFullName')
      .should('be.visible')
      .and('not.be.disabled')
      .clear()
      .type('test testing', { force: true });

    cy.get('#userMgmtEmail')
      .should('be.visible')
      .and('not.be.disabled')
      .type('testclient@example.com', { force: true });

    cy.get('#userMgmtPassword')
      .should('be.visible')
      .and('not.be.disabled')
      .clear()
      .type('test@12345', { force: true });

    // Set additional options
    cy.get('input[type="checkbox"][name="userActive"]')
      .should('be.visible')
      .check({ force: true });

    cy.get('input[type="checkbox"][name="canRecord"]')
      .should('be.visible')
      .check({ force: true });

    // Save User Account
    cy.get('#userMgmtSave').click();

    // Click on close button
    cy.get('#userMgmtClose').click({ force: true });

    // Wait for the table to update
    cy.wait(2000);

    // Find the row with the new user
    cy.contains('.userMgmt-table tr', 'test testing', { timeout: 10000 })
      .should('exist')
      .within(() => {
        // Click Edit button
        cy.get('button[title="Edit User"]')
          .click({ force: true });
        cy.wait(3000);
        
        cy.get('#userMgmtType').select('user', { force: true });
        
        // Close modal using specific ID
        // cy.get('#userMgmtClose').click({ force: true });

        // Click Email Configuration button
        cy.get('button[title="Email Configuration"]')
          .click({ force: true });
        cy.wait(3000);
        
        // Close modal using button class
        cy.get('button.btn.btn-secondary').contains('Close').click({ force: true });

        // Click Manage Voicemails button
        cy.get('button[title="Manage Voicemails"]')
          .click({ force: true });
        cy.wait(1000);
        
        // Close modal using button class
        cy.get('button.btn.btn-secondary').contains('Close').click({ force: true });
      });
  });
});