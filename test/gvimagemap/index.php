<?php

/*
 * $Id$
 */
require './config.php';

if (!isset($_SERVER['PATH_INFO']) || empty($_SERVER['PATH_INFO'])) {
	header('Location: ' . $_SERVER['SCRIPT_NAME'] . '/' . basename($default_graph, '.gv') . '.html');
	exit;
}

if (!preg_match('%/([^/]+)\.([^/]+)$%', $_SERVER['PATH_INFO'], $matches)) {
	echo 'Invalid PATH_INFO';
	exit;
}
list(, $graph_base, $output_format) = $matches;
$graph_file = $graph_dir . '/' . $graph_base . '.gv';
if (!file_exists($graph_file)) {
	echo 'File does not exist';
	exit;
}

$common_dot_args = escapeshellarg($graph_file);

switch ($output_format) {
	case 'png':
		header('Content-Type: image/png');
		passthru($dot
			. ' -T' . $output_format
			. ' ' . $common_dot_args
		);
		exit;
		break;
	case 'html':
		$cmapx = shell_exec($dot
			. ' -Tcmapx'
			. ' -Nalt="\N"'
			. ' -Nhref="javascript:void(0)"'
			. ' -Ealt="\E"'
			. ' -Ehref="javascript:void(0)"'
			. ' ' . $common_dot_args
		);
		if (!preg_match('% id="([^"]+)"%', $cmapx, $matches)) {
			echo 'Cannot find map name';
			exit;
		}
		list(, $map_name) = $matches;
		
		$charset = 'utf-8';
		$content_type = 'text/html; charset=' . $charset;
		header('Content-Type: ' . $content_type);
		
?><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
	<meta name="MSSmartTagsPreventParsing" content="true" />
	<meta http-equiv="content-type" content="<?php echo $content_type; ?>" />
	<title><?php echo htmlspecialchars($graph_base); ?></title>
	<base href="<?php echo dirname($_SERVER['SCRIPT_NAME']) . '/'; ?>" />
	<link rel="stylesheet" type="text/css" href="styles.css" />
	<script type="text/javascript" src="prototype/prototype.js"></script>
	<script type="text/javascript" src="scripts.js"></script>
</head>
<body>

<div id="container">
<img id="image" src="<?php echo htmlspecialchars($_SERVER['SCRIPT_NAME'] . '/' . $graph_base . '.png'); ?>" />
<canvas id="canvas"></canvas>
<img id="overlay" src="spacer.gif" usemap="#<?php echo $map_name; ?>" />
<?php echo $cmapx; ?>
<div id="status"></div>
</div>

</body>
</html>
<?php
		
		break;
	default:
		echo 'Invalid output format';
		exit;
}

?>
