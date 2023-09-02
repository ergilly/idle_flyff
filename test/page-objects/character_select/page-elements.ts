import { ICustomWorld } from '../../helpers/config/custom-world' // Import the Locator type if needed

export interface IPageElements {
  characterSlot1: () => void
}

export class PageElements implements IPageElements {
  characterSlot1(this: ICustomWorld) {
    return this.page!.getByTestId('character-slot-1')
  }
}
