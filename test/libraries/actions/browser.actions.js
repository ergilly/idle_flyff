class BrowserActions {
  static async OpenUrl(URL) {
    return this.page.goto(URL)
  }
}

module.exports = { BrowserActions }
