describe('Mailbox Composition', () => {
    beforeEach(() => {
      cy.visit('https://crm5.matrackinc.com/crm/login.php');
      cy.get('#email').type('dev.trivan22@gmail.com');
      cy.get('#password').type('12341234');
      cy.get('button').contains('Login').click();
      cy.wait(6000);
      cy.url().should('equal', 'https://crm5.matrackinc.com/crm/dashboard.php');
    });
  
    it('should open the compose modal when the Compose button is clicked', () => {
      cy.get('#mailbox-side-nav').click();
      cy.get('#mailbox-container').should('be.visible');
      cy.get('#mailbox-compose').click();
      cy.get('.modal').should('be.visible');

      cy.get('#send-mail-to').type('dev.trivan22@gmail.com',{force:true}).type('{enter}');
      cy.get('#send-mail-subject').type('Test Subject');
      cy.get('.ck-restricted-editing_mode_standard').eq(0).click({force: true});

      // cy.get('.ck.ck-editor__editable.ck-rounded-corners.ck-editor__editable_inline.ck-focused')
      // .should('be.visible')
      // .should('have.class', 'ck-restricted-editing_mode_standard')
      // .should('have.class', 'ck-content')
      // .should('have.class', 'ck-editor__editable')
      // .should('have.class', 'ck-rounded-corners')
      // .should('have.class', 'ck-editor__editable_inline')
      // .should('have.class', 'ck-focused')
      // .type('testing');

      // cy.get('#send-mail-button').click()
    });

    it('should mark the Sent folder as active when clicked', () => {
      cy.get('#mailbox-side-nav').click();
      cy.get('#mailbox-container').should('be.visible');
      cy.get('.mailbox-folder').first().should('have.class', 'active');
      cy.get('.mailbox-folder').contains('Sent').click();
      cy.get('.mailbox-folder.active').should('contain', 'Sent');
      cy.wait(5000); // Wait for 5 seconds after clicking "Sent"
      
      cy.get('.mailbox-list > div').should('have.length.gt', 0);

      cy.get('.mailbox-list > div').then(($items) => {
        const itemCount = $items.length;
        cy.get('#mailbox-sent-count').then(($countSpan) => {
          const spanText = $countSpan.text();
          cy.log(`Mailbox items: ${itemCount}, Span text: ${spanText}`);
          expect(spanText).to.equal(itemCount.toString());
        });
      });
    });
  
  });