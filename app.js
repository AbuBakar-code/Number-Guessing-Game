// Game value
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessLeft = 3;

// UI Elements
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

game.addEventListener('mousedown', function(e){
    if(e.target.className === 'play-again'){
        window.location.reload();
    }
})

// Listen for guess
guessBtn.addEventListener('click', function(){
    let guess = parseInt(guessInput.value);

    // Validate
    if(isNaN(guess) || guess < min || guess > max){
        setMessage(`Please enter a number between ${min} and ${max}`, `red`);
    }

    // Check if won
    if(guess === winningNum){
        gameOver(true, `${winningNum} is correct, YOU WIN!`)
    }
    else{
        // Wrong number
        guessLeft -= 1;

        if(guessLeft === 0){
            // Game over - lost

            gameOver(false, `Game over, you lost.The correct number is ${winningNum}`)

        }
        else{
            guessInput.style.borderColor = 'red';
            // Set message
            setMessage(`${guess} is not correct, ${guessLeft} guesses left`, `red`);
    
        }
    }
});

// Generate random number
function getRandomNum(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// Game over
function gameOver(won, msg){
    let color;
    won === true ? color = 'green' : color = 'red';
    // Disabled input
    guessInput.disabled = true;
    // Change border and message color
    guessInput.style.borderColor = color;
    message.style.color = color;
    // Set message
    setMessage(msg);

    // Play again
    guessBtn.value = 'Play Again';
    guessBtn.className += 'play-again';
}

// Set message
function setMessage(msg, color){
    message.textContent = msg;
    message.style.color = color;
}

