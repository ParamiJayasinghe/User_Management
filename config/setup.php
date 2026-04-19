<?php
function loadEnv($path) {
    if (!file_exists($path)) return; //safety check

    $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);// read .env into an array
    foreach ($lines as $line) {//loop through each line
        if (strpos(trim($line), '#') === 0) continue; 
        list($name, $value) = explode('=', $line, 2);
        $_ENV[trim($name)] = trim($value);
    }
}

loadEnv(__DIR__ . '/../.env');
?>