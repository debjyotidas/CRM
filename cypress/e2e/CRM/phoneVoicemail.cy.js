describe('Mailbox Composition', () => {
    beforeEach(() => {
      cy.visit('https://crm.matrackinc.com/login.php');
      cy.get('#email').type('dev.trivan22@gmail.com');
      cy.get('#password').type('11111111');
      cy.get('button').contains('Login').click();
      cy.wait(6000);
      cy.url().should('equal', 'https://crm.matrackinc.com/dashboard.php');
      });
  
    it('should display phone & voicemail', () => {
      
      cy.get('#settings-link').click();
      cy.get('#settings-container').should('have.css', 'display', 'flex');
      cy.get('#settings-phone-nav').click();
      
      cy.get('.settings-tab').eq(2).should('have.class', 'active');
      cy.get('.settings-tab').eq(2).should('have.css', 'display', 'block');

        // Initial check - section should be hidden
        // cy.get('#settings-startRecord')
        // .should('have.css', 'display', 'none');

        // Click on Custom Fields link/button to show section
        cy.get('#settings-edit-btn')
        .click({force:true});

        // Verify section is now visible
        cy.get('.settings-startRecord').eq(0)
        .should('be.visible')
        // .and('not.have.css', 'display', 'none');

        cy.get('.settings-startRecord').eq(0).click()

        // Verify button changed to Stop Recording
        cy.get('.settings-stopRecord')
        .should('be.visible')
        .should('contain', 'Stop Recording');

        // Verify timer is visible and running
        cy.get('.settings-recording-timer')
        .should('be.visible')
        .should('not.have.text', '00:00');

        // Wait for a few seconds of recording
        cy.wait(4000);

        // Click stop recording
        cy.get('.settings-stopRecord').click();

        // Intercept and verify API call
        cy.intercept('POST', '**/get_voicemail.php?action=add').as('saveVoicemail');

        cy.wait('@saveVoicemail').then((interception) => {
        expect(interception.response.statusCode).to.equal(200);
        expect(interception.request.method).to.equal('POST');
        expect(interception.request.headers).to.include({
            'Content-Type': 'application/json'
        });
        });

        // Verify recording button returned to initial state
        cy.get('.settings-startRecord')
        .should('be.visible')
        .should('contain', 'Start Recording');

        // Verify timer reset
        cy.get('.settings-recording-timer')
        .should('have.text', '00:00');

            
    });
  });