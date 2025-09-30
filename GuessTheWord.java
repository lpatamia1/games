import java.util.Scanner;
import java.util.Random;

public class GuessTheWord {

    // A list of words for the game to choose from.
    private static final String[] WORDS = {
        "python", "java", "javascript", "gaming", "adventure", "developer",
        "interface", "application", "network", "database", "computer"
    };

    // The maximum number of incorrect guesses allowed.
    private static final int MAX_INCORRECT_GUESSES = 6;

    // ASCII art for the hangman stages. Each index corresponds to the number of incorrect guesses.
    private static final String[] HANGMAN_STAGES = {
        // 0 incorrect guesses
        "  +---+\n" +
        "  |   |\n" +
        "      |\n" +
        "      |\n" +
        "      |\n" +
        "      |\n" +
        "=========",
        // 1 incorrect guess
        "  +---+\n" +
        "  |   |\n" +
        "  O   |\n" +
        "      |\n" +
        "      |\n" +
        "      |\n" +
        "=========",
        // 2 incorrect guesses
        "  +---+\n" +
        "  |   |\n" +
        "  O   |\n" +
        "  |   |\n" +
        "      |\n" +
        "      |\n" +
        "=========",
        // 3 incorrect guesses
        "  +---+\n" +
        "  |   |\n" +
        "  O   |\n" +
        " /|   |\n" +
        "      |\n" +
        "      |\n" +
        "=========",
        // 4 incorrect guesses
        "  +---+\n" +
        "  |   |\n" +
        "  O   |\n" +
        " /|\\  |\n" + // Note: The backslash is escaped with another backslash
        "      |\n" +
        "      |\n" +
        "=========",
        // 5 incorrect guesses
        "  +---+\n" +
        "  |   |\n" +
        "  O   |\n" +
        " /|\\  |\n" +
        " /    |\n" +
        "      |\n" +
        "=========",
        // 6 incorrect guesses
        "  +---+\n" +
        "  |   |\n" +
        "  O   |\n" +
        " /|\\  |\n" +
        " / \\  |\n" +
        "      |\n" +
        "========="
    };

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        Random random = new Random();
        String playAgain;

        do {
            playGame(scanner, random);
            System.out.print("\nDo you want to play again? (y/n) >> ");
            playAgain = scanner.nextLine();
        } while (playAgain.equalsIgnoreCase("y"));

        System.out.println("\nThanks for playing! 👋");
        scanner.close();
    }

    /**
     * Contains the main logic for a single round of the game.
     */
    public static void playGame(Scanner scanner, Random random) {
        String secretWord = WORDS[random.nextInt(WORDS.length)];
        char[] guessedWord = new char[secretWord.length()];
        for (int i = 0; i < guessedWord.length; i++) {
            guessedWord[i] = '_';
        }

        int incorrectGuesses = 0;
        StringBuilder guessedLetters = new StringBuilder();
        boolean wordIsGuessed = false;

        System.out.println("\n--- New Game: Guess the Word! ---");

        while (incorrectGuesses < MAX_INCORRECT_GUESSES && !wordIsGuessed) {
            printGameState(incorrectGuesses, guessedWord, guessedLetters.toString());

            // Get player input
            System.out.print("Guess a letter >> ");
            String input = scanner.nextLine().toLowerCase();

            // Validate input
            if (input.length() != 1 || !Character.isLetter(input.charAt(0))) {
                System.out.println("Invalid input. Please enter a single letter.");
                continue;
            }

            char letter = input.charAt(0);

            // Check if letter was already guessed
            if (guessedLetters.toString().indexOf(letter) != -1) {
                System.out.println("You already guessed that letter. Try again.");
                continue;
            }
            
            guessedLetters.append(letter);

            // Check if the letter is in the word
            if (secretWord.indexOf(letter) != -1) {
                System.out.println("Correct! '" + letter + "' is in the word.");
                for (int i = 0; i < secretWord.length(); i++) {
                    if (secretWord.charAt(i) == letter) {
                        guessedWord[i] = letter;
                    }
                }
            } else {
                System.out.println("Sorry, '" + letter + "' is not in the word.");
                incorrectGuesses++;
            }
            
            // Check for win condition
            if (new String(guessedWord).equals(secretWord)) {
                wordIsGuessed = true;
            }
        }
        
        // Post-game summary
        if (wordIsGuessed) {
            System.out.println("\n🎉 Congratulations! You guessed the word!");
            System.out.println("The word was: " + secretWord);
        } else {
            System.out.println("\n--- GAME OVER ---");
            System.out.println(HANGMAN_STAGES[incorrectGuesses]);
            System.out.println("You ran out of guesses! The word was: " + secretWord);
        }
    }
    
    /**
     * Prints the current state of the game, including the hangman, the guessed word,
     * and the letters that have already been tried.
     */
    public static void printGameState(int incorrectGuesses, char[] guessedWord, String guessedLetters) {
        System.out.println("\n" + HANGMAN_STAGES[incorrectGuesses]);
        System.out.print("Word: ");
        for (char c : guessedWord) {
            System.out.print(c + " ");
        }
        System.out.println("\nGuesses Left: " + (MAX_INCORRECT_GUESSES - incorrectGuesses));
        System.out.println("Guessed Letters: [" + guessedLetters + "]");
    }
}