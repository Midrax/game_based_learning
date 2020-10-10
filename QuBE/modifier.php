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
<title>QuBE Modifier</title>
</head>
<body>
<div align="center">

    <h1>You made already a Quiz Battle but you wish to make some changes?</h1>
    <h4> You've come to the right place! If you wish to continue, please upload the "data.html" file from your game folder</h4>
    <form action="upload.php" method="post" enctype="multipart/form-data">
        <input type="file" class="btn btn-default" name="fileToUpload" id="fileToUpload">
        <input type="submit" class="btn btn-default" value="The file is ready, let's upload!" name="submit">
    </form>

</div>
</br>
<footer> &copy; 2017-<?php echo date("Y");?> </footer>
</body>
</html>