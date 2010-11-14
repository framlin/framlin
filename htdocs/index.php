<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="de" lang="de">
<head>
<?php
$fr_root=".";
?>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<link rel="stylesheet" type="text/css" href="<?php echo $fr_root;?>/css/main.css" />
<link rel="stylesheet" type="text/css" href="<?php echo $fr_root;?>/css/menu.css" />
<link rel="stylesheet" type="text/css" href="<?php echo $fr_root;?>/css/content.css" />
<!--[if IE]><style type="text/css">@import "<?php echo $fr_root;?>/css/iefixes.css";</style><![endif]-->
<meta name="verify-v1" content="JPJcc2KWnZBoVTKLf6b7P2s6JMFDIYHIvgy9uxRzEI4=" >
<meta name="Author" content="Wolfgang Egger" />
<meta name="KEYWORDS"
	content="Software,Softwareengineering,Softwaretechnik,OOD,OOA,Softwarearchitekt,Entwickler,UML,Informatik,Kompetenz,Systematik,Entwicklungszusammenarbeit,Politik,Beratung,Conulting" />
<title>Framlin - Home of SoftWareEngineering</title>
<?php
//======== INITILIZATION ==========================
// !!!! MUSS am ENDE von <head> stehen
//=================================================
require_once "$fr_root/php/init.php";
// global variables as result of initialization:
// $mainMenu - the MainMenu
// $metaMenu - the MetaMenu
// $activeManu - the active Menu
// $menuPath - string to current content ::main::sub
// $myPage
// $myContent
// $content_path - the content to show
// draw*() - View-Functions
?>
</head>
<body>
<div id="masterframe">
<div id="topframe">
<!--img id="logo" src="<?php echo $fr_root;?>/images/logo.jpg"
alt="logo -> stilisierter Vogel und Schriftzug SWE" /--> 
<h1 class="firma"><em class="bigfirma">S</em>oft<em class="firma">W</em>are<em
	class="firma">E</em>ngineering&nbsp;&nbsp;<em class="bigfirma">W</em>olfgang&nbsp;<em
	class="bigfirma">E</em>gger</h1>
<div id="metamenu"><?php drawMenu($metaMenu,$metaMenuTemplate);?></div>
</div><!-- /topframe -->
<div id="menuframe"><?php drawMenu($mainMenu,$mainMenuTemplate);?></div>
<div id="mainframe">
<div id="contextmenuframe">
<?php 
	drawContextMenu($activeMenu,$contextMenuTemplate,$myPage,$myContent);
?>
</div>
<div id="contentframe">
<?php 
	include("$content_path");
?>
</div>
<div class="contentpath">
<?php 
    echo $menuPath;
?>
</div>
</div><!-- /mainframe -->
</div><!-- /masterframe -->
</body>
</html>
