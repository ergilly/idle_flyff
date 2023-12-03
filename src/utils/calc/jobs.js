import { Mover } from './mover.js'
import { Utils } from './utils.js'
import Moverutils from './moverutils.js'

export class Vagrant extends Mover {
  constructor(
    name = null,
    uid = null,
    action = null,
    selected = false,
    lastOnline = null,
    level = 1,
    sex = 'male',
    jobId = null,
    constants = null,
    img = null,
    stats = null,
    penya = null,
    inventory = null,
    equipment = null,
    armorSet = null,
    buffsArray = [],
    skillsArray = [],
  ) {
    super()
    this.jobId = jobId || 9686
    this.inventory = inventory || { tab1: [] }
    this.sex = sex || 'male'
    this.equipment = equipment || null
    this.mainhandUpgrade = equipment.mainhand?.upgrade || 0
    this.offhandUpgrade = equipment.offhand?.upgrade || 0
    this.helmetUpgrade = equipment.helmet?.upgrade || 0
    this.suitUpgrade = equipment.suit?.upgrade || 0
    this.gauntletUpgrade = equipment.gauntlet?.upgrade || 0
    this.bootsUpgrade = equipment.boots?.upgrade || 0
    this.earringRUpgrade = equipment.earringR?.upgrade || 0
    this.earringLUpgrade = equipment.earringL?.upgrade || 0
    this.ringRUpgrade = equipment.ringR?.upgrade || 0
    this.ringLUpgrade = equipment.ringL?.upgrade || 0
    this.necklaceUpgrade = equipment.necklace?.upgrade || 0
    this.weapon_img = img || 'woodensword.png'
    this.armorSet = armorSet || null
    this.armorSetUpgradeBonus = null
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
    this.buffsArray = buffsArray || []
    this.skillsArray = skillsArray || []
    this.skillsRawDamage = {}
    console.log(stats);
    this.stats = stats || null

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
    const newBuffsArray = []
    const newSkillsArray = []
    if (this.buffsArray && this.skillsArray) {
      for (let buff of this.buffsArray) {
        if (typeof buff === 'number') {
          newSkillsArray.push(await Utils.getSkillById(buff))
        } else {
          newSkillsArray.push(await Utils.getSkillByName(buff))
        }
      }
      for (let skill of this.skillsArray) {
        if (typeof skill === 'number') {
          newSkillsArray.push(await Utils.getSkillById(skill))
        } else {
          newSkillsArray.push(await Utils.getSkillByName(skill))
        }
      }
    }
    this.constants.buffs = newBuffsArray
    this.constants.skills = newSkillsArray
  }

  async getItem(itemName) {
    const item = await Utils.getItemByName(itemName)
    return item
  }

  get health() {
    let health = Math.floor(
      150 + this.level * 18 + this.stats.sta * this.level * 0.18,
    )
    health *= 1 + this.getExtraParam('maxhp', true) / 100
    health += this.getExtraParam('maxhp', false)
    return Math.floor(health)
  }

  get fp() {
    let fp = Math.floor(this.level * 0.6 + this.stats.sta * 2.1)
    fp *= 1 + this.getExtraParam('maxfp', true) / 100
    fp += this.getExtraParam('maxfp', false)
    return fp
  }

  get mp() {
    let mp = Math.floor(22 + this.level * 0.6 + this.stats.int * 2.7)
    mp *= 1 + this.getExtraParam('maxmp', true) / 100
    mp += this.getExtraParam('maxmp', false)
    return mp
  }
}

export class Assist extends Vagrant {
  constructor(
    name = null,
    uid = null,
    action = null,
    selected = false,
    lastOnline = null,
    level = 15,
    sex = 'male',
    jobId = null,
    constants = null,
    img = null,
    stats = null,
    penya = null,
    inventory = null,
    equipment = null,
    armorSet = null,
    buffsArray = [],
    skillsArray = [],
  ) {
    jobId = jobId || 8962
    img = img || 'overamknuckle.png'
    constants = constants || {
      skills: [],
      buffs: [],
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
      name,
      uid,
      action,
      selected,
      lastOnline,
      level,
      sex,
      jobId,
      constants,
      img,
      stats,
      penya,
      inventory,
      equipment,
      armorSet,
      ['Stonehand'],
      ['Power Fist', 'Temping Hole', 'Burst Crack'],
    )
  }

