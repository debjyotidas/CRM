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
        
        // Click on geofence
        cy.get('#aGeofence')
          .should('be.visible')
          .click();
        
        // Click view/edit geofence
        cy.get('#aGeofenceCreate')
          .should('be.visible')
          .click();
        
        // Wait for modal to be visible
        cy.get('#divCreateGeofence')
          .should('be.visible');

          // Type in the address
        cy.get('#txtCreateGeofenceAddress')
        .should('be.visible')
        .clear()
        .type('san ramon');

        // Wait for autocomplete dropdown and select San Ramon option
        cy.get('.ui-menu-item')
        .contains('San Ramon, CA, United States')
        .should('be.visible')
        .click();

        // Verify the selected address is populated
        cy.get('#txtCreateGeofenceAddress')
        .should('have.value', 'San Ramon, CA, United States');

        cy.get('#txtCreatefenceRadius')
        .should('be.visible')
        .clear()
        .type('500');
        
        // Click the Submit button
        cy.get('#btnCreateGeofence')
          .should('be.visible')
          .click();
        
        // Wait before clicking save
        cy.wait(6000);

        // Using the class selector
        cy.get('input.geoname.geoname-undefined')
        .should('be.visible')
        .clear()
        .click()
        .type('testingAutomated');

      // Updated save button selectors and click handling
      cy.get('[title="save Geofence"]')
        .should('be.visible')
        .click({ force: true });
          
        
        // Verify save confirmation modal
        cy.get('#saveConfirmation')
          .should('be.visible');
        
        // Click confirm button in save modal
        cy.get('#saveConfirmation .btn-confirm')
          .click();
        
        // Verify success alert
        cy.get('.alert.alert-success')
          .should('be.visible')
          .should('contain', 'Geofence created Successfully');
        // Final wait to ensure everything is complete
        cy.wait(2000);
      });
    });
  });