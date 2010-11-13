<?php
 //=== UI -View =======================
 require_once "$fr_root/php/view.php";

 $mainMenuTemplate = "$fr_root/php/templates/main_menu_tpl.php";
 $metaMenuTemplate = "$fr_root/php/templates/meta_menu_tpl.php";
 $contextMenuTemplate = "$fr_root/php/templates/context_menu_tpl.php";

//========= MENU ======================
 require_once $fr_root."/php/menu/menu.php";
 require_once $fr_root."/php/menu/menu_parser.php";

 $menu_parser = new MenuParser();
 $mainMenu = new Menu();
 $mainMenu = $menu_parser->fill_menu("$fr_root/xml/main_menu.xml",$mainMenu);
 
 $metaMenu = new Menu();
 $metaMenu = $menu_parser->fill_menu("$fr_root/xml/meta_menu.xml",$metaMenu);


if(EMPTY($_REQUEST['page'])){
	$myPage = "home";
	$menuPath="::Home";
	$activeMenu =& $metaMenu;
}else{
	$myPage = $_REQUEST['page'];
	$menuList = array();
	$menuList[]=&$mainMenu;
	$menuList[]=&$metaMenu;
	$menuPath = Menu::compute_path(&$menuList,$myPage);
	$activeMenu =& Menu::compute_activeMenu(&$menuList,$myPage);
}
//========== CONTENT ======================= 
if(EMPTY($_REQUEST['content'])){
	$myContent = "/php/content/intro.php";
	//redefine styles for Intro
	echo "<style type=\"text/css\">@import \"$fr_root/css/intro.css\";</style>";
}else{
	$myContent = $_REQUEST['content'];
}
$content_path = $fr_root.$myContent;
 

?>