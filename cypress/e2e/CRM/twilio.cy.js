describe('Mailbox Composition', () => {
  beforeEach(() => {
    cy.visit('https://crm.matrackinc.com/login.php');
    cy.get('#email').type('dev.trivan22@gmail.com');
    cy.get('#password').type('11111111');
    cy.get('button').contains('Login').click();
    cy.wait(6000);
    cy.url().should('equal', 'https://crm.matrackinc.com/dashboard.php');
  });

  it('should filter Twilio billing data and verify API response', () => {
    // Set up API intercept before any actions
    cy.intercept('POST', '**/crm/api/twilio_billing_api.php').as('billingAPI');

    cy.get('#settings-link').click();
    cy.get('#settings-container').should('have.css', 'display', 'flex');

    // click on twilio
    cy.get('#settings-billing-nav').click();

    cy.get('.settings-nav-item').eq(4).should('have.class', 'active');
    cy.get('.settings-nav-item').eq(4).should('have.css', 'display', 'block');

    //twilio dashboard
    cy.get('#settings-content').should('be.visible').and('have.css','display','block');

    //view the table
    cy.get('.twilio-billing-card.mb-4').should('be.visible')

    cy.wait(25000)

    // Click on the start date input
    cy.get('#twilio-billing-date-filter').should('be.visible').click();
    cy.get('#twilio-billing-refresh').should('be.visible').click()
    
    // Select date (e.g., 8th of the current month)
    // cy.get('.datepicker-days').find('td').not('.disabled').contains('8').click();
    cy.get('#twilio-billing-user-table').should('be.visible')

    // cy.get('#twilio-billing-quick-dates').click();
    // cy.get('.dropdown-item.tb-quick-dates-option[data-days="7"]').click();
    // cy.get('#twilio-billing-apply-filters').click();

    cy.wait('@billingAPI', { timeout: 10000 }).then((interception) => {
      expect(interception.response.statusCode).to.equal(200);
      expect(interception.response.headers['content-type']).to.include('application/json');
    });
  });
});