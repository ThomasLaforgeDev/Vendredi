import {Card} from './Card';
import {FightCardPower, AgingCardPower, PirateMission} from './Vendredi';
import * as _ from 'lodash';

class Tools {
    constructor(){}
    
    static getRandomIndexofArray(arr:Array<any>){
        return Math.floor(Math.random() * (0 + arr.length -1));
    }

    static getFightPowerFromString(powerName : string) : FightCardPower|null {
        switch (powerName) {
            case '+1PV': return FightCardPower.GetOnePV;
            case '+2PV': return FightCardPower.GetTwoPV;
            case 'Copier x1': return FightCardPower.CopyOne;
            case 'Copier x2': return FightCardPower.CopyTwo;
            case 'Phase -1': return FightCardPower.PreviousPhase;
            case 'Echanger x1': return FightCardPower.SwapOne;
            case 'Echanger x2': return FightCardPower.SwapTwo;
            case 'Détruire': return FightCardPower.Destroy ;
            case '+1 Cartes': return FightCardPower.GetOneCard ;
            case '+2 Cartes': return FightCardPower.GetTwoCard ;
            case 'Doubler': return FightCardPower.Double ;
            case 'Trier 3 cartes': return FightCardPower.SortThreeCards ;
            case 'Sous la pioche': return FightCardPower.UnderTheDeck ;        
            default: return null;
        }
    }

    static getFightPowerName(powerName : FightCardPower|null) : string {
        switch (powerName) {
            case FightCardPower.GetOnePV: return  '+1PV' ;
            case FightCardPower.GetTwoPV: return  '+2PV' ;
            case FightCardPower.CopyOne: return  'Copier x1' ;
            case FightCardPower.CopyTwo: return  'Copier x2' ;
            case FightCardPower.PreviousPhase: return  'Phase -1'; 
            case FightCardPower.SwapOne: return  'Echanger x1' ;
            case FightCardPower.SwapTwo: return  'Echanger x2' ;
            case FightCardPower.Destroy: return  'Détruire' ;
            case FightCardPower.GetOneCard: return  '+1 Cartes' ;
            case FightCardPower.GetTwoCard: return  '+2 Cartes' ;
            case FightCardPower.Double: return  'Doubler' ;
            case FightCardPower.SortThreeCards: return  'Trier 3 cartes' ;
            case FightCardPower.UnderTheDeck: return  'Sous la pioche' ;        
            default: return '';
        }
    }

    static getAgingPowerFromString(powerName : string) : AgingCardPower|null {
        switch (powerName) {
            case '-1PV': return AgingCardPower.LoseOnePV;
            case '-2PV': return AgingCardPower.LoseTwoPV;
            case 'La carte la plus forte = 0': return AgingCardPower.MaxEqualsZero;
            case 'Stop': return AgingCardPower.Stop; 
            default: return null;
        }
    }

    static getAgingPowerName(powerName : AgingCardPower|null) : string {
        switch (powerName) {
            case AgingCardPower.LoseOnePV: return  '-1PV';
            case AgingCardPower.LoseTwoPV: return  '-2PV';
            case AgingCardPower.MaxEqualsZero: return  'La carte la plus forte = 0';
            case AgingCardPower.Stop: return  'Stop'; 
            default: return '';
        }
    }
    
    static getPirateMissionFromString(missionName : string) : PirateMission {
        switch (missionName) {
            case 'Chaque carte Combat dévoilée donne +1 point de combat': return PirateMission.EachCardGiveOneFightPoint;
            case 'Comptez uniquement la moitié des cartes Combat dévoilées (les cartes Vieillissement dévoilées doivent être comptées)': return PirateMission.KeepOnlyHalfCards;
            case 'Chaque carte Combat supplémentaire coute 2 points de santé': return PirateMission.EachPayedCardCostTwo;
            case 'Ajoutez 2 points de danger par carte vieillissement ajoutée à votre pile Combat': return PirateMission.AddTwoDangerPointByAgingCardInFigthAddToFightDeck; 
            case 'Combattez toutes les cartes Danger restantes': return PirateMission.FightAllDangerCards; 
            default: return null;
        }
    }

    static getPirateMissionName(missionName : PirateMission) : string {
        switch (missionName) {
            case PirateMission.EachCardGiveOneFightPoint : return  'Chaque carte Combat dévoilée donne +1 point de combat' ;
            case PirateMission.KeepOnlyHalfCards : return  'Comptez uniquement la moitié des cartes Combat dévoilées (les cartes Vieillissement dévoilées doivent être comptées)';
            case PirateMission.EachPayedCardCostTwo : return  'Chaque carte Combat supplémentaire coute 2 points de santé' ;
            case PirateMission.AddTwoDangerPointByAgingCardInFigthAddToFightDeck : return  'Ajoutez 2 points de danger par carte vieillissement ajoutée à votre pile Combat' ; 
            case PirateMission.FightAllDangerCards : return  'Combattez toutes les cartes Danger restantes' ; 
            default: return '';
        }
    }
}

export {Tools}