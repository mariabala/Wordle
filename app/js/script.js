
const pattern = /[a-z]/;
let solution = '';
let currentGuessCount = 1;


let currentGuess = document.querySelector('#guess' + currentGuessCount);
//let currentLetters = currentGuess.dataset.letters;

let words = ['baker', 'chair', 'crane', 'bread', 'clone', 'weary', 'louis'];

const chooseWord = () => {
	let randomNumber = Math.floor(Math.random() * (words.length-1)) + 1;
	solution = words[randomNumber];
	console.log(solution);
}

chooseWord();

//detects keypresses
document.addEventListener('keydown', (e) =>{
	//console.log('keypress: ' + e.key);
	let keypress = e.key;
	if (e.key.length ==1 && pattern.test(e.key) && currentGuess.dataset.letters.length <5){
		updateLetters(keypress);
	}
	else if  (e.key == 'Backspace' && currentGuess.dataset.letters != ''){
		deleteLetter();
	}
	else if (e.key == 'Enter' && currentGuess.dataset.letters.length == 5){
		for(let i = 0; i<5; i++){
			revealTile(i, checkLetter(i));		}
		
	}

});

const checkLetter = (position) => {
	console.log('checkLetter');
	let guessedLetter = currentGuess.dataset.letters.charAt(position);
	let solutionLetter = solution.charAt(position);
	console.log(solution.charAt(position));
	console.log('guessedLetter: ' +guessedLetter + ' solution letter: ' + solutionLetter);
	//console.log(guessedLetter, solutionLetter);

	if(guessedLetter.normalize() === solutionLetter.normalize()){
		return 'correct';
	}
	else if( checkLetterExists(guessedLetter) ){
		return 'present';
	}
	else {
		return 'absent';
	}
}

const checkLetterExists = (letter) => {
	return solution.includes(letter);
}

const updateLetters = (letter) => {
	let oldLetters = currentGuess.dataset.letters;
	let newLetters = oldLetters + letter;
	let currentTile = newLetters.length;
	currentGuess.dataset.letters = newLetters;
	//console.log('currentTile = ' + currentTile);
	updateTiles(currentTile, letter);
  };

function updateTiles(tileNumber, letter) {
	//console.log('updateTile(' + tileNumber, letter + ')');
	let currentTile = document.querySelector('#guessTile' + tileNumber);
	currentTile.innerText = letter;
	currentTile.classList.add('has-letter');
}

//delete last letter 
function deleteLetter() {
	let oldLetters = currentGuess.dataset.letters;
	let newLetters = oldLetters.slice(0, -1);
	currentGuess.dataset.letters = newLetters;
	deleteTileLetter(oldLetters.length);
}

//remove markup from last tile on screen
function deleteTileLetter(tileNumber){
	let currentTile = document.querySelector('#guessTile' + tileNumber);
	currentTile.innerText = "";
	currentTile.classList.remove('has-letter');


}

const revealTile = (i,state) => {
	console.log('revealTile = ' +i, state );
	let tileNum = i +1;
	let tile = document.querySelector('#guessTile' + tileNum);
	console.log(tile);
	// if (status == 'correct'){
	// 	tile.classList.add('correct');
	// }
	// else if (status == 'present'){
	// 	tile.classList.add('present');
	// }
	// else if ( status == 'absent'){
	// 	tile.classList.add('absent');
	// }

	flipTile(tileNum, state);
	
};

const flipTile = (tileNum, state) => {
	let tile = document.querySelector('#guessTile' + tileNum);
	tile.classList.add('flip-in');
	setTimeout(()=> {
		tile.classList.add(state);
	}, 250);
	setTimeout( ()=> {
		tile.classList.remove('flip-in');
		tile.classList.add('flip-out');
	},250);
	
	// let tile = document.querySelector(
	// 	'#guess' + currentGuessCount + 'Tile' + tileNum
	//   );
	//   tile.classList.add('flip-in');
	//   setTimeout(() => {
	// 	tile.classList.add(state);
	//   }, 250);
	//   setTimeout(() => {
	// 	tile.classList.remove('flip-in');
	// 	tile.classList.add('flip-out');
	//   }, 250);
	//   setTimeout(() => {
	// 	tile.classList.remove('flip-out');
	//   }, 1500);
}