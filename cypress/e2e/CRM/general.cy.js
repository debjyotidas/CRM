describe('Mailbox Composition', () => { 

    beforeEach(() => {
        cy.visit('https://crm5.matrackinc.com/crm/login.php');
        cy.get('#email').type('dev.trivan22@gmail.com');
        cy.get('#password').type('12341234');
        cy.get('button').contains('Login').click();
        cy.wait(10000);
        cy.url().should('equal', 'https://crm5.matrackinc.com/crm/dashboard.php');
      });

      it('should show the Incoming Email Configuration view when the general item is clicked', () => {
        // Click on settings link
        cy.get('#settings-link').click();
        
        // Verify settings container is displayed
        cy.get('#settings-container').should('have.css', 'display', 'flex');
        
        // Click on general navigation item
        cy.get('#settings-general-nav').click();
        
        // Verify the general settings div has both classes
        cy.get('#settings-general')
        .should('have.class', 'settings-tab')
        .and('have.class', 'active');
        
        // Additional verification for the Incoming Email Configuration view
        cy.contains('h2', 'Incoming Email Configuration')
        .should('be.visible');

        cy.get('#settings-edit-btn').click({force:true});

        cy.get('#settings-email-address')
        .invoke('removeAttr', 'disabled')
        .type('dev.trivan222@gmail.com', { force: true });

        cy.get('#settings-email-username')
        .invoke('removeAttr', 'disabled')
        .type('dev.trivan222@gmail.com', { force: true });

        cy.get('#settings-use-ssl').then($checkbox => {
            if (!$checkbox.is(':checked')) {
              cy.wrap($checkbox).check();
            }
          });

        cy.get('#settings-save-email').click({force:true});

        // Verify the form elements are present
        // cy.get('input[name="email"]').should('be.visible');
        // cy.get('input[name="server_host"]').should('be.visible');
        // cy.get('input[name="server_port"]').should('be.visible');
            
      })
})