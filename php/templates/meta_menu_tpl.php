<?php
// $aMenu is Parameter passed by drawMenu
echo "<span class=\"invisible\">Metamenü<br/></span>";
 $array = $aMenu->get_entries();
 for ($index = 0; $index < sizeof($array); $index ++) {
 	$entry = $array[$index];
 	$label = $entry->get_label();
 	$page = $entry->get_link();
 	$content = $page;
 	$contextMenu = $entry->get_childMenu();
 	
	if(!EMPTY($contextMenu)){
		$contextEntries=$contextMenu->get_entries();
		$contextEntry = $contextEntries[0];
		$content=$contextEntry->get_link();
	}

 	echo "<span class=\"metamenu\"><span class=\"invisible\">[</span><a class=\"menu\" href=\"index.php?page=$page&content=$content\">$label</a><span class=\"invisible\">]</span></span>";
 }
?>


