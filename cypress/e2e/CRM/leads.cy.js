describe('Mailbox Composition', () => {
  beforeEach(() => {
    cy.visit('https://crm5.matrackinc.com/crm/login.php');
    cy.get('#email').type('dev.trivan22@gmail.com');
    cy.get('#password').type('12341234');
    cy.get('button').contains('Login').click();
    cy.wait(6000);
    cy.url().should('equal', 'https://crm5.matrackinc.com/crm/dashboard.php');
  });
      it('should show the lead list view when the Leads item is clicked', () => {

        cy.get('#leads-side-nav').click();
        cy.get('#lead-list-view').should('have.css', 'display', 'flex');

        cy.get('#lead-tab-send-sms').should('exist').click({ force: true });
        cy.get("#sendSMS").should('be.visible').should('have.css','display', 'block')

        // Fill in SMS form
        cy.get('input[name="receipent_number"]').type('+11234567890');
        cy.get('textarea[name="message"]').type('This is a test message');
      
        // Click send button
        cy.get('#lead-tab-send-sms-button').click({force:true});

        // Click cancel button
        cy.get('#sendSMS').find('.btn.btn-secondary').click({force: true});

        cy.get('#createLeadButton').click();
        cy.get('#createLead').should('have.css', 'display', 'block');
        // Fill in the form fields
        cy.get('input[name="company"]').type('Test Companies', {force:true});
        cy.get('input[name="contact_name"]').type('John Doe');
        
        cy.get('#createLeadButton-create').click();

        cy.get('#lead-form-view').should('be.visible')

        // Verify the contact name appears in the First Name field
        cy.get('#first_name')
        .should('be.visible')
        .should('have.value', 'John');

        cy.get('#last_name')
        .should('be.visible')
        .should('have.value', 'Doe');

        cy.get('[name="phone"]').type('8777278121');
        

        //click on save button
        cy.get('#save-contact-button').click({force:true});

        cy.wait(3000)

        //click on 3 dots
        cy.get('#activeLeadDropdown').click()

        //click on Activate/deActivate
        cy.get('#delete-current-lead').click()

        //wait for modal to display
        cy.get('#viewLeadContacts').should('be.visible').should('have.css', 'display', 'block');

        // Verify initial state
        cy.get('#leadStatusText').should('contain', 'Active');
        cy.get('#toggleLeadStatus')
        .should('have.class', 'btn-danger')
        .and('contain', 'Archive Lead');

      // Click Archive Lead button
      cy.get('#toggleLeadStatus').click();

      // Verify status changed to Inactive
      cy.get('#leadStatusText')
        .should('contain', 'Inactive');

      // Verify button changed to Restore Lead
      cy.get('#toggleLeadStatus')
        .should('have.class', 'btn-success')
        .and('contain', 'Restore Lead');
        
      cy.get('#close-lead-contacts-modal').click();

      // Modified Add to Workflow section
    cy.get('#activeLeadDropdown')
    .should('be.visible')
    .click();

    // Try multiple approaches to click the Add to Workflow link
    cy.get('a[id="add-to-workflow-button"]')
      .should('exist')
      .then($el => {
        if ($el.is(':visible')) {
          cy.wrap($el).click({ force: true });
        } else {
          // Alternative approach using contains
          cy.contains('a', 'Add to Workflow').click({ force: true });
        }
      });

    // Wait and verify the modal appears
    cy.get('#addLeadToWorkflowModal')
      .should('exist')
      .and('be.visible')
      .should('have.css', 'display', 'block');

    // Fill the workflow form
    cy.get('#workflow-sendto')
      .should('be.visible')
      .select('All Contacts');

    cy.get('#workflowSelect')
      .should('be.visible')
      .select('test_annie');

    // Click Add to Workflow button in modal
    cy.get('button')
      .contains('Add to Workflow')
      .click({ force: true });

    // Verify modal closes
    cy.get('#addLeadToWorkflowModal')
      .should('not.be.visible');

    // Continue with scheduled communications check
    cy.get('#scheduled-communications-side-nav')
      .should('be.visible')
      .click();

    cy.get('#scheduled-communications-container')
      .should('be.visible')
      .should('have.css', 'display', 'flex');

      });
})