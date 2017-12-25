<?php
$versions = [];
exec("phpbrew list", $out, $ret);

if (0 === $ret) {
	foreach ($out as $val) {
		$val = trim($val);
		if (!preg_match("/^php\-/", $val)) {
			continue;
		}
		$versions[] = $val;
	}
}

echo json_encode($versions);