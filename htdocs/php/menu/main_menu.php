<?php
 $my_inc_path = $fr_root."/php/menu/menu.php";
 require_once $my_inc_path;
 $mainMenu = new MainMenu();
 $mainMenu = init_main_menu($mainMenu);
 
 function init_main_menu($aMenu){

    $menuEntry = new MenuEntry("Leistungskatalog","");
    $subMenu = new Menu();
         	 
        	$subMenuEntry = new MenuEntry("Bedarfsanalyse","/php/leistung/analyse.php");
        	$subMenuEntry = create_context_menu($subMenuEntry);
        	$subMenu->add_entry($subMenuEntry);
             
        	$subMenuEntry = new MenuEntry("Systementwurf","/php/leistung/design.php");
        	$subMenu->add_entry($subMenuEntry);
             
        	$subMenuEntry = new MenuEntry("Programmierung","/php/leistung/programmierung.php");
        	$subMenu->add_entry($subMenuEntry);
         
        	$subMenuEntry = new MenuEntry("Installation","/php/leistung/installation.php");
        	$subMenu->add_entry($subMenuEntry);

        	$subMenuEntry = new MenuEntry("Wartung","/php/leistung/wartung.php");
        	$subMenu->add_entry($subMenuEntry);

        	$subMenuEntry = new MenuEntry("Projektmanagement","/php/leistung/management.php");
        	$subMenu->add_entry($subMenuEntry);

        	$subMenuEntry = new MenuEntry("Qualitätssicherung","/php/leistung/qualitaet.php");
        	$subMenu->add_entry($subMenuEntry);

	$menuEntry->set_childMenu($subMenu);
	$aMenu->add_entry($menuEntry);
	
        
    $menuEntry = new MenuEntry("Unternehmen","");
    $subMenu = new Menu();
         	 
        	$subMenuEntry = new MenuEntry("Kunden","/php/firma/kunden.php");
        	$subMenu->add_entry($subMenuEntry);
             
        	$subMenuEntry = new MenuEntry("Projekte","/php/firma/projekte.php");
        	$subMenu->add_entry($subMenuEntry);
             
        	$subMenuEntry = new MenuEntry("Partner","/php/firma/partner.php");
        	$subMenu->add_entry($subMenuEntry);
         
        	$subMenuEntry = new MenuEntry("Inhaber","/php/firma/inhaber.php");
        	$subMenu->add_entry($subMenuEntry);

	$menuEntry->set_childMenu($subMenu);
	$aMenu->add_entry($menuEntry);
     
	return $aMenu;
 }
?>