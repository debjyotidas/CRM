describe('Mailbox Composition', () => { 

    beforeEach(() => {
        cy.visit('https://crm5.matrackinc.com/crm/login.php');
        cy.get('#email').type('dev.trivan22@gmail.com');
        cy.get('#password').type('12341234');
        cy.get('button').contains('Login').click();
        cy.wait(10000);
        cy.url().should('equal', 'https://crm5.matrackinc.com/crm/dashboard.php');
      });

      it('should show the user Master billing when the master billing is clicked', () => {
        cy.get('#settings-link').click();
        cy.get('#settings-container').should('have.css', 'display', 'flex');

        cy.get('#settings-master-billing-nav').click();

        // Wait for the modal to appear (optional)
        cy.get('#settings-content').should('be.visible');

        // cy.get('#addMember').click();

         // Ensure the button is visible
        cy.get('button[data-target="#addPlanModal"]')
        .should('be.visible') // Check if the button is visible
        .click(); // Click the button
        
        cy.get('#addPlanModal').should('have.css','display','block');

        // Test length validation
        cy.get('input[name="plan_name"]')
        .clear()
        .type('testing',{force:true}) // Assuming max length is 50

        cy.get('input[name="monthly_fee"]')
        .clear()
        .type('40',{force:true}) // Assuming max length is 50

        cy.get('input[name="user_limit"]')
        .clear()
        .type('40',{force:true}) // Assuming max length is 50

        cy.get('input[name="storage_limit"]')
        .clear()
        .type('40',{force:true}) // Assuming max length is 50
        
        cy.get('input[name="email_limit"]')
        .clear()
        .type('40',{force:true}) // Assuming max length is 50

        cy.get('input[name="call_rate"]')
        .clear()
        .type('40',{force:true}) // Assuming max length is 50
        
        cy.get('input[name="sms_rate"]')
        .clear()
        .type('40',{force:true}) // Assuming max length is 50

        cy.get('input[name="recording_rate"]')
        .clear()
        .type('40',{force:true}) // Assuming max length is 50

        cy.get('#feature_voice')
      .should('be.visible') // Ensure it is visible
      .check() // Selects the checkbox (if not already selected)
      .should('be.checked'); // Validate that it is checked

      cy.get('#feature_sms')
      .should('be.visible') // Ensure it is visible
      .check() // Selects the checkbox (if not already selected)
      .should('be.checked'); // Validate that it is checked

      cy.get('#feature_email')
      .should('be.visible') // Ensure it is visible
      .check() // Selects the checkbox (if not already selected)
      .should('be.checked'); // Validate that it is checked
      
      cy.get('#savePlanBtn').click();
        
      })
})