<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="bootstrap.min.css">
    <script src="jquery.min.js"></script>
    <script src="bootstrap.min.js"></script>
    <link rel="stylesheet" href="style.css">
    <style> 
        footer {
            position: fixed;
            bottom: 0;
            left: 0;
        }
    </style>
    <title>Quiz Battle Preview</title>
</head>

<body>

<div id="quiztab" align="center">

    <div class="radioactive" align="center">
			<div class="outer">
				<div class="middle"></div>
				<div class="triangle top"></div>
				<div class="triangle left"></div>
				<div class="triangle right"></div>
			</div>
    </div>
    <h1 class="standby">PLEASE STAND BY</h1>
    <button id = "selector" class = "btn btn-default"> Start the Quiz! </button>

</div>

<div id="container" style="visibility: hidden;" align="center">
    <h1 id="QuizTitle" data-text="" class="page-header"></h1>
    <h4 id="time"> </h4>
    <div id="game"></div>

    <span id=player1>
        <h3>Player One</h3>
        <div class="heart-wrapper"></div>
    </span>
    <span id=player2>
        <h3>Player Two</h3>
        <div class="status"></div>
    </span>
    
</div>

</br>
<footer> &copy; 2017-<?php echo date("Y");?> </footer>

<div id="quizData" style="visibility: hidden;">

<?php

function secure_input($data) {
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);
  return $data;
}

$questForm = $_POST;

$quizTitle = "";
$question = "";
$time = "";
$rightAnswer = "";
$answer = "";

$txt = "";

foreach($questForm as $tag=>$item)
{
  $item = secure_input($item);
  if (strncmp($tag, "title", 5)==0)
  {
    $quizTitle = $item;
    $txt .= "
    <div class=title> ".$quizTitle." </div>
    ";
  }
  if (strncmp($tag, "question", 8)==0)
  {
    $txt .= "
    <br> <div class=question> ".$item." </div>
    ";
    $question = $item;
  }
  if (strncmp($tag, "time", 4)==0)
  {
    $txt .= "<div class=time>".$item." </div>
    ";
    $time = $item;
  }
  if (strncmp($tag, "c_answer", 8)==0)
  {
    $txt.= "<div class=c_answer>".$item." </div>
    ";
    $rightAnswer = $item;
  }
  if (strncmp($tag, "answer", 6)==0)
  {
    $txt .= "<div class=answer>".$item." </div>
    ";
    $answer = $item;
  }
}

echo $txt;
?>
</div>
<script src="preview.js"></script>
</body>
</html>
