/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he wishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying; //to keep the code more organized

init();

var lastDice;

var upperLimit;

document.querySelector('.btn-roll').addEventListener('click', function () {
  //anonymous function

  if (gamePlaying) {
    //1.Random number
    var dice1 = Math.ceil(Math.random() * 6);
    var dice2 = Math.ceil(Math.random() * 6);

    //2.Display the result

    document.getElementById('dice-1').style.display = 'block';
    document.getElementById('dice-2').style.display = 'block';
    document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
    document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';

    //3.Update the round score if the rolled number was not 1

    if (dice1 !== 1 && dice2 !== 1) {
      //Add score
      roundScore += dice1 + dice2; //roundScore can be accessed here as it is declared in the global scope
      document.querySelector(
        '#current-' + activePlayer
      ).textContent = roundScore;
    } else {
      nextPlayer(); //using DRY Principle
    }
  }
});

document.querySelector('.btn-hold').addEventListener('click', function () {
  if (gamePlaying) {
    //Add current score to global score

    scores[activePlayer] += roundScore;

    //Update the UI

    document.querySelector('#score-' + activePlayer).textContent =
      scores[activePlayer];

    var input = document.querySelector('.final-score').value;
    var winningScore;

    // Undefined, 0, null or "" are COERCED to false
    // Anything else is COERCED to true
    if (input) {
      winningScore = input;
    } else {
      winningScore = 100;
    }

    //Check if the pLayer won the game

    // if (scores[activePlayer] >= maxScore())
    if (scores[activePlayer] >= winningScore) {
      document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
      hideDice();
      document
        .querySelector('.player-' + activePlayer + '-panel')
        .classList.add('winner');
      document
        .querySelector('.player-' + activePlayer + '-panel')
        .classList.remove('active');

      gamePlaying = false;
    } else {
      //Next Player - Clicking the hold button has the same functionality as that of when a player gets 1 during dice roll

      nextPlayer(); // using DRY principle
    }
  }
});

function nextPlayer() {
  //next player
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;

  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  document.querySelector('.player-0-panel').classList.toggle('active'); // red dot and highlighted player
  document.querySelector('.player-1-panel').classList.toggle('active');

  hideDice(); //no dice when 1 or 2 consecutive 6's
}

document.querySelector('.btn-new').addEventListener('click', init); //clicking new game calls init

function init() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0; //current active player
  gamePlaying = true;

  hideDice();

  document.getElementById('score-0').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';

  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active'); // dont want 2 active classes so we remove and add
  console.log('thats all folks');
}

function hideDice() {
  document.getElementById('dice-1').style.display = 'none';
  document.getElementById('dice-2').style.display = 'none';
}

console.log('CHALLENGE ACCEPTED');
