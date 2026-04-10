document.addEventListener('keydown', (event) => {
    // Optional: Use event.preventDefault() to stop page scrolling
    switch (event.key) {
        case "ArrowLeft": leftTblock(); break;
        case "ArrowRight": rightTblock(); break;
        case "ArrowUp": rotatePiece(); break;
        case "ArrowDown": dropTblock(); break;
    }
});
var score = 0
document.getElementById("output").innerHTML = score;

var gamerunning = false

function startGame(){
  if (gamerunning == false){
    clearBoard();
    createRandom();
    gamerunning = true
    score = 0
    document.getElementById('redbutton').style.backgroundColor = 'grey'
  }
}

function clearBoard(){
  for (let i = 0; i < 20; i++) {
    for (let x = 0; x < 10; x++) {
      tetrisgrid[i][x] = 0;
    }
  }
  sevenbag = ["T", "S", "Z", "J", "L", "I", "O"]
}

const intervalId = setInterval(() => {
  dropTblock();
}, 200);

var sevenbag = ["T", "S", "Z", "J", "L", "I", "O"]
const sevenbagbackup = ["T", "S", "Z", "J", "L", "I", "O"]

var tetrisgrid = [
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],  
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],  
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],  
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],  
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],  
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],  
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],  
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],  
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

let currentpiece = ""
let currentrotation = 0


const boardElement = document.getElementById('tetris-board');

function drawGrid() {
  // Clear the board first
  boardElement.innerHTML = '';

  tetrisgrid.forEach((row, i) => {
    row.forEach((value) => {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      
      // If the value is not 0, give it a different look
      if (value == 1 || value == -1) {
        cell.classList.add('tblock');
      }
      else if (value == 2 || value == -2) {
        cell.classList.add('oblock');
      }
      else if (value == 3 || value == -3) {
        cell.classList.add('iblock');
      }
      else if (value == 4 || value == -4) {
        cell.classList.add('jblock');
      }
      else if (value == 5 || value == -5) {
        cell.classList.add('lblock');
      }
      else if (value == 6 || value == -6) {
        cell.classList.add('sblock');
      }
      else if (value == 7 || value == -7) {
        cell.classList.add('zblock');
      }
      else if (value == 0 && (i == 0 || i == 1)){
        cell.classList.add('red')
      }
      
      boardElement.appendChild(cell);
    });
  });
}

drawGrid();





function createPiece(piece){
	if (piece === "T"){
		return [
			[0, 0, 0],
			[1, 1, 1],
			[0, 1, 0]
		];
	}
	if (piece === "O"){
		return [
			[2, 2],
			[2, 2]
		];
	}
	if (piece === "I"){
		return [
			[0, 0, 0, 0],
			[3, 3, 3, 3],
			[0, 0, 0, 0],
			[0, 0, 0, 0]
		];
	}
	if (piece === "J"){
		return [
			[4, 0, 0],
			[4, 4, 4],
			[0, 0, 0]
		];
	}
	if (piece === "L"){
		return [
			[0, 0, 5],
			[5, 5, 5],
			[0, 0, 0]
		];
	}
	if (piece === "S"){
		return [
			[0, 6, 6],
			[6, 6, 0],
			[0, 0, 0]
		];
	}
	if (piece === "Z"){
		return [
			[7, 7, 0],
			[0, 7, 7],
			[0, 0, 0]
		];
	}
}

function findTopLeftBlock(){
  for (let i = 0; i < 20; i++) {
    for (let x = 0; x < 10; x++) {
      if (tetrisgrid[i][x] < 0){
        return [i, x]
      }
    }
  }
}

