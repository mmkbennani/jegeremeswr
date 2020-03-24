

$(document).ready(function() {

	
	sessionStorage.val_sel_brand = -1;
    _excel = new Excel();
	_excel.id_user=sessionStorage.val_id_user;
	_excel.fill_country_sel();
    _excel.fill_brand_sel_date_precise();
    _excel.fill_brand_sel_brand_date_range();
	
	
	
	$(document).keypress(
	  function(event){
	    if (event.which == '13') {
	      event.preventDefault();
	    }
	    if (event.which == '26') {
	      event.preventDefault();
	    }
	});
    
   
    
   
	$(".js-example-responsive").select2({
		width: 'resolve' // need to override the changed default
	});	
	$('#date_precise').datetimepicker({
		useCurrent: false,
		format: 'DD/MM/YYYY'
	});
	
	
	$('#date_debut_webradio').datetimepicker({
		useCurrent: false,
		format: 'DD/MM/YYYY'
	});
	
	$('#date_fin_webradio').datetimepicker({
		useCurrent: false,
		format: 'DD/MM/YYYY'
	});
	
	
	
	/*
	var dateTodayDebut = new Date();
	var tomorrowDebut = new Date(dateTodayDebut);
	tomorrowDebut.setDate(tomorrowDebut.getDate());
	$('#date_debut_webradio').data("DateTimePicker").minDate(tomorrowDebut);
	
	
	
	var dateTodayFin = new Date();
	var tomorrowFin = new Date(_marque.date_prochaine_dispo_canal);
	tomorrowFin.setDate(tomorrowFin.getDate());
	$('#date_fin_webradio').data("DateTimePicker").minDate(tomorrowFin);
	*/
	
	
	$("#date_fin_webradio").on("dp.change", function (e) {
		$('#date_debut_webradio').data("DateTimePicker").maxDate(e.date);
	});
	
	
	$("#date_debut_webradio").on("dp.change", function (e) {
		$('#date_fin_webradio').data("DateTimePicker").minDate(e.date);
	});
	
	
	
	
	$("#btn_filtre_date_precise").click(function(e){
		
		if($('#date_precise').data("DateTimePicker").date() ==  null){
			$('#controle_date').text("La date est obligatoire");
		}else{
			var date_date_precise = $('#date_precise').data("DateTimePicker").date();
			_excel.list_date_precise_webradio = [];
			//_excel.get_all_webradio_by_dateprecise(1,_excel.formatDateConvertTire(date_date_precise._d));
			var marque_selected = $('#sel_brand_date_precise').val();
			
			if(marque_selected != null && marque_selected.length != 0){
				if(marque_selected[0] === "-1"){
					$.each(_excel.array_brand_by_country, function(key_marque_selected, value_marque_selected){
						_excel.select_list_webradio_date_precise(value_marque_selected,_excel.formatDateConvertTire(date_date_precise._d));
					});
				}else{
					$.each(marque_selected, function(key_marque_selected, value_marque_selected){
						_excel.select_list_webradio_date_precise(value_marque_selected,_excel.formatDateConvertTire(date_date_precise._d));
					});
					
				}
			}
			
			_excel.get_all_webradio_by_dateprecise(_excel.formatDateConvertTire(date_date_precise._d));
		}
		
		
	});
	
	
	
	$("#btn_filtre_date_range").click(function(e){
		$('#controle_date_debut').text("");
		$('#controle_date_fin').text("");
		if($('#date_fin_webradio').data("DateTimePicker").date() ==  null || $('#date_debut_webradio').data("DateTimePicker").date() ==  null){
			if($('#date_debut_webradio').data("DateTimePicker").date() ==  null){
				$('#controle_date_debut').text("La date début est obligatoire");
			}
			if($('#date_fin_webradio').data("DateTimePicker").date() ==  null){
				$('#controle_date_fin').text("La date fin est obligatoire");
			}
		}else{
			
			var date_date_debut = $('#date_debut_webradio').data("DateTimePicker").date();
			var date_date_fin = $('#date_fin_webradio').data("DateTimePicker").date();
			_excel.list_date_range_webradio = [];
			//_excel.get_all_webradio_by_dateprecise(1,_excel.formatDateConvertTire(date_date_precise._d));
			var marque_selected = $('#sel_brand_date_range').val();
			
			if(marque_selected != null && marque_selected.length != 0){
				if(marque_selected[0] === "-1"){
					$.each(_excel.array_brand_by_country, function(key_marque_selected, value_marque_selected){
						_excel.select_list_webradio_date_range(value_marque_selected,_excel.formatDateConvertTire(date_date_debut._d),_excel.formatDateConvertTire(date_date_fin._d));
					});
				}else{
					$.each(marque_selected, function(key_marque_selected, value_marque_selected){
						_excel.select_list_webradio_date_range(value_marque_selected,_excel.formatDateConvertTire(date_date_debut._d),_excel.formatDateConvertTire(date_date_fin._d));
					});
					
				}
			}
			
			_excel.get_all_webradio_by_daterange(_excel.formatDateConvertTire(date_date_debut._d),_excel.formatDateConvertTire(date_date_fin._d));
		}
		
		
	});
	
	
	
	
});




