function Website(){
	this._curpage = "";
	this._countries = new Array();
	this._txtcountries = new Array();
	this._brands = new Array();
	this._curcountry = "";
	this._sel_brand = "";
}

Website.prototype.set_sel_brand = function(sel_brand){
	this._sel_brand = sel_brand;
};

Website.prototype.get_sel_brand = function(){
	return this._sel_brand;
};

Website.prototype.set_curpage = function(cur_page){
	this._curpage = cur_page;
};

Website.prototype.get_curpage = function(){
	return this._curpage;
};

Website.prototype.set_curcountry = function(_curcountry){
	this._curcountry = _curcountry;
};

Website.prototype.get_curcountry = function(){
	return this._curcountry;
};



Website.prototype.update_navbar = function(){
	$(".webradio_lnk").removeClass("active");
	$(".piges_lnk").removeClass("active");
	$(".supervision_lnk").removeClass("active");
	$(".stats_lnk").removeClass("active");
	$(".metadata_lnk").removeClass("active");
	$(".preprod_lnk").removeClass("active");
	$(".frontend_lnk").removeClass("active");
	$(".users_lnk").removeClass("active");

	if(this._curpage == "webradios")
		$(".webradio_lnk").addClass("active");
	
	if(this._curpage == "piges")
		$(".piges_lnk").addClass("active");
	
	if(this._curpage == "supervision")
		$(".supervision_lnk").addClass("active");
	
	if(this._curpage == "statistiques")
		$(".stats_lnk").addClass("active");
	
	if(this._curpage == "metadata")
		$(".metadata_lnk").addClass("active");
	
	if(this._curpage == "preprod")
		$(".preprod_lnk").addClass("active");
	
	if(this._curpage == "frontend")
		$(".frontend_lnk").addClass("active");
	
	if(this._curpage == "users")
		$(".users_lnk").addClass("active");
};

Website.prototype.set_country = function(pk, name){
	this._countries[name] = pk;
	this._txtcountries[pk] = name;
};

Website.prototype.set_brand = function(pk, name){
	this._brands[name] = pk;
};

Website.prototype.get_country = function(name){
	return this._countries[name];
};

Website.prototype.get_txtcountry = function(pk){
	return this._txtcountries[pk];
};

Website.prototype.get_brand = function(name){
	return this._brands[name];
};
