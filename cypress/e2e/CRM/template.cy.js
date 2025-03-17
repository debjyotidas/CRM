describe('Mailbox Composition', () => { 
    beforeEach(() => {
      cy.visit('https://crm.matrackinc.com/login.php');
      cy.get('#email').type('dev.trivan22@gmail.com');
      cy.get('#password').type('11111111');
        cy.get('button').contains('Login').click();
        cy.wait(6000);
        cy.url().should('equal', 'https://crm.matrackinc.com/dashboard.php');
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

        // Check if Public Template toggle is not checked and toggle it if needed
        cy.get('#template-visibility')
          .should('exist')
          .then(($checkbox) => {
            if (!$checkbox.is(':checked')) {
              cy.wrap($checkbox).check({force: true});
            }
          });

        // Type in the textarea
        cy.get('textarea#template-sms-message')
        .should('be.visible')
        .click()
        .clear()
        .type('testing SMS', {force: true});

        // Initial check - section should be hidden
          cy.get('#customFieldsContent')
          .should('have.css', 'display', 'none');

        // Click on Custom Fields link/button to show section
        cy.get('.fas.fa-chevron-down').eq(1)
          .click();

        // Verify section is now visible
        cy.get('#customFieldsContent')
          .should('be.visible')
          .and('not.have.css', 'display', 'none');

        // Click again to hide
        cy.get('.fas.fa-chevron-down').eq(1)
          .click();

        // Verify section is hidden again
        cy.get('#customFieldsContent')
          .should('have.css', 'display', 'block');

        cy.get('.fas.fa-chevron-down')
        .eq(1)
        .scrollIntoView()
        .click();

        cy.get('#customFieldsContent')
          .should('be.visible')
          .and('not.have.css', 'display', 'none');

          cy.get('#field-table').select('Users');
          
          cy.get('#field-name').select('Email');

          cy.get('#field-table').select('Contacts');
          
          cy.get('#field-name').select('Name');

          cy.get('.btn.btn-outline-primary.w-100').eq(1).click();

          cy.get('#template-saveButton').click();

          // Wait for template to be saved and list to update
          cy.wait(2000);

          //click on back icon
          cy.get('.btn.btn-icon').eq(0).click()

          // Find the template card containing "Test template" and click its edit button
          cy.get('.template-card')
            .contains('.template-name', 'Test template')
            .parents('.template-card')
            .find('button')
            .contains('Edit')
            .click();

          //click on template name input 
          cy.get('input[id="template-name"]').clear().type('Test templates', {force:true});

          cy.get('#template-saveButton').click();

          // Wait for template to be saved and list to update
          cy.wait(2000);

          //click on back icon
          cy.get('.btn.btn-icon').eq(0).click()

          // Verify the updated template name is displayed in the list
          cy.get('.template-card')
            .contains('.template-name', 'Test templates')
            .should('be.visible')
            .should('have.text', 'Test templates');

          // Find the template card containing "Test template" and click its edit button
          cy.get('.template-card')
            .contains('.template-name', 'Test templates')
            .parents('.template-card')
            .find('.btn.btn-more')
            .click();

          // Click on Duplicate option in the dropdown menu
          cy.get('.dropdown-menu.dropdown-menu-end.show')
            .contains('Duplicate')
            .click();

          // Verify the duplicated template exists with the same name
          cy.get('.template-card')
            .contains('.template-name', 'Test templates')
            .should('have.length.at.least', 2);

      })
      
})