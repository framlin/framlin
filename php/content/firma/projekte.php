 <p>Hier sind nur die Projekte aufgeführt, die ich als Freelancer durchgeführt habe. Daneben war ich außerdem einige Jahre fest angestellt und im Rahmen der Walden&Egger GbR selbständig tätig.</p> 
 <p>Nähere Einzelheiten siehe unter <a href="http://www.wolfgang-egger.de/personal/anstellungen.html" target="_blank">wolfgang-egger/gemacht</a></p>
<?php
 require_once $fr_root."/php/model/projects.php";
 require_once $fr_root."/php/model/projects_parser.php";

 $projects_parser = new ProjectsParser();
 $projects = new Projects();
 $projects = $projects_parser->fill_projects("$fr_root/xml/freelancer.xml",$projects);
 
 drawProjects($projects,"$fr_root/php/templates/projects_tpl.php");
?>