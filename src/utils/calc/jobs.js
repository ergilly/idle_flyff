import { Mover } from './mover'
import { Utils } from './utils'
import Moverutils from './moverutils'

export class Vagrant extends Mover {
  constructor(
    str = 15,
    sta = 15,
    int = 15,
    dex = 15,
    level = 1,
    constants = null,
    img = null,
    mainhand = null,
    offhand = null,
    helmet = null,
    suit = null,
    gauntlet = null,
    boots = null,
    cloak = null,
    earringR = null,
    earringL = null,
    ringR = null,
    ringL = null,
    necklace = null,
    armorSet = null,
    jobId = null,
  ) {
    super()
    this.jobId = jobId || 9686
    this.mainhand = mainhand || null
    this.offhand = offhand || null
    this.helmet = helmet || null
    this.suit = suit || null
    this.gauntlet = gauntlet || null
    this.boots = boots || null
    ;(this.cloak = cloak || null), (this.earringR = earringR || null)
    this.earringL = earringL || null
    this.ringR = ringR || null
    this.ringL = ringL || null
    this.necklace = necklace || null
    this.mainhandUpgrade = 0
    this.offhandUpgrade = 0
    this.helmetUpgrade = 0
    this.suitUpgrade = 0
    this.gauntletUpgrade = 0
    this.bootsUpgrade = 0
    this.earringRUpgrade = 0
    this.earringLUpgrade = 0
    this.ringRUpgrade = 0
    this.ringLUpgrade = 0
    this.necklaceUpgrade = 0
    this.weapon_img = img || 'woodensword.png'
    this.armorSet = armorSet || null
    this.armorUpgradeBonus = null
    this.mainhandUpgradeBonus = null
    this.mainhandElement = Moverutils.Elements.none
    this.mainhandElementUpgrade = 0
    this.offhandUpgradeBonus = null
    this.suitPiercing = null
    this.shield = null
    this.assistBuffs = false
    this.selfBuffs = false
    this.premiumItems = false
    this.constants = constants || {
      skills: [],
      buffs: [],
      attackSpeed: 72.0,
      hps: 4, // TODO: change these to frames instead and calculate hits/sec using them for more accuracy
      HP: 0.9,
      MP: 0.3,
      FP: 0.3,
      Def: 0.9,
      MDefSta: 0.3,
      MDefInt: 1.2,
      block: 0.2,
      critical: 1.0,
      sword: 4.5,
      axe: 5.5,
      staff: 0.8,
      stick: 3.0,
      knuckle: 5.0,
      wand: 6.0,
      yoyo: 4.2,
    }
    this.skillsRawDamage = {}

    this.str = parseInt(str)
    this.sta = parseInt(sta)
    this.int = parseInt(int)
    this.dex = parseInt(dex)

    this.addedStr = 0
    this.addedSta = 0
    this.addedInt = 0
    this.addedDex = 0

    this.level = parseInt(level)

    this.activeAssistBuffs = []
    this.activeSelfBuffs = []
    this.activeBuffs = []
    this.activePremiumItems = []
    this.assistInt = 300 // How much int the assist buffing you has

    this.monsters = []

    this.dps = {
      aa: 0,
      0: 0, // Skill 1
      1: 0, // Skill 2
      2: 0, // Skill 3
    }

    this.aspd = 0
    this.criticalChance = 0
    this.DCT = 1
    this.attack = 0
    this.criticalDamage = 0
    this.hitrate = 1
    this.meleeBlock = 0
    this.rangedBlock = 0

    this.focusSkill = -1

    this.forceUpdate = false
  }

  async initialize() {
    const skillsArray = []
    skillsArray.push(await Utils.getSkillByName('Clean Hit'))
    skillsArray.push(await Utils.getSkillByName('Flurry'))
    skillsArray.push(await Utils.getSkillByName('Over Cutter'))
    this.constants.skills = skillsArray
  }

  async getItem(itemName) {
    const item = await Utils.getItemByName(itemName)
    return item
  }

