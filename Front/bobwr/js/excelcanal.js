

$(document).ready(function() {

	

    _excelcanal = new Excelcanal();
	_excelcanal.id_user=sessionStorage.val_id_user;
	_excelcanal.fill_country_sel();
	_excelcanal.fill_brand_sel();
    
	
	
	
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
	_excelcanal.get_all_canaux();
	
	
	
});




function Excelcanal(){
	
	
	this.id_user = "";
	this.array_brand = [];
	this.array_country = [];
	
	
	this.array_wr_liste_webradios_radio = [];
	
	this.offline_checkboxval = -1;
	this.sanspubcheckboxval = -1;
	this.prochainementcheckboxval = -1;
	
	this.date_prochaine_dispo_canal = null;
	this.wr_created_by_wr = "";
	this.wr_sysdate_created = "";
	
	
	
	this.arraycanaux = new Array();
	//this.host = "http://"+window.location.hostname+":8003";
	this.host = "http://localhost:8003";
	this._cur_excelcanal_pk=-1;
	this._cur_excelcanal_obj;
	this.selected_genre_application=[];
	this.selected_webradio_bygenre=[];
	this.selected_webradio_bygenre_avapres=[];
	this.date_debut_modal_val = "";
	this._modes = ['CREATE_WEBRADIO','EDIT_WEBRADIO','SUPP_WEBRADIO'];
    
}


Excelcanal.prototype.fill_brand_sel = function(){
	var str = "";
	
	$.getJSON( _excelcanal.host+'/get_all_brand/'+parseInt(sessionStorage.val_sel_country),
		function( data ) 
		{
			$.each(data, function(key, value){
				if((_excelcanal.array_brand).indexOf(""+value.id)!=-1){
					str += '<option value="'+value.id+'" >' + value.name.toUpperCase() + '</option>';
				}
			});
			$("#sel_brand")
			.html(str)
			.on('change', function(){
				sessionStorage.val_sel_brand = this.value;
				_excelcanal.get_all_webradio();
				_excelcanal.reset_edit_form();
				_excelcanal.fill_genre_application_sel();
			});
			$("#sel_brand").val(sessionStorage.val_sel_brand);
			
			$("#sel_brand").select2({
				width: 'resolve',
				templateSelection: function (data, container) {
					$(container).css("font-size", "60%");	
					return data.text;
				}
			});
		}
	);
};





