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

    it('show voice bot page', () => {
        cy.get('#voice-bots-side-nav').click();

        // Verify the voice page
        cy.get('#voice-bots-container').should('have.css', 'display', 'flex');

        cy.get('#create-voice-bot-button').click()
        cy.get('#botModal').should('be.visible').should('have.css','display', 'block')

        // Update the email and full name
        cy.get('input[type="text"][id="botName"]')
        .should('be.visible')
        .clear()
        .type('testingBot');

        cy.get('#voiceBotPhoneNumbers').select('+12317742877');
        cy.get('#voiceProvider').select('ElevenLabs');
        cy.get('#designFlowBtn').click()
        
        cy.get('#flowDesignerModal').should('be.visible').should('have.css','display', 'block')
        
        // Click Add Block button
        cy.get('#addBlockBtn').click()

        // Verify the block-container is visible
        cy.get('.block-container')
            .should('be.visible')
            .should('have.css', 'display', 'block') // Based on the CSS in your image
            
        // Additional verification for the Select Dialog form
        cy.get('[placeholder="Enter block text"]').should('be.visible')
        
        // Verify the Add Block and Add Function buttons are present
        cy.contains('button', 'Add Block').should('be.visible')
        cy.contains('button', 'Add Function').should('be.visible')

        //Click Add Function button
        // cy.get('#addFunctionBtn').click()

        // // Verify the block-container is visible
        // cy.get('.block-container')
        // .should('be.visible')
        // .should('have.css', 'display', 'block') // Based on the CSS in your image
    
        //click on save flow
        cy.get('#saveFlowBtn').click()
        cy.wait(2000)
        //Click on deploy button
        // cy.get('#deployBotBtn').click({force:true})
        //Click on save bot button
        cy.get('#saveBotBtn').click()
    })

})