function Excel(){
	
	
	this.id_user = "";
	this.array_brand = [];
	this.array_brand_by_country = [];
	this.array_country = [];
	
	
	this.array_wr_liste_webradios_radio = [];
	
	this.offline_checkboxval = -1;
	this.sanspubcheckboxval = -1;
	this.prochainementcheckboxval = -1;
	
	this.date_prochaine_dispo_canal = null;
	this.wr_created_by_wr = "";
	this.wr_sysdate_created = "";
	
	this.date_precise_table = "";
	this.list_date_precise_webradio = [];
	this.list_date_range_webradio = [];
	
	this.arraycanaux = new Array();
	//this.host = "http://"+window.location.hostname+":8003";
	this.host = "http://localhost:8003";
	this._cur_excel_pk=-1;
	this._cur_excel_obj;
	this.selected_genre_application=[];
	this.selected_webradio_bygenre=[];
	this.selected_webradio_bygenre_avapres=[];
	this.date_debut_modal_val = "";
	this._modes = ['CREATE_WEBRADIO','EDIT_WEBRADIO','SUPP_WEBRADIO'];
    
}


Excel.prototype.fill_brand_sel_date_precise = function(){
	var str = "";
	str = '<option value="-1" >Toutes les marques</option>';
	_excel.array_brand_by_country=[];
	$.getJSON( _excel.host+'/get_all_brand/'+parseInt(sessionStorage.val_sel_country),
		function( data ) 
		{
			$.each(data, function(key, value){
				if((_excel.array_brand).indexOf(""+value.id)!=-1){
					_excel.array_brand_by_country.push(value.id);
					str += '<option value="'+value.id+'" >' + value.name.toUpperCase() + '</option>';
				}
			});
			$("#sel_brand_date_precise")
			.html(str)
			.on('change', function(){
				sessionStorage.val_sel_brand = this.value;
			});
			$("#sel_brand_date_precise").val(sessionStorage.val_sel_brand);
			$("#sel_brand_date_precise").select2({
				width: 'resolve',
				templateSelection: function (data, container) {
					$(container).css("font-size", "60%");	
					return data.text;
				}
			});
			
			
		}
	);
};


Excel.prototype.fill_brand_sel_brand_date_range = function(){
	var str = "";
	str = '<option value="-1" >Toutes les marques</option>';
	
	$.getJSON( _excel.host+'/get_all_brand/'+parseInt(sessionStorage.val_sel_country),
		function( data ) 
		{
			$.each(data, function(key, value){
				if((_excel.array_brand).indexOf(""+value.id)!=-1){
					str += '<option value="'+value.id+'" >' + value.name.toUpperCase() + '</option>';
				}
			});
			$("#sel_brand_date_range")
			.html(str)
			.on('change', function(){
				sessionStorage.val_sel_brand = this.value;
			});
			$("#sel_brand_date_range").val(sessionStorage.val_sel_brand);
			$("#sel_brand_date_range").select2({
				width: 'resolve',
				templateSelection: function (data, container) {
					$(container).css("font-size", "60%");	
					return data.text;
				}
			});
			
			
		}
	);
};



