import { ICustomWorld } from '../../helpers/config/custom-world'

export class BrowserActions {
  static async OpenUrl(this: ICustomWorld, url: string) {
    return this.page!.goto(url)
  }
}
