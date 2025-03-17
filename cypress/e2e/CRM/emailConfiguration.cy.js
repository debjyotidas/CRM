describe('Mailbox Composition', () => {
    beforeEach(() => {
        cy.visit('https://crm.matrackinc.com/login.php');
        cy.get('#email').type('dev.trivan22@gmail.com');
        cy.get('#password').type('11111111');
        cy.get('button').contains('Login').click();
        cy.wait(6000);
        cy.url().should('equal', 'https://crm.matrackinc.com/dashboard.php');
    });

    it('should add a new email conf', () => {
        // Navigate to settings
        cy.get('#settings-link').click();
        cy.get('#settings-container').should('be.visible');
        
        // Click into lead status
        cy.get('#settings-general-nav').click();
        cy.get('#settings-content').should('be.visible');
    
        // click on new configuration
        cy.get('#new-email-config-btn').click();
        
        cy.get('#settings-email-address')
            .clear()
            .type('testAutomated@gmail.com', { force: true });
    
        cy.get('#settings-display-name')
            .clear()
            .type('testAutomated`', { force: true });
    
        cy.get('#settings-incoming-host')
            .clear()
            .type('imap.gmail.com', { force: true });

        cy.get('#settings-incoming-port')
        .clear()
        .type('993', { force: true });
        
        cy.get('#settings-protocol')
        .select('IMAP');
    
        cy.get('#settings-email-username')
            .clear()
            .type('testAutomated@gmail.com', { force: true });
             
        cy.get('#settings-password')
        .clear()
        .type('lzxnhvvpfvsrix12', { force: true });

        
        cy.get('#settings-folder-path')
        .clear()
        .type('INBOX', { force: true });

        // Check the "Use SSL/TLS" checkbox if not already checked
        cy.get('#settings-use-ssl').then($checkbox => {
            if (!$checkbox.is(':checked')) {
            cy.get('#settings-use-ssl').check();
            }
        });
        
        // Check the "Set as Default Email" checkbox if not already checked
        cy.get('#settings-is-default').then($checkbox => {
            if (!$checkbox.is(':checked')) {
            cy.get('#settings-is-default').check();
            }
        });
    
        cy.get('#save-email-config').click();
    
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

            // Find the row with "New Status Name" and click its Edit button
            cy.get('.settings-status-table tbody tr')
            .contains('td', 'New Status Name')
            .parent('tr')
            .within(() => {
                cy.contains('button', 'Edit').click();
            });

        // Wait for the edit mode to be activated
        cy.wait(1000);

        // Find the row that is now in edit mode (has the class settings-status-edit-mode)
        cy.get('tr[class*="settings-status-edit-mode"]').within(() => {
            // Edit the name field
            cy.get('input[type="text"][value*="New Status Name"]')
                .clear()
                .type('Updated Status Name');
            
            // Edit the description field
            cy.get('input[type="text"][value*="testing123"]')
                .clear()
                .type('updated description');
            
            // Edit the order field
            cy.get('input[type="number"][value="5"]')
                .clear()
                .type('6');
            
            // Click the Save button
            cy.contains('button', 'Save').click();
        });

        // Verify the changes were saved
        cy.wait(2000); // Wait for the save operation to complete

        // Verify the updated values in the table
        cy.get('.settings-status-table tbody tr')
            .contains('td', 'Updated Status Name')
            .parent('tr')
            .within(() => {
                cy.get('td').eq(0).should('contain', 'Updated Status Name');
                cy.get('td').eq(1).should('contain', 'updated description');
                cy.get('td').eq(2).should('contain', '6');
            });
    });

    it('should toggle between Activate and Deactivate states', () => {
        // Navigate to settings
        cy.get('#settings-link').click();
        cy.get('#settings-container').should('be.visible');
        
        // Click into lead status
        cy.get('#settings-status-nav').click();
        cy.get('#settings-content').should('be.visible');
        
        // Find the last row in the table (likely to have Deactivate button)
        cy.get('.settings-status-table tbody tr:last').within(() => {
            // Check if this row has Deactivate button
            cy.get('button').then($buttons => {
                const hasDeactivate = Array.from($buttons).some(btn => btn.textContent.includes('Deactivate'));
                const hasActivate = Array.from($buttons).some(btn => btn.textContent.includes('Activate'));

                if(hasDeactivate){
                    // Click Deactivate button
                    cy.contains('button', 'Deactivate').click();
                    
                    // Verify row now has Activate button
                    cy.contains('button', 'Activate').should('exist');
                    
                    // Click Activate button (with force true since it might be hidden)
                    cy.contains('button', 'Activate').click({ force: true });
                    
                    // Verify back to Deactivate
                    cy.contains('button', 'Deactivate').should('exist');
                }
                 else if(hasActivate) {
                    // Click Deactivate button
                    cy.contains('button', 'Activate').click();
                    
                    // Verify row now has Activate button
                    cy.contains('button', 'Deactivate').should('exist');
                    
                    // Click Activate button (with force true since it might be hidden)
                    cy.contains('button', 'Deactivate').click({ force: true });
                    
                    // Verify back to Deactivate
                    cy.contains('button', 'Activate').should('exist');
                }
            });
        });
    });
});