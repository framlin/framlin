<?php
// $aMenu is Parameter passed with drawMenu
$entries = $aMenu->get_entries();
for ($index = 0; $index < sizeof($entries); $index ++) {
	$entry = $entries[$index];
	$label = $entry->get_label();
	$subMenu = $entry->get_childMenu();
	$subEntries = $subMenu->get_entries();
	echo "<div class=\"mainmenu\">";
	echo "<div class=\"label\">$label</div>";
	
	for ($entryIdx = 0; $entryIdx < sizeof($subEntries); $entryIdx ++) {
		$subEntry = $subEntries[$entryIdx];
		$subLabel = $subEntry->get_label();
		$subLink = $subEntry->get_link();
		$contextMenu = $subEntry->get_childMenu();
		if(!EMPTY($contextMenu)){
			$contextEntries=$contextMenu->get_entries();
			$contextEntry = $contextEntries[0];
			$content=$contextEntry->get_link();
		}else{
			$content=$subLink;
		}
		echo "<span class=\"invisible\">[</span><a class=\"menu\" href=\"index.php?page=$subLink&content=$content\">$subLabel</a><span class=\"invisible\">]</span>";
	}
	echo "</div>";
}
?>
