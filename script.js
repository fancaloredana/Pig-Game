'use strict';

// Selecting elements
const player0El=document.querySelector('.player--0');
const player1El=document.querySelector('.player--1');
let score0El=document.querySelector('#score--0');
let score1El=document.getElementById('score--1');
let currentScore0El=document.getElementById('current--0');
let currentScore1El=document.getElementById('current--1');
const diceImg=document.querySelector('.dice'); //for the dice image
const btnNew=document.querySelector('.btn--new');
const btnRoll=document.querySelector('.btn--roll');
const btnHold=document.querySelector('.btn--hold');

// Starting conditions
let playing;
let scores;
let currentScore;
let activePlayer;

const init=function(){
    scores=[0,0];
    currentScore=0;
    activePlayer=0;
    playing=true;

    score0El.textContent=0;
    score1El.textContent=0;
    currentScore0El.textContent=0; currentScore1El.textContent=0;

    diceImg.classList.add('hidden');
   document.querySelector('.player--0').classList.add('player--active');
   document.querySelector('.player--1').classList.remove('player--active');
   player0El.classList.remove('player--winner');
   player1El.classList.remove('player--winner');
};
init();

const switchPlayer=function(){
    document.getElementById(`current--${activePlayer}`).textContent=0;
    currentScore=0;
    activePlayer=activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
};


// Rolling dice functionality
btnRoll.addEventListener('click',function(){
    if(playing){
 // 1. Generating a random dice roll
const dice=Math.trunc(Math.random()*6)+1;

// 2. Display dice
diceImg.classList.remove('hidden');
diceImg.src=`dice-${dice}.png`;

// 3. Check for roll 1
if(dice !== 1){
// Add dice to the current score
    currentScore += dice;
    document.getElementById(`current--${activePlayer}`).textContent=currentScore;

}else{
// switch to next player
switchPlayer();
}
}
});

btnHold.addEventListener('click',function(){
if(playing){
    // 1. Add current score to active player`s score
   scores[activePlayer] += currentScore;
   document.getElementById(`score--${activePlayer}`).textContent=scores[activePlayer];

    // 2.Check if current score is >= 100
if (scores[activePlayer] >= 100){
//  Finish the game
diceImg.classList.add('hidden');
playing=false;
document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');

}else{
    // Switch to the next player
    switchPlayer();
}
}
});

btnNew.addEventListener('click',init);

