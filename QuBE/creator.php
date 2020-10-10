<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="bootstrap.min.css">
    <script src="jquery.min.js"></script>
    <script src="bootstrap.min.js"></script>
    <style> 
        body
        {
            position: absolute;
            left: 20px;
        }

        input {
            margin: 2px;
            left: 100px;
        }

        .btn {
            margin: 2px;
        }

        footer {
            position: fixed;
            bottom: 0;
            left: 0;
        }

    </style>
<title>QuBE Creator</title>
</head>
<body>


<h1>Create your own Quiz!</h1>

<form action="quizbuilder.php" method="post">
    Quiz Title: <input type="text" name="title" required="true"><br><br>
    
    <div id="questions"></div>
    <button type="submit" class="btn btn-default"> My quiz is ready, let's download!</button>
    <button type="submit" class="btn btn-default" formaction="preview.php"> I'd like to test my game </button>
</form>
</br>
<footer> &copy; 2017-<?php echo date("Y");?> </footer>
<script src=create.js></script>
</body>
</html>