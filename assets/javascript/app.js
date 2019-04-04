$(document).ready(function() {
    
    // hide timer, questions, and results
        $('#countdown').hide();
        $('.trivia-ques').hide();
        $('.results').hide();
    
    // variables
        var number = 25; // number of seconds - will display 24 initially
        var intervalId;
        var correctCount = 0;
        var wrongCount = 0;
        var unanswered = 0;
    
    // functions
    
        // shows timer, questions, and results
        function showQuestions(){
            $('#countdown').show();
            $('.trivia-ques').show();
            $('#game-done').show();
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
            unanswered = (5 - (correctCount + wrongCount));
            $('#correctScore').text("Correct Answers:" + " " + correctCount); 
            $('#wrongScore').text("Wrong Answers:" + " " + wrongCount); 
            $('#unanswered').text("Unanswered:" + " " + unanswered); 
        }
    
    // click events
    
        // click start button
        $('#game-start').on('click', function(){
            $('#game-start').hide();
            showQuestions();
            countdownTimer();
        }); 
    
        // click done button
        $('#game-done').on('click', function(){
            $('#game-start').hide(); 
            hide();
            displaySummary();
        });
    
        //Clicking Radio button
        $('input[type=radio]').on ('change', function(){
        correctCount = $('input[value=correct]:checked').length;
        wrongCount = $('input[value=wrong]:checked').length;
        unanswered = (5-(correctCount+wrongCount));
        });
    
    });