<?php
// $this is the current MainMenu-Object
// $aPagePath is argument of printContextMenu
// $aContentPath is argument of printContextMenu
// aEntry is argument of printContextMenu
	echo "<span class=\"invisible\"><hr/></span>";
	$contextMenu=$aEntry->get_childMenu();
	if (!EMPTY($contextMenu)){
		$contextEntries = $contextMenu->get_entries();
		for ($contextIdx=0; $contextIdx < sizeof($contextEntries); $contextIdx++){
			$contextEntry = $contextEntries[$contextIdx];
			$contextLabel = $contextEntry->get_label();
			$contextLink = $contextEntry->get_link();
			if ($contextLink == $aContentPath){
				echo "<span class=\"contextMenuEntry\">$contextLabel</span>&nbsp;";
			}else{
				echo "<span class=\"invisible\">[</span><a class=\"menu\" href=\"index.php?page=$aPagePath&content=$contextLink\">$contextLabel</a><span class=\"invisible\">]</span>&nbsp;";
			}
		}
	}

?>
