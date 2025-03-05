describe('Mailbox Composition', () => { 

    beforeEach(() => {
        cy.visit('https://crm5.matrackinc.com/crm/login.php');
        cy.get('#email').type('dev.trivan22@gmail.com');
        cy.get('#password').type('12341234');
        cy.get('button').contains('Login').click();
        cy.wait(10000);
        cy.url().should('equal', 'https://crm5.matrackinc.com/crm/dashboard.php');
      });

      it('should show the user Mgmt view when the user mgmt item is clicked', () => {
        cy.get('#settings-link').click();
        cy.get('#settings-container').should('have.css', 'display', 'flex');

        cy.get('#teamMembers').click();

        // Wait for the modal to appear (optional)
        cy.get('#createTenantModal').should('be.visible');

        cy.get('#addMember').click();
            
        
      })
})