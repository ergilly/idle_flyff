import { Utils } from './utils.js'
import Moverutils from './moverutils.js'
import { DamageCalculator } from './damageCalculator.js'
/**
 * The mover class is the base of all characters. Acts as a helper class for a lot of functions.
 */
export class Mover {
  applyData(json) {
    Object.assign(this, json)
  } // Importing a character

  async update() {
    this.armorSetUpgradeBonus = await Utils.getUpgradeBonus(
      Math.min(
        this.helmetUpgrade,
        this.suitUpgrade,
        this.gauntletUpgrade,
        this.bootsUpgrade,
      ),
    )
    this.helmetUpgradeBonus = await Utils.getUpgradeBonus(this.helmetUpgrade)
    this.suitUpgradeBonus = await Utils.getUpgradeBonus(this.suitUpgrade)
    this.gauntletUpgradeBonus = await Utils.getUpgradeBonus(this.gauntletUpgrade)
    this.bootsUpgradeBonus = await Utils.getUpgradeBonus(this.bootsUpgrade)
    this.mainhandUpgradeBonus = await Utils.getUpgradeBonus(
      this.mainhandUpgrade,
    )
    this.offhandUpgradeBonus = await Utils.getUpgradeBonus(this.offhandUpgrade)

    this.applyBuffs()
    this.applyPremiumItems()
    // this.applyBaseStats()

    this.stats.str = Math.floor(this.stats.str)
    this.stats.sta = Math.floor(this.stats.sta)
    this.stats.dex = Math.floor(this.stats.dex)
    this.stats.int = Math.floor(this.stats.int)

    this.criticalChance = this.getCriticalChance()
    this.aspd = this.getAspd()
    this.DCT = this.getDCT()
    this.attack = this.getAttack()
    this.criticalDamage = this.getCriticalDamage()
    this.hitrate = this.getHitrate()
    this.meleeBlock = this.getBlock()
    this.rangedBlock = this.getBlock(true)

    return this
  }

  applyBaseStats() {
    this.stats.str = 15 + Utils.addedStr + this.getExtraParam('str')
    this.stats.sta = 15 + Utils.addedSta + this.getExtraParam('sta')
    this.stats.dex = 15 + Utils.addedDex + this.getExtraParam('dex')
    this.stats.int = 15 + Utils.addedInt + this.getExtraParam('int')
  }

  applyBuffs() {
    // RM/Assist Buffs
    if (this.assistBuffs) {
      for (const buff of Utils.assistBuffs) {
        if (this.activeBuffs.find((b) => b.id == buff.id)) continue
        buff.enabled = true
        this.activeBuffs.push(buff)
      }
    } else {
      this.activeBuffs = this.activeBuffs.filter((val) => {
        return !Utils.assistBuffs.find((b) => b.id == val.id)
      })
    }

    // Self Buffs
    if (this.selfBuffs) {
      for (const buff of this.constants.buffs) {
        if (this.activeBuffs.find((b) => b.id == buff.id)) continue
        if (buff.level > this.level) continue
        buff.enabled = true
        this.activeBuffs.push(buff)
      }
    } else {
      this.activeBuffs = this.activeBuffs.filter((val) => {
        return !this.constants.buffs.find((b) => b.id == val.id)
      })
    }

    // Remove any buffs above our level
    this.activeBuffs = this.activeBuffs.filter((val) => {
      return val.level <= this.level || val.class == 9389 || val.class == 8962
    })
  }

  applyPremiumItems() {
    for (const item of Utils.premiumItems) {
      if (item) {
        if (this.activePremiumItems.find((i) => i.id == item.id)) continue
        item.enabled = false // disable all items initially
        this.activePremiumItems.push(item)
      }
    }
  }

  get parry() {
    const parry = this.stats.dex / 2
    return parry
  }

  get defense() {
    // TODO: Use computeDefense from DamageCalculator
    let defense = Math.floor(
      (this.level * 2 + this.stats.sta / 2) / 2.8 -
        4 +
        (this.stats.sta - 14) * this.constants.Def,
    )
    defense += this.getExtraParam('def')
    defense += this.getEquipmentDefense()
    defense *= 1 + this.getExtraParam('def', true) / 100
    return Math.floor(defense)
  }

  getBlock(ranged = false) {
    // CMover::GetBlockFactor
    let extra = this.getExtraParam('block', true)
    if (ranged) {
      extra += this.getExtraParam('rangedblock', true)
    } else {
      extra += this.getExtraParam('meleeblock', true)
    }

    const attackerDex = 15 // Fixed to 15 in the stat window in-game

    const blockB = Utils.clamp(
      Math.floor(
        (this.stats.dex + attackerDex + 2) * ((this.stats.dex - attackerDex) / 800.0),
      ),
      0,
      10,
    )
    const blockRate = Math.floor((this.stats.dex / 8.0) * this.constants.block)
    const final = Math.max(blockB + blockRate, 0) + extra
    return final > 100 ? 100 : final
  }

