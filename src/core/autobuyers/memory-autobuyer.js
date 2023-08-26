import { RaPetAutobuyerState } from "./ra-pet-autobuyer";

//disable all of these until we figure out when they should be unlocked
const placeholder = false;

export class TeresaMemoryAutobuyerState extends RaPetAutobuyerState{
    get _petName(){ return 'teresa'; }

    get isUnlocked(){
        return placeholder;
    }

    static get autobuyerGroupName(){ return "Teresa's Memory"; }
    static get isActive() { return player.auto.pets.teresa.isActive; }
    static set isActive(value) { player.auto.pets.teresa.isActive = value; }
}

export class EffarigMemoryAutobuyerState extends RaPetAutobuyerState{
    get _petName(){ return 'effarig'; }

    get isUnlocked(){
        return placeholder;
    }

    static get autobuyerGroupName(){ return "Effarig's Memory"; }
    static get isActive() { return player.auto.pets.effarig.isActive; }
    static set isActive(value) { player.auto.pets.effarig.isActive = value; }
}

export class EnslavedMemoryAutobuyerState extends RaPetAutobuyerState{
    get _petName(){ return 'enslaved'; }

    get isUnlocked(){
        return placeholder;
    }

    static get autobuyerGroupName(){ return "Nameless's Memory"; }
    static get isActive() { return player.auto.pets.enslaved.isActive; }
    static set isActive(value) { player.auto.pets.enslaved.isActive = value; }
}

export class VMemoryAutobuyerState extends RaPetAutobuyerState{
    get _petName(){ return 'v'; }

    get isUnlocked(){
        return placeholder;
    }

    static get autobuyerGroupName(){ return "V's Memory"; }
    static get isActive() { return player.auto.pets.v.isActive; }
    static set isActive(value) { player.auto.pets.v.isActive = value; }
}