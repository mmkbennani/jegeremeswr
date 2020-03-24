$(document).ready(function() {
	
    _website.update_navbar();
    
    _navbar = new Navbar();
    _navbar.fill_coutry_sel();

	$("#btn_logout").click(function(){
		window.location = "../logout.jsp";
		sessionStorage.val_sel_brand = "NRJ";
		return false;
	});
	$("#btn_reinit").click(function(){
		sessionStorage.val_sel_brand = "NRJ";
		document.location.reload(true);
		return false;
	});
	
	
	if(sessionStorage.val_sel_brand == null){
		sessionStorage.val_sel_brand='NRJ';
		sessionStorage.cnamenavbar='FRANCE';
	}
	
});

function Navbar(){
}


Navbar.prototype.fill_coutry_sel = function(){
	
	var str = "";

	$.getJSON( "../request?func=get_countries",
		
		function( data ) 
		{
			$.each(data, function(key, value){
				$.each(value, function(key, value){
					str += '<option>' + value.name + '</option>';
					_website.set_country(value.pk, value.name);
					if(_website.get_curcountry() == "" && value.root == true){
						_website.set_curcountry(value.pk);
						sessionStorage.longitude=2.31;
						sessionStorage.latitude=47.4534;
					}
				});
			});
			
			$("#nav_country")
			.html(str)
			.on('change', function(){
				var country = $("#nav_country option:selected").val();
				_website.set_curcountry(country);
				_urlparams.setParam("country", _website.get_country(country));
				
				if(country=="FRANCE"){
					sessionStorage.longitude=2.31;
					sessionStorage.latitude=47.4534;
				}else if(country=="SUISSE"){
					sessionStorage.longitude=8.269265;
					sessionStorage.latitude=46.846758;
				}else if(country=="BELGIUM"){
					sessionStorage.longitude=4.736226;
					sessionStorage.latitude=50.700587;
				}else if(country=="GERMANY"){
					sessionStorage.longitude=10.732817;
					sessionStorage.latitude=51.496461;
				}else if(country=="AUSTRIA"){
					sessionStorage.longitude=14.249302;
					sessionStorage.latitude=47.573400;
				}else if(country=="FINLAND"){
					sessionStorage.longitude=27.198728;
					sessionStorage.latitude=65.457827;
				}else if(country=="LEBANON"){
					sessionStorage.longitude=35.891228;
					sessionStorage.latitude=33.97484;
				}else if(country=="NORWAY"){
					sessionStorage.longitude=14.085088;
					sessionStorage.latitude=66.255565;
				}else if(country=="ANTILLES"){
					sessionStorage.longitude=-61.218011;
					sessionStorage.latitude=15.066616;
				}else if(country=="REUNION"){
					sessionStorage.longitude=55.525096;
					sessionStorage.latitude=-21.12232;
				}else if(country=="MAURICE"){
					sessionStorage.longitude=57.579960;
					sessionStorage.latitude=-20.287154;
				}else if(country=="RUSSIA"){
					sessionStorage.longitude=92.549228;
					sessionStorage.latitude=64.265501;
				}else if(country=="MAROC"){
					sessionStorage.longitude=-7.910254;
					sessionStorage.latitude=30.069779;
				}else if(country=="EGYPT"){
					sessionStorage.longitude=30.339797;
					sessionStorage.latitude=26.408435;
				}

				window.location = _urlparams.getUrl();
			});	
		    
		    if(_website.get_curcountry() != ""){
		    	var cname = _website.get_txtcountry(_website.get_curcountry());
		    	$("#nav_country option:selected").removeAttr("selected");
		    	$("#nav_country").val(cname);
		    	$('#nav_country option[value='+cname+']').prop('selected', true);
		    	sessionStorage.cnamenavbar=cname;
		    	if(cname==='FRANCE'){
		    		$("#mdlbl_nrjplay").show();
		    		
				}else{
					$("#mdlbl_nrjplay").hide();
				}
		    	
		    }
		});
};