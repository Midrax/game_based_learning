/* 
    Enemy AIs are defined here. 
    answerTimeBegin-answerTimeEnd is the interval within which the AI will answer the question, using probability;
    rightGuess determines if the AIs answer is going to be correct, using probability;
*/

var AIs;
/*
var AIs = [
    {
        name:"Nobody",
        answerTimeBegin:10,
        answerTimeEnd:10,
        rightGuess:12,
        HTMLtext:"No enemy, </br> No challenge. </br>",
        playerName:["Nobody, really,", "Literally no one", "Some hooded guy from an Organization"],
        lossReact: [" is judging your errors. Wrong answers may happen!", " is thinking you're making bad choices. Maybe."],
        deathReact: [" thinks you're dead. It's a game, luckily, try again!", " likes GAME OVERs."],
        winwinReact: [" is amazed by how good you are. Is it worth winning without fighting, though?", " is impressed by your great knowledge."],
        winfastReact: [" knows that this option can't ever come up on screen"],
        winlossReact: [" knows that this option can't ever come up on screen"],
        skipReact: [" is yawning at your lack of confidence.", " is bored by your odd display of ignorance."]
    },
    {
        name:"Dumb",
        answerTimeBegin:6,
        answerTimeEnd:8,
        rightGuess:8,
        HTMLtext:"This player isn't what you'd call smart. </br> He may guess something right once in a while. </br>",
        playerName: ["Alfred, tinfoil hat wearer,", "Mr Doggo, who also happen to be a really nice dog,", "The President of the Galaxy"],
        lossReact: [" is laughing at your errors! Or maybe not, maybe it's because of a joke they told him.", " is thinking you don't know the answer! Just kidding, he can't think."],
        deathReact: [" is afraid you're unable to go on. Maybe you should restart?", " is looking at you with a puzzled expression. Why aren't you moving?"],
        winwinReact: [" is quite surprised. He really thought he knew that one!", " is really depressed. You got it right and he got it wrong."],
        winfastReact: [" is flabbergasted. Is that even a word? He knew the answer, but you got it faster!", " is bamboozled. He got the right answer, but you were faster!"],
        winlossReact: [" is bursting with joy. You got the answer right, but for once he answered faster!", " is playing the banjo. He's quite skilled. Also, you answered right, but were too slow."],
        skipReact: [" is nodding apprehensively. He didn't know that one, why would you?", " is thinking that he may win if you skip more questions. Please skip!"]
    },
    {
        name:"Average",
        answerTimeBegin:5,
        answerTimeEnd:7,
        rightGuess:6,
        HTMLtext:"This player is as clever as your average Joe or Jane can be. </br> Not too easy nor too hard to beat. </br>",
        playerName: ["Joseph, also known as Joe,", "Jane Doe, ordinary lady,"],
        lossReact: [" thinks that getting hurt because of a wrong answer is insane! Are you okay?", " is wondering what is going on. Did you just get hurt because of a wrong answer?"],
        deathReact: [" is giving you CPR, hoping for you to regain consciousness.", " is scared. Did you just pass out because of failing a quiz?"],
        winwinReact: [" is mediumly impressed by your knowledge, you were right.", " is feeling mediocre. You guessed right..."],
        winfastReact: [" is mediumly shocked. Your answer came quicker!", " is sort of impressed. You were faster in giving the right answer!"],
        winlossReact: [" is happy, like an average person. You got the answer right, but your opponent was faster", " is amused. Also, you answered right, but were too slow."],
        skipReact: [" is perplexed. Is it a wise choice not to answer?", " thinks that skipping questions is a boring way of playing."]
    },
    {
        name:"Clever",
        answerTimeBegin:4,
        answerTimeEnd:6,
        rightGuess:4,
        HTMLtext:"This guy is fast and quite sharp. </br> You never know what he's up to. </br>",
        playerName: ["R. Sanchez, notorious scientist,","The Ancient One", "Dr. Mario, which by the way is not a real doctor," ],
        lossReact: [" is saying something on the lines of 'get rekt kid', as you answered incorrectly", " is delighted by your struggle.", " feels sorry. Well, not really. You were wrong!"],
        deathReact: [" is pondering upon the meaning of life. And death.", " is enjoying his victory!"],
        winwinReact: [" is pissed. How come you guessed right? And he didn't?!", " is distracted by deep thoughts. He answered wrong, and you were right!"],
        winfastReact: [" is asking you to slow down, you're fast, he gets it. You were also right.", " thinks your answer was absurdly quick. He's impressed, but he'll never admit it."],
        winlossReact: [" answered right before you did, and is clearly flexing about it.", " has given the right answer quicker than you, and he's making odd victory poses"],
        skipReact: [" says that skipping answers is NOT the way towards victory.", " is mocking you for your display of ignorance."]
    }
];
/*

/*
    Global Variables are defined here.
*/

