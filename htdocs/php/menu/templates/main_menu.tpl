<?php
// $this is the current MainMenu-Object
$entries = $this->get_entries();
for ($index = 0; $index < sizeof($entries); $index ++) {
	$entry = $entries[$index];
	$label = $entry->get_label();
	$subMenu = $entry->get_childMenu();
	$subEntries = $subMenu->get_entries();
	echo "<div class=\"mainmenu\">";
	echo "<p class=\"label\">$label</p>";
	
	for ($entryIdx = 0; $entryIdx < sizeof($subEntries); $entryIdx ++) {
		$subEntry = $subEntries[$entryIdx];
		$subLabel = $subEntry->get_label();
		$subLink = $subEntry->get_link();
		echo "<p class=\"menu\"><a class=\"menu\" href=\"index?content=$subLink\">$subLabel</a></p>";
	}
	echo "</div>";
}
?>
