<?php

function drawMenu($aMenu,$aTemplate){
	include $aTemplate;
}
function drawContextMenu($aMenu,$aTemplate,$aPagePath,$aContentPath){
	$contextMenuEntry = searchContextMenu($aMenu, $aPagePath);
	printContextMenu($aTemplate,$contextMenuEntry,$aPagePath,$aContentPath);
}

function drawProjects($aProjects,$aTemplate){
	include $aTemplate;
}

//=========================================================================
function searchContextMenu($aMenu, $aPagePath){
	$entries = $aMenu->get_entries();
	for ($menuIndex = 0; $menuIndex < sizeof($entries); $menuIndex ++) {
		$entry = $entries[$menuIndex];
		$link = $entry->get_link();
		if($link==$aPagePath){//only one level (MetaMenu)
				return $entry; //EXIT!!!
		}
		//here we know it's the MainMenu
		$subMenu = $entry->get_childMenu();
		if (!EMPTY($subMenu)){
		
			$subEntries = $subMenu->get_entries();
		
			for ($entryIdx = 0; $entryIdx < sizeof($subEntries); $entryIdx ++) {
				$subEntry = $subEntries[$entryIdx];
				$subLink = $subEntry->get_link();
				if ($subLink == $aPagePath){
					return $subEntry; //EXIT!!!
				}
			}
		}
	}

}
function printContextMenu($aTemplate,$aEntry,$aPagePath,$aContentPath){
	include $aTemplate;
}
?>