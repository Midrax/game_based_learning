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

$txt = base64_encode($txt);

$tmpFile = tempnam(sys_get_temp_dir(), 'data.html');
$dfile = fopen($tmpFile, 'w');
fwrite($dfile, $txt);
fclose($dfile);

$tmpName = tempnam(sys_get_temp_dir(), 'game');
$zip = new ZipArchive();
// Zip will open and overwrite the file, rather than try to read it.
$zip->open($tmpName, ZipArchive::CREATE);
$files = array('quizbattle.html', 'setstage.js', 'style.css');
foreach ($files as $file) {
  $zip->addFile($file);
}
$zip->addFile($tmpFile, 'data.html');

$zip->close();

// Stream the file to the client
header("Content-Type: application/zip");
header("Content-Length: " . filesize($tmpName));
header("Content-Disposition: attachment; filename=\"game.zip\"");

ob_clean();
flush();
readfile($tmpName);
unlink($tmpName);
unlink($tmpFile);

?>