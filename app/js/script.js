const pattern = /[a-z]/;
let solution = "";
let currentGuessCount = 1;
let revealingTile = false;
let gameStarted = false;
let startTime, endTime;

const keys = document.querySelectorAll(".Keyboard-module-row button");

for (let i = 0; i < keys.length; i++) {
  keys[i].onclick = ({ target }) => {
    const lett = target.getAttribute("data-key");
    if (
      lett.length === 1 &&
      pattern.test(lett) &&
      currentGuess.dataset.letters.length < 5
    ) {
      updateLetters(lett);
    } else if (
      lett === "del" &&
      currentGuess.dataset.letters != "" &&
      !revealingTile
    ) {
      deleteLetter();
    } else if (lett === "enter" && currentGuess.dataset.letters.length == 5) {
      submitGuess();
    }
  };
}

let currentGuess = document.querySelector("#guess" + currentGuessCount);
//let currentLetters = currentGuess.dataset.letters;
let word;

//let words = ['baker', 'chair', 'crane', 'bread', 'clone', 'weary', 'louis'];

const chooseWord = () => {
  fetch(
    "https://wordsapiv1.p.rapidapi.com/words/?random=true&lettersMin=5&lettersMax=5",
    {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "0c94fb99c3mshf4cfea9b93fb84fp1375dfjsn16ff43b7ca5f",
        "X-RapidAPI-Host": "wordsapiv1.p.rapidapi.com",
      },
    }
  )
    .then((response) => {
      return response.json();
    })
    .then((res) => {
      word = res.word;
      solution = word;
      console.log(solution);
    })
    .catch((err) => {
      console.error(err);
    });
};

// const chooseWord = () => {
// 	let randomNumber = Math.floor(Math.random() * (words.length-1)) + 1;
// 	solution = words[randomNumber];
// 	console.log(solution);
// }

chooseWord();

//detects keypresses
document.addEventListener("keydown", (e) => {
  //console.log('keypress: ' + e.key);
  let keypress = e.key;
  if (gameStarted == false) {
    startTime = new Date();
    console.log("STARTTTTT");
    gameStarted = true;
  }
  if (currentGuessCount < 7) {
    if (
      e.key.length == 1 &&
      pattern.test(e.key) &&
      currentGuess.dataset.letters.length < 5
    ) {
      updateLetters(keypress);
    } else if (
      e.key == "Backspace" &&
      currentGuess.dataset.letters != "" &&
      !revealingTile
    ) {
      deleteLetter();
    } else if (e.key == "Enter" && currentGuess.dataset.letters.length == 5) {
      submitGuess();
    }
  }
});

const submitGuess = () => {
  revealingTile = true;
  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      revealTile(i, checkLetter(i));
      if (i == 4) {
        revealingTile = false;
      }
    }, i * 200);
  }
};

const jumpTiles = () => {
  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      let currentTile = document.querySelector(
        "#guess" + currentGuessCount + "Tile" + (i + 1)
      );
      currentTile.classList.add("jump");
    }, i * 200);
  }
};

const checkIfGuessComplete = (i) => {
  if (i == 4) {
    checkWin();
  }
};

const checkWin = () => {
  //console.log('check win');
  if (solution == currentGuess.dataset.letters) {
    // Win;
    setTimeout(() => {
      jumpTiles();
    }, 500);
    endTime = new Date();
    console.log((endTime - startTime) / 1000 / 60);
  } else {
    // Not won
    currentGuessCount = currentGuessCount + 1;
    currentGuess = document.querySelector("#guess" + currentGuessCount);
    //console.log('not a win, increment guess count to ' + currentGuessCount);
    if (currentGuessCount == 7) {
      setTimeout(() => {
        showSolution();
      }, 500);
    }
  }
};

const showSolution = () => {
  alert("Better luck next time. The solution was: " + solution);
  // 	document.querySelectorAll('.pop-up').hide();
  // 	document.querySelectorAll('.pop-up').fadeIn(1000);

  // 	document.querySelectorAll('.close-button').click(function (e) {

  // 		document.querySelectorAll('.pop-up').fadeOut(700);
  // 		document.querySelectorAll('#overlay').removeClass('blur-in');
  // 		document.querySelectorAll('#overlay').addClass('blur-out');
  // 		e.stopPropagation();

  // 	  });
};
// $(function() {
// 	$('.pop-up').hide();
// 	$('.pop-up').fadeIn(1000);

// 		$('.close-button').click(function (e) {

// 		$('.pop-up').fadeOut(700);
// 		$('#overlay').removeClass('blur-in');
// 		$('#overlay').addClass('blur-out');
// 		e.stopPropagation();

// 	  });
//    });

const checkLetter = (position) => {
  console.log("checkLetter");
  let guessedLetter = currentGuess.dataset.letters.charAt(position);
  let solutionLetter = solution.charAt(position);
  console.log(solution.charAt(position));
  console.log(
    "guessedLetter: " + guessedLetter + " solution letter: " + solutionLetter
  );
  //console.log(guessedLetter, solutionLetter);

  if (guessedLetter.normalize() === solutionLetter.normalize()) {
    return "correct";
  } else if (checkLetterExists(guessedLetter)) {
    return "present";
  } else {
    return "absent";
  }
};

const checkLetterExists = (letter) => {
  return solution.includes(letter);
};

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
  let currentTile = document.querySelector(
    "#guess" + currentGuessCount + "Tile" + tileNumber
  );
  currentTile.innerText = letter;
  currentTile.classList.add("has-letter");
}

//delete last letter
function deleteLetter() {
  let oldLetters = currentGuess.dataset.letters;
  let newLetters = oldLetters.slice(0, -1);
  currentGuess.dataset.letters = newLetters;
  deleteTileLetter(oldLetters.length);
}

//remove markup from last tile on screen
function deleteTileLetter(tileNumber) {
  let currentTile = document.querySelector(
    "#guess" + currentGuessCount + "Tile" + tileNumber
  );
  currentTile.innerText = "";
  currentTile.classList.remove("has-letter");
}

const revealTile = (i, state) => {
  //console.log('revealTile = ' +i, state );
  let tileNum = i + 1;
  flipTile(tileNum, state);
  checkIfGuessComplete(i);
};

const flipTile = (tileNum, state) => {
  let tile = document.querySelector(
    "#guess" + currentGuessCount + "Tile" + tileNum
  );
  tile.classList.add("flip-in");
  setTimeout(() => {
    tile.classList.add(state);
  }, 250);
  setTimeout(() => {
    tile.classList.remove("flip-in");
    tile.classList.add("flip-out");
  }, 250);
  setTimeout(() => {
    tile.classList.remove("flip-out");
  }, 1500);
};