  getAspd() {
    const weaponAspd = this.equipment.mainhand.attackSpeedValue
    const statScale = 4.0 * this.stats.dex + this.level / 8.0

    const plusValue = [
      0.08, 0.16, 0.24, 0.32, 0.4, 0.48, 0.56, 0.64, 0.72, 0.8, 0.88, 0.96,
      1.04, 1.12, 1.2, 1.3, 1.38, 1.5,
    ]

    const minBaseSpeed = 0.125
    const maxBaseSpeed = 2.0
    const baseSpeedScaling = 200.0

    const baseDividend = baseSpeedScaling * minBaseSpeed
    const maxBaseScaledSpeed = baseSpeedScaling - baseDividend / maxBaseSpeed

    const baseSpeed = Math.floor(
      Math.min(
        this.constants.attackSpeed + weaponAspd * statScale,
        maxBaseScaledSpeed,
      ),
    )

    let speed = baseDividend / (baseSpeedScaling - baseSpeed)

    const plusValueIndex = Math.floor(
      Utils.clamp(baseSpeed / 10, 0, Math.floor(plusValue.length - 1)),
    )
    speed += plusValue[plusValueIndex]

    const attackSpeed = this.getExtraParam('attackspeed', false) / 1000.0
    speed += attackSpeed

    const attackSpeedRate = this.getExtraParam('attackspeed', true)
    if (attackSpeedRate > 0) {
      speed += (attackSpeedRate * 2) / 100
    }

    speed = Utils.clamp(speed, 0.1, 2.0)
    return speed
  }

  getCriticalChance() {
    let chance = this.stats.dex / 10
    chance = Math.floor(chance * this.constants.critical)
    chance += this.getExtraParam('criticalchance', true)
    chance = Math.max(chance, 0)

    return chance
  }

  getDCT() {
    let speed = 1.0 + this.getExtraParam('decreasedcastingtime', true) / 100.0
    speed = Utils.clamp(speed, 0.1, 2.0)
    return speed
  }

  getAttack() {
    const damageCalculator = new DamageCalculator(this, Utils.focus)
    const minMax = damageCalculator.getHitMinMax()

    // Simulate attack bonus from DamageCalculator
    let atkPower = Math.floor((minMax[0] + minMax[1]) / 2)

    // Upcut Stone
    if (
      this.activePremiumItems.find((buff) => buff.id == 8691 && buff.enabled)
    ) {
      atkPower = Math.floor(atkPower * 1.2)
    }

    const atkPowerRate = this.getExtraParam('attack', true)
    if (atkPowerRate > 0) {
      atkPower += (atkPower * atkPowerRate) / 100
    }

    atkPower += this.getExtraParam('attack')

    atkPower = Math.floor(atkPower)
    return Math.max(atkPower, 0)
  }

  /**
   * Get the total bonus critical damage %.
   */
  getCriticalDamage() {
    let adoch = 0
    adoch += this.getExtraParam('criticaldamage', true)
    return adoch
  }

  getHitrate() {
    // This is just the value displayed in the stats window, basically not used anywhere else
    let hit = this.stats.dex / 4
    hit += this.getExtraParam('hitrate', true)
    return Math.max(hit, 0)
  }

  getEquipmentDefense() {
    let nValue = 0
    let min = 0
    let max = 0
    if (this.equipment.offhand && this.equipment.offhand.subcategory == 'shield') {
      min += this.equipment.offhand.minDefense
      max += this.equipment.offhand.maxDefense

      if (this.offhandUpgradeBonus != null) {
        min *= 1 + this.offhandUpgradeBonus.shieldDefense / 100
        max *= 1 + this.offhandUpgradeBonus.shieldDefense / 100

        const upgradeValue = Math.floor(
          this.offhandUpgradeBonus.upgradeLevel ** 1.5,
        )
        min += upgradeValue
        max += upgradeValue
      }
    }
    const parts = [this.equipment.helmet, this.equipment.suit, this.equipment.gauntlet, this.equipment.boots]
    for (const part of parts) {
      if (part) {
        let _min = part.minDefense
        let _max = part.maxDefense

        if (this[`${part.subcategory}UpgradeBonus`] != null) {
          _min *=
            1 +
            this[`${part.subcategory}UpgradeBonus`][
              `${part.subcategory}Defense`
            ] /
              100
          _max *=
            1 +
            this[`${part.subcategory}UpgradeBonus`][
              `${part.subcategory}Defense`
            ] /
              100

          const upgradeValue = Math.floor(
            this[`${part.subcategory}UpgradeBonus`].upgradeLevel ** 1.5,
          )
          _min += upgradeValue
          _max += upgradeValue
        }

        min += _min
        max += _max
      }
    }

    nValue = max - min
    return min + nValue / 2
  }

