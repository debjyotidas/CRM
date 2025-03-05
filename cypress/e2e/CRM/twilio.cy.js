describe('Mailbox Composition', () => {
  beforeEach(() => {
    cy.visit('https://crm5.matrackinc.com/crm/login.php');
    cy.get('#email').type('dev.trivan22@gmail.com');
    cy.get('#password').type('12341234');
    cy.get('button').contains('Login').click();
    cy.wait(10000);
    cy.url().should('equal', 'https://crm5.matrackinc.com/crm/dashboard.php');
  });

  it('should filter Twilio billing data and verify API response', () => {
    // Set up API intercept before any actions
    cy.intercept('POST', '**/crm/api/twilio_billing_api.php').as('billingAPI');

    cy.get('#settings-link').click();
    cy.get('#settings-container').should('have.css', 'display', 'flex');
    cy.get('#settings-billing-nav').click();
    
    cy.get('.settings-tab').eq(4).should('have.class', 'active');
    cy.get('.settings-tab').eq(4).should('have.css', 'display', 'block');

    // Click on the start date input
    cy.get('#twilio-billing-start-date').click();
    
    // Select date (e.g., 8th of the current month)
    // cy.get('.datepicker-days').find('td').not('.disabled').contains('8').click();

    cy.get('#twilio-billing-quick-dates').click();
    cy.get('.dropdown-item.tb-quick-dates-option[data-days="7"]').click();
    cy.get('#twilio-billing-apply-filters').click();

    cy.wait('@billingAPI', { timeout: 10000 }).then((interception) => {
      expect(interception.response.statusCode).to.equal(200);
      expect(interception.response.headers['content-type']).to.include('application/json');
    });
  });
});