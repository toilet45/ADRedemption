import { RaPetAutobuyerState } from "./ra-pet-autobuyer";

export class TeresaMemoryAutobuyerState extends RaPetAutobuyerState{
    get _petName(){ return 'teresa'; }

    get isUnlocked(){
        return Ra.unlocks.rautobuyers.isUnlocked || player.celestials.ra.permanentMemories.ra2;
    }

    static get autobuyerGroupName(){ return "Teresa's Memory"; }
    static get isActive() { return player.auto.pets.teresa.isActive; }
    static set isActive(value) { player.auto.pets.teresa.isActive = value; }
}

export class EffarigMemoryAutobuyerState extends RaPetAutobuyerState{
    get _petName(){ return 'effarig'; }

    get isUnlocked(){
        return Ra.unlocks.rautobuyers.isUnlocked || player.celestials.ra.permanentMemories.ra2;
    }

    static get autobuyerGroupName(){ return "Effarig's Memory"; }
    static get isActive() { return player.auto.pets.effarig.isActive; }
    static set isActive(value) { player.auto.pets.effarig.isActive = value; }
}

export class EnslavedMemoryAutobuyerState extends RaPetAutobuyerState{
    get _petName(){ return 'enslaved'; }

    get isUnlocked(){
        return Ra.unlocks.rautobuyers.isUnlocked || player.celestials.ra.permanentMemories.ra2;
    }

    static get autobuyerGroupName(){ return "Nameless's Memory"; }
    static get isActive() { return player.auto.pets.enslaved.isActive; }
    static set isActive(value) { player.auto.pets.enslaved.isActive = value; }
}

export class VMemoryAutobuyerState extends RaPetAutobuyerState{
    get _petName(){ return 'v'; }

    get isUnlocked(){
        return Ra.unlocks.rautobuyers.isUnlocked || player.celestials.ra.permanentMemories.ra2;
    }

    static get autobuyerGroupName(){ return "V's Memory"; }
    static get isActive() { return player.auto.pets.v.isActive; }
    static set isActive(value) { player.auto.pets.v.isActive = value; }
}

export class RaMemoryAutobuyerState extends RaPetAutobuyerState{
    get _petName(){ return 'ra'; }

    get isUnlocked(){
        return Ra.unlocks.rautobuyers.isUnlocked || player.celestials.ra.permanentMemories.ra2;
    }

    static get autobuyerGroupName(){ return "Ra's Memory"; }
    static get isActive() { return player.auto.pets.ra.isActive; }
    static set isActive(value) { player.auto.pets.ra.isActive = value; }
}

export class LaitelaMemoryAutobuyerState extends RaPetAutobuyerState{
    get _petName(){ return 'laitela'; }

    get isUnlocked(){
        return Ra.unlocks.rautobuyers.isUnlocked || player.celestials.ra.permanentMemories.ra2;
    }

    static get autobuyerGroupName(){ return "Lai'tela's Memory"; }
    static get isActive() { return player.auto.pets.laitela.isActive; }
    static set isActive(value) { player.auto.pets.laitela.isActive = value; }
}

export class PelleMemoryAutobuyerState extends RaPetAutobuyerState{
    get _petName(){ return 'pelle'; }

    get isUnlocked(){
        return Ra.unlocks.rautobuyers.isUnlocked || player.celestials.ra.permanentMemories.ra2;
    }

    static get autobuyerGroupName(){ return "Pelle's Memory"; }
    static get isActive() { return player.auto.pets.pelle.isActive; }
    static set isActive(value) { player.auto.pets.pelle.isActive = value; }
}