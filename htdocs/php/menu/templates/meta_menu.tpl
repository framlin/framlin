<?php
// $this is the current MetaMenu-Object
$array = $this->get_entries();
for ($index = 0; $index < sizeof($array); $index ++) {
	$entry = $array[$index];
	$label = $entry->get_label();
	$link = $entry->get_link();
	echo "<p class=\"metamenu\"><a class=\"menu\" href=\"index?content=$link\">$label</a></p>";
}
?>


