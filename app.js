/*

GAME RULES

-The game has 2 players, playing in rounds
-In each turn, a player rolls a dice as many times as he wishes. Each result get added to his ROUND score
-BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the opponent's turn
-The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the opponent's turn
-The first player to reach 100 points on GLOBAL score wins the game
-You can change the predefine score of 100 to the final score you desire at the bottom of the game

*/

let scores, roundScore, activePlayerm, dice, gamePlaying, lastDice;

init();

dice = Math.floor(Math.random() * 6) + 1;

///////////////ROLL BUTTON///////////////
document.querySelector('.btn-roll').addEventListener('click', function(){
    if(gamePlaying) {
        //1. random number
        let dice1 = Math.floor(Math.random() * 6) + 1;
        let dice2 = Math.floor(Math.random() * 6) + 1;

        //2. display the result
        document.getElementById('dice-1').style.display = 'block';
        document.getElementById('dice-2').style.display = 'block';
        document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
        document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';

        //3. update the round score IF the rolled number was not a 1
        if(dice1 !== 1 && dice2!== 1){
            //add score
            roundScore += dice1 + dice2;
            document.querySelector('#current-' + activePlayer).textContent =roundScore;
        }else{
            
            document.getElementById('pop-alert').classList.add('alert-toggle');
            document.getElementById('alert-content').classList.add('content-toggle');
            //Timeout to remove the alert
            setTimeout(function(){
                document.getElementById('pop-alert').classList.remove('alert-toggle');
                document.getElementById('alert-content').classList.remove('content-toggle');
            }, 1500);

            //next player
            nextPlayer();
        }
        //Another rule
        //A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the opponent's turn 
        /*
        if(dice === 6 && lastDice === 6){
            //player looses score
            scores[activePlayer] = 0;
            //update the ui
            document.querySelector('#score-' + activePlayer).textContent = '0';
            nextPlayer();
        }else if(dice !== 1){
            //add score
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent =roundScore;
        }else{
            //next player
            nextPlayer();
        }
        lastDice = dice;
        */
    }
});

///////////////HOLD BUTTON///////////////
document.querySelector('.btn-hold').addEventListener('click', function(){
    if(gamePlaying){
        //add current score to global score
        scores[activePlayer] += roundScore;

        //update the ui
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        let input = document.querySelector('.final-score').value;
        let winningScore;

        //undefined, o, null or "" are COERCED to false
        //anything else is COERCED to true
        if(input){
            winningScore = input;
        }else{
            winningScore = 100;
        }

        //check if player won the game
        if(scores[activePlayer] >= winningScore){
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.getElementById('dice-1').style.display = 'none';
            document.getElementById('dice-2').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        }else{
            //next player
            nextPlayer();
        }
    }
});

///////////////NEXT PLAYER///////////////
function nextPlayer(){
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0; //same thing as if (activePlayer === 0){ activePlayer = 1; }else{ activePlayer = 0; }
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

///////////////NEW GAME///////////////
function init(){
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}

///////////////BUTTON RULES///////////////
//ADD
document.querySelector('.btn').addEventListener('click', function(){
    document.getElementById('popup').classList.add('popup-alert');
    document.getElementById('popup-content-alert').classList.add('content-alert');
});
//REMOVE
document.querySelector('.popup-close').addEventListener('click', function(){
    document.getElementById('popup').classList.remove('popup-alert');
    document.getElementById('popup-content-alert').classList.remove('content-alert');
});