  get health() {
    let health = Math.floor(
      150 + this.level * 18 + this.sta * this.level * 0.18,
    )
    health *= 1 + this.getExtraParam('maxhp', true) / 100
    health += this.getExtraParam('maxhp', false)
    return Math.floor(health)
  }

  get fp() {
    let fp = Math.floor(this.level * 0.6 + this.sta * 2.1)
    fp *= 1 + this.getExtraParam('maxfp', true) / 100
    fp += this.getExtraParam('maxfp', false)
    return fp
  }

  get mp() {
    let mp = Math.floor(22 + this.level * 0.6 + this.int * 2.7)
    mp *= 1 + this.getExtraParam('maxmp', true) / 100
    mp += this.getExtraParam('maxmp', false)
    return mp
  }
}

export class Assist extends Vagrant {
  constructor(
    str = 15,
    sta = 15,
    int = 15,
    dex = 15,
    level = 1,
    constants = null,
    img = null,
    mainhand = null,
    offhand = null,
    armor = null,
    jobId = null,
  ) {
    jobId = jobId || 8962
    img = img || 'overamknuckle.png'
    armor = armor || Utils.getArmorByName('Talin Set')
    mainhand = mainhand || Utils.getItemByName('Paipol Knuckle')
    constants = constants || {
      skills: [
        Utils.getSkillById('Power Fist'),
        Utils.getSkillById('Temping Hole'),
        Utils.getSkillById('Burst Crack'),
      ],
      buffs: [Utils.getSkillById('Stonehand')],
      attackSpeed: 72.0,
      HP: 1.4,
      hps: 4,
      MP: 1.3,
      FP: 0.6,
      Def: 1.2,
      MDefSta: 1.3,
      MDefInt: 2.3,
      block: 0.5,
      critical: 1.0,
      sword: 4.5,
      axe: 5.5,
      staff: 0.8,
      stick: 3.0,
      knuckle: 5.0,
      wand: 6.0,
      yoyo: 4.2,
    }
    super(
      str,
      sta,
      int,
      dex,
      level,
      constants,
      img,
      mainhand,
      offhand,
      armor,
      jobId,
    )
  }

  get health() {
    let health = Math.floor(
      150 + this.level * 28 + this.sta * this.level * 0.28,
    )
    health *= 1 + this.getExtraParam('maxhp', true) / 100
    health += this.getExtraParam('maxhp', false)
    return Math.floor(health)
  }

  get fp() {
    let fp = Math.floor(this.level * 1.2 + this.sta * 4.2)
    fp *= 1 + this.getExtraParam('maxfp', true) / 100
    fp += this.getExtraParam('maxfp', false)
    return fp
  }

  get mp() {
    let mp = Math.floor(22 + this.level * 2.6 + this.int * 11.7)
    mp *= 1 + this.getExtraParam('maxmp', true) / 100
    mp += this.getExtraParam('maxmp', false)
    return mp
  }
}

export class Billposter extends Assist {
  constructor(
    str = 15,
    sta = 15,
    int = 15,
    dex = 15,
    level = 1,
    constants = null,
    img = null,
    mainhand = null,
    offhand = null,
    armor = null,
    jobId = null,
  ) {
    jobId = jobId || 7424
    img = img || 'lgknuckle.png'
    armor = armor || Utils.getArmorByName('Rody Set')
    mainhand = mainhand || Utils.getItemByName('Legendary Golden gauntlet')
    constants = constants || {
      skills: [
        Utils.getSkillById('Bgvur Tialbold'),
        Utils.getSkillById('Blood Fist'),
        Utils.getSkillById('Asalraalaikum'),
      ],
      buffs: [Utils.getSkillById('Asmodeus')],
      attackSpeed: 82.0,
      hps: 2.5,
      HP: 1.8,
      MP: 0.9,
      FP: 1.1,
      Def: 1.4,
      MDefSta: 2.0,
      MDefInt: 2.8,
      block: 0.7,
      critical: 1.0,
      sword: 4.5,
      axe: 5.5,
      staff: 0.8,
      stick: 3.0,
      knuckle: 5.0,
      wand: 6.0,
      yoyo: 4.2,
    }
    super(
      str,
      sta,
      int,
      dex,
      level,
      constants,
      img,
      mainhand,
      offhand,
      armor,
      jobId,
    )
  }

