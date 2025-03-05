describe('Fleet Login Tests', () => {
  beforeEach(() => {
    // Clear cookies and localStorage before each test
    cy.clearCookies();
    cy.clearLocalStorage();
    // Set longer timeout for the entire test
    Cypress.config('defaultCommandTimeout', 10000);
    Cypress.config('pageLoadTimeout', 100000);
  });

  it('should redirect to fleet demo page with demo credentials', () => {
    // Visit login page
    cy.visit('https://gpsandfleet.io/gpsandfleet/client_login.php');

    // Wait for and type in username
    cy.get('input[name="form-username"]')
      .should('be.visible')
      .clear()
      .type('fleetdemo');

    // Type in password
    cy.get('input[type="password"]')
      .should('be.visible')
      .clear()
      .type('12345');

    // Click submit button using multiple possible selectors
    cy.get('input[type="submit"], button[type="submit"], .submit, #Submit')
      .should('be.visible')
      .click();

    // Handle the redirect to the new domain
    cy.origin('https://www.gpsandfleet3.net', () => {
      // Wait for page load
      cy.wait(10000);

      // Verify we're on the correct page
      cy.url().should('include', '/gpsandfleet/client/fleetdemo/maps/index2.php');

      // Click on Settings
      cy.get('#aSettings')
        .should('be.visible')
        .click();

      // Click on view edit user
      cy.get('#aViewEditUserPermission')
        .should('be.visible')
        .click();

      // Add a small wait to allow modal animation to complete
      cy.wait(1000);

      // Wait for modal to be fully visible
      cy.get('#divUserPermission')
        .should('have.class', 'in')
        .should('have.css', 'display', 'block');

      // Select the Add User radio button
      cy.get('input[type="radio"][value="add"]')
        .should('be.visible')
        .check({ force: true });

        // Now interact with the username field
      // Wait for it to be in the active modal
      cy.get('.modal.fade.in #txtAccUserId')
      .should('exist')
      .should('be.visible')
      .clear()
      .type('testingPoonamAutomated7');

      cy.get('.modal.fade.in #txtUserEmail')
      .should('exist')
      .should('be.visible')
      .clear()
      .type('testingPoonamAutomated7@gmail.com');

      cy.get('.modal.fade.in #txtUserPwd')
      .should('exist')
      .should('be.visible')
      .clear()
      .type('testing@123456');
      
      // The rest of your permissions checks
      const permissions = ['subset', 'alerts', 'track', 'report', 'assign_driver_for_subuser'];
      permissions.forEach(permission => {
        cy.get(`input[type="checkbox"][value="${permission}"]`)
          .should('be.visible')
          .check({ force: true });
      });

      // Click create user button
      cy.get('#btnCreateUser')
        .should('be.visible')
        .click();

      // Handle the SweetAlert2 confirmation modal
      cy.get('.swal2-confirm.swal2-styled')
        .should('be.visible')
        .should('have.text', 'Yes')
        .click();

      // Handle radio buttons with proper waiting
      cy.get('input[type="radio"][name="actionType"][value="edit"]')
        .should('be.visible')
        .check({ force: true });

        cy.get('#tblViewPermission')
        .should('be.visible');

        // Click the Edit link for the first user (using the table row structure shown in the images)
        cy.get('#tblViewPermission tbody tr:first-child')
          .find('a[id^="aTblEditUser"]')
          .click();

        // Wait for the edit modal to appear
        cy.get('#divTblEditPermission')
          .should('have.class', 'modal fade in')
          .should('have.css', 'display', 'block');

        // Interact with the Settings Permission dropdown
        cy.get('#selSettings')
          .select('No');

          // Interact with the Settings Permission dropdown
        cy.get('#selReport')
        .select('No');

          // Click the Submit button in the modal
        cy.get('#divTblEditPermission .btn.btn-default.submit').eq(0)
        .should('be.visible')
        .click();

        // Verify the modal is closed
        cy.get('#divTblEditPermission')
        .should('not.have.class', 'in');

      // Optional: Verify the changes in the table
      cy.get('#tblViewPermission tbody tr:first-child')
        .should('contain', 'no') // Settings column
        .should('contain', 'no') // Reports column
        .should('contain', 'yes') // Track column
        .should('contain', 'yes'); // Specific Devices column

        // Click on Settings
      cy.get('#aSettings')
      .should('be.visible')
      .click();

      // Click on view edit user
      cy.get('#aViewEditUserPermission')
        .should('be.visible')
        .click();

      // Add a small wait to allow modal animation to complete
      cy.wait(1000);

      // Wait for modal to be fully visible
      cy.get('#divUserPermission')
        .should('have.class', 'in')
        .should('have.css', 'display', 'block');

        // Handle radio buttons with proper waiting
      cy.get('input[type="radio"][name="actionType"][value="editSubgroup"]')
      .should('be.visible')
      .check({ force: true });

      // cy.get('.editSubUser')
      // .should('be.visible');
      cy.get('div.editSubUser select.form-control').eq(1).select('ttde',{ force: true });

      // First find and check the checkbox next to Sales Car1 in the unassigned table
      cy.get('#tblViewSubUserUnassigned')
      .contains('td', 'Sales Car1')
      .parent('tr')
      .find('input.selDriver[type="checkbox"]')
      .check({ force: true });
      cy.wait(2000);

      cy.get('#tblViewSubUser')
      .contains('td', 'Sales Car1')
      .parent('tr')
      .find('input.selDriver[type="checkbox"]')
      .should('be.checked');

      // cy.get('input[type="radio"][name="icon"][value="editSubgroup"]')
      //   .should('be.visible')
      //   .check({ force: true });
    });
  });
});