function rotatePiece(){
  // --- O PIECE ---
  if (currentpiece == "O") {
    return; // The square doesn't need to rotate!
  }

  // --- S PIECE (-6) ---
  if (currentpiece == "S") {
    let loc = findTopLeftBlock();
    if (!loc) return;
    let r = loc[0], c = loc[1];

    if (currentrotation == 0) {
      if (r + 2 < 20 && c + 1 < 10 &&
          tetrisgrid[r][c] <= 0 && tetrisgrid[r + 1][c] <= 0 && 
          tetrisgrid[r + 1][c + 1] <= 0 && tetrisgrid[r + 2][c + 1] <= 0) {
        // Erase
        tetrisgrid[r][c] = 0; tetrisgrid[r][c + 1] = 0; 
        tetrisgrid[r + 1][c - 1] = 0; tetrisgrid[r + 1][c] = 0;
        // Draw
        tetrisgrid[r][c] = -6; tetrisgrid[r + 1][c] = -6; 
        tetrisgrid[r + 1][c + 1] = -6; tetrisgrid[r + 2][c + 1] = -6;
        currentrotation = 1;
      }
    } else if (currentrotation == 1) {
      if (r + 2 < 20 && c - 1 >= 0 &&
          tetrisgrid[r + 1][c] <= 0 && tetrisgrid[r + 1][c + 1] <= 0 && 
          tetrisgrid[r + 2][c - 1] <= 0 && tetrisgrid[r + 2][c] <= 0) {
        // Erase
        tetrisgrid[r][c] = 0; tetrisgrid[r + 1][c] = 0; 
        tetrisgrid[r + 1][c + 1] = 0; tetrisgrid[r + 2][c + 1] = 0;
        // Draw
        tetrisgrid[r + 1][c] = -6; tetrisgrid[r + 1][c + 1] = -6; 
        tetrisgrid[r + 2][c - 1] = -6; tetrisgrid[r + 2][c] = -6;
        currentrotation = 0;
      }
    }
  }

  // --- Z PIECE (-7) ---
  if (currentpiece == "Z") {
    let loc = findTopLeftBlock();
    if (!loc) return;
    let r = loc[0], c = loc[1];

    if (currentrotation == 0) {
      if (r + 2 < 20 && c + 1 < 10 &&
          tetrisgrid[r][c + 1] <= 0 && tetrisgrid[r + 1][c] <= 0 && 
          tetrisgrid[r + 1][c + 1] <= 0 && tetrisgrid[r + 2][c] <= 0) {
        // Erase
        tetrisgrid[r][c] = 0; tetrisgrid[r][c + 1] = 0; 
        tetrisgrid[r + 1][c + 1] = 0; tetrisgrid[r + 1][c + 2] = 0;
        // Draw
        tetrisgrid[r][c + 1] = -7; tetrisgrid[r + 1][c] = -7; 
        tetrisgrid[r + 1][c + 1] = -7; tetrisgrid[r + 2][c] = -7;
        currentrotation = 1;
      }
    } else if (currentrotation == 1) {
      if (r + 2 < 20 && c + 1 < 10 && c - 1 >= 0 &&
          tetrisgrid[r + 1][c - 1] <= 0 && tetrisgrid[r + 1][c] <= 0 && 
          tetrisgrid[r + 2][c] <= 0 && tetrisgrid[r + 2][c + 1] <= 0) {
        // Erase
        tetrisgrid[r][c] = 0; tetrisgrid[r + 1][c - 1] = 0; 
        tetrisgrid[r + 1][c] = 0; tetrisgrid[r + 2][c - 1] = 0;
        // Draw
        tetrisgrid[r + 1][c - 1] = -7; tetrisgrid[r + 1][c] = -7; 
        tetrisgrid[r + 2][c] = -7; tetrisgrid[r + 2][c + 1] = -7;
        currentrotation = 0;
      }
    }
  }
if (currentpiece == "T") {
    let loc = findTopLeftBlock();
    if (!loc) return;
    let r = loc[0], c = loc[1];

    if (currentrotation == 0) { // Pointing Down
      // loc is the left tip of the top horizontal bar
      if (r - 1 >= 0 && r + 1 < 20 && c + 1 < 10 &&
          tetrisgrid[r - 1][c + 1] <= 0 && tetrisgrid[r][c + 1] <= 0 && 
          tetrisgrid[r + 1][c + 1] <= 0 && tetrisgrid[r][c] <= 0) {
        tetrisgrid[r][c] = 0; tetrisgrid[r][c + 1] = 0; tetrisgrid[r][c + 2] = 0; tetrisgrid[r + 1][c + 1] = 0;
        tetrisgrid[r - 1][c + 1] = -1; tetrisgrid[r][c + 1] = -1; tetrisgrid[r + 1][c + 1] = -1; tetrisgrid[r][c] = -1;
        currentrotation = 1;
      }
    } else if (currentrotation == 1) { // Pointing Left
      // loc is the top tip of the vertical bar
      if (r + 1 < 20 && c - 1 >= 0 && c + 1 < 10 &&
          tetrisgrid[r][c] <= 0 && tetrisgrid[r + 1][c - 1] <= 0 && 
          tetrisgrid[r + 1][c] <= 0 && tetrisgrid[r + 1][c + 1] <= 0) {
        tetrisgrid[r][c] = 0; tetrisgrid[r + 1][c - 1] = 0; tetrisgrid[r + 1][c] = 0; tetrisgrid[r + 2][c] = 0;
        tetrisgrid[r][c] = -1; tetrisgrid[r + 1][c - 1] = -1; tetrisgrid[r + 1][c] = -1; tetrisgrid[r + 1][c + 1] = -1;
        currentrotation = 2;
      }
    } else if (currentrotation == 2) { // Pointing Up
      // loc is the top tip of the middle vertical bar
      if (r + 2 < 20 && c + 1 < 10 &&
          tetrisgrid[r][c] <= 0 && tetrisgrid[r + 1][c] <= 0 && 
          tetrisgrid[r + 2][c] <= 0 && tetrisgrid[r + 1][c + 1] <= 0) {
        tetrisgrid[r][c] = 0; tetrisgrid[r + 1][c - 1] = 0; tetrisgrid[r + 1][c] = 0; tetrisgrid[r + 1][c + 1] = 0;
        tetrisgrid[r][c] = -1; tetrisgrid[r + 1][c] = -1; tetrisgrid[r + 2][c] = -1; tetrisgrid[r + 1][c + 1] = -1;
        currentrotation = 3;
      }
    } else if (currentrotation == 3) { // Pointing Right
      // loc is the top tip of the vertical bar
      if (r + 2 < 20 && c - 1 >= 0 && c + 1 < 10 &&
          tetrisgrid[r + 1][c - 1] <= 0 && tetrisgrid[r + 1][c] <= 0 && 
          tetrisgrid[r + 1][c + 1] <= 0 && tetrisgrid[r + 2][c] <= 0) {
        tetrisgrid[r][c] = 0; tetrisgrid[r + 1][c] = 0; tetrisgrid[r + 1][c + 1] = 0; tetrisgrid[r + 2][c] = 0;
        tetrisgrid[r + 1][c - 1] = -1; tetrisgrid[r + 1][c] = -1; tetrisgrid[r + 1][c + 1] = -1; tetrisgrid[r + 2][c] = -1;
        currentrotation = 0;
      }
    }
  }

  // --- J PIECE (-4) (Clockwise) ---
  if (currentpiece == "J") {
    let loc = findTopLeftBlock();
    if (!loc) return;
    let r = loc[0], c = loc[1];

    if (currentrotation == 0) { // Rotation 0 -> 1
      if (r + 2 < 20 && c + 2 < 10 &&
          tetrisgrid[r][c + 1] <= 0 && tetrisgrid[r + 1][c + 1] <= 0 && 
          tetrisgrid[r + 2][c + 1] <= 0 && tetrisgrid[r][c + 2] <= 0) {
        
        // Erase State 0
        tetrisgrid[r][c] = 0; tetrisgrid[r + 1][c] = 0; tetrisgrid[r + 1][c + 1] = 0; tetrisgrid[r + 1][c + 2] = 0;
        // Draw State 1
        tetrisgrid[r][c + 1] = -4; tetrisgrid[r + 1][c + 1] = -4; tetrisgrid[r + 2][c + 1] = -4; tetrisgrid[r][c + 2] = -4;
        currentrotation = 1;
      }
    } else if (currentrotation == 1) { // Rotation 1 -> 2
      if (r + 2 < 20 && c - 1 >= 0 && c + 1 < 10 &&
          tetrisgrid[r + 1][c - 1] <= 0 && tetrisgrid[r + 1][c] <= 0 && 
          tetrisgrid[r + 1][c + 1] <= 0 && tetrisgrid[r + 2][c + 1] <= 0) {
        
        // Erase State 1
        tetrisgrid[r][c] = 0; tetrisgrid[r][c + 1] = 0; tetrisgrid[r + 1][c] = 0; tetrisgrid[r + 2][c] = 0;
        // Draw State 2
        tetrisgrid[r + 1][c - 1] = -4; tetrisgrid[r + 1][c] = -4; tetrisgrid[r + 1][c + 1] = -4; tetrisgrid[r + 2][c + 1] = -4;
        currentrotation = 2;
      }
    } else if (currentrotation == 2) { // Rotation 2 -> 3
      if (r - 1 >= 0 && r + 1 < 20 && c + 1 < 10 &&
          tetrisgrid[r - 1][c + 1] <= 0 && tetrisgrid[r][c + 1] <= 0 && 
          tetrisgrid[r + 1][c + 1] <= 0 && tetrisgrid[r + 1][c] <= 0) {
        
        // Erase State 2
        tetrisgrid[r][c] = 0; tetrisgrid[r][c + 1] = 0; tetrisgrid[r][c + 2] = 0; tetrisgrid[r + 1][c + 2] = 0;
        // Draw State 3
        tetrisgrid[r - 1][c + 1] = -4; tetrisgrid[r][c + 1] = -4; tetrisgrid[r + 1][c + 1] = -4; tetrisgrid[r + 1][c] = -4;
        currentrotation = 3;
      }
    } else if (currentrotation == 3) { // Rotation 3 -> 0
      if (r + 1 < 20 && c - 1 >= 0 && c + 1 < 10 &&
          tetrisgrid[r][c - 1] <= 0 && tetrisgrid[r + 1][c - 1] <= 0 && 
          tetrisgrid[r + 1][c] <= 0 && tetrisgrid[r + 1][c + 1] <= 0) {
        
        // Erase State 3 (Fixed the bug here!)
        tetrisgrid[r][c] = 0; tetrisgrid[r + 1][c] = 0; tetrisgrid[r + 2][c] = 0; tetrisgrid[r + 2][c - 1] = 0;
        // Draw State 0
        tetrisgrid[r][c - 1] = -4; tetrisgrid[r + 1][c - 1] = -4; tetrisgrid[r + 1][c] = -4; tetrisgrid[r + 1][c + 1] = -4;
        currentrotation = 0;
      }
    }
  }

  // --- L PIECE (-5) (Clockwise) ---
  if (currentpiece == "L") {
    let loc = findTopLeftBlock();
    if (!loc) return;
    let r = loc[0], c = loc[1];

    if (currentrotation == 0) {
      if (r + 2 < 20 && c - 1 >= 0 && c < 10 &&
          tetrisgrid[r][c - 1] <= 0 && tetrisgrid[r + 1][c - 1] <= 0 && 
          tetrisgrid[r + 2][c - 1] <= 0 && tetrisgrid[r + 2][c] <= 0) {
        tetrisgrid[r][c] = 0; tetrisgrid[r + 1][c - 2] = 0; tetrisgrid[r + 1][c - 1] = 0; tetrisgrid[r + 1][c] = 0;
        tetrisgrid[r][c - 1] = -5; tetrisgrid[r + 1][c - 1] = -5; tetrisgrid[r + 2][c - 1] = -5; tetrisgrid[r + 2][c] = -5;
        currentrotation = 1;
      }
    } else if (currentrotation == 1) {
      if (r + 2 < 20 && c - 1 >= 0 && c + 1 < 10 &&
          tetrisgrid[r + 1][c + 1] <= 0 && tetrisgrid[r + 1][c] <= 0 && 
          tetrisgrid[r + 1][c - 1] <= 0 && tetrisgrid[r + 2][c - 1] <= 0) {
        tetrisgrid[r][c] = 0; tetrisgrid[r + 1][c] = 0; tetrisgrid[r + 2][c] = 0; tetrisgrid[r + 2][c + 1] = 0;
        tetrisgrid[r + 1][c + 1] = -5; tetrisgrid[r + 1][c] = -5; tetrisgrid[r + 1][c - 1] = -5; tetrisgrid[r + 2][c - 1] = -5;
        currentrotation = 2;
      }
    } else if (currentrotation == 2) {
      if (r - 1 >= 0 && r + 1 < 20 && c + 1 < 10 &&
          tetrisgrid[r - 1][c + 1] <= 0 && tetrisgrid[r][c + 1] <= 0 && 
          tetrisgrid[r + 1][c + 1] <= 0 && tetrisgrid[r - 1][c] <= 0) {
        tetrisgrid[r][c] = 0; tetrisgrid[r][c + 1] = 0; tetrisgrid[r][c + 2] = 0; tetrisgrid[r + 1][c] = 0;
        tetrisgrid[r - 1][c + 1] = -5; tetrisgrid[r][c + 1] = -5; tetrisgrid[r + 1][c + 1] = -5; tetrisgrid[r - 1][c] = -5;
        currentrotation = 3;
      }
    } else if (currentrotation == 3) {
      if (r + 1 < 20 && c + 2 < 10 &&
          tetrisgrid[r][c + 2] <= 0 && tetrisgrid[r + 1][c] <= 0 && 
          tetrisgrid[r + 1][c + 1] <= 0 && tetrisgrid[r + 1][c + 2] <= 0) {
        tetrisgrid[r][c] = 0; tetrisgrid[r][c + 1] = 0; tetrisgrid[r + 1][c + 1] = 0; tetrisgrid[r + 2][c + 1] = 0;
        tetrisgrid[r][c + 2] = -5; tetrisgrid[r + 1][c] = -5; tetrisgrid[r + 1][c + 1] = -5; tetrisgrid[r + 1][c + 2] = -5;
        currentrotation = 0;
      }
    }
  }
  if (currentpiece == "I") {
    if (currentrotation == 0) {
      let loc = findTopLeftBlock();
      let r = loc[0];
      let c = loc[1];

      // Check if we are too high up to rotate or if spaces are blocked
      if (r > 0 && r + 2 < 20 && 
          tetrisgrid[r - 1][c + 1] == 0 && 
          tetrisgrid[r + 1][c + 1] == 0 && 
          tetrisgrid[r + 2][c + 1] == 0) {
          
          // 1. Erase the horizontal line (Erase 3, leave the pivot)
          tetrisgrid[r][c] = 0;
          tetrisgrid[r][c + 2] = 0;
          tetrisgrid[r][c + 3] = 0;

          // 2. Draw the vertical line
          tetrisgrid[r - 1][c + 1] = -3;
          tetrisgrid[r + 1][c + 1] = -3;
          tetrisgrid[r + 2][c + 1] = -3;

          currentrotation = 1;
          drawGrid(); // Don't forget to redraw!
          return;
      }
    }
    else if (currentrotation == 1) {
    let loc = findTopLeftBlock();
    if (!loc) return;

    let r = loc[0]; // Top-most block of the vertical I
    let c = loc[1]; // The column it is in

    // Check boundaries:
    // We need 1 space to the left and 2 spaces to the right to go horizontal
    if (c >= 1 && c <= 7) {
        // Check if the horizontal spots are clear
        // We pivot around the second block down (r + 1)
        if (tetrisgrid[r + 1][c - 1] == 0 && 
            tetrisgrid[r + 1][c + 1] == 0 && 
            tetrisgrid[r + 1][c + 2] == 0) {

            // 1. ERASE the vertical blocks
            tetrisgrid[r][c] = 0;
            tetrisgrid[r + 1][c] = 0;
            tetrisgrid[r + 2][c] = 0;
            tetrisgrid[r + 3][c] = 0;

            // 2. DRAW the horizontal blocks (I-piece is 4 blocks long)
            tetrisgrid[r + 1][c - 1] = -3;
            tetrisgrid[r + 1][c] = -3;
            tetrisgrid[r + 1][c + 1] = -3;
            tetrisgrid[r + 1][c + 2] = -3;

            currentrotation = 0;
            drawGrid();
            return;
        }
    }
}
  }

}