  get health() {
    let health = Math.floor(
      150 + this.level * 36 + this.sta * this.level * 0.36,
    )
    health *= 1 + this.getExtraParam('maxhp', true) / 100
    health += this.getExtraParam('maxhp', false)
    return Math.floor(health)
  }

  get fp() {
    let fp = Math.floor(this.level * 2.2 + this.sta * 7.7)
    fp *= 1 + this.getExtraParam('maxfp', true) / 100
    fp += this.getExtraParam('maxfp', false)
    return fp
  }

  get mp() {
    let mp = Math.floor(22 + this.level * 1.8 + this.int * 8.1)
    mp *= 1 + this.getExtraParam('maxmp', true) / 100
    mp += this.getExtraParam('maxmp', false)
    return mp
  }
}

export class Ringmaster extends Assist {
  constructor(
    str = 15,
    sta = 15,
    int = 15,
    dex = 15,
    level = 1,
    constants = null,
    img = null,
    mainhand = null,
    offhand = null,
    armor = null,
    jobId = null,
  ) {
    jobId = jobId || 9389
    img = img || 'lgstick.png'
    armor = armor || Utils.getArmorByName('Rimyth Set')
    mainhand = mainhand || Utils.getItemByName('Legendary Golden Stick')
    constants = constants || {
      skills: [
        Utils.getSkillById('Merkaba Hanzelrusha'),
        Utils.getSkillById('Burst Crack'),
      ],
      buffs: [
        Utils.getSkillById('Holyguard'),
        Utils.getSkillById('Protect'),
        Utils.getSkillById('Spirit Fortune'),
        Utils.getSkillById('Geburah Tiphreth'),
      ],
      attackSpeed: 72.0,
      hps: 3,
      HP: 1.6,
      MP: 1.8,
      FP: 0.4,
      Def: 1.2,
      MDefSta: 2.0,
      MDefInt: 3.0,
      block: 0.6,
      critical: 1.0,
      sword: 4.5,
      axe: 5.5,
      staff: 0.8,
      stick: 3.0,
      knuckle: 5.0,
      wand: 6.0,
      yoyo: 4.2,
    }
    super(
      str,
      sta,
      int,
      dex,
      level,
      constants,
      img,
      mainhand,
      offhand,
      armor,
      jobId,
    )
  }

  get health() {
    let health = Math.floor(
      150 + this.level * 32 + this.sta * this.level * 0.32,
    )
    health *= 1 + this.getExtraParam('maxhp', true) / 100
    health += this.getExtraParam('maxhp', false)
    return Math.floor(health)
  }

  get fp() {
    let fp = Math.floor(this.level * 0.8 + this.sta * 2.8)
    fp *= 1 + this.getExtraParam('maxfp', true) / 100
    fp += this.getExtraParam('maxfp', false)
    return fp
  }

  get mp() {
    let mp = Math.floor(22 + this.level * 3.6 + this.int * 16.2)
    mp *= 1 + this.getExtraParam('maxmp', true) / 100
    mp += this.getExtraParam('maxmp', false)
    return mp
  }
}

