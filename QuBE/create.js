var questionNumber = 0;
var minimum = 25;
var u_id = 0; //unique identifier


$(document).ready(function(){
    for (i=0;i<minimum;i++)
        addQuestion();
});

function addQuestion(){
    var question = $('<div/>');
    question.append("Question: ");
    $('<input/>', {
    'type':'text',
    'name':'question'+u_id,
    'required':true
    }).appendTo(question);
    u_id++;

    $('<button/>', {
        'type':'button',
        'class':'btn btn-default',
        'html':'Add Question',
        'click': function (){ 
            addQuestion();
        }
    }).appendTo(question);
    $('<button/>', {
        'type':'button',
        'class':'btn btn-default',
        'html':'Remove Question',
        'click': function (){ 
            if (questionNumber>minimum)
            {
                $(this).parent().remove();
                questionNumber--;
            }
            else
                alert("There must be at least "+minimum+" questions!");
        }
    }).appendTo(question);
    $(question).append("</br>");  

    question.append("Answer Time: ");
    $('<input/>', {
        'type':'text',
        'name':'time'+u_id,
        'required':true
        }).appendTo(question);
    u_id++;
    $(question).append(" </br>*(Time is expressed in seconds. If your question requires a minute or more, remember to multiply every minute by 60.)");
    $(question).append("</br>");  

    var answers = $('<div/>', {
        'id':'answers'
    });
    var answer1 = $('<div/>');
    answer1.append("Correct Answer: ");
    $('<input/>', {
        'type':'text',
        'name':'c_answer'+u_id,
        'required':true
    }).appendTo(answer1);
    $(answer1).append("</br>");
    $(answers).append(answer1); 
    u_id++;

    var answer2 = $('<div/>');
    answer2.append("Answer: ");
    $('<input/>', {
        'type':'text',
        'name':'answer'+u_id,
        'required':true
    }).appendTo(answer2);
    $(answer2).append("</br>");
    $(answers).append(answer2); 
    u_id++;

    $('<button/>', {
        'type':'button',
        'class':'btn btn-default',
        'html':'Add Answer',
        'click': function (){ 
            var answerToAdd = $('<div/>');
            answerToAdd.append("Answer: ");
            $('<input/>', {
                'type':'text',
                'name':'answer'+u_id,
                'required':true
            }).appendTo(answerToAdd);
            $('<button/>', {
                'type':'button',
                'class':'btn btn-default',
                'html':'Remove Answer',
                'click': function (){ 
                    $(this).parent().remove();
                }
            }).appendTo(answerToAdd);
            $(answerToAdd).insertBefore(this);
            u_id++;
        }
    }).appendTo(answers);
    $(answers).append("</br></br>");

    $(question).append(answers);
    $("#questions").append(question);
    questionNumber++;
}