  get health() {
    let health = Math.floor(
      150 + this.level * 28 + this.stats.sta * this.level * 0.28,
    )
    health *= 1 + this.getExtraParam('maxhp', true) / 100
    health += this.getExtraParam('maxhp', false)
    return Math.floor(health)
  }

  get fp() {
    let fp = Math.floor(this.level * 1.2 + this.stats.sta * 4.2)
    fp *= 1 + this.getExtraParam('maxfp', true) / 100
    fp += this.getExtraParam('maxfp', false)
    return fp
  }

  get mp() {
    let mp = Math.floor(22 + this.level * 2.6 + this.stats.int * 11.7)
    mp *= 1 + this.getExtraParam('maxmp', true) / 100
    mp += this.getExtraParam('maxmp', false)
    return mp
  }
}

export class Billposter extends Assist {
  constructor(
    name = null,
    uid = null,
    action = null,
    selected = false,
    lastOnline = null,
    level = 60,
    sex = 'male',
    jobId = null,
    constants = null,
    img = null,
    stats = null,
    penya = null,
    inventory = null,
    equipment = null,
    armorSet = null,
    buffsArray = [],
    skillsArray = [],
  ) {
    jobId = jobId || 7424
    img = img || 'lgknuckle.png'
    constants = constants || {
      skills: [],
      buffs: [],
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
      name,
      uid,
      action,
      selected,
      lastOnline,
      level,
      sex,
      jobId,
      constants,
      img,
      stats,
      penya,
      inventory,
      equipment,
      armorSet,
      ['Asmodeus'],
      ['Bgvur Tialbold', 'Blood Fist', 'Asalraalaikum'],
    )
  }

  get health() {
    let health = Math.floor(
      150 + this.level * 36 + this.stats.sta * this.level * 0.36,
    )
    health *= 1 + this.getExtraParam('maxhp', true) / 100
    health += this.getExtraParam('maxhp', false)
    return Math.floor(health)
  }

  get fp() {
    let fp = Math.floor(this.level * 2.2 + this.stats.sta * 7.7)
    fp *= 1 + this.getExtraParam('maxfp', true) / 100
    fp += this.getExtraParam('maxfp', false)
    return fp
  }

  get mp() {
    let mp = Math.floor(22 + this.level * 1.8 + this.stats.int * 8.1)
    mp *= 1 + this.getExtraParam('maxmp', true) / 100
    mp += this.getExtraParam('maxmp', false)
    return mp
  }
}

export class Ringmaster extends Assist {
  constructor(
    name = null,
    uid = null,
    action = null,
    selected = false,
    lastOnline = null,
    level = 60,
    sex = 'male',
    jobId = null,
    constants = null,
    img = null,
    stats = null,
    penya = null,
    inventory = null,
    equipment = null,
    armorSet = null,
    buffsArray = [],
    skillsArray = [],
  ) {
    jobId = jobId || 9389
    img = img || 'lgstick.png'
    constants = constants || {
      skills: [],
      buffs: [],
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
      name,
      uid,
      action,
      selected,
      lastOnline,
      level,
      sex,
      jobId,
      constants,
      img,
      stats,
      penya,
      inventory,
      equipment,
      armorSet,
      ['Holyguard', 'Protect', 'Spirit Fortune', 'Geburah Tiphreth'],
      ['Merkaba Hanzelrusha', 'Burst Crack'],
    )
  }

  get health() {
    let health = Math.floor(
      150 + this.level * 32 + this.stats.sta * this.level * 0.32,
    )
    health *= 1 + this.getExtraParam('maxhp', true) / 100
    health += this.getExtraParam('maxhp', false)
    return Math.floor(health)
  }

