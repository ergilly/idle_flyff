class PageElements {
  constructor(Page) {
    this.page = Page
  }

  loginView() {
    return this.page.getByTestId('login-view')
  }
}

module.exports = { PageElements }