export class Acrobat extends Vagrant {
  constructor(
    str = 15,
    sta = 15,
    int = 15,
    dex = 15,
    level = 1,
    constants = null,
    img = null,
    mainhand = null,
    offhand = null,
    armor = null,
    jobId = null,
  ) {
    jobId = jobId || 9098
    img = img || 'layeredbow.png'
    armor = armor || Utils.getArmorByName('Cruiser Set')
    mainhand = mainhand || Utils.getItemByName('Layered Bow')
    constants = constants || {
      skills: [
        Utils.getSkillById('Junk Arrow'),
        Utils.getSkillById('Silent Shot'),
        Utils.getSkillById('Arrow Rain'),
      ],
      buffs: [
        Utils.getSkillById('Perfect Block'),
        Utils.getSkillById('Bow Mastery'),
        Utils.getSkillById('Yo-Yo mastery'),
        Utils.getSkillById('Fast Walker'),
      ],
      attackSpeed: 77.0,
      hps: 2,
      HP: 1.4,
      MP: 0.5,
      FP: 0.5,
      Def: 1.2,
      MDefSta: 0.75,
      MDefInt: 1.5,
      block: 0.6,
      critical: 1.0,
      sword: 4.5,
      axe: 5.5,
      staff: 0.8,
      stick: 3.0,
      knuckle: 5.0,
      wand: 6.0,
      bow: 3.6,
      yoyo: 4.2,
    }
    super(
      str,
      sta,
      int,
      dex,
      level,
      constants,
      img,
      mainhand,
      offhand,
      armor,
      jobId,
    )
  }

  get health() {
    let health = Math.floor(
      150 + this.level * 28 + this.sta * this.level * 0.28,
    )
    health *= 1 + this.getExtraParam('maxhp', true) / 100
    health += this.getExtraParam('maxhp', false)
    return Math.floor(health)
  }

  get fp() {
    let fp = Math.floor(this.level * 1 + this.sta * 3.5)
    fp *= 1 + this.getExtraParam('maxfp', true) / 100
    fp += this.getExtraParam('maxfp', false)
    return fp
  }

  get mp() {
    let mp = Math.floor(22 + this.level * 1 + this.int * 4.5)
    mp *= 1 + this.getExtraParam('maxmp', true) / 100
    mp += this.getExtraParam('maxmp', false)
    return mp
  }
}

export class Jester extends Acrobat {
  constructor(
    str = 15,
    sta = 15,
    int = 15,
    dex = 15,
    level = 1,
    constants = null,
    img = null,
    mainhand = null,
    offhand = null,
    armor = null,
    jobId = null,
  ) {
    jobId = jobId || 3545
    img = img || 'lgyoyo.png'
    armor = armor || Utils.getArmorByName('Neis Set')
    mainhand = mainhand || Utils.getItemByName('Legendary Golden Yo-Yo')
    constants = constants || {
      skills: [
        Utils.getSkillById('Multi-Stab'),
        Utils.getSkillById('Vital stab'),
        Utils.getSkillById('Hit of Penya'),
      ],
      buffs: [
        Utils.getSkillById('Critical Swing'),
        Utils.getSkillById('Enchant Absorb'),
        Utils.getSkillById('Yo-Yo Mastery'),
        Utils.getSkillById('Bow Mastery'),
      ],
      attackSpeed: 82.0,
      hps: 2.6,
      HP: 1.5,
      MP: 0.5,
      FP: 1.0,
      Def: 1.4,
      MDefSta: 1.3,
      MDefInt: 2.3,
      block: 0.8,
      critical: 4.0,
      sword: 4.5,
      axe: 5.5,
      staff: 0.8,
      stick: 3.0,
      knuckle: 5.0,
      wand: 6.0,
      yoyo: 5.0,
      bow: 2.0,
    }
    super(
      str,
      sta,
      int,
      dex,
      level,
      constants,
      img,
      mainhand,
      offhand,
      armor,
      jobId,
    )
  }

  get health() {
    let health = Math.floor(150 + this.level * 30 + this.sta * this.level * 0.3)
    health *= 1 + this.getExtraParam('maxhp', true) / 100
    health += this.getExtraParam('maxhp', false)
    return Math.floor(health)
  }

  get fp() {
    let fp = Math.floor(this.level * 2 + this.sta * 7)
    fp *= 1 + this.getExtraParam('maxfp', true) / 100
    fp += this.getExtraParam('maxfp', false)
    return fp
  }

  get mp() {
    let mp = Math.floor(22 + this.level * 1 + this.int * 4.5)
    mp *= 1 + this.getExtraParam('maxmp', true) / 100
    mp += this.getExtraParam('maxmp', false)
    return mp
  }
}

