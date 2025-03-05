describe('Logout Test', () => {
    beforeEach(() => {
      // Visit the application URL before each test
      cy.visit('https://crm5.matrackinc.com/crm/login.php');

      cy.get('#email').type('dev.trivan22@gmail.com');
      cy.get('#password').type('12341234');
      cy.get('button').contains('Login').click();
  
      // Wait for the dashboard to be fully loaded
      cy.wait(6000); // Add a small wait for the dashboard to stabilize
  
      cy.url().should('equal', 'https://crm5.matrackinc.com/crm/dashboard.php');
    })

    it('show voice call page', () => {
        cy.get('#voice-side-nav').click();

        // Verify the voice page
        cy.get('#voice-list-view').should('have.css', 'display', 'flex');

        // Click on the lead name (Test company)
        cy.get('.lead-name')
          .contains('Test company')
          .click({ force: true });
    
        // Verify the leads container becomes visible and has flex display
        cy.get('#leads-container')
          .should('have.css', 'display', 'flex');
          
        cy.get('#edit-lead-contact').click();

        cy.get('#first_name').click().type('testing')
        
        cy.get('#email').click().focused()
        .clear().type('trivandrumsieva222@gmail.com')

        cy.get('#save-contact-button').click();

        // Intercept the API call
        cy.intercept('POST', '**/api.php').as('makeCall');
        
        // Click the make outgoing call button
        cy.get('#make-outgoing-call-lead-contact').click();
        
        // Wait for the API call and verify the response
        cy.wait('@makeCall').then((interception) => {
            // Verify status code is 200
            expect(interception.response.statusCode).to.equal(200);
        });
        
        // Click the end outgoing call button
        cy.get('#dialer-io-end').click();

        cy.get('#lead-activities-add-note').click();
        cy.wait(2000); // Wait for editor to initialize

        // Wait and verify the editor is properly loaded
        cy.get('.ck-editor__editable').eq(2)
            .should('exist')
            .and('be.visible')
            .wait(2000)  // Give more time for CKEditor to initialize
            .then($editor => {
                cy.wrap($editor)
                    .click({ force: true })
                    .focused()
                    .clear()
            });

        cy.wait(1000);

        // Click the Save Note button
        cy.get('#lead-activities-save-note').click();
          
    })

})