  get fp() {
    let fp = Math.floor(this.level * 0.8 + this.stats.sta * 2.8)
    fp *= 1 + this.getExtraParam('maxfp', true) / 100
    fp += this.getExtraParam('maxfp', false)
    return fp
  }

  get mp() {
    let mp = Math.floor(22 + this.level * 3.6 + this.stats.int * 16.2)
    mp *= 1 + this.getExtraParam('maxmp', true) / 100
    mp += this.getExtraParam('maxmp', false)
    return mp
  }
}

export class Acrobat extends Vagrant {
  constructor(
    name = null,
    uid = null,
    action = null,
    selected = false,
    lastOnline = null,
    level = 15,
    sex = 'male',
    jobId = null,
    constants = null,
    img = null,
    stats = null,
    penya = null,
    inventory = null,
    equipment = null,
    armorSet = null,
    buffsArray = [],
    skillsArray = [],
  ) {
    jobId = jobId || 9098
    img = img || 'layeredbow.png'
    constants = constants || {
      skills: [],
      buffs: [],
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
      name,
      uid,
      action,
      selected,
      lastOnline,
      level,
      sex,
      jobId,
      constants,
      img,
      stats,
      penya,
      inventory,
      equipment,
      armorSet,
      ['Perfect Block', 'Bow Mastery', 'Yo-Yo mastery', 'Fast Walker'],
      ['Junk Arrow', 'Silent Shot', 'Arrow Rain'],
    )
  }

  get health() {
    let health = Math.floor(
      150 + this.level * 28 + this.stats.sta * this.level * 0.28,
    )
    health *= 1 + this.getExtraParam('maxhp', true) / 100
    health += this.getExtraParam('maxhp', false)
    return Math.floor(health)
  }

  get fp() {
    let fp = Math.floor(this.level * 1 + this.stats.sta * 3.5)
    fp *= 1 + this.getExtraParam('maxfp', true) / 100
    fp += this.getExtraParam('maxfp', false)
    return fp
  }

  get mp() {
    let mp = Math.floor(22 + this.level * 1 + this.stats.int * 4.5)
    mp *= 1 + this.getExtraParam('maxmp', true) / 100
    mp += this.getExtraParam('maxmp', false)
    return mp
  }
}

export class Jester extends Acrobat {
  constructor(
    name = null,
    uid = null,
    action = null,
    selected = false,
    lastOnline = null,
    level = 60,
    sex = 'male',
    jobId = null,
    constants = null,
    img = null,
    stats = null,
    penya = null,
    inventory = null,
    equipment = null,
    armorSet = null,
    buffsArray = [],
    skillsArray = [],
  ) {
    jobId = jobId || 3545
    img = img || 'lgyoyo.png'
    constants = constants || {
      skills: [],
      buffs: [],
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
      name,
      uid,
      action,
      selected,
      lastOnline,
      level,
      sex,
      jobId,
      constants,
      img,
      stats,
      penya,
      inventory,
      equipment,
      armorSet,
      ['Critical Swing', 'Enchant Absorb', 'Yo-Yo Mastery', 'Bow Mastery'],
      ['Multi-Stab', 'Vital stab', 'Hit of Penya'],
    )
  }

  get health() {
    let health = Math.floor(150 + this.level * 30 + this.stats.sta * this.level * 0.3)
    health *= 1 + this.getExtraParam('maxhp', true) / 100
    health += this.getExtraParam('maxhp', false)
    return Math.floor(health)
  }

  get fp() {
    let fp = Math.floor(this.level * 2 + this.stats.sta * 7)
    fp *= 1 + this.getExtraParam('maxfp', true) / 100
    fp += this.getExtraParam('maxfp', false)
    return fp
  }

  get mp() {
    let mp = Math.floor(22 + this.level * 1 + this.stats.int * 4.5)
    mp *= 1 + this.getExtraParam('maxmp', true) / 100
    mp += this.getExtraParam('maxmp', false)
    return mp
  }
}