export class Ranger extends Acrobat {
  constructor(
    str = 15,
    sta = 15,
    int = 15,
    dex = 15,
    level = 1,
    constants = null,
    img = null,
    mainhand = null,
    offhand = null,
    armor = null,
    jobId = null,
  ) {
    jobId = jobId || 9295
    img = img || 'lgbow.png'
    armor = armor || Utils.getArmorByName('Tyrent Set')
    mainhand = mainhand || Utils.getItemByName('Legendary Golden Bow')
    constants = constants || {
      skills: [
        Utils.getSkillById('Ice Arrow'),
        Utils.getSkillById('Flame Arrow'),
        Utils.getSkillById('Silent Arrow'),
      ],
      buffs: [
        Utils.getSkillById('Critical Shot'),
        Utils.getSkillById('Nature'),
        Utils.getSkillById('Yo-Yo Mastery'),
        Utils.getSkillById('Bow Mastery'),
      ],
      attackSpeed: 77.0,
      hps: 1.5,
      HP: 1.6,
      MP: 1.2,
      FP: 0.6,
      Def: 1.4,
      MDefSta: 2.0,
      MDefInt: 3.0,
      block: 0.8,
      critical: 2.0,
      sword: 4.5,
      axe: 5.5,
      staff: 0.8,
      stick: 3.0,
      knuckle: 5.0,
      wand: 6.0,
      yoyo: 2.0,
      bow: 4.0,
    }
    super(
      str,
      sta,
      int,
      dex,
      level,
      constants,
      img,
      mainhand,
      offhand,
      armor,
      jobId,
    )
  }

  get health() {
    let health = Math.floor(
      150 + this.level * 32 + this.sta * this.level * 0.32,
    )
    health *= 1 + this.getExtraParam('maxhp', true) / 100
    health += this.getExtraParam('maxhp', false)
    return Math.floor(health)
  }

  get fp() {
    let fp = Math.floor(this.level * 1.2 + this.sta * 4.2)
    fp *= 1 + this.getExtraParam('maxfp', true) / 100
    fp += this.getExtraParam('maxfp', false)
    return fp
  }

  get mp() {
    let mp = Math.floor(22 + this.level * 2.4 + this.int * 10.8)
    mp *= 1 + this.getExtraParam('maxmp', true) / 100
    mp += this.getExtraParam('maxmp', false)
    return mp
  }
}

export class Magician extends Vagrant {
  constructor(
    str = 15,
    sta = 15,
    int = 15,
    dex = 15,
    level = 1,
    constants = null,
    img = null,
    mainhand = null,
    offhand = null,
    armor = null,
    jobId = null,
  ) {
    jobId = jobId || 9581
    img = img || 'opelwand.png'
    armor = armor || Utils.getArmorByName('Teba Set')
    mainhand = mainhand || Utils.getItemByName('Opel Wand')
    constants = constants || {
      skills: [
        Utils.getSkillById(4729), // Mental strike, there is 2 so using ID for this one
        Utils.getSkillById('Rock Crash'),
        Utils.getSkillById('Water Well'),
      ],
      buffs: [],
      attackSpeed: 62.0,
      hps: 1,
      HP: 1.4,
      MP: 1.7,
      FP: 0.3,
      Def: 1.15,
      MDefSta: 3.0,
      MDefInt: 4.2,
      block: 0.5,
      critical: 1.0,
      sword: 4.5,
      axe: 5.5,
      staff: 0.8,
      stick: 3.0,
      knuckle: 5.0,
      wand: 6.0,
      yoyo: 4.2,
    }
    super(
      str,
      sta,
      int,
      dex,
      level,
      constants,
      img,
      mainhand,
      offhand,
      armor,
      jobId,
    )
  }

  get health() {
    let health = Math.floor(
      150 + this.level * 28 + this.sta * this.level * 0.28,
    )
    health *= 1 + this.getExtraParam('maxhp', true) / 100
    health += this.getExtraParam('maxhp', false)
    return Math.floor(health)
  }

