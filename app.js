 // Set rows and colums
 const numRows = 8;
 const numCols = 8;
 const numBombs = 10;
 let revealedNum = 0;

 // Select container with the class 'field' 
 const fieldContainer = document.querySelector('.field');

  // Loop for generating div elements

 for (let row = 0; row < numRows; row++) {
   for (let col = 0; col < numCols; col++) {
     const div = document.createElement('div');
     div.dataset.row = row;
     div.dataset.col = col;
     div.addEventListener('click', () => revealCell(row, col));
     div.addEventListener('contextmenu', (e) => {
       e.preventDefault();
       div.classList.toggle('flag');
       checkForWin();
     });
     fieldContainer.appendChild(div);
   }
 }


 // Generate random bomb positions
 const bombPositions = [];
 while (bombPositions.length < numBombs) {
   const row = Math.floor(Math.random() * numRows);
   const col = Math.floor(Math.random() * numCols);
   const position = `${row}-${col}`;
   if (!bombPositions.includes(position)) {
     bombPositions.push(position);
   }
 }

 // Function to check if a div element contains a bomb
 function isBomb(row, col) {
   return bombPositions.includes(`${row}-${col}`);
 }

 // Function to reveal a cell and handle its content
 function revealCell(row, col) {
   const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
   if (!cell.classList.contains('revealed')) {
     cell.classList.add('revealed');
     revealedNum++;

     if (isBomb(row, col)) {
       // If it's a bomb, end the game
       cell.textContent = '💣';
       alert('Game Over!');
     } else {
       // Calculate the number of neighboring bombs
       let bombCount = 0;
       for (let i = -1; i <= 1; i++) {
         for (let j = -1; j <= 1; j++) {
           if (i === 0 && j === 0) continue;
           if (isBomb(row + i, col + j)) {
             bombCount++;
           }
         }
       }
       cell.textContent = bombCount === 0 ? '' : bombCount;

       // If no neighboring bombs, recursively reveal nearby cells
       if (bombCount === 0) {
         for (let i = -1; i <= 1; i++) {
           for (let j = -1; j <= 1; j++) {
             if (i === 0 && j === 0) continue;
             const newRow = row + i;
             const newCol = col + j;
             if (newRow >= 0 && newRow < numRows && newCol >= 0 && newCol < numCols) {
               revealCell(newRow, newCol);
             }
           }
         }
       }
     }
   }
 }

 // Check for win
 function checkForWin() {
   if (revealedNum === numRows * numCols - numBombs) {
     alert("You won!");
   }
 }

// Click 'New Game' to restart/refresh
const restartBtn = document.querySelector('.restartBtn');
const refreshPage = () => {
  location.reload();
}
restartBtn.addEventListener('click', refreshPage)

// Play audio
function playAudio() {
  var audio = new Audio('music_zapsplat_astro_race.mp3');
  audio.play();

}

  