export class Ranger extends Acrobat {
  constructor(
    name = null,
    uid = null,
    action = null,
    selected = false,
    lastOnline = null,
    level = 60,
    sex = 'male',
    jobId = null,
    constants = null,
    img = null,
    stats = null,
    penya = null,
    inventory = null,
    equipment = null,
    armorSet = null,
    buffsArray = [],
    skillsArray = [],
  ) {
    jobId = jobId || 9295
    img = img || 'lgbow.png'
    constants = constants || {
      skills: [],
      buffs: [],
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
      name,
      uid,
      action,
      selected,
      lastOnline,
      level,
      sex,
      jobId,
      constants,
      img,
      stats,
      penya,
      inventory,
      equipment,
      armorSet,
      ['Critical Shot', 'Nature', 'Yo-Yo Mastery', 'Bow Mastery'],
      ['Ice Arrow', 'Flame Arrow', 'Silent Arrow'],
    )
  }

  get health() {
    let health = Math.floor(
      150 + this.level * 32 + this.stats.sta * this.level * 0.32,
    )
    health *= 1 + this.getExtraParam('maxhp', true) / 100
    health += this.getExtraParam('maxhp', false)
    return Math.floor(health)
  }

  get fp() {
    let fp = Math.floor(this.level * 1.2 + this.stats.sta * 4.2)
    fp *= 1 + this.getExtraParam('maxfp', true) / 100
    fp += this.getExtraParam('maxfp', false)
    return fp
  }

  get mp() {
    let mp = Math.floor(22 + this.level * 2.4 + this.stats.int * 10.8)
    mp *= 1 + this.getExtraParam('maxmp', true) / 100
    mp += this.getExtraParam('maxmp', false)
    return mp
  }
}

export class Magician extends Vagrant {
  constructor(
    name = null,
    uid = null,
    action = null,
    selected = false,
    lastOnline = null,
    level = 15,
    sex = 'male',
    jobId = null,
    constants = null,
    img = null,
    stats = null,
    penya = null,
    inventory = null,
    equipment = null,
    armorSet = null,
    buffsArray = [],
    skillsArray = [],
  ) {
    jobId = jobId || 9581
    img = img || 'opelwand.png'
    constants = constants || {
      skills: [],
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
      name,
      uid,
      action,
      selected,
      lastOnline,
      level,
      sex,
      jobId,
      constants,
      img,
      stats,
      penya,
      inventory,
      equipment,
      armorSet,
      [],
      [
        4729, // Mental strike, there is 2 so using ID for this one
        'Rock Crash',
        'Water Well',
      ],
    )
  }

  get health() {
    let health = Math.floor(
      150 + this.level * 28 + this.stats.sta * this.level * 0.28,
    )
    health *= 1 + this.getExtraParam('maxhp', true) / 100
    health += this.getExtraParam('maxhp', false)
    return Math.floor(health)
  }

  get fp() {
    let fp = Math.floor(this.level * 0.6 + this.stats.sta * 2.1)
    fp *= 1 + this.getExtraParam('maxfp', true) / 100
    fp += this.getExtraParam('maxfp', false)
    return fp
  }

  get mp() {
    let mp = Math.floor(22 + this.level * 3.4 + this.stats.int * 15.3)
    mp *= 1 + this.getExtraParam('maxmp', true) / 100
    mp += this.getExtraParam('maxmp', false)
    return mp
  }
}

export class Psykeeper extends Magician {
  constructor(
    name = null,
    uid = null,
    action = null,
    selected = false,
    lastOnline = null,
    level = 60,
    sex = 'male',
    jobId = null,
    constants = null,
    img = null,
    stats = null,
    penya = null,
    inventory = null,
    equipment = null,
    armorSet = null,
    buffsArray = [],
    skillsArray = [],
  ) {
    jobId = jobId || 5709
    img = img || 'lgwand.png'
    constants = constants || {
      skills: [],
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
      name,
      uid,
      action,
      selected,
      lastOnline,
      level,
      sex,
      jobId,
      constants,
      img,
      stats,
      penya,
      inventory,
      equipment,
      armorSet,
      [],
      ['Psychic Bomb', 'Spirit Bomb', 'Psychic Square'],
    )
  }