  get fp() {
    let fp = Math.floor(this.level * 0.6 + this.sta * 2.1)
    fp *= 1 + this.getExtraParam('maxfp', true) / 100
    fp += this.getExtraParam('maxfp', false)
    return fp
  }

  get mp() {
    let mp = Math.floor(22 + this.level * 3.4 + this.int * 15.3)
    mp *= 1 + this.getExtraParam('maxmp', true) / 100
    mp += this.getExtraParam('maxmp', false)
    return mp
  }
}

export class Psykeeper extends Magician {
  constructor(
    str = 15,
    sta = 15,
    int = 15,
    dex = 15,
    level = 1,
    constants = null,
    img = null,
    mainhand = null,
    offhand = null,
    armor = null,
    jobId = null,
  ) {
    jobId = jobId || 5709
    img = img || 'lgwand.png'
    armor = armor || Utils.getArmorByName('Mekatro Set')
    mainhand = mainhand || Utils.getItemByName('Legendary Golden Wand')
    constants = constants || {
      skills: [
        Utils.getSkillById('Psychic Bomb'),
        Utils.getSkillById('Spirit Bomb'),
        Utils.getSkillById('Psychic Square'),
      ],
      buffs: [],
      attackSpeed: 67.0,
      hps: 1,
      HP: 1.5,
      MP: 2.0,
      FP: 0.4,
      Def: 1.2,
      MDefSta: 3.0,
      MDefInt: 4.2,
      block: 0.3,
      critical: 1.0,
      sword: 4.5,
      axe: 5.5,
      staff: 0.8,
      stick: 3.0,
      knuckle: 5.0,
      wand: 5.5,
      yoyo: 4.2,
    }
    super(
      str,
      sta,
      int,
      dex,
      level,
      constants,
      img,
      mainhand,
      offhand,
      armor,
      jobId,
    )
  }

  get health() {
    let health = Math.floor(150 + this.level * 30 + this.sta * this.level * 0.3)
    health *= 1 + this.getExtraParam('maxhp', true) / 100
    health += this.getExtraParam('maxhp', false)
    return Math.floor(health)
  }

  get fp() {
    let fp = Math.floor(this.level * 0.8 + this.sta * 2.8)
    fp *= 1 + this.getExtraParam('maxfp', true) / 100
    fp += this.getExtraParam('maxfp', false)
    return fp
  }

  get mp() {
    let mp = Math.floor(22 + this.level * 4 + this.int * 18)
    mp *= 1 + this.getExtraParam('maxmp', true) / 100
    mp += this.getExtraParam('maxmp', false)
    return mp
  }
}

export class Elementor extends Magician {
  constructor(
    str = 15,
    sta = 15,
    int = 15,
    dex = 15,
    level = 1,
    constants = null,
    img = null,
    mainhand = null,
    offhand = null,
    armor = null,
    jobId = null,
  ) {
    jobId = jobId || 9150
    img = img || 'lgstaff.png'
    armor = armor || Utils.getArmorByName('Shabel Set')
    mainhand = mainhand || Utils.getItemByName('Legendary Golden Staff')
    constants = constants || {
      skills: [
        Utils.getSkillById('Firebird'),
        Utils.getSkillById('Windfield'),
        Utils.getSkillById('Iceshark'),
      ],
      buffs: [
        Utils.getSkillById('Lightning Mastery'),
        Utils.getSkillById('Fire Mastery'),
        Utils.getSkillById('Earth Mastery'),
        Utils.getSkillById('Wind Mastery'),
        Utils.getSkillById('Water Mastery'),
      ],
      attackSpeed: 67.0,
      hps: 1,
      HP: 1.5,
      MP: 2.0,
      FP: 0.4,
      Def: 1.2,
      MDefSta: 3.0,
      MDefInt: 4.0,
      block: 0.3,
      critical: 1.0,
      sword: 4.5,
      axe: 5.5,
      staff: 0.8,
      stick: 3.0,
      knuckle: 5.0,
      wand: 6.0,
      yoyo: 4.2,
    }
    super(
      str,
      sta,
      int,
      dex,
      level,
      constants,
      img,
      mainhand,
      offhand,
      armor,
      jobId,
    )
  }

