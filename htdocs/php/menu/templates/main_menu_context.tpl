<?php
// $this is the current MainMenu-Object
// $aContentPath is argument of drawContextMenu
$entries = $this->get_entries();
for ($menuIndex = 0; $menuIndex < sizeof($entries); $menuIndex ++) {
	$entry = $entries[$menuIndex];
	$subMenu = $entry->get_childMenu();
	if (!EMPTY($subMenu))$subEntries = $subMenu->get_entries();
	
	for ($entryIdx = 0; $entryIdx < sizeof($subEntries); $entryIdx ++) {
		$subEntry = $subEntries[$entryIdx];
		$subLink = $subEntry->get_link();
		if ($subLink == $aContentPath){
			$contextMenu=$subEntry->get_childMenu();
			if (!EMPTY($contextMenu))$contextEntries = $contextMenu->get_entries();
			for ($contextIdx=0; $contextIdx < sizeof($contextEntries); $contextIdx++){
				$contextEntry = $contextEntries[$contextIdx];
				$contextLabel = $contextEntry->get_label();
				$contextLink = $contextEntry->get_link();
				echo "<a class=\"contextMenuEntry\" href=\"$contextLink\">$contextLabel</<a>&nbsp;";
			}
		}
	}
}
		
	return "::";
?>
