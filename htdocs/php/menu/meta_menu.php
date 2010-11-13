<?php
 $my_inc_path = $fr_root."/php/menu/menu.php";
 require_once $my_inc_path;
 $metaMenu = new MetaMenu();
 $metaMenu = init_meta_menu($metaMenu);
 
 function init_meta_menu($aMenu){

    $menuEntry = new MenuEntry("Home","/php/home.php");
	$aMenu->add_entry($menuEntry);
	 
    $menuEntry = new MenuEntry("Kontakt","/php/meta/kontakt.php");
	$aMenu->add_entry($menuEntry);
	
    $menuEntry = new MenuEntry("Disclaimer","/php/meta/disclaimer.php");
	$aMenu->add_entry($menuEntry);
        
    $menuEntry = new MenuEntry("Impressum","/php/meta/impressum.php");
	$aMenu->add_entry($menuEntry);
        
	 return $aMenu;
 }
?>