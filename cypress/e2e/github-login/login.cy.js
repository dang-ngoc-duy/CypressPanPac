/// <reference types="cypress" />

context('Login - Happy case', () => {
    beforeEach(() => {
      cy.visit('https://github.com/login');
    });
  
    it('should fill login form and redirect to homepage', () => {
     
      // Fill the username
      cy.get('#login_field')
        .type('softwareit24@gmail.com')
        .should('have.value', 'softwareit24@gmail.com');
  
      // Fill the password
      cy.get('#password')
        .type('@xuannghi123@')
        .should('have.value', '@xuannghi123@')
  
      // Locate and submit the form
      cy.get('form[action="/session"]').submit();
      
      // Verify the app redirected you to the homepage
      cy.location('pathname', { timeout: 10000 }).should('eq', '/');
      
      // Verify the page title is "GitHub"
      cy.title().should('eq', 'GitHub');
    });  
});

context('Login - Have flash error when wrong username', () => {
    beforeEach(() => {
      cy.visit('https://github.com/login');
    });
  
    it('should fill login form and redirect to homepage', () => {
     
      // Fill the username
      cy.get('#login_field')
        .type('acbde');
  
      // Fill the password
      cy.get('#password')
        .type('@xuannghi123@');
  
      // Locate and submit the form
      cy.get('form[action="/session"]').submit();

      // Should have warning message - take a screenshot
      cy.get('[id="js-flash-container"] > div.flash-error')
        .should('be.visible')
        .screenshot()
    });  
});