<?php
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $data = $_POST['data'];
        if($_POST['type'] == "about") {
            if(file_exists("xml/about.xml")) {
                $myfile = fopen("xml/about.xml", "w") or die("Unable to open file!");
                fwrite($myfile, $data);
                fclose($myfile);
            }
        } else if($_POST['type'] == "job_experience") {
            if(file_exists("xml/job_experience.xml")) {
                $myfile = fopen("xml/job_experience.xml", "w") or die("Unable to open file!");
                fwrite($myfile, $data);
                fclose($myfile);
            }
        } else if($_POST['type'] == 'works') {
            if(file_exists("xml/works.xml")) {
                $myfile = fopen("xml/works.xml", "w") or die("Unable to open file!");
                fwrite($myfile, $data);
                fclose($myfile);
            }
        }
    }
?>