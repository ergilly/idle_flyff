import { ICustomWorld } from '../../helpers/config/custom-world'

export interface IPageActions {
  loadCharacterSelectPage: () => void
}

export class PageActions implements IPageActions {
  public async loadCharacterSelectPage(this: ICustomWorld) {
    await this.page!.goto(process.env.BASE_URL as string)
  }
}
