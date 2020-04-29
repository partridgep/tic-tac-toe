// MODEL

/*----- constants -----*/
const players = {
    '1': 'X',
    '-1': 'O'
};

const combos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2]
];

/*----- app's state (variables) -----*/
let turn, gameboard, winner;

// CONTROLLER

/*----- cached element references -----*/
const h3El = document.querySelector('h3');
const gameboardEl = document.getElementById('gameboard');
const squareEls = document.getElementsByClassName('square');
const buttonEl = document.querySelector('button');

/*----- event listeners -----*/
gameboardEl.addEventListener('click', handleClick);
buttonEl.addEventListener('click', init);

/*----- functions -----*/
//start game as soon as call page
init();

//start/initialize the game or reset
function init() {
    winner = false; //no winner
    turn = 1; // start with player X first
    gameboard = Array(9).fill(null); //gameboard with 9 empty positions
    render(); //transfer to DOM
};

function handleClick(evt) {
    const selectedIdx = evt.target.dataset.index;
    //if a square is clicked - update gameboard state
    //if square already has a value -- DON'T UPDATE
    if(winner || gameboard[selectedIdx]) return;
    gameboard[selectedIdx] = turn;
    console.log(gameboard);
    //check gameboard to see if there is a winner
    winner = checkWinner();
    //toggle turn
    turn *= -1;
    //transfer the state of the game to the DOM
    render()
};

function checkWinner() {
    //check over combos and compare winning combos 
    //to current positions of 1s or -1s inside gameboard
    for(let i = 0; i < combos.length; i++) {
        if(Math.abs(gameboard[combos[i][0]] +
            gameboard[combos[i][1]] +
            gameboard[combos[i][2]]) === 3) 
            //return value of whoever is winner
            return gameboard[combos[i][0]]
    };
    
    //if no winner and no nulls we have a tie
    if(gameboard.includes(null)) return false;
    return 'T';

};

function render() {
    //transfer state of gameboard array to DOM elements
    gameboard.forEach(function(value, index) {
        squareEls[index].textContent = players[value];
    });
    if(!winner) {
        h3El.textContent = `Player ${players[turn]}'s Turn`;
    }
    else if (winner === 'T') {
        h3El.textContent = 'Tie Game';
    }
    else {
        h3El.textContent = `${players[winner]} wins!!`;
    }

};





//pseudocode
/*
0) We need to initializee the game first and set the turn to X
 0.1 We need to create the gameboard we can use to keep track of all the game pieces
 0.2 We also need to set winner to false
 0.3 We need to store the winning combinations in a data structure
 0.4 We need to store the players in a structure and be able to toggle between them

1) We need all the squares to be clickable. 
    1.1 We need to know which square was clicked on
2) If a square is clicked, we need to place an X or O depending on whose turn

*/
