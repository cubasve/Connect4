/*----------CONSTANTS-------------*/
const colors = {
    '1': 'blue',
    '-1': 'red',
    '0': 'white', //when a cell is empty
}

/*----------APP STATE-------------*/
let board, winner, turn;

/*----------CACHED ELEMENTS--------*/
const messageEl = document.getElementById('message');
const markersEl = document.getElementById('markers');

/*----------EVENTS-------------*/


/*----------FUNCTIONS-------------*/
initialize();

function render() {
    console.log('render');
}

function initialize() {
    //Use board[columnIndex][rowIndex] to access a cell
    board = [
/* ROW:  0  1  2  3  4  5   */ 
        [0, 0, 0, 0, 0, 0], //column0       
        [0, 0, 0, 0, 0, 0], //column1
        [0, 0, 0, 0, 0, 0], //column2
        [0, 0, 0, 0, 0, 0], //column3
        [0, 0, 0, 0, 0, 0], //column4
        [0, 0, 0, 0, 0, 0], //column5
        [0, 0, 0, 0, 0, 0], //column6
    ];
    winner = null;
    turn = 1; //Player 1(blue)'s turn is first
    // render();
}