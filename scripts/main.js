let matrix;
let iteration;
let births = 0;
let deaths = 0;
let longestLife = 0;
let startingPopulation = 0;
let currentPopulation = 0;
let lifecycle = 0;
let mortalityRate = 0;

document.addEventListener('DOMContentLoaded', function(){  //Loads the DOM

	function populate(){  //Places populate() into memory
		let table = document.getElementById('grid');  //Creates variable for table with ID grid
		table.innerHTML = '';  //Clears table for population
		for (i = 0; i < matrix.length; i++){  //Iterates through first tier array
			let row = document.createElement('tr');  //Creates variable & tr element
			table.appendChild(row);  //Appends tr to table
			for (j = 0; j < matrix[i].length; j++){  //Iterates through second tier array
				let data = document.createElement('td');  //Creates variable & td element
			 	row.appendChild(data);  //Appends tr with td
		  	data.innerHTML = matrix[i][j];  //Places data into td
		  	existenceState(matrix[i][j], data);  //Executes existenceState to apply classes
			}
		};
		checkPopulation();
	}

	function existenceState(mat, data){  //Places existenceState into memory
		if (mat === 1){  //Sets up conditions for classes
			data.setAttribute('class', 'alive');  //Sets class to alive
			}
		else {  //Sets class to dead
			data.setAttribute('class', 'dead');
		}
	}

	function checkPopulation(){
		lifecycle++;
		let current = 0;
		let cell = document.querySelectorAll('td');
		cell.forEach(function(c){
			if(c.getAttribute('class') === 'alive'){
				if(lifecycle === 1){
				startingPopulation++;
				} else {
					current++;
				}
			}
		})
		lifecycle === 1 ? currentPopulation = startingPopulation : currentPopulation = current;
		calculateMortality();
		populateDom();
	}

	function calculateMortality(){
		mortalityRate = (100 -(births / deaths).toFixed(2) * 100);
	}

	function populateDom(){
		document.querySelector('.starting-population').innerHTML = `<div>Starting Population: ${startingPopulation}</div>`;
		document.querySelector('.current-population').innerHTML = `<div>Current Population: ${currentPopulation}</div>`;
		document.querySelector('.iteration').innerHTML = `<div>Iteration: ${lifecycle}</div>`;
		document.querySelector('.births').innerHTML = `<div>Births: ${births}</div>`;
		document.querySelector('.deaths').innerHTML = `<div>Deaths: ${deaths}</div>`;
		document.querySelector('.longest-life').innerHTML = `<div>Longest Life: ${longestLife}</div>`;
		document.querySelector('.mortality-rate').innerHTML = `<div>Mortality Rate: ${mortalityRate}%</div>`;
	}

	function resetDom(){
		lifecycle = 0;
		births = 0;
		deaths = 0;
		longestLife = 0;
		startingPopulation = 0;
		currentPopulation = 0;
		longestLife = 0;
		mortalityRate = 0;
		populateDom();
	}

	function livingNeighborCount(x, y){  //Places livingNeighborCount() into memory
		let counter = 0;

		if(matrix[x - 1] && matrix[x - 1][y - 1] === 1){  //Top left check
			counter += matrix[x - 1][y - 1];
		}

		if(matrix[x - 1] && matrix[x - 1][y] === 1){  //Top middle check
			counter += matrix[x - 1][y];
		}

		if(matrix[x - 1] && matrix[x - 1][y + 1] === 1){  //Top right check
			counter += matrix[x - 1][y + 1];
		}

		if(matrix[x] && matrix[x][y - 1] === 1){  //Middle left check
			counter += matrix[x][y - 1];
		}

		if(matrix[x] && matrix[x][y + 1] === 1){  //Middle right check
			counter += matrix[x][y + 1];
		}

		if(matrix[x + 1] && matrix[x + 1][y - 1] === 1){  //Bottom left check
			counter += matrix[x + 1][y - 1];
		}

		if(matrix[x + 1] && matrix[x + 1][y] === 1){  //Bottom middle check
			counter += matrix[x + 1][y];
		}

		if(matrix[x + 1] && matrix[x + 1][y + 1] === 1){  //Bottom right check
			counter += matrix[x + 1][y + 1];
		}
		return counter;
	}

	function populateNextState(currentState){  //Places populateNextState() into memory
		let nextState = [];
		currentState.forEach(function(currentRow, x){
			let nextRow = [];
			currentRow.forEach(function(currentCell, y){
				let livingNeighbors = livingNeighborCount(x, y);
				let nextCellState;

				if(livingNeighbors < 2 || livingNeighbors > 3){
					nextCellState = 0;
					deaths++;
				}
				else if(livingNeighbors === 3){
					nextCellState = 1;
					births++;
				}
				else {
					nextCellState = currentCell;
				}

				nextRow.push(nextCellState);
			});
			nextState.push(nextRow);
		});
		return nextState;
	}

	document.querySelector('#populate').addEventListener('click', function(){
		clearInterval(iteration);
		resetDom();
		matrix = randomize(50, 50);
		populate();  //Executes populate() to create grid
	})

	document.querySelector('#tick').addEventListener('click', function(){  //Adds event listener for Tick button
		clearInterval(iteration);
		matrix = populateNextState(matrix);
		populate(matrix);
	});

	document.querySelector('#run').addEventListener('click', function(e){  //Adds event listener for Run button
		matrix = populateNextState(matrix);
		iteration = setInterval(function(){
			matrix = populateNextState(matrix);
			populate();
		}, 10);
	});

	document.querySelector('#stop').addEventListener('click', function(e2){  //Adds event listener for Stop button
		clearInterval(iteration);
	});

});

function randomize(x, y){  //Loads randomize() into memory
	let matrix = [];
	for(var i = 0; i < x; i++){
		matrix[i] = [];
		for(var j = 0; j < y; j++){
			matrix[i][j] = Math.round(Math.random());
		}
	}
	return matrix;
}