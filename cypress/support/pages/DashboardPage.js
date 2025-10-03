class DashboardPage {
  elements = {
    profileMenu: () => cy.get('.oxd-userdropdown-tab'),
    logoutDropdown: () => cy.get('.oxd-userdropdown-tab'),
    logoutButton: () => cy.contains('Logout'),
  };

  logout() {
    this.elements.logoutDropdown().click();
    this.elements.logoutButton().click();
  }

  goToMenu(menuName) {
    cy.contains(menuName, { timeout: 10000 }).click();
  }
}

export default new DashboardPage();
