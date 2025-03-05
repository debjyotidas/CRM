describe('Smart Views Functionality', () => {
    beforeEach(() => {
      cy.visit('https://crm5.matrackinc.com/crm/login.php');
      cy.get('#email').type('dev.trivan22@gmail.com');
      cy.get('#password').type('12341234');
      cy.get('button').contains('Login').click();
      cy.wait(10000);
      cy.url().should('equal', 'https://crm5.matrackinc.com/crm/dashboard.php');
    });
  
      it('should search for smart views and select testD', () => {
        // Click the search input field
        cy.get('#smart-view-search').click();
        
        // Type 'test' in the search field
        cy.get('input[placeholder="Search smart views..."]').type('test');

        const expectedItems = [
            'test email',
            'testD',
            'testWorkflow',
            'testing_2',
            'testing'
          ];
        
        // Verify that the smart views container is visible
        cy.get('#smart-views').should('be.visible');

        expectedItems.forEach(item => {
            cy.get('.smart-view-item')
              .contains(item)
              .should('be.visible');
          });
        
        // Find and click on the testD item
        cy.get('.smart-view-item')
          .contains('testD')
          .click();
        
        // Verify that testD view is displayed
        cy.get('#contacts-container')
          .contains('testD')
          .should('be.visible');

      });
  
  });