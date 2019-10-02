let wins = 0;
let losses = 0;
let guessesLeft = 10;
let gameActive = true;
let winSound = new Audio("assets/audio/win.wav");
let lossSound = new Audio("assets/audio/loss.wav");

// Get Random Keycode Between 65-90 (inclusive, effectively a-z)
// Convert KeyCode to actual Key/Letter
// Convert Final Key/Letter to Lowercase
let randomKey = String.fromCharCode((Math.floor(Math.random() * 26) + 65)).toLowerCase();

document.onkeyup = function (event) 
{

    if (event.code === "Space")
    restartGame();

    if (gameActive) 
    {
        let keyGuessed = event.key;
        console.log(keyGuessed + ": " + event.keyCode + ", Correct: " + randomKey);

        // Game Logic: Check User's Guess against AI's Selection
        if (randomKey === event.key) 
        {
            gameActive = false; // The game has ended, user has won
            winSound.play();
            wins++;
            document.getElementById("p_wins").textContent = wins;
            document.getElementById("game_msg").textContent = "You Have Won! Correct Letter: " + randomKey + ". 'SPACE' to play again!";
        }
        else 
        {
            if (guessesLeft > 0) 
            {
                guessesLeft--;
                document.getElementById("p_guessed").append(" " + keyGuessed);
                document.getElementById("p_guess").textContent = guessesLeft;
            }
            else 
            {
                gameActive = false; // The game has ended, user has no guesses left
                lossSound.play();
                losses++;
                document.getElementById("p_loss").textContent = losses;
                document.getElementById("game_msg").textContent = "You Have Lost...Correct Letter: " + randomKey + ". 'SPACE' to play again!";
            }
        }
    }
}

function restartGame()
{
    if (!gameActive)
    {
        guessesLeft = 10;
        document.getElementById("p_guessed").textContent = "";
        document.getElementById("game_msg").textContent = "";
        randomKey = String.fromCharCode((Math.floor(Math.random() * 26) + 65)).toLowerCase(); // New Random Letter From Computer
        gameActive = true;
    }
}