function moveEverythingAboveDown(row) {
  // We start at the row that was just cleared and move UP
  // i must stop at 1 so that i-1 is 0 (the top row)
  for (let i = row; i > 0; i--) {
    // Copy the row ABOVE into the CURRENT row
    tetrisgrid[i] = [...tetrisgrid[i - 1]];
  }
  // After shifting everything down, the very top row must be cleared
  tetrisgrid[0] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
}

function checkForFull(row) {
  for (let x = 0; x < 10; x++) {
    if (tetrisgrid[row][x] == 0) {
      return; // Row isn't full, exit function
    }
  }
  // If the loop finishes, the row is full. 
  // No need to set the row to an array here, moveEverythingAboveDown handles it.
  moveEverythingAboveDown(row);
  checkForFull(row);
}

function checkAndClearLines() {
  // Always loop BOTTOM to TOP in Tetris
  for (let r = 19; r >= 0; r--) {
    
    // Use a 'while' loop: "As long as this specific row is full..."
    while (isRowFull(r)) {
      moveEverythingAboveDown(r);
      score = score + 10
      document.getElementById("output").innerHTML = score;
      // Notice: We do NOT decrement 'r' here. 
      // We stay on this row and check the NEW data that just dropped in.
    }
  }
}

function isRowFull(r) {
  for (let c = 0; c < 10; c++) {
    if (tetrisgrid[r][c] === 0) return false;
  }

  return true;
}

