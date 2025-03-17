describe('Mailbox Composition', () => {
  beforeEach(() => {
    cy.visit('https://crm.matrackinc.com/login.php');
    cy.get('#email').type('dev.trivan22@gmail.com');
    cy.get('#password').type('11111111');
    cy.get('button').contains('Login').click();
    cy.wait(6000);
    cy.url().should('equal', 'https://crm.matrackinc.com/dashboard.php');
  });
      it('should show the lead list view when the Leads item is clicked', () => {

        cy.get('#leads-side-nav').click();
        cy.get('#lead-list-view').should('have.css', 'display', 'flex');

        cy.get('#lead-tab-send-sms').should('exist').click({ force: true });
        cy.get("#sendSMS").should('be.visible').should('have.css','display', 'block')

        // Fill in SMS form
        cy.get('input[name="receipent_number"]').type('+11234567890',{force:true});
        cy.get('textarea[name="message"]').type('This is a test message');
      
        // Click send button
        cy.get('#sendSMS .btn.btn-primary').eq(0).click({force:true});

        // Click cancel button
        cy.get('#sendSMS').find('.btn.btn-secondary').click({force: true});

        cy.get('#createLeadButton').click();
        cy.get('#createLead').should('have.css', 'display', 'block');
        // Fill in the form fields
        cy.get('input[name="company"]').type('Test Companies', {force:true});
        cy.get('input[name="contact_name"]').type('John Doe');

        //click on import bulk leads button
        cy.get('#createLead .btn.btn-primary').eq(0).click()

        //modal opens
        cy.get('#importLeads').should('be.visible')

        //choose file button
        cy.get('#fileInput').click();

        // Upload file - fixed to target single element
        cy.get('input[type="file"]')
          .first()  // Ensure we're only selecting one element
          .selectFile('cypress/fixtures/new_test_file.csv', { force: true });

        cy.get('#importLeads .btn.btn-primary').click()

        cy.get('#importLeads .btn.btn-secondary').click()
        
        //click on create button on new lead modal
        cy.get('#createLeadButton-create').click();
        
        cy.get('#lead-form-view').should('be.visible')

        cy.get('#last_name').click().type('testingAuto')

        // cy.get('#phone').click().type('+918999235467')

        cy.get('#email').click().type('test@gmail.com')

        cy.get('#save-contact-button').click()

        cy.get('#backToLeds').click()
        cy.wait(2000)

        //check all checkboxes
        cy.get('.select-all-leads-checkbox').check();

        //code for cold call mail and message       

    //   // Modified Add to Workflow section
    //   cy.get('#activeLeadDropdown')
    //     .should('be.visible')
    //     .click();

    //   // Try multiple approaches to click the Add to Workflow link
    //   cy.get('a[id="add-to-workflow-button"]')
    //     .should('exist')
    //     .then($el => {
    //       if ($el.is(':visible')) {
    //         cy.wrap($el).click({ force: true });
    //       } else {
    //         // Alternative approach using contains
    //         cy.contains('a', 'Add to Workflow').click({ force: true });
    //       }
    //     });



    // // Fill the workflow form
    // cy.get('#workflow-sendto')
    //   .should('be.visible')
    //   .select('All Contacts');

    // cy.get('#workflowSelect')
    //   .should('be.visible')
    //   .select('test_annie');

    // // Click Add to Workflow button in modal
    // cy.get('button')
    //   .contains('Add to Workflow')
    //   .click({ force: true });



    // // Continue with scheduled communications check
    // cy.get('#scheduled-communications-side-nav')
    //   .should('be.visible')
    //   .click();

    // cy.get('#scheduled-communications-container')
    //   .should('be.visible')
    //   .should('have.css', 'display', 'flex');

      });

  it('should be able to click on the first lead name', () => {
    let companyName; // Variable to store company name

    cy.get('#leads-side-nav').click();
    cy.wait(2000); // Wait for table to load
    
    // Click on the first lead name using the correct class
    cy.get('td.lead-name.all-leads-row')
      .first()
      .click({force: true});

    //the new window appears for editing
    cy.get('#lead-form-view').should('be.visible')

    // // Alternative 1: Using jQuery method
    // cy.get('#company-name').then(($el) => {
    //   companyName = $el.text().trim();
    //   cy.log("Company name (method 1): " + companyName);
    // });

    // // Alternative 2: Using find on the parent
    // cy.get('#lead-form-view')
    //   .find('#company-name')
    //   .invoke('text')
    //   .then((text) => {
    //     // Double-check if first method didn't work
    //     if (!companyName) {
    //       companyName = text.trim();
    //     }
    //     cy.log("Company name (method 2): " + companyName);
    //   });

    // // Alternative 3: Using document query
    // cy.document().then((doc) => {
    //   companyName = doc.querySelector('#company-name').textContent.trim();
    //   cy.log("Company name (method 3): " + companyName);
    // });

    //click on assigned users
    cy.get('.icon.lead-section-option').eq(3).click();

    // Wait for the select dropdown to be visible and select Test DB
    // cy.get('#assigned-user-select')
    //   .should('be.visible')
    //   .select('Test DB'); // Value for Test DB option

    // Click Add button to confirm selection
    // cy.get('.action-buttons button').contains('Add').click();

    cy.get('.button-save').eq(3).click()

    //click on add to workflow
    cy.get('#activeLeadDropdown').click()
    cy.get('#add-to-workflow-button').click()

        // Wait and verify the modal appears
    cy.get('#addLeadToWorkflowModal')
    .should('exist')
    .and('be.visible')
    .should('have.css', 'display', 'block');

    cy.get('#addLeadToWorkflowModal .btn.btn-primary').click()

    // Verify modal closes
    cy.get('#addLeadToWorkflowModal')
    .should('not.be.visible');

    cy.wait(2000);

    //click on scheduled communications
    cy.get('#scheduled-communications-side-nav').click()
    
    //click on refresh button
    cy.get('#schedCommRefreshBtn').click()

    // Wait for table to refresh and verify using stored company name
    cy.wait(2000); // Wait for refresh

    // cy.get('#scheduled-communications-table')
    // cy.get('.sched-comm-table')
    //   .should('be.visible')
    //   .then(() => {
    //     // Use the stored company name to verify
    //     cy.contains('td', companyName).should('exist');
    //   });

    // Additional verification that it's in the correct workflow
    // cy.contains('tr', companyName)
    //   .should('be.visible')
    //   .within(() => {
    //     cy.contains('test_annie').should('exist'); // Verify workflow name
    //     cy.contains('Active').should('exist'); // Verify status
    //   });
  });

  it('filter button',()=>{
    cy.get('#leads-side-nav').click();
    cy.get('#lead-list-view').should('have.css', 'display', 'flex');

    // Click on filter button
    cy.get('.lead-filter-button').click();
    
    // Wait for filter box to be visible
    cy.get('.lead-filter-box')
      .should('be.visible');

    // Click on Assigned User section
    cy.get('.lead-filter-option')
      .contains('Assigned User')
      .click();

    // Click on test user-1 in the dropdown
    cy.get('.lead-filter-checkbox')
      .contains('test user-1')
      .click();

    // Click Apply Filters button
    cy.get('.lead-filter-save')
      .click();

    // Wait for table to update
    cy.wait(1000);
    
    // Verify that table has at least one row
    // cy.get('tr.lead-name.all-leads-row')  // Using the correct row class
    //   .should('have.length.at.least', 1)
    //   .then(($rows) => {
    //     cy.log(`Found ${$rows.length} rows in the filtered table`);
    //   });

    // Verify the assigned user column contains test-1 (primary)
    // cy.get('tr.lead-name.all-leads-row')
    //   .first()
    //   .find('td')
    //   .last()  // Assigned User is the last column
    //   .should('contain', 'test-1 (primary)');
  });
})