  get health() {
    let health = Math.floor(150 + this.level * 30 + this.stats.sta * this.level * 0.3)
    health *= 1 + this.getExtraParam('maxhp', true) / 100
    health += this.getExtraParam('maxhp', false)
    return Math.floor(health)
  }

  get fp() {
    let fp = Math.floor(this.level * 0.8 + this.stats.sta * 2.8)
    fp *= 1 + this.getExtraParam('maxfp', true) / 100
    fp += this.getExtraParam('maxfp', false)
    return fp
  }

  get mp() {
    let mp = Math.floor(22 + this.level * 4 + this.stats.int * 18)
    mp *= 1 + this.getExtraParam('maxmp', true) / 100
    mp += this.getExtraParam('maxmp', false)
    return mp
  }
}

export class Elementor extends Magician {
  constructor(
    name = null,
    uid = null,
    action = null,
    selected = false,
    lastOnline = null,
    level = 60,
    sex = 'male',
    jobId = null,
    constants = null,
    img = null,
    stats = null,
    penya = null,
    inventory = null,
    equipment = null,
    armorSet = null,
    buffsArray = [],
    skillsArray = [],
  ) {
    jobId = jobId || 9150
    img = img || 'lgstaff.png'
    constants = constants || {
      skills: [],
      buffs: [],
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
      name,
      uid,
      action,
      selected,
      lastOnline,
      level,
      sex,
      jobId,
      constants,
      img,
      stats,
      penya,
      inventory,
      equipment,
      armorSet,
      [
        'Lightning Mastery',
        'Fire Mastery',
        'Earth Mastery',
        'Wind Mastery',
        'Water Mastery',
      ],
      ['Firebird', 'Windfield', 'Iceshark'],
    )
  }

  get health() {
    let health = Math.floor(150 + this.level * 30 + this.stats.sta * this.level * 0.3)
    health *= 1 + this.getExtraParam('maxhp', true) / 100
    health += this.getExtraParam('maxhp', false)
    return Math.floor(health)
  }

  get fp() {
    let fp = Math.floor(this.level * 0.8 + this.stats.sta * 2.8)
    fp *= 1 + this.getExtraParam('maxfp', true) / 100
    fp += this.getExtraParam('maxfp', false)
    return fp
  }

  get mp() {
    let mp = Math.floor(22 + this.level * 4 + this.stats.int * 18)
    mp *= 1 + this.getExtraParam('maxmp', true) / 100
    mp += this.getExtraParam('maxmp', false)
    return mp
  }
}

export class Mercenary extends Vagrant {
  constructor(
    name = null,
    uid = null,
    action = null,
    selected = false,
    lastOnline = null,
    level = 15,
    sex = 'male',
    jobId = null,
    constants = null,
    img = null,
    stats = null,
    penya = null,
    inventory = null,
    equipment = null,
    armorSet = null,
    buffsArray = [],
    skillsArray = [],
  ) {
    jobId = jobId || 764
    img = img || 'zirkansword.png'
    constants = constants || {
      skills: [],
      buffs: [],
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
      name,
      uid,
      action,
      selected,
      lastOnline,
      level,
      sex,
      jobId,
      constants,
      img,
      stats,
      penya,
      inventory,
      equipment,
      armorSet,
      ['Blazing Sword', 'Sword Mastery'],
      ['Shield Bash', 'Keenwheel', 'Guillotine'],
    )
  }

  get health() {
    let health = Math.floor(150 + this.level * 30 + this.stats.sta * this.level * 0.3)
    health *= 1 + this.getExtraParam('maxhp', true) / 100
    health += this.getExtraParam('maxhp', false)
    return Math.floor(health)
  }

