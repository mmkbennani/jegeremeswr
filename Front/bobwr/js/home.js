$(document).ready(function() {
	
    _homePage = new HomePage();
	_homePage.id_user=sessionStorage.val_id_user;
	_homePage.fill_country_sel();
	//_homePage.fill_brand_index();
    
    
    _homePage.reset_nombre_webradio();
    _homePage.get_nombre_webradio();
   
   if(sessionStorage.val_sel_country == null){
	   sessionStorage.val_sel_country = 1;
   }
   
	$(".js-example-responsive").select2({
		width: 'resolve' // need to override the changed default
	});
	
	//$('#moussehover').css('cursor', 'pointer');
	if(sessionStorage.val_sel_country==-1){
		sessionStorage.val_sel_country = 1;
	}

	
	_homePage.dateCanaldispo();
	_homePage.canauxdispoDoughnut();
	_homePage.get_septpremieresupp();
	
	
    
	
});




function HomePage(){
	//this.host = "http://"+window.location.hostname+":8003";
    
	this.id_user = "";
	this.array_brand = [];
	this.array_country = [];
	
	
	this.host = "http://localhost:8003";
}


HomePage.prototype.formatDateConvert = function(date) {
     var d = new Date(date),
         month = '' + (d.getMonth() + 1),
         day = '' + d.getDate(),
         year = d.getFullYear();

     if (month.length < 2) month = '0' + month;
     if (day.length < 2) day = '0' + day;

     return [day,month,year].join('/');
};


HomePage.prototype.canauxdispoDoughnut = function() {
    var doughnutData = [];
	$.ajax(_homePage.host+'/get_pourcent_canal_dispo/'+parseInt(sessionStorage.val_sel_country), {
		timeout: 500,     // timeout milliseconds
		method: "GET",
		contentType: "application/json",
		success: function (data_canauxdispo,status,xhr) {   // success callback function
			doughnutData=data_canauxdispo;
			$("#pourcenth2 h2").text("Utilisé : "+data_canauxdispo[0].value+"%");
			var myDoughnut = new Chart(document.getElementById("canauxdispo").getContext("2d")).Doughnut(doughnutData);
		},
		error: function (jqXhr, textStatus, errorMessage) { // error callback 
			
			
		}
	});
	$.ajax(_homePage.host+'/get_all_canaux/'+parseInt(sessionStorage.val_sel_country), {
		timeout: 500,     // timeout milliseconds
		method: "GET",
		contentType: "application/json",
		success: function (data_canauxdispo,status,xhr) {   // success callback function
			$("#nbrtotalcanaux h4").text("Nombre de canaux total:"+data_canauxdispo.length);
		},
		error: function (jqXhr, textStatus, errorMessage) { // error callback 
			
			
		}
	});
	
	
	
};


HomePage.prototype.dateCanaldispo = function() {
    $.ajax(_homePage.host+'/get_first_canal_dispo/'+parseInt(sessionStorage.val_sel_country), {
		timeout: 500,     // timeout milliseconds
		method: "GET",
		contentType: "application/json",
		success: function (data_canauxdispo,status,xhr) {   // success callback function
			if(data_canauxdispo.date_disponnible !=  null){
				$("#dateprocahincanalpourcent h5").text("%Canaux disponible au : "+_homePage.formatDateConvert(data_canauxdispo.date_disponnible));
				$("#dateprocahincanal h5").text("Date du disponnibilité du prochain canal : "+_homePage.formatDateConvert(data_canauxdispo.date_disponnible));
			}else{
				$("#dateprocahincanal h5").text('Aucun canal disponnible');
				$("#dateprocahincanalpourcent h5").text('Aucun canal disponnible');
			}
		},
		error: function (jqXhr, textStatus, errorMessage) { // error callback 
			
			
		}
	});
};



HomePage.prototype.formatDateConvert = function(date) {
     var d = new Date(date),
         month = '' + (d.getMonth() + 1),
         day = '' + d.getDate(),
         year = d.getFullYear();

     if (month.length < 2) month = '0' + month;
     if (day.length < 2) day = '0' + day;

     return [day,month,year].join('/');
};


