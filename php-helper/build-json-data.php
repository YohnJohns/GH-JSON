<?php

$from = '_docs';
$to = 'data';

if(!is_dir(filename: $to)) {
	mkdir(directory: $to);
}

$files = scandir($from);
foreach ($files as $item) {
	if ($item == '.' || $item == '..'	|| is_dir($from . '/' . $item)) {
		continue;
	} else {
		echo ' Found: ' . $from . '/' . $item . PHP_EOL;
		$html = file_get_contents(filename: $from . '/' . $item);
		// read json file to get title if its found
		//$json_check = $to . '/' .
		//		str_replace(search: '.html', replace: '.json', subject: $item);
		//if(is_file(filename: $json_check)) {
		//	$json = json_decode(json: file_get_contents(filename: $json_check), associative: true);
		//}
		$title = explode(separator: '</h2>', string: explode(separator: '<h2>', string: $html)[1])[0];
		$ary = [
			'title' => $title, 'html' => $html
		];
		$js_file = $from . '/' . str_replace(search: '.html', replace: '.js', subject: $item);
		$destroy_file = $from . '/' . str_replace(search: '.html', replace: '.destroy.js', subject: $item);
		if(is_file(filename: $js_file)){
			$ary['script'] = file_get_contents(filename: $js_file);
		}
		if(is_file(filename: $destroy_file)){
			$ary['destroy'] = file_get_contents(filename: $destroy_file);
		}
		$json = json_encode(value: $ary, flags: JSON_PRETTY_PRINT);
		file_put_contents(filename: $to . '/' . str_replace(search: '.html', replace: '.json', subject: $item), data: $json);
	}
}