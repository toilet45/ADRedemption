import { GalaxyGeneratorUpgrades, Ra } from "../globals";
import { AutobuyerState } from "./autobuyer";

export class GalaxyGeneratorUpgradeAutobuyerState extends AutobuyerState{
    get _upgradeName(){
        return ["additive", "multiplicative", "antimatterMult", "IPMult", "EPMult"][this.id-1];
    }

    get data(){
        return player.auto.galgenUpgrades.all[this.id-1];
    }

    get name(){
        return ["Additive", "Multiplicative", "Antimatter", "Infinity Point", "Eternity Point"][this.id-1];
    }

    get isUnlocked(){
        return Ra.unlocks.pelleAutobuyers.isUnlocked && Pelle.hasGalaxyGenerator;
    }

    get bulk(){
        return 0;
    }

    tick(){
        const upgradeName = this._upgradeName;
        GalaxyGeneratorUpgrades[upgradeName].purchase();
    }

    static get entryCount(){
        return 5;
    }

    static get autobuyerGroupName(){ return "Galaxy Generator Upgrade"; }

    static get isActive(){ return player.auto.galgenUpgrades.isActive; }

    static set isActive(value){ player.auto.galgenUpgrades.isActive = value; }
}

export class GalaxyGeneratorSacrificeAutobuyerState extends AutobuyerState{
    get data(){
        return player.auto.galgenSac;
    }

    get name(){
        return "Galaxy Generator Sacrifice";
    }

    get isUnlocked(){
        return Ra.unlocks.pelleAutobuyers.isUnlocked && Pelle.hasGalaxyGenerator;
    }

    get bulk(){
        return 0;
    }

    tick(){
        if(GalaxyGenerator.isCapped) GalaxyGenerator.startSacrifice();
    }
}