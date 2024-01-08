<?php
$command="python test.py ";
exec($command,$output);
echo "$output[0]<br>";
echo "$output[1]\n";
?>