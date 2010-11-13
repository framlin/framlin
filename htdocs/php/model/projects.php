<?php
class Projects{
	var $customers = array();
	function Projects(){
	}
	function add_customer($aCustomer){
		$this->customers[]=$aCustomer;
	}
	function get_customers(){
		return $this->customers;
	}
}
class Customer{
	var $since="";
	var $until="";
	var $firm="";
	var $place="";
	var $description="";
	var $url="";
	var $projects=array();
	function Customer($aSince, $aUntil, $aFirm, $aPlace, $aDescription, $aUrl){
		$this->since = $aSince;
		$this->until = $aUntil;
		$this->firm = $aFirm;
		$this->place = $aPlace;
		$this->description = $aDescription;
		$this->url = $aUrl;
	}
	function add_project($aProject){
		$this->projects[]=$aProject;
	}
	function get_projects(){
		return $this->projects;
	}
	function get_since(){
		return $this->since;
	}
	function get_until(){
		return $this->until;
	}
	function get_firm(){
		return $this->firm;
	}
	function get_place(){
		return $this->place;
	}
	function get_description(){
		return $this->description;
	}
	function get_url(){
		return $this->url;
	}
}
class Project{
	var $name="";
	var $skills="";
	var $url="";
	var $endcustomer="";
	function Project($aName, $aSkills, $aUrl, $aEndcustomer){
		$this->name=$aName;
		$this->skills=$aSkills;
		$this->url=$aUrl;
		$this->endcustomer=$aEndcustomer;
	}
	function get_name(){
		return $this->name;
	}
	function get_skills(){
		return $this->skills;
	}
	function get_url(){
		return $this->url;
	}
	function get_endcustomer(){
		return $this->endcustomer;
	}
}
?> 