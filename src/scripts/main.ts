// Libraries
    // var bootstrap = require('bootstrap/dist/js/bootstrap');
    import * as _ from 'lodash'

// Model
    import { Game 	}           from './modules/Game';
    import { Player }           from './modules/Player';
    import { PlayableCard }     from './modules/PlayableCard';
    import { FightCard }        from './modules/FightCard';
    import { FightCardPower }   from './modules/Vendredi';
    import { GameStateManager } from './modules/GameStateManager'
    let pseudo   = 'Thomas';
    let myPlayer = new Player(pseudo);
    let newGame  = new Game(myPlayer, 1);
    let gsm      = new GameStateManager(newGame)

// Game Config
    newGame.level = 2
// Vue
    import { dangerCard }       from './Vue/dangerCard';
    import { pirateCard }       from './Vue/pirateCard';
    import { playableCard }     from './Vue/playableCard';
    import { gameInfo }         from './Vue/gameInfo';
    import { gameDangerChoice } from './Vue/gameDangerChoice';
    import { gameFight }        from './Vue/gameFight';
    import { gameOver }         from './Vue/gameOver';
    import { gameStateManager } from './Vue/gameStateManager';
    import { sortThreeCards } from './Vue/components/sortThreeCards';
// Main

let app = new Vue({
    el: '#app',
    data: () => {
        return {
            gamestatemanager : gsm,
            initialgame : gsm.game,
            testingHistory : true,
        }
    },
    computed: {
        gsm : function() { return this.gamestatemanager }, 
        game : function() { return this.gsm.game }, 
    },
    components:{
        gameInfo,
        gameDangerChoice,
        gameFight,
        gameOver,
        gameStateManager
    },
    methods: {
        addCardToFight(){
            this.game.addPlayableCardToFight();
        },
        startFight(index:number){
            this.game.startFight(this.game.dangerChoiceCards[index]);
        },
        stopFight(){
            this.game.stopFight();
        },
        endFightLost(arrOfCardsToDelete:Array<PlayableCard>){
            this.game.endFightLost(arrOfCardsToDelete);
        },
        useMyPower(card:FightCard){
            this.game.usePower(card)
        },
        useTwoStepPower(data:{ usedCard:FightCard, assignedCards: Array<PlayableCard>}){
            this.game.usePower(data.usedCard, data.assignedCards)
        },
        save(){
            this.gsm.save();
        },
        load(slotName:null|string){
            this.gsm.load(slotName)
        }
    }
})

