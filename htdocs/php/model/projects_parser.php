<?php
class ProjectsParser{
	var $parser;
	var $space=0;
	var $result;
	var $kunde;

	function fill_projects($aFileName,$aProjects){
		$this->result = $aProjects;
		$this->parser = xml_parser_create();
		xml_set_object($this->parser,&$this);
		xml_set_element_handler($this->parser,"start_element", "end_element");
		$x = join("",file($aFileName));
		xml_parse($this->parser,$x);
		xml_parser_free($this->parser);
		return $this->result;
	}

	function start_element($aParser, $aElement, &$aAttributes){
//		$this->print_element_start($aElement, &$aAttributes);
		switch($aElement){
			case "AUFTRAEGE":
				$this->handle_auftraege(&$aAttributes);
			break;
			case "KUNDE":
				$this->handle_kunde(&$aAttributes);
			break;
			case "PROJEKT":
				$this->handle_projekt(&$aAttributes);
			break;
		}
	}
	function end_element($aParser, $aElement){
//		$this->print_element_end($aElement);
		switch($aElement){
			case "AUFTRAEGE":
				$this->handle_auftraege_end();
			break;
			case "KUNDE":
				$this->handle_kunde_end();
			break;
			case "PROJEKT":
				$this->handle_projekt_end();
			break;
		}
	}
	//================================================
	//================================================
	function handle_auftraege(&$aAttributes){
	}
	function handle_kunde(&$aAttributes){
		$this->kunde=new Customer($aAttributes["VON"],
					$aAttributes["BIS"],
					$aAttributes["FIRMA"],
					$aAttributes["ORT"],
					$aAttributes["DESCRIPTION"],
					$aAttributes["URL"]);
	}
	function handle_projekt(&$aAttributes){
		$project = new Project($aAttributes["NAME"],
									  $aAttributes["SKILLS"],
									  $aAttributes["URL"],
									  $aAttributes["ENDKUNDE"]);
		$this->kunde->add_project($project);
	}

	function handle_auftraege_end(){
	}
	function handle_kunde_end(){
		$this->result->add_customer($this->kunde);
	}
	function handle_projekt_end(){
	}
	//================================================
	//================================================
	function print_element_start($aElement,&$aAttributes){
		$attributes = array();
		foreach($aAttributes as $key => $value){
			$attributes[] = "$key:$value";
		}
		for($spaceCtr=0;$spaceCtr<$this->$space;$spaceCtr++){
			echo "&nbsp;&nbsp;";
		}
		echo "$aElement =>>".join("|",$attributes)."<br>";
		$this->$space++;
	}
	
	function print_element_end($aElement){
		$this->$space--;
		for($spaceCtr=0;$spaceCtr<$this->$space;$spaceCtr++){
			echo "&nbsp;&nbsp;";
		}
		echo "<<=$aElement<br>";
	}
}
?>