function moveEverythingAboveDown(row) {
  for (let i = row; i > 0; i--) {
    tetrisgrid[i] = [...tetrisgrid[i - 1]];
  }
  tetrisgrid[0] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
}


function createRandom() {
    checkAndClearLines();
    // 1. Correct the bag reset logic
    if (sevenbag.length === 0) {
        sevenbag = [...sevenbagbackup]; // Create a fresh copy
    }

    let i = Math.floor(Math.random() * sevenbag.length);
    let r = sevenbag[i];
    currentrotation = 0
    currentpiece = r
    // Remove the piece from the bag
    sevenbag.splice(i, 1); 

    const thepiece = createPiece(r);

    // 2. Loop through the actual piece dimensions
    for (let i = 0; i < thepiece.length; i++) {
        for (let x = 0; x < thepiece[i].length; x++) {
            // Check if the coordinate exists in the piece array
            if (thepiece[i][x] !== 0) {
                // Spawn in the middle (x + 3)
                tetrisgrid[i][x + 3] = -1 * thepiece[i][x];
            }
        }
    }

    drawGrid();
}


function createTblock() {
  const piece = createPiece("T"); // Get the piece once, outside the loop

  for (let i = 0; i < 3; i++) {
    for (let x = 0; x < 3; x++) {
      // Set the grid value to the piece value
      tetrisgrid[i][x] = -1 * piece[i][x];
    } 
  } // Added missing closing brace for 'x' loop


  drawGrid(); // Call this once AFTER the loops are finished
}

