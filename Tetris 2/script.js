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

    // draw the score lines
    fill(colorLight);
    rect(450, 85, 150, 20);
    rect(450, 110, 150, 4);
    rect(450, 140, 150, 4);

    // draw the score banner
    fill(colorBackground);
    rect(460, 60, 130, 35, 5, 5);

    //draw the score banner inner rect
    strokeWeight(3);
    noFill();
    stroke(colorLight);
    rect(465, 65, 120, 25, 5, 5);

    //draw the next piece inner rect
    stroke(colorLight);
    rect(465, 410, 120, 120, 5, 5);

    //draw the level inner rect
    rect(465, 215, 120, 50, 5, 5);

    // draw the lines rect
    rect(465, 285, 120, 50, 5, 5);

    //draw the info labels
    fill(25);
    noStroke();
    textSize(24);
    textAlign(CENTER);
    text('SCORE', 525, 85);
    text('LEVEL', 525, 238);
    text('LINES', 525, 308);

    // draw the actual info
    textSize(24);
    textAlign(RIGHT);
    text(currentScore, 560, 135);
    text(currentLevel, 560, 260);
    text(linesCleared, 560, 330);

    // draw the game border
    stroke(colorDark);
    line(gameEdgeRight, 0, gameEdgeRight, height);

    //show the falling piece
    fallingPiece.show();

    // speed up the falling piece if the down arrow is pressed
    if(keyIsDown(DOWN_ARROW)){
        //fallSpeed = gridSpace * 2;
        updateEvery = 2;
    }
    else{
        updateEvery = updateEveryCurrent;
    }

    // update the game state
    if(!pauseGame){
        ticks++;
        if(ticks >= updateEvery){
            ticks = 0;
            fallingPiece.fall(fallSpeed);
        }
    }

    // show the grid pieces
    for (let i = 0; i < gridPieces.length; i++){
        gridPieces[i].show();
    }

    // show the fading lines
    for (let i = 0; i < lineFades.length; i++){
        lineFades[i].show();
    }

    // process the grid workers
    if (gridWorkers.length > 0){
        gridWorkers[0].work();
    }

    // explain the controls
    textAlign(CENTER);
    fill(255);
    noStroke();
    textSize(14);

    text("Controls:\n↑\n← ↓ →\n", 75, 155);
    text("Left and Right:\nmove side to side", 75, 230);
    text("Up:\nrotate", 75, 280);
    text("Down:\nfall faster", 75, 330);
    text("R:\nreset game", 75, 380);

    // show the game over text
    if (gameOver){
        fill(colorDark);
        textSize(54);
        textAlign(CENTER);
        text("GAME OVER", 300, 270);
    }

    // draw the game border
    strokeWeight(3);
    stroke('#304550');
    noFill();
    rect(0, 0, width, height);
}

// function called when a key is pressed    
function keyPressed(){
    if (key === 'R'){
        resetGame();
    }

    if (!pauseGame){
        if (keyCode === LEFT_ARROW){
            fallingPiece.input(LEFT_ARROW);
        }
        else if (keyCode === RIGHT_ARROW){
            fallingPiece.input(RIGHT_ARROW);
        }
        else if (keyCode === UP_ARROW){
            fallingPiece.input(UP_ARROW);
        }
        // else if (keyCode === DOWN_ARROW){
        //     fallingPiece.fall(fallSpeed);
        // }
    }
}


// class for the falling piece
class PlayPiece{
    constructor(){
        this.pos = createVector(0, 0);
        this.rotation = 0;
        this.nextPieceType = Math.floor(Math.random() * 7);
        this.nextPieces = [];
        this.pieceType = 0;
        this.pieces = [];
        this.orientation = [];
        this.fallen = false;
    }

    // generate the next pieces
    nextPiece(){
        this.nextPieceType = pseudoRandom(this.pieceType);
        this.nextPieces = [];

        const points = orientPoints(this.nextPieceType, 0);
        let xx = 525, yy = 490;

        if (this.nextPieceType !== 0 && this.nextPieceType !== 3 && this.nextPieceType !== 5){
            xx += (gridSpace * 0.5);
        }

        if (this.nextPieceType == 5){
            xx -= (gridSpace * 0.5);
        }

        for (let i = 0; i < 4; i++){
            this.nextPieces().push(new Square(xx + points[i][0] * gridSpace, yy + points[i][1] * gridSpace, this.nextPieceType));
        }
    }
}