  /**
   * Returns the amount of <param> found in all equipment and all buffs.
   * @param param The parameter to look for in all equipment and buffs
   */
  getExtraParam(param, rate = false) {
    return (
      this.getExtraGearParam(param, rate) + this.getExtraBuffParam(param, rate)
    )
  }

  getExtraBuffParam(param, rate = false) {
    return this.buffParam(param, rate) + this.premiumItemParam(param, rate)
    // return this.assistBuffParam(param, rate) + this.selfBuffParam(param, rate);
  }

  getExtraGearParam(param, rate = false) {
    return (
      this.armorParam(param, rate) +
      this.weaponParam(param, rate) +
      this.jeweleryParam(param, rate)
    )
  }

  armorParam(param, rate = false) {
    // var params = [param].concat(Utils.globalParams[param]);
    const params = [param]

    let add = 0
    if (this.armorSet && this.armorSet.bonus) {
      const bonus = this.armorSet.bonus.find(
        (a) => params.includes(a.ability.parameter) && a.ability.rate == rate,
      )
      if (bonus) add = bonus.ability.add
    }

    // Armor inherent abilities
    if (this.armorSet) {
      for (const piece of this.armorSet.parts) {
        const item = Utils.getItemById(piece)
        if (item.abilities != undefined) {
          for (const ability of item.abilities) {
            if (params.includes(ability.parameter) && ability.rate == rate) {
              add += ability.add
            }
          }
        }
      }
    }

    // Suit Piercing
    if (this.equipment.suitPiercing) {
      const ability = this.equipment.suitPiercing.abilities[0] // Piercing cards only have one ability
      if (params.includes(ability.parameter) && ability.rate == rate) {
        add += ability.add * 4 // 4 card piercing slots
      }
    }

    // Armor upgrade set effects
    if (this.armorSetUpgradeBonus != null) {
      const bonus = this.armorSetUpgradeBonus.setAbilities.find(
        (a) => params.includes(a.parameter) && a.rate == rate,
      )
      if (bonus) add += bonus.add
    }

    return add
  }

  weaponParam(param, rate = false) {
    let add = 0
    // var params = [param].concat(Utils.globalParams[param]);
    const params = [param]

    // Mainhand bonus addition
    if (this.equipment.mainhand && this.equipment.mainhand.abilities) {
      const bonus = this.equipment.mainhand.abilities.find(
        (a) => params.includes(a.parameter) && a.rate == rate,
      )
      if (bonus) add += bonus.add
    }

    // Offhand bonus addition, including shields
    if (this.equipment.offhand && this.equipment.offhand.abilities) {
      if (this.equipment.offhand.subcategory == 'shield') {
        this.equipment.offhand.abilities.forEach((ability) => {
          if (params.includes(ability.parameter) && ability.rate == rate) {
            add += ability.add
          }
        })
      } else {
        const bonus = this.equipment.offhand.abilities.find(
          (a) => params.includes(a.parameter) && a.rate == rate,
        )
        if (bonus) add += bonus.add
      }
    }

    return add
  }

  jeweleryParam(param, rate = false) {
    let add = 0
    // var params = [param].concat(Utils.globalParams[param]);
    const params = [param]

    if (this.equipment.earringR && this.equipment.earringR.abilities) {
      const bonus = this.equipment.earringR.abilities.find(
        (a) => params.includes(a.parameter) && a.rate == rate,
      )
      if (bonus) add += bonus.add
    }

    if (this.equipment.earringL && this.equipment.earringL.abilities) {
      const bonus = this.equipment.earringL.abilities.find(
        (a) => params.includes(a.parameter) && a.rate == rate,
      )
      if (bonus) add += bonus.add
    }

    if (this.equipment.ringR && this.equipment.ringR.abilities) {
      const bonus = this.equipment.ringR.abilities.find(
        (a) => params.includes(a.parameter) && a.rate == rate,
      )
      if (bonus) add += bonus.add
    }

    if (this.equipment.ringL && this.equipment.ringL.abilities) {
      const bonus = this.equipment.ringL.abilities.find(
        (a) => params.includes(a.parameter) && a.rate == rate,
      )
      if (bonus) add += bonus.add
    }

    if (this.equipment.necklace && this.equipment.necklace.abilities) {
      const bonus = this.equipment.necklace.abilities.find(
        (a) => params.includes(a.parameter) && a.rate == rate,
      )
      if (bonus) add += bonus.add
    }

    // cloak added here
    if (this.cloak && this.cloak.abilities) {
      const bonus = this.cloak.abilities.find(
        (a) => params.includes(a.parameter) && a.rate == rate,
      )
      if (bonus) add += bonus.add
    }

    return add
  }