var chosenAI;               // Contains the chosen AI, based upon the player's choice
var title;
var questions = [];         // Contains the questions
var correctAnswers = [];    // Contains the correct answers per each question
var timers = [];            // Contains the answer time per each question
var answers = [];           // Contains the answers per each question

var bounds= [5,6,7,8,9,10]; // Array of bounds, use shown below
var questBound = bounds[0]; // Number of questions shown during a single Quiz, first value of bounds by default

var questionContainer = []; // Contains HTML formatted chunks of code meant to display the question
var currentQuestion = 0;    // Integer that helps looping through the questions

var playerAnswers = [];     // The answers given by the player are added here during runtime
var enemyAnswers = [];      // The enemy answers are generated here before the match begins 
                            // The enemy behaviour's outcome is decided even before the game begins, the game is rigged! 
var playerAnswerTime = [];  // The player's answering times are added here during runtime
var enemyAnswerTime = [];   // Again, the enemy's behaviour is predetermined
var enemyName;

var heart = $('<div/>', {
    'class':'heart',
    });

$(document).ready(function(){

    $.getJSON('AI.json', function(data) {
        AIs = data;
    });
    $("#selector").click(function() {
        $("#quiztab").remove();
        getQuiz();
    });
});


function getQuiz() {
    if (window.XMLHttpRequest) {
            // code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        } 
    else {
        // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function() 
    {
        if (this.readyState == 4 && this.status == 200) {
            var quizData = atob(this.responseText);
            var currentIndex = -1;
            var tmp = [];
            $(quizData).each(function(){

                if ($(this).attr('class')=='title'){
                    title = $(this).html();
                }

                if ($(this).attr('class')=='question'){
                    if (currentIndex>=0){
                        answers.push(tmp);
                        tmp = [];
                    }
                    questions.push($(this).html());
                    currentIndex++;
                }

                if ($(this).attr('class')=='time'){
                    timers.push($(this).html());
                }

                if ($(this).attr('class')=='c_answer'){
                    correctAnswers.push($(this).html());
                    tmp.push($(this).html());
                }

                if ($(this).attr('class')=='answer'){
                    tmp.push($(this).html());
                }
            });
            answers.push(tmp);

            $("#container").css({"visibility":"visible"});

            for (i=0;i<timers.length;i++){
                timers[i] = (parseInt(timers[i])+10)+"";
            }
            startTheGame();
        }
    };
    xmlhttp.open("GET","data.html",true);
    xmlhttp.send();
}

function startTheGame() {

    shuffleQuestions();

    //The Quiz Title is added to the DOM
    $("#QuizTitle").append(title);
    $("#QuizTitle").attr('data-text', title);
    $('<h3/>', {
        'html':'Choose your opponent!',
    }).appendTo("#game");

    addTheAI();

    insertQuestionBound();
    
    for (i=0;i<questions.length;i++) //for each question in the list
    {
        var q = $('<h3/>', {
            'html':questions[i],
        });
        q.append("</br></br>");
        shuffle(answers[i]);
        for (j=0;j<answers[i].length;j++)
        {
            $("<button/>", {
                'value':answers[i][j],
                'type':'button',
                'html':answers[i][j],
                'class':"btn btn-default",
                'click':function(){
                    if (this.value==correctAnswers[currentQuestion])
                        playerAnswers[currentQuestion]=true;
                    else
                        playerAnswers[currentQuestion]=false;
                    var minutes = parseInt($("#time").html().substring(33,36)*60);
                    var seconds = parseInt($("#time").html().substring(38,41));
                    playerAnswerTime[currentQuestion] = minutes+seconds;
                    playersHandler();
                    nextQuestion();
                },
            }).appendTo(q);
            q.append("</br>");
        }
        q.append("</br>");
        $("<button/>", {
            'type':'button',
            'html':"Skip Question",
            'class':"btn btn-default",
            'click':function(){
                playerAnswers[currentQuestion]=false;
                playerAnswerTime[currentQuestion] = 0;
                $('.status').empty();
                $('.status').append(enemyName+randomPick(chosenAI.skipReact));
                nextQuestion();
            }
        }).appendTo(q);
        questionContainer.push(q);

    }
}

function addTheAI() {

    for (i=0;i<AIs.length;i++)
    {
        // The Enemy Player button is created and added to the DOM
        $('<button/>', {
            'id':'btn'+AIs[i].name,
            'type':'button',
            'class':'btn btn-default',
            'data-toggle':'collapse',
            'data-target':'#'+AIs[i].name+'Text',
            'html':AIs[i].name,
        }).appendTo("#game");
        $("#game").append("</br>");
        $('<div/>', {
            'id':AIs[i].name+'Text',
            'class':'collapse panel panel-default',
            'html': AIs[i].HTMLtext
        }).appendTo("#game");
        $('<button/>', {
            'id':i,
            'type':'button',
            'class':'btn btn-default',
            'html':"Let's battle!",
            'click': function(){
                chosenAI=AIs[$(this).attr('id')];
                enemyName = randomPick(chosenAI.playerName);
                $('.status').empty();
                $('.status').append(enemyName+" is facing against you!");
                commonAIButtonBehaviour();
            }
        }).appendTo("#"+AIs[i].name+"Text");
    } 
}

function commonAIButtonBehaviour() {

    for (i=0; i<questBound/2; i++){
        $(heart.clone()).appendTo(".heart-wrapper");
    }

    $("#game").empty();
    $("#game").append(questionContainer[currentQuestion]);
    $('<span/>', {
        'id':'time'+currentQuestion,
    }).appendTo("#time");
    time('#time'+currentQuestion, timers[currentQuestion]);

    for (i=0;i<questions.length;i++) //enemy answers and answer time for each question are defined here
    {
        enemyAnswers[i] = Math.floor(Math.random() * 10) + 1 >= chosenAI.rightGuess ? true : false;
        var qTime = timers[i];
        var max = qTime - qTime/10*chosenAI.answerTimeBegin;
        var min = qTime - qTime/10*chosenAI.answerTimeEnd;
        enemyAnswerTime[i] = Math.floor(Math.random() * (max-min)) + min;
    }
}

function nextQuestion() {

    $("#game").empty();
    $("#time").empty();

    currentQuestion++;
    if (currentQuestion<questBound && $('.heart-wrapper').children().length > 0)
    {
        $("#game").append(questionContainer[currentQuestion]);

        $('<span/>', {
            'id':'time'+currentQuestion,
        }).appendTo("#time");
        time('#time'+currentQuestion, timers[currentQuestion]);
    }   
    else 
        showScore();
    }

function showScore(){
    
    if ($('.heart-wrapper').children().length == 0)
    {
        $("#game").append("<h3>YOU DIED!</h3>");
    }
    else
    {
        $("#game").append("<h3>The battle is over!</h3>");

        var victories = 0;
        var losses = 0;
        var draws = 0;

        for (i=0;i<playerAnswers.length;i++)
        {
            var result = "Round "+(i+1)+" </br> Your answer: ";
            if (playerAnswers[i]==true)
                result += "CORRECT! Time left: ";
            if (playerAnswers[i]==false)
                result += "WRONG! Time left: ";
            if (isNaN(playerAnswerTime[i])){
                playerAnswerTime[i] = timers[i];
            }
            result += playerAnswerTime[i] + " </br>";
            result += " Enemy answer: "
            if (enemyAnswers[i]==true)
                result += "CORRECT! Time left: ";
            if (enemyAnswers[i]==false)
                result += "WRONG! Time left: "; 
            result += enemyAnswerTime[i] + " </br>";

            if (playerAnswers[i]==true) {
                if (enemyAnswers[i]==false) {
                    result += "YOU WON </br>";
                    victories++;
                }

                if (enemyAnswers[i]==true) {
                    if (playerAnswerTime[i] >= enemyAnswerTime[i]){
                        result += "YOU WON </br>";
                        victories++;
                    }
                    else {
                        result += "YOU LOST </br>";
                        losses++;
                    }
                }
            }
            if (playerAnswers[i]==false) {
                if (enemyAnswers[i]==false) {
                    result += "NOBODY WON </br>";
                    draws++;
                }
                if (enemyAnswers[i]==true) {
                    result += "YOU LOST </br>";
                    losses++;
                }
            }
            $("#game").append(result)
            $("#game").append("</br>");
        }

        if (victories>losses+draws)
        {
            $("#game").append("<h4> You have won the Quiz Battle! </h4>")
        }
        else {
            if (losses>victories+draws)
                $("#game").append("<h4> You have lost the Quiz Battle! </h4>");
            else
                $("#game").append("<h4> Apparently nobody won. </h4>");
        }
    }
    $('<button/>', {
        'id':'restart',
        'type':'button',
        'class':'btn btn-default',
        'html':"Play Again!",
        'click': function(){
            
            $("#QuizTitle").empty();
            $("#time").empty();
            $("#game").empty();
            $('.heart-wrapper').empty();
            $('.status').empty();
            questBound = bounds[0];
            questionContainer = []; 
            currentQuestion = 0;    
            playerAnswers = [];     
            enemyAnswers = [];      
            playerAnswerTime = [];  
            enemyAnswerTime = [];  
            startTheGame();
        }
    }).appendTo("#game");
}


function time(timerid, duration) {

    var questionFlag = currentQuestion;
    var timer = duration;
    var x = setInterval(function () {
        var minutes = parseInt(timer / 60, 10);
        var seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        $(timerid).html("Time Remaining: "+minutes + " : " + seconds);

        if (currentQuestion!=questionFlag)
        {
            clearInterval(x);
        }
        if (--timer < 0) {
            if (currentQuestion==questionFlag)
            {
                playerAnswers[currentQuestion]=false;
                playerAnswerTime[currentQuestion]=0;
                clearInterval(x);
                $('.status').empty();
                $('.status').append(enemyName+randomPick(chosenAI.skipReact));
                nextQuestion();
            }
        }
        
    }, 1000);
}

function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
}

function shuffleQuestions() {
    var j, x, i;
    for (i = questions.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        
        x = questions[i];
        questions[i] = questions[j];
        questions[j] = x;

        x = correctAnswers[i];
        correctAnswers[i] = correctAnswers[j];
        correctAnswers[j] = x;

        x = timers[i];
        timers[i] = timers[j];
        timers[j] = x;    

        x = answers[i];
        answers[i] = answers[j];
        answers[j] = x;
    }
}

function insertQuestionBound(){

    $('#game').append($('<div/>', {
        'html':'How many questions do you want to face? <br/>'
    }));
    var radio = $('<div/>', {
        'class':'.btn-group-justified',
        'data-toggle':'buttons',
    });

    $('<label/>', {
        'class':'btn btn-default active',
        'id': 0,
        'html':bounds[0],
        'click':function(){
            questBound = bounds[$(this).attr('id')];
        }
        }).append($('<input/>', {
        'type':'radio',
        'name':'options',
        'id':'option0',
        'autocomplete':'off',
        'checked':"",
        })).appendTo(radio);

    var i;
    for (i = 1; i < bounds.length; i++){
        $('<label/>', {
        'class':'btn btn-default',
        'id': i,
        'html':bounds[i],
        'click':function(){
            questBound = bounds[$(this).attr('id')];
        }
        }).append($('<input/>', {
        'type':'radio',
        'name':'options',
        'id':'option'+i,
        'autocomplete':'off',
        'checked':"",
        })).appendTo(radio);
    }

    $('#game').append(radio)
}

function playersHandler(){

    if (playerAnswers[currentQuestion]==false) {
        if ($('.heart-wrapper').children().length > 1) {
            console.log("You've lost a heart!");
            $('.heart-wrapper').children().last().remove();
            $('.status').empty();
            $('.status').append(enemyName+randomPick(chosenAI.lossReact));
        }
        else
        {
            console.log("No more hearts left!");
            $('.heart-wrapper').children().last().remove();
            $('.status').empty();
            $('.status').append(enemyName+randomPick(chosenAI.deathReact));
        }
    }
    
    if (playerAnswers[currentQuestion]==true) {
        if (enemyAnswers[currentQuestion]==false) {
            $('.status').empty();
            $('.status').append(enemyName+randomPick(chosenAI.winwinReact));
        }
        if (enemyAnswers[currentQuestion]==true) {
            if (playerAnswerTime[currentQuestion] >= enemyAnswerTime[currentQuestion]){  
                $('.status').empty();
                $('.status').append(enemyName+randomPick(chosenAI.winfastReact));
            }
            else {
                $('.status').empty();
                $('.status').append(enemyName+randomPick(chosenAI.winlossReact));
            }
        }
    }
}

function randomPick(myArray){
    var rand = myArray[Math.floor(Math.random() * myArray.length)];
    return rand;
}