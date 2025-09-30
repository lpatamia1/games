import java.util.Scanner;
import java.util.Random;

public class RockPaperScissors {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        String playAgain;

        do {
            playGame(scanner);
            System.out.print("\nDo you want to play again? (y/n) >> ");
            playAgain = scanner.nextLine();
        } while (playAgain.equalsIgnoreCase("y"));

        System.out.println("\nThanks for playing! 👋");
        scanner.close();
    }

    /**
     * Contains the logic for a single round of Rock, Paper, Scissors.
     */
    public static void playGame(Scanner scanner) {
        // Get the user's choice and validate it
        String userChoice;
        while (true) {
            System.out.println("\nEnter your choice: rock, paper, or scissors");
            System.out.print(">> ");
            userChoice = scanner.nextLine().toLowerCase();
            if (userChoice.equals("rock") || userChoice.equals("paper") || userChoice.equals("scissors")) {
                break; // Exit loop if input is valid
            } else {
                System.out.println("Invalid choice. Please try again.");
            }
        }

        // Get the computer's random choice
        Random random = new Random();
        String[] choices = {"rock", "paper", "scissors"};
        String computerChoice = choices[random.nextInt(choices.length)];

        System.out.println("You chose: " + userChoice);
        System.out.println("The computer chose: " + computerChoice);

        // Determine the winner
        if (userChoice.equals(computerChoice)) {
            System.out.println("It's a tie!");
        } else if ((userChoice.equals("rock") && computerChoice.equals("scissors")) ||
                   (userChoice.equals("scissors") && computerChoice.equals("paper")) ||
                   (userChoice.equals("paper") && computerChoice.equals("rock"))) {
            System.out.println("🎉 You win!");
        } else {
            System.out.println("Sorry, you lose.");
        }
    }
}