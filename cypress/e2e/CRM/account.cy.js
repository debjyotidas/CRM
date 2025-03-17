describe('Mailbox Composition', () => {
  beforeEach(() => {
    cy.visit('https://crm.matrackinc.com/login.php');
    cy.get('#email').type('dev.trivan22@gmail.com');
    cy.get('#password').type('11111111');
    cy.get('button').contains('Login').click();
    cy.wait(6000);
    cy.url().should('equal', 'https://crm.matrackinc.com/dashboard.php');
  });

  it('should show the user Mgmt view when the user mgmt item is clicked', () => {
    cy.get('#settings-link').click();
    cy.get('#settings-container').should('have.css', 'display', 'flex');

    // Click on the Account tab
    cy.get('#settings-account-nav').click();

    // Verify that the settings-tab has the 'active' class and the display is 'block'
    cy.get('.settings-tab').should('have.class', 'active');
    cy.get('.settings-tab').should('have.css', 'display', 'block');

    // Click the Edit button
    cy.get('#settings-edit-btn').click();

    // Update the email and full name
    cy.get('input[type="email"][id="settings-email"]')
      .should('be.visible')
      .clear()
      .type('dev.trivan22@gmail.com');

    cy.get('input[type="text"][id="settings-full-name"]')
      .should('be.visible')
      .clear()
      .type('test users');

    // Locate the "Change Password" section
    cy.get('.settings-section-header:contains("Change Password")', { timeout: 10000 }).should('be.visible');
    cy.get('.settings-edit-btn').eq(1).click({force:true});

    // Type the current password
    cy.get('input[type="password"][id="settings-current-password"]')
      .should('be.visible')
      .type('12341234');
      
    // Type the new password
    cy.get('input[type="password"][id="settings-new-password"]')
      .should('be.visible')
      .type('12341234');

    // Type the new password
    cy.get('input[type="password"][id="settings-confirm-password"]')
      .should('be.visible')
      .type('12341234');
      
    cy.get('#settings-save-password').click();

    cy.get('.settings-section-header:contains("Email Signature")', { timeout: 10000 }).should('be.visible');
    cy.get('.settings-edit-btn').eq(2).click({force:true});

    cy.get('.ck-restricted-editing_mode_standard').eq(3).click();
    
    cy.get('#settings-save-signature').click();

  });
});