<?php
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $data = $_POST['data'];
        if($_POST['type'] == "education") {
            if(file_exists("xml/about.xml")) {
                $myfile = fopen("xml/about.xml", "w") or die("Unable to open file!");
                fwrite($myfile, $data);
                fclose($myfile);
            }
        }
    }
?>