Excelcanal.prototype.fill_country_sel = function(){
	
	var acl = "";
	var arr_acl = "";
	var str_bob_brand = "";
	var arr_bob_brand = [];
	var str_brand = "";
	
	_excelcanal.array_country = [];
	_excelcanal.array_brand = [];
	
	$.getJSON( _excelcanal.host+'/get_all_acl/'+parseInt(_excelcanal.id_user),
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
						_excelcanal.array_brand = str_brand.split(',');
					}
				})
				
				var str = "";
	
				$.getJSON( _excelcanal.host+'/get_all_country/'+str_brand,
					function( data ) 
					{
						$.each(data, function(key, value){
							_excelcanal.array_country.push(value.id);
							str += '<option value="'+value.id+'">' + value.name.toUpperCase() + '</option>';
						});
						$("#sel_country")
						.html(str)
						.on('change', function(){
							sessionStorage.val_sel_country = this.value;
							sessionStorage.val_sel_brand = -1;
							_excelcanal.fill_brand_sel();
							_excelcanal.get_all_canaux();
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

Excelcanal.prototype.get_all_canaux = function(){
	if(sessionStorage.val_sel_country==null){
		sessionStorage.val_sel_country = 1;
	}
	if(sessionStorage.val_sel_brand==null){
		sessionStorage.val_sel_brand = 1;
	}
	var brand = sessionStorage.val_sel_brand;	
	var country = sessionStorage.val_sel_country;
	
	var url = "";
	
	
	url = _excelcanal.host+'/get_all_canaux/'+country;
	
		
	$('#table_canaux').DataTable( {
		
		"sPaginationType": "full_numbers",
		dom: 'Bfrtip',        // Needs button container
		responsive: true,
		destroy: true,
		altEditor: true, 
		language: {
			"info": "Affichage page _PAGE_ de _PAGES_",
			"infoEmpty": "Aucun Canal pour ce pays",
			"infoFiltered": "(filtré sur un total de _MAX_ Canaux)",
			"zeroRecords": "Aucun Canal pour ce pays",
			"paginate": {
			  "previous": "Précédent",
			  "next": "Suivant",
			  "first": "1ère Page",
			  "last": "Dernière Page"
			},
			"add" : {
				"title": "Ajout d'un nouveau Canal"
			}
		},
        "ajax": {
			"url": url,
            "dataSrc": ""
		},
        "columns": [
			{ 
				"data": "fk_country",
				"type": "readonly"			
			},
            { 
				"data": "id_canal",
				"type": "readonly"	
			},
            { 
				"data": "id_wr",
				"type": "readonly"
			},
            { "data": "nom_canal" },
            { 
				"data": "date_disponnible",
				"type": "readonly"
				
			},
            { "data": "id_pressplay",
				"type": "readonly" },
            { "data": "nom_webradio",
				"type": "readonly" },
			{
				data: "isApplication",
                render: function ( data, type, row ) {
                    if ( type === 'display' ) {
                        return '<input type="checkbox" id ="application" class="editor-active-application">';
                    }
                    return data;
                },
                className: "dt-body-center",
				"type": "checkbox"
            },
			{
				data: "isAgregatteur",
				render: function ( data, type, row ) {
                    if ( type === 'display' ) {
                        return '<input type="checkbox" id ="agregatteur" class="editor-active-agregatteur">';
                    }
                    return data;
                },
                className: "dt-body-center",
				"type": "checkbox"
            },
			{
                data: "isSite",
				render: function ( data, type, row ) {
                    if ( type === 'display' ) {
                        return '<input type="checkbox" id ="site" class="editor-active-site">';
                    }
                    return data;
                },
                className: "dt-body-center",
				"type": "checkbox"
            }
        ],"columnDefs": [
            {
                "targets": [0,1,2],
                "visible": false,
                "searchable": false
            },
			{
				"targets": [5],
				"render": function ( data, type, row, meta ) {
						if(row.id_pressplay+"" == "-1"){
							return "";
						}else{
							return row.id_pressplay;
						}

					}
			}
        ],
        rowCallback: function ( row, data ) {
            // Set the checked state of the checkbox in the table
            $('input.editor-active-application', row).prop( 'checked', data.isApplication == 1 );
            $('input.editor-active-agregatteur', row).prop( 'checked', data.isAgregatteur == 1 );
            $('input.editor-active-site', row).prop( 'checked', data.isSite == 1 );
        },
        select: 'single',
        buttons: [{
            text: 'Ajouter',
            name: 'add'        // do not change name
          },

          {
            extend: 'selected', // Bind to Selected row
            text: 'Editer',
            name: 'edit'        // do not change name
          },

          {
            extend: 'selected', // Bind to Selected row
            text: 'Supprimer',
            name: 'delete',      // do not change name
			formMessage: function ( e, dt ) {
				var rows = dt.rows( e.modifier() ).data().pluck('nom_canal');
				return 'Voulez vous supprimer le canal :  '+
					'<ul><li>'+rows.join('</li><li>')+'</li></ul>';
			}
         }]
    } );

	
};

Excelcanal.prototype.formatDateConvert = function(date) {
     var d = new Date(date),
         month = '' + (d.getMonth() + 1),
         day = '' + d.getDate(),
         year = d.getFullYear();

     if (month.length < 2) month = '0' + month;
     if (day.length < 2) day = '0' + day;

     return [day,month,year].join('/');
};


Excelcanal.prototype.formatDateConvertTire = function(date) {
     var d = new Date(date),
         month = '' + (d.getMonth() + 1),
         day = '' + d.getDate(),
         year = d.getFullYear();

     if (month.length < 2) month = '0' + month;
     if (day.length < 2) day = '0' + day;

     return year+"-"+month+"-"+day+"T23:59:59";
};


Excelcanal.prototype.formatDateConvertTireNow = function(date) {
     var d = new Date(date),
         month = '' + (d.getMonth() + 1),
         day = '' + d.getDate(),
         year = d.getFullYear();

     if (month.length < 2) month = '0' + month;
     if (day.length < 2) day = '0' + day;

     return year+"-"+month+"-"+day+"T"+d.getHours()+":"+d.getMinutes()+":59";
};




Excelcanal.prototype.enable_edit_form = function(enabled){
	$('#controle_date_valider').text("");
	enabled ? $("#nom_webradio").removeAttr( "disabled" ) : $("#nom_webradio").attr( "disabled", true );
	enabled ? $("#claim").removeAttr( "disabled" ) : $("#claim").attr( "disabled", true );
	enabled ? $("#pub").removeAttr( "disabled" ) : $("#pub").attr( "disabled", true );
	enabled ? $("#id_pressplay").removeAttr( "disabled" ) : $("#id_pressplay").attr( "disabled", true );
	enabled ? $("#genre_application_select").removeAttr( "disabled" ) : $("#genre_application_select").attr( "disabled", true );
	enabled ? $("#genre_orange_select").removeAttr( "disabled" ) : $("#genre_orange_select").attr( "disabled", true );
	enabled ? $("#sous_genre_orange_select").removeAttr( "disabled" ) : $("#sous_genre_orange_select").attr( "disabled", true );
	enabled ? $("#genre_itunes_select").removeAttr( "disabled" ) : $("#genre_itunes_select").attr( "disabled", true );
	enabled ? $("#date_debut :input").prop("disabled", false): $("#date_debut :input").prop("disabled",true);
	enabled ? $("#date_fin :input").prop("disabled", false) : $("#date_fin :input").prop("disabled", true);
	enabled ? $("#suivant_button").removeClass( "invisible" ) : $("#suivant_button").addClass( "invisible" );
	enabled ? $("#cancel_edt_button_pla").removeClass( "invisible" ) : $("#cancel_edt_button_pla").addClass( "invisible" );
	enabled ? $("#cancel_edt_button_alpha").removeClass( "invisible" ) : $("#cancel_edt_button_alpha").addClass( "invisible" );
};


Excelcanal.prototype.enable_edit_form_supp = function(enabled){
	$('#controle_date_valider').text("");
	enabled ? $("#date_fin :input").prop("disabled", false) : $("#date_fin :input").prop("disabled", true);
	enabled ? $("#suivant_button").removeClass( "invisible" ) : $("#suivant_button").addClass( "invisible" );
	enabled ? $("#cancel_edt_button_pla").removeClass( "invisible" ) : $("#cancel_edt_button_pla").addClass( "invisible" );
	enabled ? $("#cancel_edt_button_alpha").removeClass( "invisible" ) : $("#cancel_edt_button_alpha").addClass( "invisible" );
};


Excelcanal.prototype.enable_edit_form_ss_date = function(enabled){
	$('#controle_date_valider').text("");
	enabled ? $("#nom_webradio").removeAttr( "disabled" ) : $("#nom_webradio").attr( "disabled", true );
	enabled ? $("#claim").removeAttr( "disabled" ) : $("#claim").attr( "disabled", true );
	enabled ? $("#pub").removeAttr( "disabled" ) : $("#pub").attr( "disabled", true );
	enabled ? $("#id_pressplay").removeAttr( "disabled" ) : $("#id_pressplay").attr( "disabled", true );
	enabled ? $("#genre_application_select").removeAttr( "disabled" ) : $("#genre_application_select").attr( "disabled", true );
	enabled ? $("#genre_orange_select").removeAttr( "disabled" ) : $("#genre_orange_select").attr( "disabled", true );
	enabled ? $("#sous_genre_orange_select").removeAttr( "disabled" ) : $("#sous_genre_orange_select").attr( "disabled", true );
	enabled ? $("#genre_itunes_select").removeAttr( "disabled" ) : $("#genre_itunes_select").attr( "disabled", true );
	enabled ? $("#suivant_button").removeClass( "invisible" ) : $("#suivant_button").addClass( "invisible" );
	enabled ? $("#cancel_edt_button_pla").removeClass( "invisible" ) : $("#cancel_edt_button_pla").addClass( "invisible" );
	enabled ? $("#cancel_edt_button_alpha").removeClass( "invisible" ) : $("#cancel_edt_button_alpha").addClass( "invisible" );
};



Excelcanal.prototype.enable_edit_placement_form = function(enabled,pk_wr){
	enabled ? $("#id_avapres_webradio_"+pk_wr).removeAttr( "disabled" ) : $("#id_avapres_webradio_"+pk_wr).attr( "disabled", true );
	enabled ? $("#id_placement_webradio_"+pk_wr).removeAttr( "disabled" ) : $("#id_placement_webradio_"+pk_wr).attr( "disabled", true );
};



Excelcanal.prototype.enable_sanspub_prochainement = function(enabled){
	enabled ? $("#sanspubcheckboxdiv").show() : $("#sanspubcheckboxdiv").hide();
	enabled ? $("#prochainementcheckboxdiv").show() : $("#prochainementcheckboxdiv").hide();

	!enabled ? $("#offline_checkboxdiv").show() : $("#offline_checkboxdiv").hide();
};

Excelcanal.prototype.enable_offline_sanspub = function(enabled){
	enabled ? $("#offline_checkboxdiv").show() : $("#offline_checkboxdiv").hide();
	enabled ? $("#sanspubcheckboxdiv").show() : $("#sanspubcheckboxdiv").hide();
	
	!enabled ? $("#prochainementcheckboxdiv").show() : $("#prochainementcheckboxdiv").hide();
};

Excelcanal.prototype.enable_allcheckbox = function(enabled){
	enabled ? $("#sanspubcheckbox").removeAttr( "disabled" ) : $("#sanspubcheckbox").attr( "disabled", true );
	enabled ? $("#prochainementcheckbox").removeAttr( "disabled" ) : $("#prochainementcheckbox").attr( "disabled", true );
	enabled ? $("#offline_checkbox").removeAttr( "disabled" ) : $("#offline_checkbox").attr( "disabled", true );
};




Excelcanal.prototype.reset_edit_form = function(){
	$('#controle_date_valider').text("");
	_excelcanal.selected_webradio_bygenre_avapres=[];
	_excelcanal.selected_webradio_bygenre=[];
	$('#table_placement > tbody').empty();
	$("#nom_webradio").val("");
	$("#claim").val("");
	$("#pub").val("").trigger('change');
	$("#id_pressplay").val("");
	$("#genre_application_select").val("").trigger('change');
	$("#genre_orange_select").val("").trigger('change');
	$("#sous_genre_orange_select").val("").trigger('change');
	$("#genre_itunes_select").val("").trigger('change');
	$('#date_debut').data("DateTimePicker").clear();
	$('#date_fin').data("DateTimePicker").clear();
	_excelcanal.wr_created_by_wr =  "";
	
};

Excelcanal.prototype.reset_edit_form_checkbox = function(){
	document.location.reload(true);
	
};


Excelcanal.prototype.fill_genre_application_sel = function(){
	var str = "";
	var brand = sessionStorage.val_sel_brand;	
	var country = sessionStorage.val_sel_country;
	$.getJSON( _excelcanal.host+'/get_genre_application/'+country+'/'+brand,
		function( data ) 
		{
			$.each(data, function(key, value){
				str += '<option value="'+value.pk+'">' + value.genre_name + '</option>';
			});
			$("#genre_application_select")
			.html(str);
			//$("#genre_application_select").val(sessionStorage.val_sel_country);
		}
	);
};

Excelcanal.prototype.fill_genre_orange_sel = function(){
	var str = "<option value=''>- </option>";
	var str_ssgenre = "<option value=''>- </option>";
	var brand = sessionStorage.val_sel_brand;	
	var country = sessionStorage.val_sel_country;
	$.getJSON( _excelcanal.host+'/get_genre_orange',
		function( data ) 
		{
			$.each(data, function(key, value){
				str += '<option value="'+value.id+'">' + value.genre_name + '</option>';
			});
			$("#genre_orange_select")
			.html(str)
			.on('change', function(){
				if(this.value != ""){
					$.getJSON( _excelcanal.host+'/get_sous_genre_orange/'+parseInt(this.value),
						function( data ) 
						{
							str_ssgenre = "<option value=''>- </option>";
							$.each(data, function(key, value){
								str_ssgenre += '<option value="'+value.pk+'">' + value.subgenre_name + '</option>';
							});
							//$('#sous_genre_orange_select').empty().append('<option selected="selected" value="test">White</option>');
							$("#sous_genre_orange_select")
							.html(str_ssgenre)
							.on('change', function(){
								str_ssgenre
							});;
							//$("#sous_genre_orange_select").val(sessionStorage.val_sel_country);
						}
					);
				}
					
			});
			
			//$("#genre_orange_select").val(sessionStorage.val_sel_country);
		}
	);
};

Excelcanal.prototype.fill_genre_itunes_sel = function(){
	var str = "<option value=''>- </option>";
	$.getJSON( _excelcanal.host+'/get_genre_itunes',
		function( data ) 
		{
			$.each(data, function(key, value){
				str += '<option value="'+value.id+'">' + value.genre_name + '</option>';
			});
			$("#genre_itunes_select")
			.html(str);
			//$("#genre_itunes_select").val(sessionStorage.val_sel_country);
		}
	);
};


Excelcanal.prototype.get_brand_sel = function(){
	if (sessionStorage.val_sel_brand) {
		sessionStorage.val_sel_brand
		return sessionStorage.val_sel_brand;
	} else{
		sessionStorage.val_sel_brand = $("#sel_brand option:selected").val();
    	return $("#sel_brand option:selected").val();
    }
};

Excelcanal.prototype.get_country_sel = function(){
	if (sessionStorage.val_sel_country) {
		sessionStorage.val_sel_country
		return sessionStorage.val_sel_country;
	} else{
		sessionStorage.val_sel_country = $("#sel_country option:selected").val();
    	return $("#sel_country option:selected").val();
    }
};



Excelcanal.prototype.reset_all_webradio = function(){
	$('#liste_webradios_radio > tbody').empty();
	$('#liste_webradios_radio > tbody:last').append('Choisissez une marque svp');

};


Excelcanal.prototype.enable_button_edit_delete = function(enabled){
	enabled ? $("#btn_edit").removeClass( "invisible" ) : $("#btn_edit").addClass( "invisible" );
	enabled ? $("#btn_delete").removeClass( "invisible" ) : $("#btn_delete").addClass( "invisible" );
};

Excelcanal.prototype.enable_retour_valider_button = function(enabled){
	enabled ? $("#valider_button").removeClass( "invisible" ) : $("#valider_button").addClass( "invisible" );
};

Excelcanal.prototype.enable_placement_button = function(enabled){
	enabled ? $("#placement_button").removeClass( "invisible" ) : $("#placement_button").addClass( "invisible" );
};

//suivant_buttonretour_buttonvalider_buttoncancel_edt_button

Excelcanal.prototype.fill_table_placement = function(){
	
	var returnvalue = "";
	
	$('#table_placement > tbody').empty();
	$('#table_placement > tbody:last').append('Chargement des données');
	var Ylistq = 0;
	Ylistq = $("#table_placement").parent().parent().offset().top;
	$("#table_placement >  tbody").css('max-height', $( window ).height() - Ylistq - 100);
	$('#table_placement > tbody').empty();
	$.each(_excelcanal.selected_genre_application, function(key_genre_appli, value_genre_appli){
		var url = _excelcanal.host+'/get_genre_application/'+value_genre_appli;
		$.getJSON( url,	function( data ) 
		{
			$.each(data, function(key, value){
				_excelcanal.fill_webradiobygenre(value.pk);
				$('#table_placement').append(
						'<tr class="clickable-row unread " id="' + value.pk + '">' +
							'<td style="width: 25%"><p style="font-weight:bold;">' + value.genre_name + '</p></td>' +
							'<td style="width: 20%; background: ' + value.color + ';"><p style="font-weight:bold; color:black">'+_excelcanal.checkifcolorisnull(value.color)+'</p></td>' +
							'<td style="width: 25%"><select name="id_avapres_webradio_' + value.pk + '" id="id_avapres_webradio_' + value.pk + '" required="required" style="width: 100%" class="js-example-responsive"><option value="">- </option><option value="0">Avant</option><option value="1">Après</option></select></td>' +
							'<td style="width: 30%"><select name="id_placement_webradio_' + value.pk + '" id="id_placement_webradio_' + value.pk + '" required="required" style="width: 100%" class="js-example-responsive"></select></td>' +
						'</tr>'
				);
				
				
			});
		});
	})
};


Excelcanal.prototype.checkifcolorisnull = function(color){
	if(color!=null){
		return color;
	}else{
		return "";
	}
};

Excelcanal.prototype.fill_table_placement_enable = function(enabled){
	
	var returnvalue = "";
	
	$('#table_placement > tbody').empty();
	$('#table_placement > tbody:last').append('Chargement des données');
	var Ylistq = 0;
	Ylistq = $("#table_placement").parent().parent().offset().top;
	$("#table_placement >  tbody").css('max-height', $( window ).height() - Ylistq - 100);
	$('#table_placement > tbody').empty();
	$.each(_excelcanal.selected_genre_application, function(key_genre_appli, value_genre_appli){
		var url = _excelcanal.host+'/get_genre_application/'+value_genre_appli;
		$.getJSON( url,	function( data ) 
		{
			$.each(data, function(key, value){
				_excelcanal.fill_webradiobygenre(value.pk);
				$('#table_placement').append(
						'<tr class="clickable-row unread " id="' + value.pk + '">' +
							'<td style="width: 25%"><p style="font-weight:bold;">' + value.genre_name + '</p></td>' +
							'<td style="width: 20%; background: ' + value.color + ';"><p style="font-weight:bold; color:black">' + _excelcanal.checkifcolorisnull(value.color) + '</p></td>' +
							(enabled ? '<td style="width: 25%"><select name="id_avapres_webradio_' + value.pk + '" id="id_avapres_webradio_' + value.pk + '" required="required" style="width: 100%" class="js-example-responsive"><option value="-1">- </option><option value="0">Avant</option><option value="1">Après</option></select></td>' : '<td style="width: 25%"><select disabled name="id_avapres_webradio_' + value.pk + '" id="id_avapres_webradio_' + value.pk + '" required="required" style="width: 100%" class="js-example-responsive"><option value="-1">- </option><option value="0">Avant</option><option value="1">Après</option></select></td>') +
							(enabled ? '<td style="width: 30%"><select name="id_placement_webradio_' + value.pk + '" id="id_placement_webradio_' + value.pk + '" required="required" style="width: 100%" class="js-example-responsive"></select></td>' : '<td style="width: 30%"><select disabled name="id_placement_webradio_' + value.pk + '" id="id_placement_webradio_' + value.pk + '" required="required" style="width: 100%" class="js-example-responsive"></select></td>' )+
						'</tr>'
				);
				
				
			});
		});
	})
};

Excelcanal.prototype.fill_webradiobygenre = function(id_genre_appli){
	var str = "<option value=''>- </option>";
	var brand = sessionStorage.val_sel_brand;	
	var country = sessionStorage.val_sel_country;
	var checkList_webradio = [];//On rajoute ici la webradio selectioné
	var checkList = [];
	
	
	
	$.getJSON( _excelcanal.host+'/get_all_webradios_by_genre/'+country+'/'+brand+'/'+id_genre_appli,
		function( data ) 
		{
			$.each(data, function(key, value){
				
				if(value.pk != _excelcanal._cur_excelcanal_pk){
					str += '<option value="'+value.pk+'">' + value.nom_wr + '</option>';
				}
				
			});
			$("#id_placement_webradio_"+id_genre_appli)
			.html(str);
			
			$("#id_placement_webradio_"+id_genre_appli).on("select2:select", function(e) { 
				if(e.params.data.text!=""){
					_excelcanal.selected_webradio_bygenre[id_genre_appli]=e.params.data.id;
				}
			});
			checkList_webradio = [];			
			checkList_webradio.push(_excelcanal.selected_webradio_bygenre[id_genre_appli]);
			$("#id_placement_webradio_"+id_genre_appli).select2({
				width: 'resolve' ,
				templateResult: function (data, container) {
				  return data.text;
				},
				templateSelection: function (data, container) {
				  return data.text;
				}
			}).val(checkList_webradio).trigger("change");
			
			
			
			$("#id_avapres_webradio_"+id_genre_appli).on("select2:select", function(e) { 
				if(e.params.data.text!=""){
					_excelcanal.selected_webradio_bygenre_avapres[id_genre_appli]=e.params.data.id;
				}
			});
			checkList = [];
			checkList.push(_excelcanal.selected_webradio_bygenre_avapres[id_genre_appli]);
			$("#id_avapres_webradio_"+id_genre_appli).select2({
				width: 'resolve' ,
				templateResult: function (data, container) {
				  return data.text;
				},
				templateSelection: function (data, container) {
				  return data.text;
				}
			}).val(checkList).trigger("change");
			
			
			/*if(_excelcanal.selected_webradio_bygenre[id_genre_appli] != null){
				$("#id_placement_webradio_"+id_genre_appli).val(_excelcanal.selected_webradio_bygenre[id_genre_appli]);
			}*/
		}
	);
};

Excelcanal.prototype.get_all_webradio = function(){
	
	var returnvalue = "";
	
	$('#liste_webradios_radio > tbody').empty();
	$('#liste_webradios_radio > tbody:last').append('Chargement des données');
	var Ylistq = 0;
	Ylistq = $("#liste_webradios_radio").offset().top;
	
	$("#liste_webradios_radio >  tbody").css('max-height', $( window ).height() - Ylistq );//- 250

	
	if(sessionStorage.val_sel_country==null){
		sessionStorage.val_sel_country = 1;
	}
	if(sessionStorage.val_sel_brand==null){
		sessionStorage.val_sel_brand = 1;
	}
	var brand = sessionStorage.val_sel_brand;	
	var country = sessionStorage.val_sel_country;
	
	var url = _excelcanal.host+'/get_all_webradios/'+country+'/'+brand;
	
	$.getJSON( url,	function( data ) 
	{
		
		$('#liste_webradios_radio > tbody').empty();
		_excelcanal.arraymarque = [];
		$('#liste_webradios_radio_text').text('Liste des webradios Online :');
		_excelcanal.arraymarque=data;
		$.each(_excelcanal.arraymarque, function(key, value){
			$('#liste_webradios_radio > tbody:last').append(
					'<tr class="clickable-row unread " id="' + value.pk + '">' +
						'<td><p style="font-weight:bold;">' + value.nom_wr + '</p></td>' +
					'</tr>'
			);
			
			
		});
	});
	
};








