<?php
//-------------------------
// Helper-Functions
//-------------------------

function compute_path($aMenuList, $aContentPath){
	//search in all Menues
	for ($index=0;$index < sizeof($aMenuList);$index++){
		$currMenu = $aMenuList[$index];
		$entries = $currMenu->get_entries();
		
		for ($menuIndex = 0; $menuIndex < sizeof($entries); $menuIndex ++) {
			$entry = $entries[$menuIndex];
			$label = $entry->get_label();
			$link = $entry->get_link();
			if ($link == $aContentPath){
				return "::$label"; //EXIT!
			}
			$subMenu = $entry->get_childMenu();
			if (!EMPTY($subMenu))$subEntries = $subMenu->get_entries();
			
			for ($entryIdx = 0; $entryIdx < sizeof($subEntries); $entryIdx ++) {
				$subEntry = $subEntries[$entryIdx];
				$subLabel = $subEntry->get_label();
				$subLink = $subEntry->get_link();
				if ($subLink == $aContentPath){
					return "::$label"."::$subLabel"; //EXIT!
				}
			}
		}
		
	}
	return "::";
}

function create_context_menu($aMenuEntry){
	$link = $aMenuEntry->get_link();
	$pos = strpos(".",$link);
	$pre = substr($link,0,$pos-1);
	$suffix = substr($link,$pos);
	$describtion = $pre."_descr".$suffix;
	$result = $pre."_res".$suffix;
	$descriptionMenuEntry = new MenuEntry("Beschreibung",$description);
	$resultMenuEntry = new MenuEntry("Ergebnis",$result);
	$contextMenu = new Menu();
	$contextMenu->add_entry($descriptionMenuEntry);
	$contextMenu->add_entry($resultMenuEntry);
	$aMenuEntry->set_childMenu($contextMenu);
	return $aMenuEntry;
}

//-------------------------
// Classes
//-------------------------
class Menu {
	var $entries;
	var $menu_template_path;
	var $contextMenu_template_path;
	var $image_path;

	function Menu() {
		$this->entries = array ();
	}
	

	function draw() {
		include $this->menu_template_path;
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
}

class MainMenu extends Menu {
	var $defaultImage;

	function MainMenu() {
		global $fr_root;
		$this->Menu();
		$this->menu_template_path = $fr_root."/php/menu/templates/main_menu.tpl";
		$this->contextMenu_template_path = $fr_root."/php/menu/templates/main_menu_context.tpl";
	}

	function drawContextMenu($aContentPath){
		include $this->contextMenu_template_path;
	}

	function get_defaultImage(){
		return $this->defaultImage;
	}
	
	function set_defaultImage($aDefaultImage){
		$this->defaultImage = $aDefaultImage;
	}
}

class MetaMenu extends Menu {
	function MetaMenu() {
		global $fr_root;
		$this->Menu();
		$this->menu_template_path = $fr_root."/php/menu/templates/meta_menu.tpl";
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