HomePage.prototype.fill_country_sel = function(){
	
	var acl = "";
	var arr_acl = "";
	var str_bob_brand = "";
	var arr_bob_brand = [];
	var str_brand = "";
	
	_homePage.array_country = [];
	_homePage.array_brand = [];
	
	
	
	
	
	$.ajax(_homePage.host+'/get_all_acl/'+parseInt(_homePage.id_user), {
		timeout: 500,     // timeout milliseconds
		method: "GET",
		contentType: "application/json",
		success: function (data_acl,status,xhr) {   // success callback function
			$.each(data_acl, function(key_acl, value_acl){
				acl = value_acl.acl;
				arr_acl = acl.split(';');
				$.each(arr_acl, function(key_arr_acl, value_arr_acl){
					if(value_arr_acl.includes('bob_brand:')){
						str_bob_brand = value_arr_acl.includes('bob_brand:') ;
						arr_bob_brand = value_arr_acl.split(':');
						str_brand = arr_bob_brand[1];
						_homePage.array_brand = str_brand.split(',');
					}
				})
				
				var str = "";
				
				$.getJSON( _homePage.host+'/get_all_country/'+str_brand,
					function( data ) 
					{
						$.each(data, function(key, value){
							_homePage.array_country.push(value.id);
							str += '<option value="'+value.id+'">' + value.name.toUpperCase() + '</option>';
						});
						
						if(_homePage.array_country.indexOf(sessionStorage.val_sel_country) == -1){
							sessionStorage.val_sel_country = _homePage.array_country[0];
						}
						
						$("#sel_country")
						.html(str)
						.on('change', function(){
							sessionStorage.val_sel_country = this.value;
							sessionStorage.val_sel_brand = -1;
							_homePage.fill_brand_index();
							_homePage.dateCanaldispo();
							_homePage.canauxdispoDoughnut();
							_homePage.get_septpremieresupp();
						});
						if(sessionStorage.val_sel_country !== null){
							$("#sel_country").val(sessionStorage.val_sel_country);
							_homePage.fill_brand_index();
							_homePage.dateCanaldispo();
							_homePage.canauxdispoDoughnut();
							_homePage.get_septpremieresupp();
						}
						
					}
				);
			});
			
			$("#sel_country").select2({
				width: 'resolve',
				templateSelection: function (data, container) {
					$(container).css("font-size", "60%");	
					return data.text;
				}
			});
		},
		error: function (jqXhr, textStatus, errorMessage) { // error callback 
			
			
		}
	});
	
	
};



HomePage.prototype.fill_brand_index = function(){
	var str = "";
	$('#marque_show').empty();
	$.ajax(_homePage.host+'/get_all_brand/'+parseInt(sessionStorage.val_sel_country), {
		timeout: 500,     // timeout milliseconds
		method: "GET",
		contentType: "application/json",
		success: function (data,status,xhr) {   // success callback function
			$.each(data, function(key, value){
				
				if((_homePage.array_brand).indexOf(""+value.id)!=-1){
					$('#marque_show').append(
						'<a class="moussehover" onclick="_homePage.sendtoMarque('+value.id+')"><div class="col-md-3 col-sm-4 mb" >'+
							'<div class="grey-panel pn" style="border-radius: 25px;">'+
								'<div class="grey-header" style="border-radius: 25px 25px 0px 0px; background-color : ' + value.color_brand + '">'+
									'<h5 style="color:#293133; height: 20px;">   </h5>'+
								'</div>'+
								'<div class="row">'+
									'<img src="'+value.chemin_logo+'" alt="' + value.name.toUpperCase() + '" style="height:120px; weight:120px;">'+
									'<table>'+
										'<tr>'+ 
											_homePage.addCountBrand(value.countBrand) +
										'</tr>'+
									'</table>'+
								'</div>'+
							'</div>'+
						'</div></a>'
					);
				}
				
				
					
			});
		},
		error: function (jqXhr, textStatus, errorMessage) { // error callback 
			
			
		}
	});
	
};


HomePage.prototype.addCountBrand = function(listBrand){
	
	var returntd = 	'';
	for (var i = 0; i<listBrand.length; i++) {
		
		var valuecountBrand = listBrand[i];
		returntd = returntd + '<td style="padding-left: 20px;"><p><h4 style="margin-bottom: 0px;margin-top: 6px;">'+valuecountBrand.count+'</h4><h4 style="margin-top: 0px;"><small>WEBRADIOS '+valuecountBrand.statuswr.toUpperCase()+'</small></h4></p></td>';
	}
	
	return returntd;
	
};


HomePage.prototype.sendtoMarque = function(id_radio){
	sessionStorage.val_sel_brand = id_radio;
	window.location.href = "marque.php";
};


HomePage.prototype.get_brand_sel = function(){
	if (sessionStorage.val_sel_brand) {
		sessionStorage.val_sel_brand
		return sessionStorage.val_sel_brand;
	} else{
		sessionStorage.val_sel_brand = $("#sel_brand option:selected").val();
    	return $("#sel_brand option:selected").val();
    }
};

HomePage.prototype.get_country_sel = function(){
	if (sessionStorage.val_sel_country) {
		sessionStorage.val_sel_country
		return sessionStorage.val_sel_country;
	} else{
		sessionStorage.val_sel_country = $("#sel_brand option:selected").val();
    	return $("#sel_brand option:selected").val();
    }
};


HomePage.prototype.reset_nombre_webradio = function(){
	$('#nrj_nbr_wr').text(0);
	$('#cherie_nbr_wr').text(0);
	$('#rire_nbr_wr').text(0);
	$('#nosta_nbr_wr').text(0);
};


