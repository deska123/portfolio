<?php
	if(isset($_POST['id'])) {
		$id = $_POST['id'];
	}

	$files = glob('assets/works/' . $id . '/*');

	foreach($files as $file) {
		if(is_file($file)) {
			unlink($file);
		}
	}

	if(is_dir('assets/works/' . $id)) {
		rmdir('assets/works/' . $id);
	}

	$folders = glob('assets/works/*');

	$numbers = array();
	foreach ($folders as $folder) {
		array_push($numbers, intval(basename($folder)));
	}
	sort($numbers);

	$decrement = 0;
	foreach ($numbers as $number) {
		if($decrement == 0) {
			if($number == ($id + 1)) {
				$decrement = 1;
			}
		} 
		if($decrement == 1) {
			rename('assets/works/' . $number, 'assets/works/' . ($number - 1));	
		}
	}
?>