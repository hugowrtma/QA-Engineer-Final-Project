class LoginPage {
  visit() {
    cy.visit('https://opensource-demo.orangehrmlive.com/');
  }

  elements = {
    usernameInput: () => cy.get('input[name="username"]'),
    passwordInput: () => cy.get('input[name="password"]'),
    loginButton: () => cy.get('button[type="submit"]'),
    errorMessage: () => cy.get('.oxd-alert-content-text'),
  };

  login(username, password) {
    if (username) this.elements.usernameInput().type(username);
    if (password) this.elements.passwordInput().type(password);
    this.elements.loginButton().click();
  }
}

export default new LoginPage();