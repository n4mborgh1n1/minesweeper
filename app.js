// Set rows and colums
const numRows = 8;
const numCols = 8;

// Select container with the class 'field' 
const fieldContainer = document.querySelector('.field');

// Loop for generating div elements
for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
        const div = document.createElement('div');
        fieldContainer.appendChild(div);
    }
}

// Randomize div elements when refreshing/new game




