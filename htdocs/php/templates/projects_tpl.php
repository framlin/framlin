<?php
// $aProjects is Parameter of drawProjects($aProjects, $aTemplate);
$customers = $aProjects->get_customers();
foreach($customers as $customer){
	$firm = $customer->get_firm(); 
	$place = $customer->get_place(); 
	$description = $customer->get_description(); 
	$url = $customer->get_url(); 
	echo("<div class=\"customers\">");
	echo("<h4>");
	if(!EMPTY($url)){
		echo("&bull;&nbsp;Kunde:&nbsp;<a class=\"customer_firm\" target=\"_blank\" href=\"$url\">$firm</a>,&nbsp;");
	}else{
		echo("<span class=\"customer_firm\">&bull;&nbsp;Kunde:&nbsp;$firm</span>,&nbsp;");
	}
	echo("<span class=\"customer_place\">$place</span>");
	echo("<span class=\"customer_description\">&nbsp;($description)</span>");
	echo("</h4>");
	$projects = $customer->get_projects();
	foreach($projects as $project){
		$name = $project->get_name();
		$skills = $project->get_skills();
		$projecturl = $project->get_url();
		$endcustomer = $project->get_endcustomer();
		echo("<div class=\"customer_project\">");
		echo "<span class=\"invisible\">Projekt: </span>";
		if(!EMPTY($projecturl)){
			echo("<a class=\"project_name\" target=\"_blank\" href=\"$projecturl\">$name</a>");
		}else{
			echo("<span class=\"project_name\">$name</span>");
		}
		if(!EMPTY($skills)){
		echo("<p class=\"project_skills\">Technik: $skills</p>");
		}
		if(!EMPTY($endcustomer)){
			echo("<p class=\"project_endcustomer\">Endkunde: <em>$endcustomer</em></p>");
		}
		echo("</div>");
		echo "<span class=\"invisible\"><p>&nbsp;</p></span>";
	}
	echo("</div>");
}
?>