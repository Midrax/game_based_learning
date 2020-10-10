<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="bootstrap.min.css">
    <script src="jquery.min.js"></script>
    <script src="bootstrap.min.js"></script>
    <style> 

        .btn {
            margin: 2px;
        }

        footer {
            position: fixed;
            bottom: 0;
            left: 0;
        }

    </style>
<title>QuBE</title>
</head>
<body>

<div align="center">

    <h1>Welcome to QuBE, the Quiz Battle Editor!</h1>
    <h4> What do you want to do? </h4>
    <form action="creator.php" method="post">
        <input type="submit" class="btn btn-default" value="Create a new quiz!">
    </form>

    <form action="modifier.php" method="post">
        <input type="submit" class="btn btn-default" value="Modify an existing quiz!">
    </form>

</div>
<footer> &copy; 2017-<?php echo date("Y");?> </footer>
</body>
</html>