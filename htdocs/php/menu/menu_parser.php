<?php
class MenuParser{
	var $parser;
	var $space=0;
	var $result;
	var $menuStack = array();
	var $entryStack = array();
	//====================================================
	//====================================================
	function MenuParser(){
	}
	
	function fill_menu($aFileName,$aMenu){
		$this->menuStack[] = $aMenu;
		$this->parser = xml_parser_create();
		xml_set_object($this->parser,&$this);
		xml_set_element_handler($this->parser,"start_element", "end_element");
		$x = join("",file($aFileName));
		xml_parse($this->parser,$x);
		xml_parser_free($this->parser);
		return $this->result;
	}
	
	function start_element($aParser, $aElement, &$aAttributes){
		switch($aElement){
			case "MENU":
				$this->handle_menu(&$aAttributes);
			break;
			case "MENUENTRY":
				$this->handle_menuentry(&$aAttributes);
			break;
			case "CHILDMENU":
				$this->handle_childmenu(&$aAttributes);
			break;
		}
	}
	function end_element($aParser, $aElement){
		switch($aElement){
			case "MENU":
				$this->handle_menu_end();
			break;
			case "MENUENTRY":
				$this->handle_menuentry_end();
			break;
			case "CHILDMENU":
				$this->handle_childmenu_end();
			break;
		}
	}
	//================================================
	//================================================
	function handle_menu(&$aAttributes){
	}
	function handle_menuentry(&$aAttributes){
		$this->entryStack[] = new MenuEntry($aAttributes["LABEL"],$aAttributes["LINK"]);
	}
	function handle_childmenu(&$aAttributes){
		$this->menuStack[] = new Menu();
	}

	function handle_menu_end(){
		$this->result = array_pop($this->menuStack);
	}
	function handle_menuentry_end(){
		$menu = array_pop($this->menuStack);
		$entry = array_pop($this->entryStack);
		$menu->add_entry($entry);
		array_push($this->menuStack,$menu);
	}
	function handle_childmenu_end(){
		$menu = array_pop($this->menuStack);
		$entry = array_pop($this->entryStack);
		$entry->set_childMenu($menu);
		array_push($this->entryStack,$entry);
	}
	//===========================================
	//===========================================
	function print_element_start(&$aAttributes,$aElement){
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