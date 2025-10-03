import DashboardPage from '../support/pages/DashboardPage';
import ForgotPasswordPage from '../support/pages/ForgotPasswordPage';
import LoginPage from '../support/pages/LoginPage';

const userData = {
  valid: { username: 'Admin', password: 'admin123' },
  invalid: { username: 'wrongUser', password: 'wrongPass' },
};

Cypress.on('uncaught:exception', () => false);

describe('OrangeHRM Automation with POM + Intercept', () => {
  beforeEach(() => {
    LoginPage.visit();
  });

  // 🧩 LOGIN TESTS
  it('TC_001 - Intercept login request with valid credentials', () => {
    cy.intercept('POST', '**/auth/validate').as('loginRequest');
    LoginPage.login(userData.valid.username, userData.valid.password);
    cy.wait('@loginRequest').its('response.statusCode').should('be.oneOf', [200, 302]);
    cy.url().should('include', '/dashboard');
  });

  it('TC_002 - Intercept login with invalid credentials', () => {
    cy.intercept('POST', '**/auth/validate').as('invalidLogin');
    LoginPage.login(userData.invalid.username, userData.invalid.password);
    cy.wait('@invalidLogin').its('response.statusCode').should('be.oneOf', [200, 302]);
    LoginPage.elements.errorMessage().should('be.visible');
  });

  it('TC_003 - Verify login page loaded', () => {
    cy.intercept('GET', '**/core/i18n/messages').as('messages');
    cy.visit('https://opensource-demo.orangehrmlive.com/');
    cy.wait('@messages', { timeout: 10000 });
    cy.title().should('include', 'OrangeHRM');
  });

  it('TC_004 - Login with missing username', () => {
    cy.intercept('POST', '**/auth/validate').as('missingUser');
    LoginPage.login('', userData.valid.password);
    cy.get('.oxd-input-field-error-message').should('be.visible');
  });

  it('TC_005 - Login with missing password', () => {
    cy.intercept('POST', '**/auth/validate').as('missingPass');
    LoginPage.login(userData.valid.username, '');
    cy.get('.oxd-input-field-error-message').should('be.visible');
  });

  // 🔐 FORGOT PASSWORD TESTS
  it('TC_006 - Intercept navigation to Forgot Password page', () => {
    cy.intercept('GET', '**/requestPasswordResetCode').as('forgotPage');
    ForgotPasswordPage.navigate();
    cy.wait('@forgotPage').its('response.statusCode').should('eq', 200);
  });

  it('TC_007 - Submit valid username for reset', () => {
    ForgotPasswordPage.navigate();
    cy.intercept('GET', '**/sendPasswordReset').as('resetPage');
    ForgotPasswordPage.submitValid('Admin');
    cy.wait('@resetPage');
    cy.url().should('include', '/sendPasswordReset');
  });

  it('TC_008 - Submit empty username on forgot password', () => {
    ForgotPasswordPage.navigate();
    cy.get('button[type="submit"]').click();
    cy.get('.oxd-input-field-error-message', { timeout: 5000 }).should('be.visible');
  });

  it('TC_009 - Cancel forgot password form', () => {
    ForgotPasswordPage.navigate();
    ForgotPasswordPage.cancel();
    cy.url().should('include', '/auth/login');
  });

  // 🧭 DASHBOARD BASIC TESTS (pengganti Directory)
  it('TC_010 - Intercept Dashboard load data requests', () => {
    cy.intercept('GET', '**/dashboard/employees/**').as('dashAPIs');
    LoginPage.login(userData.valid.username, userData.valid.password);
    cy.wait('@dashAPIs', { timeout: 10000 });
    cy.url().should('include', '/dashboard');
  });

  it('TC_011 - Verify user profile dropdown visible after login', () => {
    cy.intercept('GET', '**/api/v2/dashboard/employees/**').as('dashboardLoad');
    LoginPage.login(userData.valid.username, userData.valid.password);
    cy.wait('@dashboardLoad', { timeout: 15000 })
      .its('response.statusCode')
      .should('eq', 200);
    cy.get('.oxd-userdropdown-tab', { timeout: 10000 })
      .should('be.visible');
  });

  it('TC_012 - Intercept dashboard shortcut cards load', () => {
    cy.intercept('GET', '**/dashboard/shortcuts').as('shortcutCards');
    LoginPage.login(userData.valid.username, userData.valid.password);
    cy.wait('@shortcutCards', { timeout: 10000 });
    cy.get('.oxd-icon-button').should('have.length.greaterThan', 0);
  });

  // 🚪 LOGOUT TESTS
  it('TC_013 - Intercept logout process', () => {
    cy.intercept('POST', '**/events/push').as('logoutEvent');
    LoginPage.login(userData.valid.username, userData.valid.password);
    DashboardPage.logout();
    cy.wait('@logoutEvent');
    cy.url().should('include', '/auth/login');
  });

  it('TC_014 - Verify welcome banner and time widget load', () => {
    cy.intercept('GET', '**/dashboard/employees/time-at-work?*').as('timeWidget');
    LoginPage.login(userData.valid.username, userData.valid.password);
    cy.wait('@timeWidget', { timeout: 10000 });
    cy.contains('Time at Work').should('be.visible');
  });

  it('TC_015 - Verify Dashboard title', () => {
    LoginPage.login(userData.valid.username, userData.valid.password);
    cy.title().should('include', 'OrangeHRM');
  });

  it('TC_016 - Intercept Buzz Feed API on Dashboard', () => {
    cy.intercept('GET', '**/buzz/feed?*').as('buzzFeed');
    LoginPage.login(userData.valid.username, userData.valid.password);
    cy.wait('@buzzFeed', { timeout: 10000 });
    cy.contains('Buzz').should('exist');
  });

  it('TC_017 - Verify My Info menu navigation works', () => {
    LoginPage.login(userData.valid.username, userData.valid.password);
    DashboardPage.goToMenu('My Info');
    cy.url().should('include', '/pim/viewPersonalDetails');
  });

  it('TC_018 - Intercept Leave menu API request', () => {
    cy.intercept('GET', '**/leave/**').as('leaveAPI');
    LoginPage.login(userData.valid.username, userData.valid.password);
    DashboardPage.goToMenu('Leave');
    cy.wait('@leaveAPI', { timeout: 10000 });
    cy.url().should('include', '/leave/viewLeaveList');
  });

  it('TC_019 - Verify Admin menu visible for Admin user', () => {
    LoginPage.login(userData.valid.username, userData.valid.password);
    cy.contains('Admin').should('be.visible');
  });

  it('TC_020 - Verify sidebar can be toggled', () => {
    LoginPage.login(userData.valid.username, userData.valid.password);
    cy.get('.oxd-main-menu-search').should('be.visible');
    cy.get('.oxd-main-menu-button').click();
    cy.wait(1000);
    cy.get('.oxd-main-menu').should('be.visible');
    cy.get('.oxd-main-menu-button').click();
    cy.wait(1000);
    cy.get('.oxd-main-menu-search').should('be.visible');
  });
});