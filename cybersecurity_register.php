<?php
// Connection 

$conn=mysql_connect('50.62.209.51:3306','excel','3N*bd14s');
$db=mysql_select_db('excelformat',$conn);

$filename = "cybersecurity_register.xls"; // File Name
// Download file
header("Content-Disposition: attachment; filename=\"$filename\"");
header("Content-Type: application/vnd.ms-excel");
$user_query = mysql_query('select * from cybersecurity_register');
// Write data to file
$flag = false;
while ($row = mysql_fetch_assoc($user_query)) {
    if (!$flag) {
        // display field/column names as first row
        echo implode("\t", array_keys($row)) . "\r\n";
        $flag = true;
    }
    echo implode("\t", array_values($row)) . "\r\n";
}
?>    



