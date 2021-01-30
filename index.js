//List of variables used

let fruitWords = ["apple", "watermelon", "pear", "peach", "mango", "coconut", "banana", "lime", "lemon", "durian"]

let animalWords = ["squirrel", "lion", "leopard", "elephant", "sheep", "coyote", "mouse", "kangaroo", "goat", "otter"]

let colorWords = ["yellow", "orange", "brown", "black", "green", "maroon", "indigo", "purple", "white", "pink"]

let categoryArray = [fruitWords, animalWords, colorWords];
let hintWord = ["Fruit", "Animal", "Color"];
let gameWord, hint, numberOfBlanks, repeatedLetter, lastArrayElement;
let form = document.getElementById("guess-form");
let guessAmountLeft = 10;
let correctGuesses = 0;
let answerArray =[];
let gameWordArray = [];
let usedWordsArray = [];

//style manipulation
document.getElementById("guessBoard").style.display= "none";

document.getElementById("guessNumber").innerText = guessAmountLeft;
document.getElementById("submitBtn").disabled = false;


//function to generate a word for the game

wordGenerate = () => {


    category = Math.floor(Math.random()*3);    
    wordNum = Math.floor(Math.random()*10);

//choosing a category & word
    
    for(let i = category; i == category; i++){
        
        gameCategory = categoryArray[i];
        hint = hintWord[i];
        console.log(hint);
        console.log(gameCategory);
        
        for(let j = wordNum; j == wordNum; j++){
            
            gameWord = gameCategory[j];
            console.log(gameWord);
            
            gameWordArray = gameWord.split("");
            console.log(gameWordArray);
            
        }
    } 

//printing out "_" and the hint
    
    numberOfBlanks = gameWord.length;
    
    for (let i = 0; i<gameWord.length; i++){
        
        answerArray[i]= "_";
       
    }
    
    console.log(answerArray);
    document.getElementById("guessedWord").innerText = answerArray.join(" ");
    document.getElementById("hint").innerText = "Hint: " + hint;
    
}

//Function called when guess is submitted

guessButton = () => {
    
    let inputWord = document.getElementById("guess").value; 
    let inputGuess = inputWord.toLowerCase();
    checkExistance = gameWord.indexOf(inputGuess);
    console.log("Check existance = " + checkExistance);
    document.getElementById("guess").value = '';
    
//check for repeated guesses    
    for(let i=0; i<usedWordsArray.length; i++){
        
        if (inputGuess == usedWordsArray[i]){
            
            repeatedLetter = true;
            break;
            
        }else {
            
            repeatedLetter = false;    
            
        }
    }
    
    console.log("Repeated letter = " + repeatedLetter)
    
//Error msg for empty input box     
    if (inputGuess.length == 0){
        
        alert("Please enter your guess!");
        
//Error msg for multiple character inputs
    }else if (inputGuess.length > 1 ){
        
        alert("You may only enter 1 alphabet!");
        
//Error msg for non-alphabet input       
    }else if(/[^a-zA-Z]/.test(inputGuess) == true){
        
        alert('Please enter a valid guess');
        
//Error msg for repeated guesses        
    }else if(repeatedLetter == true){
        
        alert("You have already guessed this letter! Please select another.")
        
//Incorrect guess        
    }else if(checkExistance == -1) {
        
        console.log("Wrong guess");
        guessAmountLeft --;
        document.getElementById("guessNumber").innerText = guessAmountLeft;
        
        let x = document.createElement("li");
        let y = document.createTextNode(inputGuess);
        x.appendChild(y);
        document.getElementById("guessedLetters").appendChild(x);
        
        usedWordsArray.push(inputGuess);
        
        document.getElementById("gameMsg").innerText = "Nope! Try again!"
        
        document.getElementById("gameMsg").style.color = "red";
        
        document.getElementById("guessBoard").style.display= "block";
        
//End game if no more guesses left        
        if (guessAmountLeft == 0){
            
             document.getElementById("submitBtn").disabled = true;
            
            document.getElementById("textBox").innerText = "You Lost! The word you are looking for is: ";
            
            document.getElementById("textBox").style.color = "red";
            
            document.getElementById("guessedWord").innerText = gameWordArray.join(" ");
            
            document.getElementById("hint").innerText = "Try Again!";
            
            document.getElementById("gameMsg").innerText = "";           
        }
        
    }else {
 
//Correct guess
        console.log("Good guess");
        for (let i=0; i < answerArray.length; i++){
            
            if (inputGuess == gameWordArray[i]) {
                
                answerArray[i] = inputGuess;
                
                document.getElementById("guessedWord").innerText = answerArray.join(" ");
                
                usedWordsArray.push(inputGuess);
                
                correctGuesses++;
                
                console.log("Correct guesses = " + correctGuesses);
                
                console.log(lastArrayElement);
                
                document.getElementById("gameMsg").innerText = "Nice! Keep going!"
        
                document.getElementById("gameMsg").style.color = "green";
                document.getElementById("guessBoard").style.display= "block";
                
                //Preventing repeat appreance of input in guessed words box
                if(inputGuess != lastArrayElement){
                        
                    let x = document.createElement("li");
                    let y = document.createTextNode(inputGuess);
                    x.appendChild(y);
                    document.getElementById("guessedLetters").appendChild(x);
                        
                }
                
                lastArrayElement = usedWordsArray[usedWordsArray.length-1];
                
                //Game winning guess
                if (correctGuesses == numberOfBlanks){
                    document.getElementById("textBox").innerText = "You got it! Congratulations!";
                    document.getElementById("textBox").style.color = "green";
                    
                    document.getElementById("hint").innerText = "";
                    document.getElementById("gameMsg").innerText = "";
                    
                    document.getElementById("submitBtn").disabled = true;
                    
                }
                           
            }
            
        }
        
    }
    
}

//Reset game onclick
resetGame = () => {
    location.reload();
}

//Prevent form actions
handleForm = (e) => {
    e.preventDefault();
}

//Event listeners
submitBtn.addEventListener("click", guessButton);
form.addEventListener('submit', handleForm);
newGameBtn.addEventListener("click", resetGame);

//Game starting function
wordGenerate();
