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
}

function setWinner() {
    let foundZero = false;
    for (let columnIndex = 0; columnIndex < board.length; columnIndex++) {
        for (let rowIndex = 0; rowIndex < board[columnIndex].length; rowIndex++) {
            
        }
    }
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