HomePage.prototype.get_septpremieresupp = function(){
	
	var returnvalue = "";
	
	$('#septpremieresupp > tbody').empty();
	$('#septpremieresupp > tbody:last').append('Chargement des données');
	var Ylistq = 0;
	Ylistq = $("#septpremieresupp").offset().top;
	
	$("#septpremieresupp >  tbody").css('max-height', $( window ).height() - Ylistq - 480);//

	
	var brand = sessionStorage.val_sel_brand;	
	var country = sessionStorage.val_sel_country;
	
	var url = _homePage.host+'/get_septpremieresupp/'+country;
	
	$.ajax( url,{
		timeout: 500,     // timeout milliseconds
		method: "GET",
		contentType: "application/json",
		success: function (data,status,xhr) {   // success callback function
				$('#septpremieresupp > tbody').empty();
					$.each(data, function(key, value){
						$('#septpremieresupp > tbody:last').append(
								'<tr class="clickable-row "  id="' + value.pk + '">' +
									'<td style="padding-top: 0px;padding-bottom: 0px;margin-bottom: 0px;margin-top: 0px;"><p style="font-weight:bold; height: 0px;">' + value.nom_wr + '</p></td>' +
									'<td style="padding-top: 0px;padding-bottom: 0px;margin-bottom: 0px;margin-top: 0px;"><p style="font-weight:bold; height: 0px;">' + _homePage.formatDateConvert(value.date_deletion_request) + '</p></td>' +
								'</tr>'
						);
						
						
					});		
				},
		error: function (jqXhr, textStatus, errorMessage) { // error callback 
			
			
		}
	});
	url = _homePage.host+'/get_septpremiereprochainement/'+country;
	
	
	
	$('#septpremiereprochainement > tbody').empty();
	$('#septpremiereprochainement > tbody:last').append('Chargement des données');
	var Ylistq = 0;
	Ylistq = $("#septpremiereprochainement").offset().top;
	
	$("#septpremiereprochainement >  tbody").css('max-height', $( window ).height() - Ylistq - 480);//
	
	
	$.ajax( url,{
		timeout: 500,     // timeout milliseconds
		method: "GET",
		contentType: "application/json",
		success: function (data,status,xhr) {   // success callback function
				$('#septpremiereprochainement > tbody').empty();
				if(data != null && data.length != 0){
					$("#dateprocahinsortie h5").text("Date du prochaine webradio : "+_homePage.formatDateConvert(data[0].date_creation_request));
				}else{
					$("#dateprocahinsortie h5").text("Aucune webradio prochainement");
				}
				
				$.each(data, function(key, value){
					$('#septpremiereprochainement > tbody:last').append(
							'<tr class="clickable-row "  id="' + value.pk + '">' +
								'<td style="padding-top: 0px;padding-bottom: 0px;margin-bottom: 0px;margin-top: 0px;"><p style="font-weight:bold; height: 0px;">' + value.nom_wr + '</p></td>' +
								'<td style="padding-top: 0px;padding-bottom: 0px;margin-bottom: 0px;margin-top: 0px;"><p style="font-weight:bold; height: 0px;">' + _homePage.formatDateConvert(value.date_creation_request) + '</p></td>' +
							'</tr>'
					);
					
					
				});		
			},
		error: function (jqXhr, textStatus, errorMessage) { // error callback 
			
			
		}
	});
	
	
	
	
};


HomePage.prototype.get_nombre_webradio = function(){
	
	var returnvalue = "";
	
	
	
	$.ajax(_homePage.host+'/countwradio/'+parseInt(sessionStorage.val_sel_country), {
		timeout: 500,     // timeout milliseconds
		method: "GET",
		contentType: "application/json",
		success: function (data,status,xhr) {   // success callback function
			for(var i = 0; i < data.length; i++){
			if(data[i].radio == 1){
				if(data[i].count == null){
					$('#nrj_nbr_wr').text(0);
				}else{
					$('#nrj_nbr_wr').text(data[i].count);
				}
				 
			}else if(data[i].radio == 2){
				if(data[i].count == null){
					$('#cherie_nbr_wr').text(0);
				}else{
					$('#cherie_nbr_wr').text(data[i].count);
				}
			}else if(data[i].radio == 3){
				if(data[i].count == null){
					$('#rire_nbr_wr').text(0);
				}else{
					$('#rire_nbr_wr').text(data[i].count);
				}
			}else if(data[i].radio == 4){
				if(data[i].count == null){
					$('#nosta_nbr_wr').text(0);
				}else{
					$('#nosta_nbr_wr').text(data[i].count);
				}
			}
		}
		},
		error: function (jqXhr, textStatus, errorMessage) { // error callback 
			
			
		}
	});
	
};
