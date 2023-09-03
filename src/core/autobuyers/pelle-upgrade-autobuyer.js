import { PelleUpgrade, Ra } from "../globals";
import { AutobuyerState } from "./autobuyer";

export class PelleRebuyableUpgradeAutobuyerState extends AutobuyerState{
    get _upgradeName(){
        return ["antimatterDimensionMult", "timeSpeedMult", "glyphLevels", "infConversion", "galaxyPower"][this.id-1];
    }

    get data(){
        return player.auto.pelleRebuyableUpgrades.all[this.id-1];
    }

    get name(){
        return ["Antimatter Dimension Multiplier", "Game Speed Multiplier", "Allowed Glyph Level", "Infinity Power Conversion Rate", "Galaxy Power"][this.id-1];
    }

    get isUnlocked(){
        return Ra.unlocks.pelleAutobuyers.isUnlocked;
    }

    get bulk(){
        return 0;
    }

    tick(){
        const upgradeName = this._upgradeName;
        PelleUpgrade[upgradeName].purchase();
    }

    static get entryCount(){
        return 5;
    }

    static get autobuyerGroupName(){ return "Rebuyable Pelle Upgrade"; }

    static get isActive(){ return player.auto.pelleRebuyableUpgrades.isActive; }

    static set isActive(value){ player.auto.pelleRebuyableUpgrades.isActive = value; }
}

export class PelleUpgradeAutobuyerState extends AutobuyerState{
    get data(){
        return player.auto.pelleUpgrades;
    }

    get name(){
        return "Pelle Upgrades";
    }

    get isUnlocked(){
        return Ra.unlocks.pelleAutobuyers.isUnlocked;
    }

    get bulk(){
        return 0;
    }

    tick(){
        const nextUpgrade = PelleUpgrade.singles.find(upgrade => upgrade.canBeBought);
        if(nextUpgrade != undefined) {
            nextUpgrade.purchase();
        }
    }
}