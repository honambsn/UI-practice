// define size of each grid space

const gridSpace = 30;

// declare variables
let fallingPiece;
let gridPieces = [];
let lineFades = [];
let gridWorkers = [];

let currentScore = 0;
let currentLevel = 0;
let linesCleared = 0;

let ticks = 0;
let updateEvery = 15;
let updateEveryCurrent = 15;
let fallSpeed = gridSpace * 0.5; // modify based on level
//let fallSpeedCurrent = gridSpace * 0.5;
let pauseGame = false;
let gameOver = false;

//define the edged of game area
const gameEdgeLeft = 150;
const gameEdgeRight = 450;

// define the colors for the pieces
const colors = [
    '#dca3ff',
    '#ff90a0',
    '#80ffb4',
    '#ff7666',
    '#70b3f5',
    '#b2e77d',
    '#ffd700'
];

// setup function called once at beginning
function setup() {
    createCanvas(600, 540);

    //create a new falling piece
    fallingPiece = new PlayPiece();
    fallingPiece.resetPiece();

    //set the font for the text
    textFont('Ubuntu');
}

// draw function called repeatedly
function draw(){
    //define colors used in game
    const colorDark = '#0d0d0d';
    const colorLight = '304550';
    const colorBackground = '#e1eeb0';

    //set the background color
    background(colorBackground);
    
    //draw the right side info panel
    fill(25);
    noStroke();
    rect(gameEdgeRight, 0, 150, height);

    //draw the left side info panel
    rect(0, 0, gameEdgeLeft, height);

    //draw the score rectangle
    fill(colorBackground);
    rect(450, 80, 150, 70);

    //draw the next piece rectangle
    rect(460, 405, 130, 130, 5, 5);

    //draw the level rectangle
    rect(460, 210, 130, 60, 5, 5);
}