  /**
   * Returns additions to a specific value from your active & enabled buffs
   * @param param The value to find additions for
   */
  buffParam(param, rate = false) {
    let add = 0
    // let params = [param].concat(Utils.globalParams[param]);
    const params = [param]

    for (const buff of this.activeBuffs) {
      if (!buff.enabled) continue // Don't add disabled buffs
      const maxLevel = buff.levels.slice(-1)[0]
      const { abilities } = maxLevel

      for (const ability of abilities) {
        if (params.includes(ability.parameter) && ability.rate == rate) {
          add += ability.add

          if (
            maxLevel.scalingParameters != undefined &&
            (buff.class == 9389 || buff.class == 8962)
          ) {
            for (const scaling of maxLevel.scalingParameters) {
              if (params.includes(scaling.parameter)) {
                let extra = scaling.scale * this.assistInt
                extra = Math.min(extra, scaling.maximum)
                add += extra
              }
            }
          }
        }
      }
    }

    return add
  }

  /**
   * Returns additions to a specific value from your active & enabled premium items
   * @param param The value to find additions for
   */
  premiumItemParam(param, rate = false) {
    let add = 0
    // let params = [param].concat(Utils.globalParams[param]);
    const params = [param]

    for (const premiumItem of this.activePremiumItems) {
      if (!premiumItem.enabled) continue // Don't add disabled buffs
      const { abilities } = premiumItem

      if (abilities != undefined) {
        for (const ability of abilities) {
          if (params.includes(ability.parameter) && ability.rate == rate) {
            add += ability.add
          }
        }
      }
    }

    return add
  }

  /**
   * Returns whether or not the given buff is active.
   */
  hasBuff(buffId) {
    const buff = this.activeBuffs.find((b) => b.id == buffId)
    if (buff) {
      return buff.enabled
    }

    return false
  }

  /**
   * Get your damage against a specific monster
   * @param {object} opponent The monster you are facing
   * @param {number} skillIndex The index of the skill you are using, null or -1 if none
   */
  getDamage(opponent = Moverutils.trainingDummy) {
    this.update()

    const damageCalculator = new DamageCalculator(this, opponent)
    opponent.playerDamage = damageCalculator.computeDamage()
    opponent.ttk = damageCalculator.getTimeToKill()
    opponent.dps = damageCalculator.getDamagePerSecond()
    opponent.blockFactor = damageCalculator.getBlockFactor().toFixed(3)
    opponent.effectiveHitRate = damageCalculator.getHitRate()
  }

  /**
   * Calculates the best STR:DEX ratio against the given target
   * @param target The targetted monster.
   */
  getOptimalAutoRatio(target) {
    let dpsValues = []
    let ratios = []

    // Calculating for at least level 15
    this.level = this.level < 15 ? 15 : this.level

    this.stats.str -= Utils.addedStr
    this.stats.sta -= Utils.addedSta
    this.stats.dex -= Utils.addedDex
    this.stats.int -= Utils.addedInt

    let str
    let dex
    let dps
    let ratio
    let maxRatio
    let maxDPS = -1
    let damageCalculator
    const points = this.level * 2 - 2
    for (let i = 0; i < 10; i++) {
      // Compute the new stats
      str = Math.floor(points * (i / 10))
      dex = points - str

      this.stats.str += str
      this.stats.dex += dex

      this.criticalChance = this.getCriticalChance()
      this.aspd = this.getAspd()
      this.attack = this.getAttack()
      this.hitrate = this.getHitrate()

      // Compute the new damage
      damageCalculator = new DamageCalculator(this, target)
      dps = damageCalculator.getDamagePerSecond()
      ratio = `Allocate ${str} STR, ${dex} DEX`
      dpsValues = [...dpsValues, dps]
      ratios = [...ratios, ratio]

      if (dps > maxDPS || maxDPS == -1) {
        maxDPS = dps
        maxRatio = i + 1
      }

      this.stats.str -= str
      this.stats.dex -= dex
    }

    return { maxDPS, maxRatio, dpsValues, ratios }
  }
}
