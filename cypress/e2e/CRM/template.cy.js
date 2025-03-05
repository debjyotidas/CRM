describe('Mailbox Composition', () => { 
    beforeEach(() => {
        cy.visit('https://crm5.matrackinc.com/crm/login.php');
        cy.get('#email').type('dev.trivan22@gmail.com');
        cy.get('#password').type('12341234');
        cy.get('button').contains('Login').click();
        cy.wait(6000);
        cy.url().should('equal', 'https://crm5.matrackinc.com/crm/dashboard.php');
      });
      it('should show the template list view when the template item is clicked', () => {
        cy.get('#template-side-nav').click();
        cy.get('#template-list-view').should('have.css', 'display', 'flex');

        // should show the template form view when + icon is clicked
        cy.get('#newTemplateBtn').click();
        cy.get('#template-form-view').should('be.visible');
        cy.get('input[id="template-name"]').type('Test template', {force:true});

        // Method 1: Select by visible text
        cy.get('#template-type').select('SMS');

        // Type in the textarea
        cy.get('textarea#template-sms-message')
        .should('be.visible')
        .click()
        .clear()
        .type('testing SMS', {force: true});

        // Initial check - section should be hidden
          cy.get('#customFieldsSection')
          .should('have.css', 'display', 'none');

        // Click on Custom Fields link/button to show section
        cy.get('.text-decoration-underline.text-dark')
          .click();

        // Verify section is now visible
        cy.get('#customFieldsSection')
          .should('be.visible')
          .and('not.have.css', 'display', 'none');

        // Click again to hide
        cy.get('.text-decoration-underline.text-dark')
          .click();

        // Verify section is hidden again
        cy.get('#customFieldsSection')
          .should('have.css', 'display', 'none');

        cy.get('.text-decoration-underline.text-dark')
          .click();

        cy.get('#customFieldsSection')
          .should('be.visible')
          .and('not.have.css', 'display', 'none');

          cy.get('#field-table').select('Users');
          
          cy.get('#field-name').select('Email');

          cy.get('#field-table').select('Contacts');
          
          cy.get('#field-name').select('Mobile');

          cy.get('#insertFieldBtn').click();

          cy.get('#template-saveButton').click();

      })
      
})