Excel.prototype.fill_country_sel = function(){
	
	var acl = "";
	var arr_acl = "";
	var str_bob_brand = "";
	var arr_bob_brand = [];
	var str_brand = "";
	
	_excel.array_country = [];
	_excel.array_brand = [];
	
	$.getJSON( _excel.host+'/get_all_acl/'+parseInt(_excel.id_user),
		function( data_acl ) 
		{

			$.each(data_acl, function(key_acl, value_acl){
				acl = value_acl.acl;
				arr_acl = acl.split(';');
				$.each(arr_acl, function(key_arr_acl, value_arr_acl){
					if(value_arr_acl.includes('bob_brand:')){
						str_bob_brand = value_arr_acl.includes('bob_brand:') ;
						arr_bob_brand = value_arr_acl.split(':');
						str_brand = arr_bob_brand[1];
						_excel.array_brand = str_brand.split(',');
					}
				})
				
				var str = "";
	
				$.getJSON( _excel.host+'/get_all_country/'+str_brand,
					function( data ) 
					{
						$.each(data, function(key, value){
							_excel.array_country.push(value.id);
							str += '<option value="'+value.id+'">' + value.name.toUpperCase() + '</option>';
						});
						$("#sel_country")
						.html(str)
						.on('change', function(){
							sessionStorage.val_sel_country = this.value;
							sessionStorage.val_sel_brand = -1;
							_excel.fill_brand_sel_date_precise();
							_excel.fill_brand_sel_brand_date_range();
						});
						if(sessionStorage.val_sel_country !== null){
							$("#sel_country").val(sessionStorage.val_sel_country);
							//sessionStorage.val_sel_country = data[0].id;
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

		}
	);	
};

Excel.prototype.formatDateConvert = function(date) {
     var d = new Date(date),
         month = '' + (d.getMonth() + 1),
         day = '' + d.getDate(),
         year = d.getFullYear();

     if (month.length < 2) month = '0' + month;
     if (day.length < 2) day = '0' + day;

     return [day,month,year].join('/');
};


Excel.prototype.formatDateConvertTire = function(date) {
     var d = new Date(date),
         month = '' + (d.getMonth() + 1),
         day = '' + d.getDate(),
         year = d.getFullYear();

     if (month.length < 2) month = '0' + month;
     if (day.length < 2) day = '0' + day;

     return year+"-"+month+"-"+day+" 23:59:59";
};


Excel.prototype.formatDateConvertTireNow = function(date) {
     var d = new Date(date),
         month = '' + (d.getMonth() + 1),
         day = '' + d.getDate(),
         year = d.getFullYear();

     if (month.length < 2) month = '0' + month;
     if (day.length < 2) day = '0' + day;

     return year+"-"+month+"-"+day+"T"+d.getHours()+":"+d.getMinutes()+":59";
};






Excel.prototype.reset_edit_form_checkbox = function(){
	document.location.reload(true);
	
};




Excel.prototype.select_list_webradio_date_precise = function(marque, date_precise){
	
	if(sessionStorage.val_sel_country==null){
		sessionStorage.val_sel_country = 1;
	}
	if(sessionStorage.val_sel_brand==null){
		sessionStorage.val_sel_brand = 1;
	}
	var brand = sessionStorage.val_sel_brand;	
	var country = sessionStorage.val_sel_country;
	
	$.ajax(_excel.host+'/get_webradio_by_date_precise/'+country+"/"+marque+"/"+date_precise, {
		timeout: 500,     // timeout milliseconds
		method: "GET",
		contentType: "application/json",
		async: false,
		success: function (list_webradio,status,xhr) {   // success callback function
			$.each(list_webradio, function(key_list_webradio, value_list_webradio){
				_excel.list_date_precise_webradio.push(value_list_webradio);
			});		
		},
		error: function (jqXhr, textStatus, errorMessage) {		
		}
	});
}


Excel.prototype.select_list_webradio_date_range = function(marque, date_debut,date_fin){
	
	if(sessionStorage.val_sel_country==null){
		sessionStorage.val_sel_country = 1;
	}
	if(sessionStorage.val_sel_brand==null){
		sessionStorage.val_sel_brand = 1;
	}
	var brand = sessionStorage.val_sel_brand;	
	var country = sessionStorage.val_sel_country;
	
	$.ajax(_excel.host+'/get_webradio_by_date_range/'+country+"/"+marque+"/"+date_debut+"/"+date_fin, {
		timeout: 500,     // timeout milliseconds
		method: "GET",
		contentType: "application/json",
		async: false,
		success: function (list_webradio,status,xhr) {   // success callback function
			$.each(list_webradio, function(key_list_webradio, value_list_webradio){
				_excel.list_date_range_webradio.push(value_list_webradio);
			});		
		},
		error: function (jqXhr, textStatus, errorMessage) {		
		}
	});
}


Excel.prototype.get_all_webradio_by_dateprecise = function(date_precise){
	
	var returnvalue = "";
	$('#controle_date').text("");
	if(sessionStorage.val_sel_country==null){
		sessionStorage.val_sel_country = 1;
	}
	if(sessionStorage.val_sel_brand==null){
		sessionStorage.val_sel_brand = 1;
	}
	var brand = sessionStorage.val_sel_brand;	
	var country = sessionStorage.val_sel_country;
	

		
	$('#webradiodateprecise').DataTable( {
		
		"sPaginationType": "full_numbers",
		dom: 'Bfrtip',        // Needs button container
		responsive: true,
		destroy: true,
		altEditor: true, 
		language: {
			"info": "Affichage page _PAGE_ de _PAGES_",
			"infoEmpty": "Aucune Webradio online avec ces conditions pour ce pays",
			"infoFiltered": "(filtré sur un total de _MAX_ Webradios)",
			"zeroRecords": "Aucune Webradio online avec ces conditions pour ce pays",
			"paginate": {
			  "previous": "Précédent",
			  "next": "Suivant",
			  "first": "1ère Page",
			  "last": "Dernière Page"
			}
		},
        "data": _excel.list_date_precise_webradio,
        "columns": [
			{ 
				"data": "nom_wr"			
			},
            { 
				"data": "id_pressplay"
			},
            { 
				"data": "date_creation_request"
			},
            { 
				"data": "date_deletion_request"
			},
            { 
				"data": "genre_application" 
			}
        ],
        select: 'single',
        buttons: [{
					extend: 'excel',
					text: 'Export Excel',
					title: '',
					filename: 'EXCELWebradioOnline_'+ date_precise,
					exportOptions: {
						columns: ':visible'
					}
				},{
					extend: 'csv',
					text: 'Export CSV',
					title: '',
					filename: 'CSVWebradioOnline_'+ date_precise,
					exportOptions: {
						columns: ':visible'
					}
				}]
    } );
	
};


Excel.prototype.get_all_webradio_by_daterange = function(date_debut,date_fin){
	
	var returnvalue = "";
	$('#controle_date_debut').text("");
	$('#controle_date_fin').text("");
	if(sessionStorage.val_sel_country==null){
		sessionStorage.val_sel_country = 1;
	}
	if(sessionStorage.val_sel_brand==null){
		sessionStorage.val_sel_brand = 1;
	}
	var brand = sessionStorage.val_sel_brand;	
	var country = sessionStorage.val_sel_country;
	

		
	$('#webradiodaterange').DataTable( {
		
		"sPaginationType": "full_numbers",
		dom: 'Bfrtip',        // Needs button container
		responsive: true,
		destroy: true,
		altEditor: true, 
		language: {
			"info": "Affichage page _PAGE_ de _PAGES_",
			"infoEmpty": "Aucune Webradio online avec ces conditions pour ce pays",
			"infoFiltered": "(filtré sur un total de _MAX_ Webradios)",
			"zeroRecords": "Aucune Webradio online avec ces conditions pour ce pays",
			"paginate": {
			  "previous": "Précédent",
			  "next": "Suivant",
			  "first": "1ère Page",
			  "last": "Dernière Page"
			}
		},
        "data": _excel.list_date_range_webradio,
        "columns": [
			{ 
				"data": "nom_wr"			
			},
            { 
				"data": "id_pressplay"
			},
            { 
				"data": "date_creation_request"
			},
            { 
				"data": "date_deletion_request"
			},
            { 
				"data": "genre_application" 
			}
        ],
        select: 'single',
        buttons: [{
					extend: 'excel',
					text: 'Export Excel',
					title: '',
					filename: 'EXCELWebradioOnline_'+date_debut+"_"+date_fin,
					exportOptions: {
						columns: ':visible'
					}
				},{
					extend: 'csv',
					text: 'Export CSV',
					title: '',
					filename: 'CSVWebradioOnline_'+date_debut+"_"+date_fin,
					exportOptions: {
						columns: ':visible'
					}
				}]
    } );
	
};





