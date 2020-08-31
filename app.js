/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he wishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/

var playerScores = [0, 0];
var roundScores = [0, 0];
var whosTurn = 0;
var playGame = true;

initialize();

document.querySelector('.btn-roll').addEventListener('click', function() {
    if (playGame) {
        var roll = Math.floor(Math.random() * 6) + 1;
        if (roll != 1) {
            document.getElementById("dice").src = "dice-" + roll + ".png";
            roundScores[whosTurn] += roll;
            document.querySelector('#current-' + whosTurn).innerHTML = roundScores[whosTurn];
        } else {
            document.getElementById("dice").src = "dice-" + roll + ".png";
            updatePlayer();
        }        
    }
});

document.querySelector('.btn-hold').addEventListener('click', function() {
    if (playGame) {
        playerScores[whosTurn] += roundScores[whosTurn];
        
        if (playerScores[whosTurn] >= 100) {
            playGame = false;
            roundScores[whosTurn] = 0;
            document.querySelector('#current-' + whosTurn).innerHTML = roundScores[whosTurn];
            document.querySelector('#score-' + whosTurn).innerHTML = playerScores[whosTurn];
            document.querySelector('#name-' + whosTurn).innerHTML = 'YOU WON!';
            document.querySelector('.player-' + whosTurn + '-panel').classList.add('winner');
            document.querySelector('.player-' + whosTurn + '-panel').classList.remove('active');
            whosTurn = whosTurn == 0 ? 1 : 0;
            document.querySelector('#name-' + whosTurn).innerHTML = 'YOU LOST!';
        } else {
            updatePlayer();
        }        
    }
    
});

document.querySelector('.btn-new').addEventListener('click', initialize);

function updatePlayer() {
    roundScores[whosTurn] = 0;

    document.querySelector('#current-' + whosTurn).innerHTML = roundScores[whosTurn];
    document.querySelector('#score-' + whosTurn).innerHTML = playerScores[whosTurn];
    document.querySelector('.player-' + whosTurn + '-panel').classList.remove('active');

    whosTurn = whosTurn == 0 ? 1 : 0;
    document.querySelector('.player-' + whosTurn + '-panel').classList.add('active');    
}

function initialize() {
    playerScores = [0, 0];
    roundScores = [0, 0];
    whosTurn = 0;
    playGame = true;

    document.getElementById("dice").src = "dice-1.png";
    document.querySelector('#score-0').textContent = playerScores[0];
    document.querySelector('#current-0').textContent = playerScores[0];
    document.querySelector('#score-1').textContent = playerScores[1];
    document.querySelector('#current-1').textContent = playerScores[1];

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('#name-0').innerHTML = 'Player 1';
    document.querySelector('#name-1').innerHTML = 'Player 2';
}
