describe('Dynamic Forms Management', () => {
  beforeEach(() => {
    cy.visit('https://crm5.matrackinc.com/crm/login.php');
    cy.get('#email').type('dev.trivan22@gmail.com');
    cy.get('#password').type('12341234');
    cy.get('button').contains('Login').click();
    cy.wait(10000);
    cy.url().should('equal', 'https://crm5.matrackinc.com/crm/dashboard.php');
  });

  it('should create a new form and verify its details', () => {
    // Store form details
    const formName = 'testing Form';
    const formDescription = 'new samplesss';

    cy.get('#dynamic-forms-side-nav').click();
    cy.get('#dynamicFormsListView').should('have.css', 'display', 'flex');

    // Click on the create button
    cy.get('#createFormBtn').click();
    cy.get('#createFormModal').should('have.css', 'display', 'block');

    // Fill form details
    cy.get('input[type="text"][id="newFormName"]')
      .should('be.visible')
      .type(formName);

    cy.get('textarea#newFormDescription')
      .should('be.visible')
      .type(formDescription);

    // Submit form
    cy.get('#createFormSubmitBtn').click();

    // Verify form in list
    cy.get('#formsList').within(() => {
      cy.get('.df-form-card').should('exist');
      cy.get('.df-form-name').contains(formName).should('exist');
      cy.get('.df-form-description').contains(formDescription).should('exist');
      cy.get('.df-form-status.badge.badge-success')
        .contains('active')
        .should('exist');
      cy.get('.df-form-card-body')
        .contains('0 submissions')
        .should('exist');
      cy.get('.df-form-card-body')
        .contains('Created')
        .should('exist');
    });


  // it('should edit an existing form', () => {
    const updatedFormName = 'Updated Testing Form';
    
    cy.get('#dynamic-forms-side-nav').click();
    cy.get('#dynamicFormsListView').should('have.css', 'display', 'flex');

    // Find and click edit button for "testing Form"
    cy.get('.df-form-card')
      .contains('testing Form')
      .parents('.df-form-card')
      .within(() => {
        // cy.get('[data-cy="editFormBtn"]').click();
        cy.get('button.btn.btn-sm.btn-outline-primary.edit-form-btn').click();
      });

    // Verify edit view is visible
    cy.get('#dynamicFormsEditView').should('be.visible');

    // Edit form title
    cy.get('#formTitleInput')
      .should('be.visible')
      .clear()
      .type(updatedFormName);

    // Click Save button
    cy.get('#saveFormBtn').click();

    //Click on Back to forms
    cy.get('#backToListBtn').click();

    // Verify changes are saved and back to list view
    cy.get('#dynamicFormsListView').should('be.visible');
    cy.get('.df-form-card')
      .contains(updatedFormName)
      .should('exist');
  // });

  // it('should handle form edit validation', () => {
  //   cy.get('#dynamic-forms-side-nav').click();
  //   cy.get('#dynamicFormsListView').should('have.css', 'display', 'flex');

  //   // Find and click edit button
  //   cy.get('.df-form-card')
  //     .first()
  //     .within(() => {
  //       cy.get('[data-cy="editFormBtn"]').click();
  //     });

  //   // Verify edit view is visible
  //   cy.get('#dynamicFormsEditView').should('be.visible');

  //   // Test empty title validation
  //   cy.get('#formTitleInput')
  //     .should('be.visible')
  //     .clear();

  //   cy.get('#saveFormBtn').click();

  //   // Verify validation message
  //   cy.get('.form-error-message')
  //     .should('be.visible')
  //     .and('contain', 'Form title is required');
  // });

  // it('should navigate back to forms list', () => {
  //   cy.get('#dynamic-forms-side-nav').click();
  //   cy.get('#dynamicFormsListView').should('have.css', 'display', 'flex');

  //   // Find and click edit button
  //   cy.get('.df-form-card')
  //     .first()
  //     .within(() => {
  //       cy.get('[data-cy="editFormBtn"]').click();
  //     });

  //   // Verify edit view is visible
  //   cy.get('#dynamicFormsEditView').should('be.visible');

  //   // Click back button
  //   cy.get('#backToFormsBtn').click();

  //   // Verify back to list view
  //   cy.get('#dynamicFormsListView').should('be.visible');
  // });

  // it('should copy a form', () => {
  //   cy.get('#dynamic-forms-side-nav').click();
  //   cy.get('#dynamicFormsListView').should('have.css', 'display', 'flex');

  //   // Find and click copy button
  //   cy.get('.df-form-card')
  //     .first()
  //     .within(() => {
  //       cy.get('[data-cy="copyFormBtn"]').click();
  //     });

  //   // Verify copy success
  //   cy.get('.toast-success')
  //     .should('be.visible')
  //     .and('contain', 'Form copied successfully');
  // });

  // it('should delete a form', () => {
  //   cy.get('#dynamic-forms-side-nav').click();
  //   cy.get('#dynamicFormsListView').should('have.css', 'display', 'flex');

  //   // Find and click delete button
  //   cy.get('.df-form-card')
  //     .last()
  //     .within(() => {
  //       cy.get('[data-cy="deleteFormBtn"]').click();
  //     });

  //   // Confirm deletion
  //   cy.get('#confirmDeleteBtn').click();

  //   // Verify deletion success
  //   cy.get('.toast-success')
  //     .should('be.visible')
  //     .and('contain', 'Form deleted successfully');
  // });

  // it('should filter forms by status', () => {
  //   cy.get('#dynamic-forms-side-nav').click();
  //   cy.get('#dynamicFormsListView').should('have.css', 'display', 'flex');

  //   // Click on Draft tab
  //   cy.get('button').contains('Draft').click();
  //   cy.get('.df-form-status.badge.badge-draft').should('exist');

  //   // Click on Active tab
  //   cy.get('button').contains('Active').click();
  //   cy.get('.df-form-status.badge.badge-success').should('exist');

  //   // Click on Archived tab
  //   cy.get('button').contains('Archived').click();
  //   cy.get('.df-form-status.badge.badge-archived').should('exist');
  // });

  // it('should search forms', () => {
  //   cy.get('#dynamic-forms-side-nav').click();
  //   cy.get('#dynamicFormsListView').should('have.css', 'display', 'flex');

  //   // Search for a form
  //   cy.get('#searchFormsInput')
  //     .type('testing Form');

  //   // Verify search results
  //   cy.get('.df-form-card')
  //     .should('have.length.at.least', 1)
  //     .and('contain', 'testing Form');
  // });

}); 
});