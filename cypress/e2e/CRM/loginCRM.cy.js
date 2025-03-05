describe('Login Test', () => {
  it('Logs in successfully', () => {
    cy.visit('https://crm5.matrackinc.com/crm/login.php');

    cy.get('#email').type('dev.trivan22@gmail.com');
    cy.get('#password').type('12341234');
    cy.get('button').contains('Login').click();

    // Wait for the dashboard to be fully loaded
    cy.wait(6000); // Add a small wait for the dashboard to stabilize

    cy.url().should('equal', 'https://crm5.matrackinc.com/crm/dashboard.php');
    
  });
});