function dropTblock() {
  // 1. Check for collisions FIRST
  for (let i = 0; i < 20; i++) {
    for (let x = 0; x < 10; x++) {
      if (tetrisgrid[i][x] < 0) {
        // If THIS specific block is at the bottom or hitting a solid block
        if (i === 19 || tetrisgrid[i + 1][x] > 0) {
          freezeGrid(); // Flip to positive
          for (let x = 0; x < 10; x++) {
            if (tetrisgrid[1][x] > 0){
              gameOver();
              return
            }
          } 

          createRandom();
          return;       // EXIT the whole function immediately
        }
      }
    }
  }

  // 2. If we haven't 'returned', it's safe to move everything
  // Now your bottom-to-top loop works perfectly
  for (let i = 18; i >= 0; i--) {
    for (let x = 0; x < 10; x++) {
      if (tetrisgrid[i][x] < 0) {
        tetrisgrid[i + 1][x] = tetrisgrid[i][x];
        tetrisgrid[i][x] = 0;
      }
    }
  }
  
  drawGrid();
}

function gameOver(){
  alert("Game over!")
  gamerunning = false
  document.getElementById('redbutton').style.backgroundColor = 'red'
}

function freezeGrid() {
  for (let i = 0; i < 20; i++) {
    for (let x = 0; x < 10; x++) {
      tetrisgrid[i][x] = Math.abs(tetrisgrid[i][x]);
    }
  }
  drawGrid();
}

