$(document).ready(function() {
    
    // hide timer, questions, and results
    $('#countdown').hide();
    $('.trivia-ques').hide();
    $('.results').hide();
    
    // variables
    var number = 25; // number of seconds - will display 24 initially to match NBA shot clock
    var intervalId;
    var correctCount = 0;
    var wrongCount = 0;
    var unanswered = 0;
    var questionBank = [
        {
        question: "Which team drafted Kobe Bryant?",
        correct: " Charlotte Hornets ",
        choices: [" Las Angeles Lakers ", " Charlotte Hornets ", " Philadelphia 76ers ", " Las Angeles Clippers "]
        },{
        question: "Which team won the 1994 NBA Championship?",
        correct: " Houston Rockets ",
        choices: [" Chicago Bulls ", " Detroit Pistons ", " San Antonio Spurs ", " Houston Rockets "]
        },{
        question: "What's the single game assist record?",
        correct: " 30 ",
        choices: [" 25 ", " 30 ", " 35 ", " 40 "]
        },{
        question: "Who is the all-time points leader?",
        correct: " Kareem Abdul-Jabar ",
        choices: [" Kareem Abdul-Jabar ", " Michael Jordan ", " Karl Malone ", " JR Smith "]
        },{
        question: "What's the single game points record?",
        correct: " 100 ",
        choices: [" 81 ", " 90 ", " 99 ", " 100 "]
        },{
        question: "Who has played in the most regular season games?",
        correct: " Robert Parish ",
        choices: [" Dirk Nowitzki ", " Robert Parish ", " Kareem Abdul-Jabar ", " Karl Malone "]
        },{
        question: "What is the best career free throw percentage?",
        correct: " 90 ",
        choices: [" 89 ", " 90 ", " 95 ", " 99 "]
        },{
        question: "How many championships does Michael Jordan have?",
        correct: " 6 ",
        choices: [" 3 ", " 6 ", " 9 ", " 1 "]
        }]
    
    // functions
    
    // displays generated questions, timer, and 'done' button
    function startGame(){
        $('#countdown').show();
        $('#game-done').show();

        // create new array for chosen questions
        var chosenQuestions = [];
        
        // generate 5 random numbers
        for (var w=0; w<5; w++){
            var questionIndex = Math.floor(Math.random()*(questionBank.length - 1));

            // make sure the numbers don't repeat
            while (chosenQuestions.indexOf(questionIndex) >= 0){
                questionIndex = Math.floor(Math.random()*(questionBank.length - 1));
            }

            // fill the chosenQuestions array with the randomly selected questions
            chosenQuestions.push(questionIndex);
                
            // dynamically generate the question
            var questionDiv = $("<div>");
            var questionText = $("<p class='quest'>");
            questionText.text(questionBank[questionIndex].question);
            questionDiv.append(questionText);

            // generate choices
            var choices = questionBank[questionIndex].choices;
            for (var i=0; i<choices.length; i++){
                var choiceSpan = $("<span>");
                choiceSpan.text(choices[i] + " ");

                var choiceRadio = $(` <input type='radio' name=q${questionIndex} data-qi=${questionIndex} data-choice=${i}>`)

                choiceSpan.prepend(choiceRadio);
                questionDiv.append(choiceSpan);
            }
            
            $('.trivia-ques').prepend(questionDiv);
        }
            
        $('.trivia-ques').show();

    }
    
    // timer
    function countdownTimer(){
        intervalId = setInterval(decrement, 1000);
    }
       
    // function to decrement timer
    function decrement(){
        number--;
        $('#timer').html(" " + number + " " + "seconds");
        if (number ===1){
            $('#timer').html(" " + number + " " + "second");
        }
        else if(number ===0) {
            stop();
            hide();
            displaySummary();
        }
    }
    
    // clear timer
    function stop() {
        clearInterval(intervalId);
    }
    
    // hide text after timer hits zero
    function hide(){
        $('#countdown').hide();
        $('.trivia-ques').hide();
        $('#game-done').hide();
    }
    
    // function to display summary of game
    function displaySummary(){
        $('.results').show();
        var userAnswers = $("input:checked");

        for (i=0; i<userAnswers.length; i++){
            console.log(userAnswers)
            var questionIndex = $(userAnswers[i]).attr('data-qi');
            var choiceIndex = $(userAnswers[i]).attr('data-choice');

            if(questionBank[questionIndex].correct === questionBank[questionIndex].choices[choiceIndex]){
                correctCount++;
            } else {
                wrongCount++;
            }
        }
            
        unanswered = (5 - (correctCount + wrongCount));
        $('#correctScore').text("Correct Answers:" + " " + correctCount); 
        $('#wrongScore').text("Wrong Answers:" + " " + wrongCount); 
        $('#unanswered').text("Unanswered:" + " " + unanswered); 
    }
    
    // click events
    
    // click start button
    $('#game-start').on('click', function(){
        $('#game-start').hide();
        startGame();
        countdownTimer();
    }); 
    
    // click done button
    $('#game-done').on('click', function(){
        $('#game-start').hide(); 
        hide();
        displaySummary();
        stop();
    }); 

});