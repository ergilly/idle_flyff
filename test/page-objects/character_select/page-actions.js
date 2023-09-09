class PageActions {
  constructor(Page) {
    this.page = Page
  }

  async loadLoginPage() {
    console.log(process.env.BASE_URL)
    await this.page.goto(process.env.BASE_URL)
  }
}

module.exports = { PageActions }
