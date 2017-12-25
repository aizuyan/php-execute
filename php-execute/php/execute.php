<?php
$version = $_POST["version"];
$cmd = $_POST["cmd"];

$homePath = getCurrentUserHome();
$phpBin = "{$homePath}/.phpbrew/php/{$version}/bin/php";

if (!is_executable($phpBin)) {
	echo "参数错误，php版本[{$version}]可能不存在";
	exit(1000);
}

$fileName = "/tmp/exec_".md5("{$version}_{$cmd}_".microtime(true)).".php";
file_put_contents($fileName, $cmd);


exec("{$phpBin} -f {$fileName}", $out, $ret);

unlink($fileName);

echo json_encode($out);


function getCurrentUserHome()
{
	$currentUser = get_current_user();
	exec("cat /etc/passwd | grep ^{$currentUser} | awk -F ':' '{print $6}'", $out, $ret);
	if (0 === $ret) {
		$home = trim(isset($out[0]) ? $out[0] : "");
		if (empty($home)) {
			return false;
		}
		return $home;
	} else {
		return false;
	}
}