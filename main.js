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
markersEl.addEventListener('click', handleMarkerClick);

/*----------FUNCTIONS-------------*/
initialize();

function handleMarkerClick(e) {
    //If it's the computer's turn, ignore marker clicks
    if (turn === -1) return;

    let element = e.target; //e.target is <div id="column0"></div>
    //Only want the index value, not the entire id of 'column0'
    //columnId is a number (0-6)
    const columnId = parseInt(element.getAttribute('id').replace('column', ''));
    
    //When the space between the marker is clicked, it is NaN (<div id="markers"></div>)
    if (isNaN(columnId) || winner) return;

    //rowId returns the index of the first 0 it sees in the row
    let rowId = board[columnId].indexOf(0);
    //If the whole row is full (can't find any 0's), it returns -1 
    if (rowId === -1) return; //can't add anymore to that row

    //Whoever's turn it is, replace a cell in the board with their move
    board[columnId][rowId] = turn;
    setWinner();
    turn = turn * -1; //Change player's turn
    render();

    /* FOR AUTOMATED COMPUTER PLAYER */
    setTimeout(computerPlayTurn, 1000);
}

//Computer player is -1 (red)
function computerPlayTurn() {
    //If it's not the computer's turn, return
    if (turn === 1 || winner) return;

    let columnId = Math.floor(Math.random() * 7); //random number between 0-6
    //Keep reseting columnId until we find one that is empty and we can play in
    while (board[columnId].indexOf(0) === -1) {
        columnId = Math.floor(Math.random() * 7);
    }
    let rowId = board[columnId].indexOf(0);

    board[columnId][rowId] = turn;
    setWinner();
    turn = turn * -1; //Change player's turn
    render();
}

function setWinner() {
    let foundZero = false;
    for (let columnIndex = 0; columnIndex < board.length; columnIndex++) {
        for (let rowIndex = 0; rowIndex < board[columnIndex].length; rowIndex++) {
            winner = 
                checkVerticalWin(columnIndex, rowIndex) ||
                checkHorizontalWin(columnIndex, rowIndex) ||
                checkDiagonalWin(columnIndex, rowIndex, 1) || //checks up diagonally
                checkDiagonalWin(columnIndex, rowIndex, -1); //check down diagonally

            if (winner) break;

            //If foundZero is falsey, it executes board[columnIndex][rowIndex] === 0
            //and it will continue to check each cell in the board

            //If board[columnIndex][rowIndex] === 0 returns true, then foundZero becomes true
            foundZero = foundZero || board[columnIndex][rowIndex] === 0;
            //THIS IS EQUIVALENT: if (!foundZero) foundZero = board[columnIndex][rowIndex] === 0
        }
        if (winner) break;
    }
    //There's no winner and the board is full (can't play anymore - no more 0's left on board), it's a tie
    if (!winner && !foundZero) {
        winner = 'T';
    }
}

//checks up to see if there is a winner
function checkVerticalWin(columnIndex, rowIndex) {
    //A win needs 4 connected moves and there are 6 spots in a row
    //If rowIndex > 2, then there will not be 4 connected moves (it's less than 4)
    if (rowIndex > 2) return null;
    const columnArray = board[columnIndex];

    //Add numbers together and take absolute value to see if it equals 4 (have a winner?)
    let absoluteValue = Math.abs(
        columnArray[rowIndex] +
        columnArray[rowIndex + 1] + //one cell above in same row
        columnArray[rowIndex + 2] + //another cell above in same row
        columnArray[rowIndex + 3] //another cell above in same row
    );
    //If the absolutevalue is 4, return the player at those spots
    //OR return null as the winner
    return absoluteValue === 4 ? columnArray[rowIndex] : null;
}

//checks to the right to see if there is a winner
function checkHorizontalWin(columnIndex, rowIndex) {
    //A win needs 4 connected moves and there are 7 spots in a column
    //if columnIndex > 3, then there will not be 4 connected moves (it's less than 4)
    if (columnIndex > 3) return null;
    let absoluteValue = Math.abs(
        board[columnIndex][rowIndex] + 
        board[columnIndex + 1][rowIndex] + //different row, same column position (to the right)
        board[columnIndex + 2][rowIndex] + 
        board[columnIndex + 3][rowIndex]
    )
    return absoluteValue === 4 ? board[columnIndex][rowIndex] : null;
}

//verticalOffset = checking up and down
//if checking down: verticalOffset = -1
//if checking up: verticalOffset = +1
function checkDiagonalWin(columnIndex, rowIndex, verticalOffset) {
    //CASE 1: If columnIndex > 3, there will not be 4 diagonal connected dots (it's less than 4)
    //CASE 2: If I'm checking upwards and rowIndex > 2, there will not be 4 diagonal connected dots
    //CASE 3: If I'm checking downwards and rowIndex < 3, 
    if (columnIndex > 3 || (verticalOffset > 0 && rowIndex > 2) || (verticalOffset < 0 && rowIndex < 3)) return null;

    //verticalOffset is either 1(up) or -1(down)
    let absoluteValue = Math.abs(
        board[columnIndex][rowIndex] + 
        board[columnIndex + 1][rowIndex + verticalOffset] + 
        board[columnIndex + 2][rowIndex + verticalOffset * 2] + 
        board[columnIndex + 3][rowIndex + verticalOffset * 3]
    )

    return absoluteValue === 4 ? board[columnIndex][rowIndex] : null;
}

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
            messageEl.innerHTML = `<span style="color:${color}">${color.toUpperCase()}</span> is the winner!`;
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