import inquirer from "inquirer";
import chalk from "chalk";

console.log(
  chalk.bgYellow.black(
    "Welcome to the Number Guessing Game! Guess a number between 1 and 100."
  )
);
askForGuess();

function askForGuess() {
  const secretNumber = Math.floor(Math.random() * 101);
  inquirer
    .prompt([
      {
        type: "input",
        name: "guess",
        message: chalk.blue("Enter your guess:"),
        validate: (input) => {
          if (input > 100 || input < 1) {
            return "Please enter a number from 1 to 100";
          } else if (isNaN(input)) {
            return "Please enter a valid number.";
          }
          return true;
        },
      },
    ])
    .then((answers) => {
      if (parseInt(answers.guess) === secretNumber) {
        console.log(
          chalk.green(
            `Congratulations! You've guessed the secret number: ${secretNumber}.`
          )
        );
      } else {
        console.log(
          chalk.red(`Wrong! The correct secret number is: ${secretNumber}`)
        );
      }
      inquirer
        .prompt([
          {
            type: "confirm",
            name: "playAgain",
            message: chalk.yellow("Do you want to play again?"),
          },
        ])
        .then((answers) => {
          if (answers.playAgain) {
            askForGuess();
          } else {
            console.log(chalk.bgCyan("Thanks for playing!"));
          }
        });
    });
}
