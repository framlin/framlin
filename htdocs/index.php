<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="de" lang="de">
<head>
<?php
$fr_root=".";
 $main_menu_path = $fr_root."/php/menu/main_menu.php";
 require_once $main_menu_path;

 $meta_menu_path = $fr_root."/php/menu/meta_menu.php";
 require_once $meta_menu_path;
 
 $content_path = $fr_root."/php/home.php";
 if(!EMPTY($_REQUEST['content']))$content_path = $fr_root.$_REQUEST['content'];  
 
$menuList = array();
$menuList[]=$mainMenu;
$menuList[]=$metaMenu;

if(EMPTY($_REQUEST['content'])){
	$menuPath="::Home";
}else{
	$menuPath=compute_path($menuList,$_REQUEST['content']);
}
?>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<link rel="stylesheet" type="text/css" href="<?php echo
$fr_root;?>/css/main.css" />
<meta name="generator" content="HTML Tidy, see www.w3.org" />
<meta name="Author" content="Wolfgang Egger" />
<meta name="KEYWORDS"
	content="Software,Softwareengineering,Softwaretechnik,OOD,OOA,Softwarearchitekt,Entwickler,UML,Informatik,Kompetenz,Systematik,Entwicklungszusammenarbeit,Politik,Beratung,Conulting" />
<title>Framlin - Home of SoftWareEngineering</title>
</head>
<body>
<div id="masterframe">
<div id="topframe">
<img id="logo" src="<?php echo $fr_root;?>/images/logo.jpg"
alt="logo -> stilisierter Vogel und Schriftzug SWE" /> 
<h1 class="firma"><em class="bigfirma">S</em>oft<em class="firma">W</em>are<em
	class="firma">E</em>ngineering&nbsp;&nbsp;<em class="bigfirma">W</em>olfgang&nbsp;<em
	class="bigfirma">E</em>gger</h1>
<div class="metamenu"><?php $metaMenu->draw();?></div>
<div class="contentpath">
<?php 
    echo $menuPath;
?>
</div>
</div><!-- /topframe -->
<div id="mainframe">
<div id="menuframe"><?php $mainMenu->draw();?></div>
<div id="contentframe">
	<!-- div id="contextMenuFrame">
	<?php
		$mainMenu->drawContextMenu($_REQUEST['content']);
	?>
	</div-->
<?php 
	if(!EMPTY($content_path))include("$content_path");
?>
</div>
</div><!-- /mainframe -->
</div><!-- /masterframe -->
</body>
</html>