  get fp() {
    let fp = Math.floor(this.level * 1.4 + this.stats.sta * 4.9)
    fp *= 1 + this.getExtraParam('maxfp', true) / 100
    fp += this.getExtraParam('maxfp', false)
    return fp
  }

  get mp() {
    let mp = Math.floor(22 + this.level * 1 + this.stats.int * 4.5)
    mp *= 1 + this.getExtraParam('maxmp', true) / 100
    mp += this.getExtraParam('maxmp', false)
    return mp
  }
}

export class Blade extends Mercenary {
  constructor(
    name = null,
    uid = null,
    action = null,
    selected = false,
    lastOnline = null,
    level = 60,
    sex = 'male',
    jobId = null,
    constants = null,
    img = null,
    stats = null,
    penya = null,
    inventory = null,
    equipment = null,
    armorSet = null,
    buffsArray = [],
    skillsArray = [],
  ) {
    jobId = jobId || 2246
    img = img || 'lgaxe.png'
    constants = constants || {
      skills: [],
      buffs: [],
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
      name,
      uid,
      action,
      selected,
      lastOnline,
      level,
      sex,
      jobId,
      constants,
      img,
      stats,
      penya,
      inventory,
      equipment,
      armorSet,
      ['Berserk', 'Smite Axe', 'Axe Mastery', 'Sword Mastery'],
      ['Blade Dance', 'Hawk Attack', 'Cross Strike'],
    )
  }

  get health() {
    let health = Math.floor(150 + this.level * 30 + this.stats.sta * this.level * 0.3)
    health *= 1 + this.getExtraParam('maxhp', true) / 100
    health += this.getExtraParam('maxhp', false)
    return Math.floor(health)
  }

  get fp() {
    let fp = Math.floor(this.level * 2.4 + this.stats.sta * 8.400001)
    fp *= 1 + this.getExtraParam('maxfp', true) / 100
    fp += this.getExtraParam('maxfp', false)
    return fp
  }

  get mp() {
    let mp = Math.floor(22 + this.level * 1.2 + this.stats.int * 5.4)
    mp *= 1 + this.getExtraParam('maxmp', true) / 100
    mp += this.getExtraParam('maxmp', false)
    return mp
  }
}

export class Knight extends Mercenary {
  constructor(
    name = null,
    uid = null,
    action = null,
    selected = false,
    lastOnline = null,
    level = 60,
    sex = 'male',
    jobId = null,
    constants = null,
    img = null,
    stats = null,
    penya = null,
    inventory = null,
    equipment = null,
    armorSet = null,
    buffsArray = [],
    skillsArray = [],
  ) {
    jobId = jobId || 5330
    img = img || 'lgswt.png'
    constants = constants || {
      skills: [],
      buffs: [],
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
      name,
      uid,
      action,
      selected,
      lastOnline,
      level,
      sex,
      jobId,
      constants,
      img,
      stats,
      penya,
      inventory,
      equipment,
      armorSet,
      [
        'Rage',
        'Smite Axe',
        'Axe Mastery',
        'Sword Mastery',
        'Protection',
        'Heart of Fury',
      ],
      ['Pain Dealer', 'Power Stomp', 'Earth Divider'],
    )
  }

  get health() {
    let health = Math.floor(150 + this.level * 40 + this.stats.sta * this.level * 0.4)
    health *= 1 + this.getExtraParam('maxhp', true) / 100
    health += this.getExtraParam('maxhp', false)
    return Math.floor(health)
  }

  get fp() {
    let fp = Math.floor(this.level * 3 + this.stats.sta * 10.5)
    fp *= 1 + this.getExtraParam('maxfp', true) / 100
    fp += this.getExtraParam('maxfp', false)
    return fp
  }

  get mp() {
    let mp = Math.floor(22 + this.level * 1.2 + this.stats.int * 5.4)
    mp *= 1 + this.getExtraParam('maxmp', true) / 100
    mp += this.getExtraParam('maxmp', false)
    return mp
  }
}
