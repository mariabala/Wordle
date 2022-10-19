const pattern = /[a-z]/;

let currentGuessCount = 1;

let currentGuess = document.querySelector('#guess' + currentGuessCount);
//let currentLetters = currentGuess.dataset.letters;


//detects keypresses
document.addEventListener('keydown', (e) =>{
	console.log('keypress: ' + e.key);
	let keypress = e.key;
	if (e.key.length ==1 && pattern.test(e.key)){
		updateLetters(keypress);
	}
	else if  (e.key == 'Backspace'){
		deleteLetter();
	}

});

const updateLetters = (letter) => {
	let oldLetters = currentGuess.dataset.letters;
	let newLetters = oldLetters + letter;
	let currentTile = newLetters.length;
	currentGuess.dataset.letters = newLetters;
	//console.log('currentTile = ' + currentTile);
	updateTiles(currentTile, letter);
  };

function updateTiles(tileNumber, letter) {
	console.log('updateTile(' + tileNumber, letter + ')');
	let currentTile = document.querySelector('#guessTile' + tileNumber);
	currentTile.innerText = letter;
	//currentTile.classList.add('has-letter');
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
	document.querySelector('#guessTile' + tileNumber).innerText = "";


}