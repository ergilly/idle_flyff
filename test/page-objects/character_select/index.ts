import { PageElements, IPageElements } from './page-elements'
import { PageActions, IPageActions } from './page-actions'

export interface ICharacterSelectPage {
  elements: IPageElements
  actions: IPageActions
}

export class CharacterSelectPage implements ICharacterSelectPage {
  elements: IPageElements
  actions: IPageActions

  constructor() {
    this.elements = new PageElements()
    this.actions = new PageActions()
  }
}
