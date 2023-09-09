class PageActions {
  constructor(Page) {
    this.page = Page
  }

  async loadLoginPage() {
    await this.page.goto(process.env.BASE_URL)
  }
}

module.exports = { PageActions }
