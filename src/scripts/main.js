// Jquery et bootstrap
window.jQuery = window.$ = require('jquery');
var bootstrap = require('bootstrap/dist/js/bootstrap');
// jQuery.fn.render = Transparency.jQueryPlugin;

// ES6 modules Style
import { Game 	}         from	'./Game';
import { Player }         from	'./Player';
import { UserInterface }  from	'./UserInterface';

let pseudo   = 'Thomas';
let myPlayer = new Player(pseudo);
let game     = new Game(myPlayer, 1);
let UI       = new UserInterface(game);
let dangerCardChoice = [];

//////////////////
// Etat initial //
//////////////////

// Draw and show danger cards
dangerCardChoice = game.drawDangerCard();
dangerCardChoice.forEach(function(element) {
    element.draw('#danger-choice-card-slots');
}, this);

////////////////
// Evenements //
////////////////

// Select a card in danger card choice zone
$('body').on('click', '.game-danger-choice .card-slot', function(){
  $('.card-slot').removeClass('danger-card-selected');
  $(this).addClass('danger-card-selected');
});

// Chose a card in danger card choice zone
$('body').on('click', '#btn-action-chose-danger', function(){
  if ( $('.danger-card-selected').length > 0 ) {
    let indexDangerCardChoice = $('.danger-card-selected').index();
    game.startFight( dangerCardChoice[indexDangerCardChoice] );
    //Discard other card
    game.dangerDeck.discard( [ dangerCardChoice [ 1 - indexDangerCardChoice ] ] );
    console.log(game.dangerDeck.arrayDiscard);
    // Clean UI : danger card choice zone
    UI.cleanDangerCardChoiceZone();
    // Hide danger card choice zone
    UI.hideDangerCardChoiceZone();
    UI.showFightZone();
  }
});

// Pick a fight card
$('body' ).on('click', '#btn-pick-fight-card', function(){
    if( game.fight ){
        if ( game.fightDeck.isEmpty() ){
            console.log("no more cards in fight deck. You have to end ur fight !");
        }
        else {
          let fightCard = game.drawFightCard();
          game.fight.addFightCard( fightCard );

          if ( game.fight.arrayFightCard.length > game.fight.dangerCard.dangerFreeCards ) {
            game.player.losePV( 1 );
          }
        }
    }
});

// Stop the fight
$('body' ).on('click', 'btn-stop-fight', function(){
    if ( game.fight ){
        if ( game.fight.result() >= 0 ){
            let arrayOfCardsToDiscard = game.fight.arrayFightCard.push( game.fight.dangerCard );
            game.fightDeck.addToDiscard( arrayOfCardsToDiscard );
        }
        else{
            game.player.losePV( Math.abs( game.fight.result() ) );
            if ( !game.isGameOver() ) {
                UI.askPlayerDeleteCards();
            }
        }
    }
});

// Watchers

watch(game, function(){
  UI.updateMainInfos();
  if ( game.isGameOver() ){
      console.log('The game is over !');
  }
});

watch(game, "_fight", function(){
  UI.updateFightZone();
});
/*
while ( !game.isGameOver() ) {
    while ( game.level <= 3 ){
        // Step 1 : Chose a fight card
        while ( !game.fightCardChose ) {
            // Do Stuff
            console.log('in loop 1');
        }

        // Step 2 : Do the fight
        while ( !game.fightEnded ) {
            console.log('in loop 2');
        }

        if ( game.dangerDeck.isEmpty() ){
            game.level += 3;
        }
    }

}
*/

/*
    es6 generators

let gameProcess = gameCycle();
gameProcess.next();
gameProcess.next();

function* gameCycle(){
 while(true){
     console.log(1);
        yield;
         // just pause
       console.log(2);
        yield; // pause waiting for a parameter to pass into `foo(..)`
       console.log(3);

 }
} */

// Interface

$('a[data-toggle="popover"]').popover({
    animated: 'fade',
    placement: 'bottom',
    html: true
});

//console.log(myPlayer instanceof Player);