  get health() {
    let health = Math.floor(150 + this.level * 30 + this.sta * this.level * 0.3)
    health *= 1 + this.getExtraParam('maxhp', true) / 100
    health += this.getExtraParam('maxhp', false)
    return Math.floor(health)
  }

  get fp() {
    let fp = Math.floor(this.level * 0.8 + this.sta * 2.8)
    fp *= 1 + this.getExtraParam('maxfp', true) / 100
    fp += this.getExtraParam('maxfp', false)
    return fp
  }

  get mp() {
    let mp = Math.floor(22 + this.level * 4 + this.int * 18)
    mp *= 1 + this.getExtraParam('maxmp', true) / 100
    mp += this.getExtraParam('maxmp', false)
    return mp
  }
}

export class Mercenary extends Vagrant {
  constructor(
    str = 15,
    sta = 15,
    int = 15,
    dex = 15,
    level = 1,
    constants = null,
    img = null,
    mainhand = null,
    offhand = null,
    armor = null,
    jobId = null,
  ) {
    jobId = jobId || 764
    img = img || 'zirkansword.png'
    armor = armor || Utils.getArmorByName('Panggril Set')
    mainhand = mainhand || Utils.getItemByName('Flam Sword')
    constants = constants || {
      skills: [
        Utils.getSkillById('Shield Bash'),
        Utils.getSkillById('Keenwheel'),
        Utils.getSkillById('Guillotine'),
      ],
      buffs: [
        Utils.getSkillById('Blazing Sword'),
        Utils.getSkillById('Sword Mastery'),
      ],
      attackSpeed: 77.0,
      hps: 4,
      HP: 1.5,
      MP: 0.5,
      FP: 0.7,
      Def: 1.25,
      MDefSta: 0.75,
      MDefInt: 1.5,
      block: 0.5,
      critical: 1.0,
      sword: 4.5,
      axe: 5.5,
      staff: 0.8,
      stick: 3.0,
      knuckle: 5.0,
      wand: 6.0,
      yoyo: 4.2,
    }
    super(
      str,
      sta,
      int,
      dex,
      level,
      constants,
      img,
      mainhand,
      offhand,
      armor,
      jobId,
    )
  }

  get health() {
    let health = Math.floor(150 + this.level * 30 + this.sta * this.level * 0.3)
    health *= 1 + this.getExtraParam('maxhp', true) / 100
    health += this.getExtraParam('maxhp', false)
    return Math.floor(health)
  }

  get fp() {
    let fp = Math.floor(this.level * 1.4 + this.sta * 4.9)
    fp *= 1 + this.getExtraParam('maxfp', true) / 100
    fp += this.getExtraParam('maxfp', false)
    return fp
  }

  get mp() {
    let mp = Math.floor(22 + this.level * 1 + this.int * 4.5)
    mp *= 1 + this.getExtraParam('maxmp', true) / 100
    mp += this.getExtraParam('maxmp', false)
    return mp
  }
}

