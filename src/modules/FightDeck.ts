import { PlayableDeck }  from "./PlayableDeck";
import { PlayableCard }  from "./PlayableCard";
import { FightCard } from "./FightCard";
import { Tools } from './Tools';
import { jsonDataFight, FightCardPower } from './Vendredi';

class FightDeck extends PlayableDeck {
	constructor(arrayCard?:Array<PlayableCard>, arrayDiscard?:Array<PlayableCard>){
        super(arrayCard, arrayDiscard);
	}

    initDeck(){
        let arrRes:Array<FightCard> = [];
        let arrDatas = require('../datas/fight_cards.json');
        arrDatas.forEach( (obj:jsonDataFight) => {
            let number = obj.number;
            let power = obj.power ? Tools.getFightPowerFromString(obj.power) : null;
            for (let i=0; i<number; i++) {
                let newFight = new FightCard( obj.name, obj.strength, power );
                arrRes.push(newFight);
            }
        });

        this.arrayDeck = arrRes;

    }

    getThreeFirstCards() : Array<PlayableCard>{
        return this.arrayDeck.slice(0,3);
    }

    switchFirstCards(cards: Array<PlayableCard>) {
        let spliceArgs:Array<number|PlayableCard> = [0,cards.length];
        let args:Array<number|PlayableCard> = spliceArgs.concat(cards);
        Array.prototype.splice.apply(this.arrayDeck, args);
    }

    getStrength(){
        return (this.getDiscardStrength() + this.getDeckStrength()) / 2
    }

    getTotalStrength(){
        return this.getDeckTotalStrength() + this.getDiscardTotalStrength()
    }
    getDeckTotalStrength(){
        return this.arrayDeck.reduce( (sum, fightCard) => sum + fightCard.strength, 0)
    }
    getDeckStrength(){
        return this.getDeckTotalStrength() / this.arrayDeck.length
    }
    getDiscardTotalStrength(){
        return this.arrayDiscard.reduce( (sum, fightCard) => sum + fightCard.strength, 0)
    }
    getDiscardStrength(){
        return this.getDiscardTotalStrength() / this.arrayDiscard.length
    }
}

export {FightDeck}
