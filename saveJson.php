<?php
	$myFile = "goals.json";
	$fh = fopen($myFile, 'w') or die("can't open file");
	$stringData = $_POST["goals"];
	fwrite($fh, $stringData);
	fclose($fh)
?>