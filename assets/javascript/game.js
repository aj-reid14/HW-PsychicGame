let wins = 0;
let losses = 0;
let guessesLeft = 10;
let alreadyGuessed = [];
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
        alreadyGuessed.push(keyGuessed);

        // Un-Comment the following code to see 'alreadyGuessed' update & correct letter in console
        console.log("User Guessed: " + keyGuessed + ", Correct: " + randomKey);
        console.log(alreadyGuessed);

        // Game Logic: Check User's Guess against AI's Selection
        if (randomKey === keyGuessed) 
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
                
                if (!keyAlreadyGuessed(keyGuessed)) 
                {
                    document.getElementById("p_guessed").append(" " + keyGuessed);
                    document.getElementById("p_guess").textContent = guessesLeft;
                    document.getElementById("game_msg").textContent = "";
                    guessesLeft--;
                }
                else
                {
                    document.getElementById("game_msg").textContent = "'" + keyGuessed + "' already guessed!";
                }
            }
            else 
            {
                gameActive = false; // The game has ended, user has no guesses left
                lossSound.play();
                losses++;
                document.getElementById("p_guess").textContent = guessesLeft;
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
        alreadyGuessed = [];
        gameActive = true;
    }
}

function keyAlreadyGuessed(key)
{
    // Boolean that will update (only) if key has already been guessed
    let keyExists = false;

    if (alreadyGuessed.length > 0)
    {
        // Since 'keyGuessed' is added to the array before this function is called,
        // Loop through 'arr.length - 1', since the newest entry will always equal 'key' 
        for (let i = 0; i < alreadyGuessed.length - 1; i++)
        {
            // If the currently guessed key is already present in the array
            if (alreadyGuessed[i] === key)
            {
                keyExists = true;

                // Remove the newest entry from the array, which is the currently guessed 'key'
                alreadyGuessed.pop();
                break; // Exit loop if key is found
            }
        }
    }

    return keyExists;
}