<?php
$data[] = 'tabs';
$data[] = 'hamburger-menu';
$data[] = 'tooltip';
$data[] = 'floating-labels';
$data[] = 'validation';
$data[] = 'group';
$data[] = 'rows';
$data[] = 'row-offsets';
$data[] = 'row-alignments';
$data[] = 'row-breakpoints';
$data[] = 'modal';
$data[] = 'popover';
$data[] = 'accordions';
$data[] = 'timeline';

foreach($data as $d) {
	if(!is_file(filename: '../data/' . $d . '.json')) {
		file_put_contents(filename: '../data/' . $d . '.json', data: json_encode(value: []));
	}
}
