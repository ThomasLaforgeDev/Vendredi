import {Card} from './Card'
import {Tools} from './Tools'
import {PlayableCardInterface, FightCardPower, AgingCardPower} from './Vendredi'
import * as _ from 'lodash'

abstract class PlayableCard extends Card implements PlayableCardInterface {

    constructor(name:string, strength:number, public costToDelete, public power: FightCardPower|AgingCardPower|null, public powerUsed : boolean = false, public initialState?:PlayableCard) {
        super(name, strength);
        this.initialState = _.clone(this);
    }

    // How not implements it o
    abstract show()

    usePower() {
        this.powerUsed = true;
    }

    destroy() {
        this.power = null;
        this.strength = 0;
    }
}

export { PlayableCard }