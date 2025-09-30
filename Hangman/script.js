// Get references to HTML elements
const wordDisplayEl = document.querySelector('.word-display');
const hangmanSvg = document.querySelector('.hangman-svg');
const bodyParts = document.querySelectorAll('.body-part');
const keyboardEl = document.querySelector('.keyboard');
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const correctWordEl = document.getElementById('correct-word');
const playAgainBtn = document.getElementById('play-again-btn');

const words = [
    'javascript', 'interface', 'application', 'developer', 'github', 'code', 'variable', 'function', ' library',
    'database', 'backend', 'markup', 'stylesheet', 'inheritance', 'polymorphism', 'compile', 'debug',
    'terminal', 'repository', 'frontend', 'encapsulation', 'pixel'
];
let selectedWord = '';
let guessedLetters = [];
let wrongGuesses = 0;

function initializeGame() {
    // Reset game state
    guessedLetters = [];
    wrongGuesses = 0;
    modal.classList.remove('show');

    // Hide all body parts
    bodyParts.forEach(part => (part.style.visibility = 'hidden'));

    // Select a new random word, ensuring it's not the same as the last one
    const previousWord = selectedWord;
    do {
        selectedWord = words[Math.floor(Math.random() * words.length)];
    } while (selectedWord === previousWord);    
    // Display the word with underscores
    displayWord();

    // Create or reset the keyboard
    createKeyboard();
}

function displayWord() {
    wordDisplayEl.innerHTML = selectedWord
        .split('')
        .map(letter => `
            <span class="letter-box">
                ${guessedLetters.includes(letter) ? letter : ''}
            </span>
        `)
        .join('');
    
    // Check for win condition by checking the data directly
    const allLettersGuessed = selectedWord.split('').every(letter => guessedLetters.includes(letter));
    
    if (allLettersGuessed) {
        showModal(true);
    }
}

function createKeyboard() {
    keyboardEl.innerHTML = ''; // Clear old keyboard
    'abcdefghijklmnopqrstuvwxyz'.split('').forEach(letter => {
        const key = document.createElement('button');
        key.className = 'key';
        key.textContent = letter;
        key.addEventListener('click', () => handleGuess(letter));
        keyboardEl.appendChild(key);
    });
}

function handleGuess(letter) {
    if (guessedLetters.includes(letter)) return;
    guessedLetters.push(letter);
    
    // Disable the clicked key
    const keys = document.querySelectorAll('.key');
    keys.forEach(key => {
        if (key.textContent === letter) {
            key.disabled = true;
        }
    });

    if (selectedWord.includes(letter)) {
        displayWord(); // Correct guess
    } else {
        wrongGuesses++;
        bodyParts[wrongGuesses - 1].style.visibility = 'visible'; // Show a body part
        
        // Check for lose condition
        if (wrongGuesses === bodyParts.length) {
            showModal(false);
        }
    }
}

function showModal(isWin) {
    modalTitle.textContent = isWin ? '🎉 You Won!' : '😭 You Lost!';
    correctWordEl.textContent = selectedWord;
    modal.classList.add('show');
}

// Event listener for the "Play Again" button
playAgainBtn.addEventListener('click', initializeGame);

// Start the first game
initializeGame();