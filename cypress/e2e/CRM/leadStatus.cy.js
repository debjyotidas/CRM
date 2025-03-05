describe('Mailbox Composition', () => {
    beforeEach(() => {
        cy.visit('https://crm5.matrackinc.com/crm/login.php');
        cy.get('#email').type('dev.trivan22@gmail.com');
        cy.get('#password').type('12341234');
        cy.get('button').contains('Login').click();
        cy.wait(10000);
        cy.url().should('equal', 'https://crm5.matrackinc.com/crm/dashboard.php');
    });

    it('should show the lead status view when the lead status item is clicked', () => {
        // Navigate to settings
        cy.get('#settings-link').click();
        cy.get('#settings-container').should('be.visible');
        
        // Click into lead status
        cy.get('#settings-status-nav').click();
        cy.get('#settings-content').should('be.visible');

        // Add new status
        cy.get('#settings-edit-btn').click({force: true});
        
        cy.get('#settings-status-name')
            .invoke('removeAttr', 'disabled')
            .type('New Status Name', { force: true });

        cy.get('#settings-status-order')
            .invoke('removeAttr', 'disabled')
            .type('5', { force: true });

        cy.get('#settings-status-description')
            .invoke('removeAttr', 'disabled')
            .type('testing123', { force: true });

        cy.get('#settings-status-add').click();

        // Wait for table update
        cy.wait(2000);

        // First verify the table structure exists
        cy.get('.settings-status-table')
            .should('exist')
            .within(() => {
                // Check if tbody exists
                cy.get('tbody')
                    .should('exist')
                    .find('tr')
                    .should('have.length.at.least', 1);
            });

        // Then verify the newly added row
        cy.get('.settings-status-table tbody tr')
            .each(($tr) => {
                // Get all td elements in this row
                cy.wrap($tr)
                    .find('td')
                    .then(($tds) => {
                        // If this is our new row
                        if ($tds.eq(0).text().includes('New Status Name')) {
                            // Check name
                            expect($tds.eq(0).text().trim()).to.include('New Status Name');
                            // Check description
                            expect($tds.eq(1).text().trim()).to.include('testing123');
                            // Check order
                            expect($tds.eq(2).text().trim()).to.include('5');
                            // Check buttons
                            cy.wrap($tr)
                                .find('button')
                                .then($buttons => {
                                    expect($buttons.length).to.be.at.least(2);
                                    const buttonTexts = $buttons.map((_, el) => el.textContent).get();
                                    expect(buttonTexts).to.include('Edit');
                                    expect(buttonTexts).to.include('Delete');
                                });
                        }
                    });
            });
    });
});