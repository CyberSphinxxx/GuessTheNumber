let randomNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;

function checkGuess() {
    let guess = parseInt(document.getElementById("guessInput").value);
    attempts++;

    if (isNaN(guess) || guess < 1 || guess > 100) {
        setMessage("Please enter a valid number between 1 and 100.");
        return;
    }

    if (guess === randomNumber) {
        setMessage(`Congratulations! You guessed the number in ${attempts} attempts.`);
        document.querySelector("button").disabled = true;
    } else if (guess < randomNumber) {
        setMessage("Too low. Try again!");
    } else {
        setMessage("Too high. Try again!");
    }
}

function setMessage(msg) {
    document.getElementById("message").textContent = msg;
}