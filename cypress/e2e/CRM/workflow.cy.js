describe('Mailbox Composition', () => {
    beforeEach(() => {
      cy.visit('https://crm1.matrackinc.com/crm_matrack/login.php');
      cy.get('#email').type('dev.trivan22@gmail.com');
      cy.get('#password').type('12341234');
      cy.get('button').contains('Login').click();
      cy.wait(10000);
      cy.url().should('equal', 'https://crm1.matrackinc.com/crm_matrack/dashboard.php');
    });
  
    it('should show the user Mgmt view when the user mgmt item is clicked', () => {
      cy.get('#workflow-side-nav').click();
      cy.get('.workflow-list-view').should('have.css', 'display', 'flex');
  
      // Click on the Account tab
      cy.get('#newWorkflowBtn').click();
      
      cy.get('#newWorkflowModal').should('be.visible').should('have.css', 'display', 'block');
  
        // Update the workflow name
      cy.get('input[type="text"][id="workflowName"]')
        .should('be.visible')
        .clear()
        .type('test',{force:true});
        
        cy.get('#createWorkflowBtn').click();
        cy.wait(6000)
        
        // Verify the new workflow appears at the top
        cy.get('#workflowList')
            .find('.workflow-card')
            .first()
            .find('.workflow-name')
            .should('contain', 'test');

        // Click the toggle button for the dropdown menu
        cy.get('.workflow-card')
            .first()
            .find('.workflow-dropdown-btn')
            .click({force: true});

        // Verify dropdown menu is visible
        cy.get('.workflow-dropdown-menu.dropdown-menu-right.show')
            .should('be.visible');

        // Click the duplicate option
        cy.get('.workflow-dropdown-menu.dropdown-menu-right.show')
            .contains('Duplicate')
            .click({force: true});
        cy.wait(6000)

        cy.get('.workflow-list')
        .find('.workflow-card')
        .first()
        .find('.workflow-name')
        .should('contain','test (Copy)')

        // Find the first workflow card with 'test (Copy)'
        cy.get('.workflow-list')
            .find('.workflow-card')
            .filter(':contains("test (Copy)")')
            .first()
            .find('.workflow-dropdown-btn')
            .click({force: true});

        // Click delete option
        cy.get('.workflow-dropdown-menu.dropdown-menu-right.show')
            .contains('Delete')
            .click({force: true});

        // Verify delete confirmation modal appears
        cy.get('#deleteConfirmModal')
            .should('be.visible');

        // Confirm deletion
        cy.get('#confirmDelete')
            .click({force:true});

        cy.wait(2000);

        // Another alternative - click on the main container
        cy.get('#workflow-container')
        .click('topLeft', { force: true });


        // Wait for deletion to process
        cy.wait(10000);

        // Verify workflow is removed from the list
        cy.get('.workflow-list')
            .find('.workflow-card')
            .first()
            .find('.workflow-name')
            .should('not.contain', 'test (Copy)');

            // Find and click Edit button on first workflow card
            cy.get('.workflow-card')
            .first()
            .find('button.workflow-edit-btn.btn.btn-outline-primary.btn-sm.edit-workflow-btn')
            .click({force: true});

            // Verify edit view becomes active
            cy.get('.workflow-edit-view')
            .should('have.class', 'active');

            // Verify workflow name in edit view header
            cy.get('#workflowEditView h2#workflowEditName')
            .should('be.visible')
            .invoke('text')
            .then((editViewName) => {
              cy.get('.workflow-card')
                .first()
                .find('.workflow-name')
                .invoke('text')
                .should('equal', editViewName);
            });
            // After clicking addStepBtn
            cy.get('#addStepBtn').click();

            // Verify sidebar becomes active
            cy.get('.workflow-sidebar')
              .should('have.class', 'active');

            // Click SMS button 
            cy.get('button[data-type="sms"]')
              .click();

            // Verify sidebar still has active class
            cy.get('.workflow-sidebar')
              .should('have.class', 'active');

            // Click Use Template button
            cy.get('button.btn.btn-outline-primary.use-template').click();

            // Select option with value 21
            cy.get('select.form-select.template-picker').select('21');

            // Verify template is selected
            cy.get('select.form-select.template-picker').should('have.value', '21');

            cy.get('#addVariationBtn').click();

            cy.get('button.btn.btn-outline-primary.use-custom').eq(1)
            .click()

            // Type in the textarea
            cy.get('textarea.form-control.variation-message').eq(1)
            .should('be.visible')
            .click()
            .clear()
            .type('testingg', {force: true});
          
            // Verify the text was entered
            cy.get('textarea.form-control.variation-message').eq(1)
              .should('have.value', 'testingg');

              cy.get('#saveStepBtn')
              .scrollIntoView()
              .should('be.visible')
              .click()

            cy.get('#backToList').click();
            cy.get('.workflow-list-view').should('have.css', 'display', 'flex');

    });
  });