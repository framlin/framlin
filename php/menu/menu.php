<?php
class Menu {
	var $entries;
	var $image_path;

	function Menu() {
		$this->entries = array ();
	}
	

	function add_entry($aMenuEntry) {
		$this->entries[] = $aMenuEntry;
	}

	function get_entries() {
		
		return $this->entries;
	}
	function get_entry($aIndex) {
		return $this->entries[$aIndex];
	}
	function get_image(){
		return $this->image_path;
	}
	
	function set_image($aDefaultImage){
		$this->image_path = $aDefaultImage;
	}
//=================================================
// static Class-Methods
//=================================================
function compute_activeMenu(&$aMenuList, $aContentPath){
	//search in all Menues
	for ($index=0;$index < sizeof($aMenuList);$index++){
		$currMenu =& $aMenuList[$index];
		$entries = $currMenu->get_entries();
		
		for ($menuIndex = 0; $menuIndex < sizeof($entries); $menuIndex ++) {
			$entry = $entries[$menuIndex];
			$label = $entry->get_label();
			$link = $entry->get_link();
			if ($link == $aContentPath){
				return $currMenu; //EXIT!
			}
			$subMenu = $entry->get_childMenu();
			if (!EMPTY($subMenu))$subEntries = $subMenu->get_entries();
			
			for ($entryIdx = 0; $entryIdx < sizeof($subEntries); $entryIdx ++) {
				$subEntry = $subEntries[$entryIdx];
				$subLabel = $subEntry->get_label();
				$subLink = $subEntry->get_link();
				if ($subLink == $aContentPath){
					return $currMenu; //EXIT!
				}
			}
		}
		
	}
	return null;

}
function compute_path(&$aMenuList, $aContentPath){
	//search in all Menues
	for ($index=0;$index < sizeof($aMenuList);$index++){
		$currMenu = $aMenuList[$index];
		$entries = $currMenu->get_entries();
		
		for ($menuIndex = 0; $menuIndex < sizeof($entries); $menuIndex ++) {
			$entry = $entries[$menuIndex];
			$label = $entry->get_label();
			$link = $entry->get_link();
			if ($link == $aContentPath){
				return "SWE::$label"; //EXIT!
			}
			$subMenu = $entry->get_childMenu();
			if (!EMPTY($subMenu))$subEntries = $subMenu->get_entries();
			
			for ($entryIdx = 0; $entryIdx < sizeof($subEntries); $entryIdx ++) {
				$subEntry = $subEntries[$entryIdx];
				$subLabel = $subEntry->get_label();
				$subLink = $subEntry->get_link();
				if ($subLink == $aContentPath){
					return "SWE::$label"."::$subLabel"; //EXIT!
				}
			}
		}
		
	}
	return "::";
}
}



/*
 * ---------------------------------------
 */
class MenuEntry {
	var $label;
	var $link;
	var $image;
	var $childMenu;

	function MenuEntry($aLabel, $aLink) {
		$this->label = $aLabel;
		$this->link = $aLink;
	}

	function set_label($aLabel) {
		$this->label = $aLabel;
	}
	function get_label() {
		return $this->label;
	}

	function set_link($aLink) {
		$this->link = $aLink;
	}
	function get_link() {
		return $this->link;
	}

	function set_image($aImage) {
		$this->image = $aImage;
	}
	function get_image() {
		return $this->image;
	}

	function set_childMenu($aChildMenu) {
		$this->childMenu = $aChildMenu;
	}
	function get_childMenu() {
		return $this->childMenu;
	}
}
?>