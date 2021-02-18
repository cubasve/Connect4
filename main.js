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
let cellEls;

/*----------EVENTS-------------*/


/*----------FUNCTIONS-------------*/
initialize();

function render() {
    board.forEach((columnArray, columnIndex) => {
        const markerEl = document.getElementById(`column${columnIndex}`);
        //If there is a 0 left in the column, we want the background color to be grey
        //If there are no 0's left in the column (full), want it to be transparent
        markerEl.style.borderTopColor = columnArray.includes(0) ? 'grey' : 'transparent';

        //cell = each circle in the board --> value is 1, 0, or -1
        columnArray.forEach((cell, rowIndex) => {
            //Ex. color[cell] = color[1] (object[key])= blue (value)
            cellEls[columnIndex][rowIndex].style.backgroundColor = colors[cell];
        });
    });

    if (winner) {
        if (winner === 'T') {
            messageEl.textContent = 'It\'s a tie!';
        } else {
            let color = colors[winner];
            messageEl.innerHTML = `<span style="color:${color}">${color.toUpperCase()}</span> wins!`;
        }
    } else {
        let color = colors[turn];
        messageEl.innerHTML = `<span style="color:${color}">${color.toUpperCase()}'s</span> turn`;
    }
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

    cellEls = [];
    for (let columnIndex = 0; columnIndex < board.length; columnIndex++) {
        let temp = [];
        for (let rowIndex = 0; rowIndex < board[columnIndex].length; rowIndex++) {
            let el = document.getElementById(`column${columnIndex}row${rowIndex}`);
            temp.push(el);
        }
        cellEls.push(temp);
    }

    winner = null;
    turn = 1; //Player 1(blue)'s turn is first
    render();
}