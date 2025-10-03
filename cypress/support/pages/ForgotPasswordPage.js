class ForgotPasswordPage {
  navigate() {
    cy.contains('Forgot your password?').click();
  }

  submitValid(username) {
    cy.get('input[name="username"]').type(username);
    cy.get('button[type="submit"]').click();
  }

  submitEmpty() {
    cy.get('button[type="submit"]').click();
  }

  cancel() {
    cy.contains('Cancel').click();
  }
}

export default new ForgotPasswordPage();