function rightTblock() {
  // 1. Check for collisions FIRST (Scout pass)
  for (let i = 0; i < 20; i++) {
    for (let x = 0; x < 10; x++) {
      if (tetrisgrid[i][x] < 0) {
        // Check if hitting the right wall (9) or a solid block
        if (x === 9 || tetrisgrid[i][x + 1] > 0) {
          return; // Blocked! Don't move anything.
        }
      }
    }
  }

  // 2. Move everything (Right-to-Left loop prevents overwriting)
  for (let x = 9; x >= 0; x--) {
    for (let i = 0; i < 20; i++) {
      if (tetrisgrid[i][x] < 0) {
        tetrisgrid[i][x + 1] = tetrisgrid[i][x];
        tetrisgrid[i][x] = 0; // Clear the old spot!
      }
    }
  }
  drawGrid();
}

function leftTblock() {
  // 1. Check for collisions FIRST (Scout pass)
  for (let i = 0; i < 20; i++) {
    for (let x = 0; x < 10; x++) {
      if (tetrisgrid[i][x] < 0) {
        // Check if hitting the right wall (9) or a solid block
        if (x === 0 || tetrisgrid[i][x - 1] > 0) {
          return; // Blocked! Don't move anything.
        }
      }
    }
  }

  // 2. Move everything (Right-to-Left loop prevents overwriting)
  for (let x = 0; x < 10; x++) {
    for (let i = 0; i < 20; i++) {
      if (tetrisgrid[i][x] < 0) {
        tetrisgrid[i][x - 1] = tetrisgrid[i][x];
        tetrisgrid[i][x] = 0; // Clear the old spot!
      }
    }
  }
  drawGrid();
}

