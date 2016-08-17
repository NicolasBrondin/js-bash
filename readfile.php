<?php
$fh = fopen($_POST['file'],'r');
$result = '';
while ($line = fgets($fh)) 
{
  $result.=$line;
}
fclose($fh);
echo $result;
?>