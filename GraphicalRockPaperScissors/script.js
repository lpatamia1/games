// Get references to all HTML elements
const playerScoreEl = document.getElementById('player-score');
const computerScoreEl = document.getElementById('computer-score');
const resultMessageEl = document.getElementById('result-message');
const playerChoiceDisplayEl = document.getElementById('player-choice-display');
const computerChoiceDisplayEl = document.getElementById('computer-choice-display');
const choiceBtns = document.querySelectorAll('.choice-btn');
const resetBtn = document.getElementById('reset-btn');

let playerScore = 0;
let computerScore = 0;
const choices = ['rock', 'paper', 'scissors'];
const choiceEmojis = {
    rock: '✊',
    paper: '✋',
    scissors: '✌️'
};

// Function to handle a player's move
function playRound(playerChoice) {
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];
    let resultMessage = '';
    
    // Remove previous glow effects
    playerChoiceDisplayEl.classList.remove('win-glow', 'lose-glow', 'tie-glow');
    computerChoiceDisplayEl.classList.remove('win-glow', 'lose-glow', 'tie-glow');

    if (playerChoice === computerChoice) {
        resultMessage = "It's a tie!";
        playerChoiceDisplayEl.classList.add('tie-glow');
        computerChoiceDisplayEl.classList.add('tie-glow');
    } else if (
        (playerChoice === 'rock' && computerChoice === 'scissors') ||
        (playerChoice === 'paper' && computerChoice === 'rock') ||
        (playerChoice === 'scissors' && computerChoice === 'paper')
    ) {
        playerScore++;
        resultMessage = 'You Win!';
        playerChoiceDisplayEl.classList.add('win-glow');
        computerChoiceDisplayEl.classList.add('lose-glow');
    } else {
        computerScore++;
        resultMessage = 'You Lose!';
        playerChoiceDisplayEl.classList.add('lose-glow');
        computerChoiceDisplayEl.classList.add('win-glow');
    }

    // Update UI
    playerScoreEl.textContent = playerScore;
    computerScoreEl.textContent = computerScore;
    resultMessageEl.textContent = resultMessage;
    playerChoiceDisplayEl.textContent = choiceEmojis[playerChoice];
    computerChoiceDisplayEl.textContent = choiceEmojis[computerChoice];
}

// Function to reset the game
function resetGame() {
    playerScore = 0;
    computerScore = 0;
    playerScoreEl.textContent = playerScore;
    computerScoreEl.textContent = computerScore;
    resultMessageEl.textContent = 'Choose your move!';
    playerChoiceDisplayEl.textContent = '';
    computerChoiceDisplayEl.textContent = '';
    playerChoiceDisplayEl.classList.remove('win-glow', 'lose-glow', 'tie-glow');
    computerChoiceDisplayEl.classList.remove('win-glow', 'lose-glow', 'tie-glow');
}

// Add event listeners to the choice buttons
choiceBtns.forEach(button => {
    button.addEventListener('click', () => {
        const playerChoice = button.dataset.choice;
        playRound(playerChoice);
    });
});

// Add event listener to the reset button
resetBtn.addEventListener('click', resetGame);