export class Blade extends Mercenary {
  constructor(
    str = 15,
    sta = 15,
    int = 15,
    dex = 15,
    level = 1,
    constants = null,
    img = null,
    mainhand = null,
    offhand = null,
    armor = null,
    jobId = null,
  ) {
    jobId = jobId || 2246
    img = img || 'lgaxe.png'
    armor = armor || Utils.getArmorByName('Hanes Set')
    mainhand = mainhand || Utils.getItemByName('Legendary Golden Axe')
    offhand = offhand || Utils.getItemByName('Legendary Golden Axe')
    constants = constants || {
      skills: [
        Utils.getSkillById('Blade Dance'),
        Utils.getSkillById('Hawk Attack'),
        Utils.getSkillById('Cross Strike'),
      ],
      buffs: [
        Utils.getSkillById('Berserk'),
        Utils.getSkillById('Smite Axe'),
        Utils.getSkillById('Axe Mastery'),
        Utils.getSkillById('Sword Mastery'),
      ],
      attackSpeed: 87.0,
      hps: 3,
      HP: 1.5,
      MP: 0.6,
      FP: 1.2,
      Def: 1.45,
      MDefSta: 1.3,
      MDefInt: 2.3,
      block: 1.5,
      critical: 1.0,
      sword: 4.5,
      axe: 5.5,
      staff: 0.8,
      stick: 3.0,
      knuckle: 5.0,
      wand: 6.0,
      yoyo: 4.2,
    }
    super(
      str,
      sta,
      int,
      dex,
      level,
      constants,
      img,
      mainhand,
      offhand,
      armor,
      jobId,
    )
  }

  get health() {
    let health = Math.floor(150 + this.level * 30 + this.sta * this.level * 0.3)
    health *= 1 + this.getExtraParam('maxhp', true) / 100
    health += this.getExtraParam('maxhp', false)
    return Math.floor(health)
  }

  get fp() {
    let fp = Math.floor(this.level * 2.4 + this.sta * 8.400001)
    fp *= 1 + this.getExtraParam('maxfp', true) / 100
    fp += this.getExtraParam('maxfp', false)
    return fp
  }

  get mp() {
    let mp = Math.floor(22 + this.level * 1.2 + this.int * 5.4)
    mp *= 1 + this.getExtraParam('maxmp', true) / 100
    mp += this.getExtraParam('maxmp', false)
    return mp
  }
}

export class Knight extends Mercenary {
  constructor(
    str = 15,
    sta = 15,
    int = 15,
    dex = 15,
    level = 1,
    constants = null,
    img = null,
    mainhand = null,
    offhand = null,
    armor = null,
    jobId = null,
  ) {
    jobId = jobId || 5330
    img = img || 'lgswt.png'
    armor = armor || Utils.getArmorByName('Extro Set')
    mainhand = mainhand || Utils.getItemByName('Legendary Golden Big Sword')
    constants = constants || {
      skills: [
        Utils.getSkillById('Pain Dealer'),
        Utils.getSkillById('Power Stomp'),
        Utils.getSkillById('Earth Divider'),
      ],
      buffs: [
        Utils.getSkillById('Rage'),
        Utils.getSkillById('Smite Axe'),
        Utils.getSkillById('Axe Mastery'),
        Utils.getSkillById('Sword Mastery'),
        Utils.getSkillById('Protection'),
        Utils.getSkillById('Heart of Fury'),
      ],
      attackSpeed: 77.0,
      hps: 2,
      HP: 2.0,
      MP: 0.6,
      FP: 1.5,
      Def: 1.55,
      MDefSta: 1.3,
      MDefInt: 2.3,
      block: 1.0,
      critical: 1.0,
      sword: 4.5,
      axe: 5.5,
      staff: 0.8,
      stick: 3.0,
      knuckle: 5.0,
      wand: 6.0,
      yoyo: 4.2,
    }
    super(
      str,
      sta,
      int,
      dex,
      level,
      constants,
      img,
      mainhand,
      offhand,
      armor,
      jobId,
    )
  }

  get health() {
    let health = Math.floor(150 + this.level * 40 + this.sta * this.level * 0.4)
    health *= 1 + this.getExtraParam('maxhp', true) / 100
    health += this.getExtraParam('maxhp', false)
    return Math.floor(health)
  }

  get fp() {
    let fp = Math.floor(this.level * 3 + this.sta * 10.5)
    fp *= 1 + this.getExtraParam('maxfp', true) / 100
    fp += this.getExtraParam('maxfp', false)
    return fp
  }

  get mp() {
    let mp = Math.floor(22 + this.level * 1.2 + this.int * 5.4)
    mp *= 1 + this.getExtraParam('maxmp', true) / 100
    mp += this.getExtraParam('maxmp', false)
    return mp
  }
}
