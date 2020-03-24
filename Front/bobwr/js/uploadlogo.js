$(document).ready(function() {

	

    _uploadlogo = new Uploadlogo();
	_uploadlogo.id_user=sessionStorage.val_id_user;
	_uploadlogo.fill_country_sel();
	_uploadlogo.fill_brand_sel();
	_uploadlogo.fill_genre_application_sel();
	_uploadlogo.fill_genre_orange_sel();
	_uploadlogo.fill_genre_itunes_sel();
    
	
	
	
	$(document).keypress(
	  function(event){
	    if (event.which == '13') {
	      event.preventDefault();
	    }
	    if (event.which == '26') {
	      event.preventDefault();
	    }
	});
    
   
    _uploadlogo.get_all_webradio();
   
	$(".js-example-responsive").select2({
		width: 'resolve' // need to override the changed default
	});
	
	
	
	//var colors_genre_application = ["red", "blue", "green", "orange", "yellow"];
	var checkList = [];// [1, 3];//List show by default
	$("#genre_application_select").select2({
		width: 'resolve',
		templateSelection: function (data, container) {
		  var selection = $('#genre_application_select').select2('data');
		  var idx = selection.indexOf(data);
		  var url = _uploadlogo.host+'/get_genre_application/'+data.id;
			$.getJSON( url,	function( data_return ) 
			{
				$.each(data_return, function(key, value){
					$(container).css("background-color", value.color);
					$(container).css("color", "#fff");
				});
			});
		return data.text;
	}
	}).val(checkList);


	$("#genre_application_select").on("select2:select select2:unselect", function (evt) {
	var element = evt.params.data.element;
	var $element = $(element);

	$element.detach();
	$(this).append($element);
	$(this).trigger("change");
	});
	
	$('#genre_application_select').on("select2:select  select2:unselect", function(e) { 
		_uploadlogo.selected_genre_application=[];
		_uploadlogo.selected_genre_application=$('#genre_application_select').select2("val");
		_uploadlogo.fill_table_placement();
	});


	$("#id_logo_color").select2({
	width: 'resolve' ,
	templateResult: function (data, container) {
	  //var selection = $('#id_logo_color').select2('data');
	  $(container).css("background-color", data.text);
	  $(container).css("color", "#fff");
	  return data.text;
	},
	templateSelection: function (data, container) {
	  //var selection = $('#id_logo_color').select2('data');
	  $(container).css("background-color", data.text);
	  $(container).css("color", "#fff");
	  return data.text;
	}
	}).val(checkList).trigger("change");
	
	
	

	$("#liste_webradios_radio").delegate("tr", "click", function(e) {
		var checkList = [];
		_uploadlogo.selected_webradio_bygenre = [];
		_uploadlogo.selected_webradio_bygenre_avapres = [];
		
		if(_uploadlogo._mode == _uploadlogo._modes.indexOf('CREATE_WEBRADIO')  || _uploadlogo._mode == _uploadlogo._modes.indexOf('EDIT_WEBRADIO')){
			$('#erreur_container_modal').text("Une fiche est en cours de modification, veuillez annuler tout d'abord SVP!");
			$('#erreur_container_modal_modal').modal('show');
		}else{
			if(false == $(e.currentTarget).hasClass('clickable-row'))
			return;
			/*set item selection*/
			$('#liste_webradios_radio tr').each(function(){
				$(this).css('color', '#797979');
				$(this).css('font-weight', 'bold');
				$(this).removeClass("table-danger-wr");
			})
			$(e.currentTarget).addClass("table-danger-wr");
			$(e.currentTarget).css('color', 'white');
			$(e.currentTarget).css('font-weight', 'bold');
			_uploadlogo._cur_uploadlogo_pk = $(e.currentTarget).prop('id');
			_uploadlogo.reset_edit_form();
			$.getJSON( _uploadlogo.host+'/webradio/'+parseInt(_uploadlogo._cur_uploadlogo_pk),
				function( data ) 
				{
					_uploadlogo.enable_button_edit_delete(true);
					_uploadlogo._cur_uploadlogo_obj=data;
					
					$('#controle_date_valider').text("");
					
					var selectedgenrewr = [];
					/**/
					
					$.each(data.wrPlacement, function(key, value){
						checkList.push(value.id_genre_application);
						_uploadlogo.selected_webradio_bygenre[value.id_genre_application]=value.id_webradio_avantapres;
						_uploadlogo.selected_webradio_bygenre_avapres[value.id_genre_application]=value.avantapres;
					});
					
					$("#nom_webradio").val(data.nom_wr);
					$("#claim").val(data.claim);
					if(data.pub == true){
						$("#pub").val("true").trigger('change');
					}else if(data.pub == false){
						$("#pub").val("false").trigger('change');
					}else{
						$("#pub").val("").trigger('change');
					}
					
					$("#id_pressplay").val(data.id_pressplay);
					//$("#genre_application_select").val(data.genre_application_select);
					$("#genre_orange_select").val(data.id_orange_genre).trigger('change');
					
					$("#genre_itunes_select").val(data.id_itunes_genre).trigger('change');
					$('#date_debut').data("DateTimePicker").date(_uploadlogo.formatDateConvert(data.date_creation_request));
					$('#date_fin').data("DateTimePicker").date(_uploadlogo.formatDateConvert(data.date_deletion_request));
					
					$("#genre_application_select").select2({
						width: 'resolve',
						templateSelection: function (data, container) {
							var selection = $('#genre_application_select').select2('data');
							var idx = selection.indexOf(data);
							var url = _uploadlogo.host+'/get_genre_application/'+data.id;
							$.ajax(url, {
								timeout: 500,     // timeout milliseconds
								method: "GET",
								contentType: "application/json",
								async: false,
								success: function (data_return,status,xhr) {   // success callback function
								
									$.each(data_return, function(key, value){
										$(container).css("background-color", value.color);
										if(value.genre_name == 'Toutes les radios'){
											$(container).css("color", "#000000");
										}else{
											$(container).css("color", "#fff");
										}
										
									});
								},
								error: function (jqXhr, textStatus, errorMessage) { // error callback 
									
									
								}
							});
							return data.text;
						}
					}).val(checkList).trigger("change");
					
					
					$.getJSON( _uploadlogo.host+'/get_sous_genre_orange/'+parseInt(data.id_orange_genre),
						function( data_ssgenre ) 
						{
							str_ssgenre = "<option value=''>- </option>";
							$.each(data_ssgenre, function(key, value){
								str_ssgenre += '<option value="'+value.pk+'">' + value.subgenre_name + '</option>';
							});
							//$('#sous_genre_orange_select').empty().append('<option selected="selected" value="test">White</option>');
							$("#sous_genre_orange_select")
							.html(str_ssgenre)
							.on('change', function(){
								str_ssgenre
							});;
							$("#sous_genre_orange_select").val(data.id_orange_ssgenre).trigger('change');
						}
					);
					
					_uploadlogo.selected_genre_application = checkList;
					_uploadlogo.fill_table_placement_enable(false);
					_uploadlogo.fill_table_upload_logo(false);
					_uploadlogo.wr_created_by_wr = data.createdBy;
					_uploadlogo.wr_sysdate_created = data.sys_created_date;
				}
			);
			
			
			
			
					
			
		}
		
		
		
    	
	});

	$("#btn_new").click(function(){
		_uploadlogo.reset_edit_form();
		
		$('#liste_webradios_radio tr').each(function(){
			$(this).css('color', '#797979');
			$(this).css('font-weight', 'bold');
			$(this).removeClass("table-danger-wr");
		});
		_uploadlogo.enable_button_edit_delete(false);
		
		
		
		
		
		
		
		if(sessionStorage.val_sel_brand==null){
			sessionStorage.val_sel_brand = 1;
		}
		var country = sessionStorage.val_sel_country;
		if(_uploadlogo._mode == _uploadlogo._modes.indexOf('CREATE_WEBRADIO')  || _uploadlogo._mode == _uploadlogo._modes.indexOf('EDIT_WEBRADIO')){
			$('#erreur_container_modal').text("Une fiche est en cours de modification, veuillez annuler tout d'abord SVP!");
			$('#erreur_container_modal_modal').modal('show');
		}else{
			_uploadlogo._mode = _uploadlogo._modes.indexOf('CREATE_WEBRADIO');
			_uploadlogo._cur_uploadlogo_pk = 0;
			
			
			
			_uploadlogo.date_prochaine_dispo_canal= null;
			
			var url = _uploadlogo.host+'/get_first_canal_dispo/'+country;
			$.ajax({
			  url: url,
			  //dataType: 'json',
			  async: false,
			  success: function(data) {				  
				if(data != null){
					if(data.date_disponnible != null){
						_uploadlogo.date_prochaine_dispo_canal= data.date_disponnible;	
						
						
						$('#date_debut_modal').datetimepicker({
							format: 'DD/MM/YYYY'
						});
						$('#date_fin_modal').datetimepicker({
							useCurrent: false,
							format: 'DD/MM/YYYY'
						});
						
						var dateAujourdhui = new Date();
						dateAujourdhui.setDate(dateAujourdhui.getDate() + 2);
						
						
						
						
						//var dateTodayDebut = _uploadlogo.formatDateConvert(data.date_disponnible);
						var canalDebut = new Date(_uploadlogo.date_prochaine_dispo_canal);
						if(canalDebut<=dateAujourdhui){
							//$('#date_debut_modal').data("DateTimePicker").minDate(tomorrowDebut);
							
							var dateTodayDebut = new Date();
							var tomorrowDebut = new Date(dateTodayDebut);
							tomorrowDebut.setDate(tomorrowDebut.getDate() + 2);
							$('#date_debut_modal').data("DateTimePicker").minDate(tomorrowDebut);
							
							
							
							var dateTodayFin = new Date();
							var tomorrowFin = new Date(_uploadlogo.date_prochaine_dispo_canal);
							tomorrowFin.setDate(tomorrowFin.getDate() + 2);
							$('#date_fin_modal').data("DateTimePicker").minDate(tomorrowFin);
							
							
							
							
							$('#date_debut_modal').data("DateTimePicker").clear();
							$('#date_fin_modal').data("DateTimePicker").clear();
						
						
						
							$("#date_fin_modal").on("dp.change", function (e) {
								$('#date_debut_modal').data("DateTimePicker").maxDate(e.date);
							});
							
							
							$("#date_debut_modal").on("dp.change", function (e) {
								$('#date_fin_modal').data("DateTimePicker").minDate(e.date);
							});
							$('#date_range_modal').modal('show');
							
							
						}else{
							var dateTodayDebut = canalDebut;
							var tomorrowDebut = new Date(dateTodayDebut);
							tomorrowDebut.setDate(tomorrowDebut.getDate() + 1);
							$('#date_debut_modal').data("DateTimePicker").minDate(tomorrowDebut);
							
							
							
							var dateTodayFin = new Date();
							var tomorrowFin = new Date(canalDebut);
							tomorrowFin.setDate(tomorrowFin.getDate() + 1);
							$('#date_fin_modal').data("DateTimePicker").minDate(tomorrowFin);
							
							
							
							
							$('#date_debut_modal').data("DateTimePicker").clear();
							$('#date_fin_modal').data("DateTimePicker").clear();
						
						
						
							$("#date_fin_modal").on("dp.change", function (e) {
								$('#date_debut_modal').data("DateTimePicker").maxDate(e.date);
							});
							
							
							$("#date_debut_modal").on("dp.change", function (e) {
								$('#date_fin_modal').data("DateTimePicker").minDate(e.date);
							});
							$('#date_range_modal').modal('show');
							
							
							
							
						}
						
					}else{
						$('#erreur_container_modal').text("Il n'y a aucun canal de disponnible, Merci de supprimer une webradio pour libérer un canal");
						$('#erreur_container_modal_modal').modal('show');
						_uploadlogo._mode = -1;
					}
					
					
				}
			  }
			});
			
			
		}
		
		
		
		
		
	});
	
	
	
	
	$("#btn_edit").click(function(e){
		
		
		
		
		_uploadlogo.enable_allcheckbox(true);
		var country = sessionStorage.val_sel_country;
		if(_uploadlogo._mode == _uploadlogo._modes.indexOf('CREATE_WEBRADIO')  || _uploadlogo._mode == _uploadlogo._modes.indexOf('EDIT_WEBRADIO')){
			$('#erreur_container_modal').text("Une fiche est en cours de modification, veuillez cliquer sur annuler tout d'abord SVP!");
			$('#erreur_container_modal_modal').modal('show');
		}else{
			
			if(_uploadlogo.offline_checkboxval == 1){
				$('#erreur_container_modal').text("You canno't upload logo for offline webradios.");
				$('#erreur_container_modal_modal').modal('show');
				
					
			}else{
				_uploadlogo._mode = _uploadlogo._modes.indexOf('EDIT_WEBRADIO');
				_uploadlogo.enable_edit_form_ss_date(true);
				_uploadlogo.enable_edit_placement_form(false,_uploadlogo._cur_uploadlogo_pk);
				_uploadlogo.fill_table_placement_enable(false);
				_uploadlogo.fill_table_upload_logo(true);
				e.preventDefault();
				$('#nav_tabs a[href="#upload_logo"]').tab('show');
			}
			
			
		}
	});
	
	
	
	
	$("#date_range_modal_confirm").click(function(e){
		if($('#date_debut_modal').data("DateTimePicker").date() ==  null){
			$('#controle_date').text("La date début est obligatoire");
		}else{
			$('#controle_date').text("");
			
			
			
			
			$('#date_debut').data("DateTimePicker").date($('#date_debut_modal').data("DateTimePicker").date());
			$('#date_fin').data("DateTimePicker").date($('#date_fin_modal').data("DateTimePicker").date());
			var dateAujourdhui = new Date();
			dateAujourdhui.setDate(dateAujourdhui.getDate() + 2);
			
			
			var canalDebut = new Date(_uploadlogo.date_prochaine_dispo_canal);
			
			if(canalDebut<=dateAujourdhui){
							
				var dateTodayDebut = new Date();
				var tomorrowDebut = new Date(dateTodayDebut);
				tomorrowDebut.setDate(tomorrowDebut.getDate() + 2);
				$('#date_debut').data("DateTimePicker").minDate(tomorrowDebut);
				
				
				
				var dateTodayFin = new Date();
				var tomorrowFin = new Date(_uploadlogo.date_prochaine_dispo_canal);
				tomorrowFin.setDate(tomorrowFin.getDate() + 2);
				$('#date_fin').data("DateTimePicker").minDate(tomorrowFin);
				
				
			}else{
				var dateTodayDebut = canalDebut;
				var tomorrowDebut = new Date(dateTodayDebut);
				tomorrowDebut.setDate(tomorrowDebut.getDate() + 1);
				$('#date_debut').data("DateTimePicker").minDate(tomorrowDebut);
				
				
				
				var dateTodayFin = new Date();
				var tomorrowFin = new Date(canalDebut);
				tomorrowFin.setDate(tomorrowFin.getDate() + 1);
				$('#date_fin').data("DateTimePicker").minDate(tomorrowFin);
				
				
				
				
			}


			//_uploadlogo.enable_button_edit_delete(true);
			_uploadlogo.enable_edit_form(false);
			
			if(_uploadlogo._mode == _uploadlogo._modes.indexOf('EDIT_WEBRADIO')){
				_uploadlogo.enable_edit_placement_form(false,_uploadlogo._cur_uploadlogo_pk);
				_uploadlogo.fill_table_placement_enable(false);
				_uploadlogo.fill_table_upload_logo(true);
			}
			
			
			$('#date_range_modal').modal('hide');
			e.preventDefault();
			$('#nav_tabs a[href="#alphanum"]').tab('show');
		}
	});
	
	$('#nom_webradio').keyup(function(){
		$(this).val($(this).val().toUpperCase());
	});
	
	
	$("#suivant_button").click(function(e){
		
		
		if($('#date_debut').data("DateTimePicker").date() ==  null){
			$('#controle_date_suivant').text("La date début est obligatoire");
		}else{
			$('#controle_date_suivant').text("");
			e.preventDefault();
			$('#nav_tabs a[href="#placement"]').tab('show');
		}
		
		
		
	});
	$("#retour_button_pla").click(function(e){
		$('#controle_date_valider').text("");
		e.preventDefault();
		$('#nav_tabs a[href="#alphanum"]').tab('show');
	});
	
	$("#retour_button_upl").click(function(e){
		$('#controle_date_valider').text("");
		e.preventDefault();
		$('#nav_tabs a[href="#placement"]').tab('show');
	});
	
	$("#suivant_button_pla").click(function(e){
		$('#controle_date_valider').text("");
		e.preventDefault();
		$('#nav_tabs a[href="#upload_logo"]').tab('show');
	});
	
	$("#cancel_edt_button_upl").click(function(e){
		_uploadlogo.enable_button_edit_delete(false);
		_uploadlogo.enable_edit_form(false);
		_uploadlogo.reset_edit_form();
		e.preventDefault();
		$('#nav_tabs a[href="#alphanum"]').tab('show');
		_uploadlogo._mode = -1;
		
		
		
		
		$('#liste_webradios_radio tr').each(function(){
			$(this).css('color', '#797979');
			$(this).css('font-weight', 'bold');
			$(this).removeClass("table-danger-wr");
		});
	});
	
    $('#date_debut').datetimepicker({
		format: 'DD/MM/YYYY',
		//defaultDate:
	});
	$('#date_fin').datetimepicker({
		useCurrent: false,
		format: 'DD/MM/YYYY'
	});
	$("#date_debut").on("dp.change", function (e) {
		$('#date_fin').data("DateTimePicker").minDate(e.date);
	});
	$("#date_fin").on("dp.change", function (e) {
		$('#date_debut').data("DateTimePicker").maxDate(e.date);
	});
	
	$("#date_range_modal_annuler").click(function(e){
		$('#controle_date_valider').text("");
		e.preventDefault();
		$('#nav_tabs a[href="#alphanum"]').tab('show');
		
		_uploadlogo.enable_button_edit_delete(false);
		_uploadlogo.enable_edit_form(false);
		_uploadlogo.reset_edit_form();
		
		_uploadlogo._mode = -1;
	});
	
	
	$("#valider_button").click(function(e){
		//nom_webradioclaimpubid_pressplaygenre_application_selectgenre_orange_selectsous_genre_orange_selectgenre_itunes_selectdate_debutdate_fin
		var returnedvaluecheck = "";
		var nom_webradioval = "";
		var claimval = "";
		var pubval = "";
		var id_pressplayval = "";
		var genre_application_selectval ="";
		var genre_orange_selectval = "";
		var sous_genre_orange_selectval = "";
		var genre_itunes_selectval = "";
		var date_debutval = "";
		var date_finval = "";
		
		
		
		if($('#nom_webradio').val() == null || $('#nom_webradio').val() == ""){
			returnedvaluecheck = returnedvaluecheck + "- Le nom de la webradio est obligatoire ";
		}else{
			nom_webradioval = $('#nom_webradio').val();
		}
		if($('#claim').val() == null || $('#claim').val() == ""){
			returnedvaluecheck = returnedvaluecheck + "- Le claim est obligatoire ";
		}else{
			claimval = $('#claim').val();
		}
		if($('#pub').val() == null || $('#pub').val() == ""){
			returnedvaluecheck = returnedvaluecheck + "- La selection pub est obligatoire ";
		}else{
			pubval = $('#pub').val();
		}
		if($('#id_pressplay').val() == null || $('#id_pressplay').val() == ""){
			returnedvaluecheck = returnedvaluecheck + "- L'id Pressplay est obligatoire ";
		}else{
			id_pressplayval = $('#id_pressplay').val();
		}
		if($('#genre_application_select').val() == null || $('#genre_application_select').val() == ""){
			returnedvaluecheck = returnedvaluecheck + "- Le Genre Application est obligatoire ";
		}else{
			genre_application_selectval = $('#genre_application_select').val();
		}
		if($('#genre_orange_select').val() == null || $('#genre_orange_select').val() == ""){
			returnedvaluecheck = returnedvaluecheck + "- le Genre orange est obligatoire ";
		}else{
			genre_orange_selectval = $('#genre_orange_select').val();
		}
		if($('#sous_genre_orange_select').val() == null || $('#sous_genre_orange_select').val() == ""){
			returnedvaluecheck = returnedvaluecheck + "- le Sous genre orange est obligatoire ";
		}else{
			sous_genre_orange_selectval = $('#sous_genre_orange_select').val();
		}
		if($('#genre_itunes_select').val() == null || $('#genre_itunes_select').val() == ""){
			returnedvaluecheck = returnedvaluecheck + "- Le genre Itunes est obligatoire ";
		}else{
			genre_itunes_selectval = $('#genre_itunes_select').val();
		}
		if($('#date_debut').data("DateTimePicker").date() == null || $('#date_debut').data("DateTimePicker").date() == ""){
			returnedvaluecheck = returnedvaluecheck + "- La date de début est obligatoire ";
		}else{
			date_debutval = $('#date_debut').data("DateTimePicker").date();
		}
		
		date_finval = $('#date_fin').data("DateTimePicker").date();

		
		if(returnedvaluecheck!=""){			
			if(_uploadlogo._mode == _uploadlogo._modes.indexOf('CREATE_WEBRADIO') || _uploadlogo._mode == _uploadlogo._modes.indexOf('EDIT_WEBRADIO')){
				$('#controle_date_valider').text(returnedvaluecheck);
			}
			else {
				$('#controle_date_valider').text("Vous devez cliquer sur le bouton Créer pour continuer");
			}
		}else{
			$('#controle_date_valider').text("");
			var brand = sessionStorage.val_sel_brand;	
			var country = sessionStorage.val_sel_country;
			var data_wr = new Object();
			data_wr.nom_wr = nom_webradioval;
			data_wr.claim = claimval;
			data_wr.pub = pubval;
			data_wr.id_pressplay = id_pressplayval;
			data_wr.genre_application_select = genre_application_selectval;
			data_wr.id_orange_genre = genre_orange_selectval;
			data_wr.id_orange_ssgenre = sous_genre_orange_selectval;
			data_wr.id_itunes_genre = genre_itunes_selectval;
			data_wr.id_radio = brand;
			
			data_wr.id_country = country;
			if(_uploadlogo._mode == _uploadlogo._modes.indexOf('CREATE_WEBRADIO')){
				var fullDate = new Date();
				var twoDigitMonth = ((fullDate.getMonth().length+1) === 1)? (fullDate.getMonth()+1) : '0' + (fullDate.getMonth()+1);
				var currentDate = _uploadlogo.formatDateConvertTire(fullDate) ;
				
				data_wr.createdBy = "mbennani";
				data_wr.sys_created_date = currentDate;
				
				if(date_debutval !=  null){
					
					var twoDigitMonthdebut = ((date_debutval._d.getMonth().length+1) === 1)? (date_debutval._d.getMonth()+1) : '0' + (date_debutval._d.getMonth()+1);
					var currentDatedebut = _uploadlogo.formatDateConvertTire(date_debutval._d);
					
					data_wr.date_creation_request = currentDatedebut;
				}else{
					data_wr.date_creation_request = "";
				}
				if(date_finval !=  null){
					
					var twoDigitMonthfin = ((date_finval._d.getMonth().length+1) === 1)? (date_finval._d.getMonth()+1) : '0' + (date_finval._d.getMonth()+1);
					var currentDatefin = _uploadlogo.formatDateConvertTire(date_finval._d) ;
					
					data_wr.date_deletion_request = currentDatefin;
				}else{
					data_wr.date_deletion_request = "";
				}
				
				
				
			}
			else if(_uploadlogo._mode == _uploadlogo._modes.indexOf('EDIT_WEBRADIO')){
				
				var fullDate = new Date();
				var twoDigitMonth = ((fullDate.getMonth().length+1) === 1)? (fullDate.getMonth()+1) : '0' + (fullDate.getMonth()+1);
				var currentDate = _uploadlogo.formatDateConvertTire(fullDate) ;			
				
				data_wr.createdBy = _uploadlogo.wr_created_by_wr;
				data_wr.sys_created_date = _uploadlogo.wr_sysdate_created;
				data_wr.modifiedBy = "mbennani";
				data_wr.pk = _uploadlogo._cur_uploadlogo_pk;
				data_wr.sys_modified_date = currentDate;
				
				
				
				if(date_debutval._d !=  null){
					
					var twoDigitMonthdebut = ((date_debutval._d.getMonth().length+1) === 1)? (date_debutval._d.getMonth()+1) : '0' + (date_debutval._d.getMonth()+1);
					var currentDatedebut = _uploadlogo.formatDateConvertTire(date_debutval._d)  ;
					
					data_wr.date_creation_request = currentDatedebut;
				}else{
					data_wr.date_creation_request = "";
				}
				if(date_finval !=  null){
					
					var twoDigitMonthfin = ((date_finval._d.getMonth().length+1) === 1)? (date_finval._d.getMonth()+1) : '0' + (date_finval._d.getMonth()+1);
					var currentDatefin = _uploadlogo.formatDateConvertTire(date_finval._d) ;
					
					data_wr.date_deletion_request = currentDatefin;
				}else{
					data_wr.date_deletion_request = "";
				}
			}
			
			
			
			
			
			var isValid = true;
			var data_wr_placement_list = [];
			$.each(_uploadlogo.selected_genre_application, function(key_genre_appli, value_genre_appli){	
					var data_wr_placement = new Object();
					
					data_wr_placement.id_webradio = parseInt(_uploadlogo._cur_uploadlogo_pk);
					data_wr_placement.avantapres = $("#id_avapres_webradio_"+value_genre_appli).val();
					data_wr_placement.id_webradio_avantapres = $("#id_placement_webradio_"+value_genre_appli).val();
					data_wr_placement.id_genre_application = value_genre_appli;
					
					var form = $('#fileUploadForm_'+value_genre_appli)[0];
					var data_form = new FormData(form);
					if(form[0].files.length !=0){
						if(_uploadlogo.checkExtensionFileName(form[0].files[0].name)){
							$.ajax(_uploadlogo.host+'/webradioplacement_logo', {
								data: data_form,
								timeout: 500,     // timeout milliseconds
								type: "POST",
								enctype : 'multipart/form-data',
								contentType: false,//"multipart/form-data",
								cache : false,
								processData : false,
								async: false,
								success: function (data_wrinserted,status,xhr) {   // success callback function
									data_wr_placement.url_logo = data_wrinserted;
								},
								error: function (jqXhr, textStatus, errorMessage) { // error callback 
									data_wr_placement.url_logo = data_wrinserted;
								}
							});
							
						
						}else{
							alert("les formats autorisés sont : .eps,.EPS,.png,.PNG,.ai,.AI");
							isValid =  false;
							
						}
					}else{
						$.ajax(_uploadlogo.host+'/get_webradios_placement/'+parseInt(_uploadlogo._cur_uploadlogo_pk), {
							timeout: 500,     // timeout milliseconds
							method: "GET",
							contentType: "application/json",
							async: false,
							success: function (data_placement,status,xhr) {   // success callback function
								$.each(data_placement, function(key, value){
									if(value.id_genre_application == value_genre_appli){
										if(value.url_logo != null){
											var words = (value.url_logo).split('\\');
											data_wr_placement.url_logo = value.url_logo;
										}
										
									}
									
								});
								
							},
							error: function (jqXhr, textStatus, errorMessage) { // error callback 
								$.each(data_placement, function(key, value){
									if(value.id_genre_application == value_genre_appli){
										var words = (value.url_logo).split('\\');
										data_wr_placement.url_logo = value.url_logo;;
									}
									
								});
								
							}
						});
						
					}
					data_wr_placement_list.push(data_wr_placement);
				}
			);
			if(isValid){
				data_wr.wrPlacement=data_wr_placement_list;
				$.ajax(_uploadlogo.host+'/webradio_logo', {
					data: JSON.stringify(data_wr),
					timeout: 500,     // timeout milliseconds
					method: "POST",
					contentType: "application/json",
					async: false,
					success: function (webradio_logodata_wrinserted,status,xhr) {   // success callback function
						_uploadlogo.fill_brand_sel();
						_uploadlogo.fill_country_sel();
						_uploadlogo.fill_genre_application_sel();
						_uploadlogo.fill_genre_orange_sel();
						_uploadlogo.fill_genre_itunes_sel();		   
						_uploadlogo.get_all_webradio();
						
						
						
						_uploadlogo.enable_button_edit_delete(false);
						_uploadlogo.enable_edit_form(false);
						_uploadlogo.reset_edit_form();
						e.preventDefault();
						$('#nav_tabs a[href="#alphanum"]').tab('show');
						_uploadlogo._mode = -1;
						
						_uploadlogo.reset_edit_form_checkbox();
						
						
					},
					error: function (jqXhr, textStatus, errorMessage) { // error callback 
						
					}
				});
			}
				
			
			
			
			
			
			
			
		}
	});
	
	
	$("#cancel_edt_button_alpha").click(function(e){
		_uploadlogo.enable_button_edit_delete(false);
		_uploadlogo.enable_edit_form(false);
		_uploadlogo.reset_edit_form();
		e.preventDefault();
		$('#nav_tabs a[href="#alphanum"]').tab('show');
		_uploadlogo._mode = -1;
		
		
		
		
		$('#liste_webradios_radio tr').each(function(){
			$(this).css('color', '#797979');
			$(this).css('font-weight', 'bold');
			$(this).removeClass("table-danger-wr");
		});
	});
	$("#cancel_edt_button_pla").click(function(e){
		_uploadlogo.enable_button_edit_delete(false);
		_uploadlogo.enable_edit_form(false);
		_uploadlogo.reset_edit_form();
		e.preventDefault();
		$('#nav_tabs a[href="#alphanum"]').tab('show');
		_uploadlogo._mode = -1;
		
		
		
		
		$('#liste_webradios_radio tr').each(function(){
			$(this).css('color', '#797979');
			$(this).css('font-weight', 'bold');
			$(this).removeClass("table-danger-wr");
		});
	});
	
	$("#offline_checkbox").change(function() { 
		_uploadlogo.enable_button_edit_delete(false);
		_uploadlogo.enable_edit_form(false);
		_uploadlogo.reset_edit_form();
		if(_uploadlogo._mode == _uploadlogo._modes.indexOf('CREATE_WEBRADIO')  || _uploadlogo._mode == _uploadlogo._modes.indexOf('EDIT_WEBRADIO')){
			$('#erreur_container_modal').text("Une fiche est en cours de modification, veuillez cliquer sur annuler tout d'abord SVP!");
			$('#erreur_container_modal_modal').modal('show');
		}else{
			if($(this).prop("checked")) {
				_uploadlogo.offline_checkboxval = 1;
				$("#prochainementcheckboxlabel").text("");
				$("#prochainementcheckboxdiv").hide();
			}else{
				_uploadlogo.offline_checkboxval = -1;
				$("#prochainementcheckboxlabel").text("Prochaienement");
				$("#prochainementcheckboxdiv").show();
			}
			
			_uploadlogo.get_all_webradio_filtre();			
		}
	
		
		
		
	});
	$("#sanspubcheckbox").change(function() { 
	
		_uploadlogo.reset_edit_form();
		_uploadlogo.enable_button_edit_delete(false);
		_uploadlogo.enable_edit_form(false);
		if(_uploadlogo._mode == _uploadlogo._modes.indexOf('CREATE_WEBRADIO')  || _uploadlogo._mode == _uploadlogo._modes.indexOf('EDIT_WEBRADIO')){
			$('#erreur_container_modal').text("Une fiche est en cours de modification, veuillez cliquer sur annuler tout d'abord SVP!");
			$('#erreur_container_modal_modal').modal('show');
		}else{
			if($(this).prop("checked")) {
				_uploadlogo.sanspubcheckboxval = 1;
			}else{
				_uploadlogo.sanspubcheckboxval = -1;
			}
			_uploadlogo.get_all_webradio_filtre();
			
		}
	
		
	});
	$("#prochainementcheckbox").change(function() { 
	
	
		_uploadlogo.reset_edit_form();
		_uploadlogo.enable_button_edit_delete(false);
		_uploadlogo.enable_edit_form(false);
		if(_uploadlogo._mode == _uploadlogo._modes.indexOf('CREATE_WEBRADIO')  || _uploadlogo._mode == _uploadlogo._modes.indexOf('EDIT_WEBRADIO')){
			$('#erreur_container_modal').text("Une fiche est en cours de modification, veuillez cliquer sur annuler tout d'abord SVP!");
			$('#erreur_container_modal_modal').modal('show');
		}else{
			if($(this).prop("checked")) {
				_uploadlogo.prochainementcheckboxval = 1;
				$("#offline_checkboxlabel").text("");
				$("#offline_checkboxdiv").hide();
			}else{
				_uploadlogo.prochainementcheckboxval = -1;
				$("#offline_checkboxlabel").text("Offline");
				$("#offline_checkboxdiv").show();
			}
			_uploadlogo.get_all_webradio_filtre();
			
			
			
		}
		
		
	});
	
	
});




function Uploadlogo(){
	
	
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
	
	
	
	this.arraymarque = new Array();
	//this.host = "http://"+window.location.hostname+":8003";
	this.host = "http://localhost:8003";
	this._cur_uploadlogo_pk=-1;
	this._cur_uploadlogo_obj;
	this.selected_genre_application=[];
	this.selected_webradio_bygenre=[];
	this.selected_webradio_bygenre_avapres=[];
	this.date_debut_modal_val = "";
	this._modes = ['CREATE_WEBRADIO','EDIT_WEBRADIO'];
    
}


Uploadlogo.prototype.fill_brand_sel = function(){
	var str = "";
	
	$.getJSON( _uploadlogo.host+'/get_all_brand/'+parseInt(sessionStorage.val_sel_country),
		function( data ) 
		{
			$.each(data, function(key, value){
				if((_uploadlogo.array_brand).indexOf(""+value.id)!=-1){
					str += '<option value="'+value.id+'" >' + value.name.toUpperCase() + '</option>';
				}
			});
			$("#sel_brand")
			.html(str)
			.on('change', function(){
				sessionStorage.val_sel_brand = this.value;
				_uploadlogo.get_all_webradio();
				_uploadlogo.reset_edit_form();
				_uploadlogo.fill_genre_application_sel();
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





Uploadlogo.prototype.fill_country_sel = function(){
	
	var acl = "";
	var arr_acl = "";
	var str_bob_brand = "";
	var arr_bob_brand = [];
	var str_brand = "";
	
	_uploadlogo.array_country = [];
	_uploadlogo.array_brand = [];
	
	$.getJSON( _uploadlogo.host+'/get_all_acl/'+parseInt(_uploadlogo.id_user),
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
						_uploadlogo.array_brand = str_brand.split(',');
					}
				})
				
				var str = "";
	
				$.getJSON( _uploadlogo.host+'/get_all_country/'+str_brand,
					function( data ) 
					{
						$.each(data, function(key, value){
							_uploadlogo.array_country.push(value.id);
							str += '<option value="'+value.id+'">' + value.name.toUpperCase() + '</option>';
						});
						$("#sel_country")
						.html(str)
						.on('change', function(){
							sessionStorage.val_sel_country = this.value;
							sessionStorage.val_sel_brand = -1;
							_uploadlogo.fill_brand_sel();
							_uploadlogo.reset_edit_form();
							_uploadlogo.reset_all_webradio();
						});
						$("#sel_country").val(data[0].id);
						sessionStorage.val_sel_country = data[0].id;
						_uploadlogo.fill_brand_sel();
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



Uploadlogo.prototype.formatDateConvert = function(date) {
     var d = new Date(date),
         month = '' + (d.getMonth() + 1),
         day = '' + d.getDate(),
         year = d.getFullYear();

     if (month.length < 2) month = '0' + month;
     if (day.length < 2) day = '0' + day;

     return [day,month,year].join('/');
};


Uploadlogo.prototype.formatDateConvertTire = function(date) {
     var d = new Date(date),
         month = '' + (d.getMonth() + 1),
         day = '' + d.getDate(),
         year = d.getFullYear();

     if (month.length < 2) month = '0' + month;
     if (day.length < 2) day = '0' + day;

     return year+"-"+month+"-"+day+"T23:59:59";
};




Uploadlogo.prototype.enable_edit_form = function(enabled){
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
	enabled ? $("#cancel_edt_button_upl").removeClass( "invisible" ) : $("#cancel_edt_button_upl").addClass( "invisible" );
	enabled ? $("#retour_button_upl").removeClass( "invisible" ) : $("#retour_button_upl").addClass( "invisible" );
	enabled ? $("#retour_button_pla").removeClass( "invisible" ) : $("#retour_button_pla").addClass( "invisible" );
	enabled ? $("#suivant_button_pla").removeClass( "invisible" ) : $("#suivant_button_pla").addClass( "invisible" );
	enabled ? $("#valider_button").removeClass( "invisible" ) : $("#valider_button").addClass( "invisible" );
};


Uploadlogo.prototype.enable_edit_form_ss_date = function(enabled){
	$('#controle_date_valider').text("");
	
	enabled ? $("#suivant_button").removeClass( "invisible" ) : $("#suivant_button").addClass( "invisible" );
	enabled ? $("#cancel_edt_button_pla").removeClass( "invisible" ) : $("#cancel_edt_button_pla").addClass( "invisible" );
	enabled ? $("#cancel_edt_button_alpha").removeClass( "invisible" ) : $("#cancel_edt_button_alpha").addClass( "invisible" );
	enabled ? $("#cancel_edt_button_upl").removeClass( "invisible" ) : $("#cancel_edt_button_upl").addClass( "invisible" );
	enabled ? $("#retour_button_upl").removeClass( "invisible" ) : $("#retour_button_upl").addClass( "invisible" );
	enabled ? $("#retour_button_pla").removeClass( "invisible" ) : $("#retour_button_pla").addClass( "invisible" );
	enabled ? $("#suivant_button_pla").removeClass( "invisible" ) : $("#suivant_button_pla").addClass( "invisible" );
	enabled ? $("#valider_button").removeClass( "invisible" ) : $("#valider_button").addClass( "invisible" );
};



Uploadlogo.prototype.enable_edit_placement_form = function(enabled,pk_wr){
	enabled ? $("#id_avapres_webradio_"+pk_wr).removeAttr( "disabled" ) : $("#id_avapres_webradio_"+pk_wr).attr( "disabled", true );
	enabled ? $("#id_placement_webradio_"+pk_wr).removeAttr( "disabled" ) : $("#id_placement_webradio_"+pk_wr).attr( "disabled", true );
};



Uploadlogo.prototype.enable_sanspub_prochainement = function(enabled){
	enabled ? $("#sanspubcheckboxdiv").show() : $("#sanspubcheckboxdiv").hide();
	enabled ? $("#prochainementcheckboxdiv").show() : $("#prochainementcheckboxdiv").hide();

	!enabled ? $("#offline_checkboxdiv").show() : $("#offline_checkboxdiv").hide();
};

Uploadlogo.prototype.enable_offline_sanspub = function(enabled){
	enabled ? $("#offline_checkboxdiv").show() : $("#offline_checkboxdiv").hide();
	enabled ? $("#sanspubcheckboxdiv").show() : $("#sanspubcheckboxdiv").hide();
	
	!enabled ? $("#prochainementcheckboxdiv").show() : $("#prochainementcheckboxdiv").hide();
};

Uploadlogo.prototype.enable_allcheckbox = function(enabled){
	enabled ? $("#sanspubcheckbox").removeAttr( "disabled" ) : $("#sanspubcheckbox").attr( "disabled", true );
	enabled ? $("#prochainementcheckbox").removeAttr( "disabled" ) : $("#prochainementcheckbox").attr( "disabled", true );
	enabled ? $("#offline_checkbox").removeAttr( "disabled" ) : $("#offline_checkbox").attr( "disabled", true );
};




Uploadlogo.prototype.reset_edit_form = function(){
	$('#controle_date_valider').text("");
	_uploadlogo.selected_webradio_bygenre_avapres=[];
	_uploadlogo.selected_webradio_bygenre=[];
	$('#table_placement > tbody').empty();
	$('#table_upload_logo > tbody').empty();
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
	_uploadlogo.wr_created_by_wr =  "";
	
};

Uploadlogo.prototype.reset_edit_form_checkbox = function(){
	document.location.reload(true);
	
};


Uploadlogo.prototype.fill_genre_application_sel = function(){
	var str = "";
	var brand = sessionStorage.val_sel_brand;	
	var country = sessionStorage.val_sel_country;
	$.getJSON( _uploadlogo.host+'/get_genre_application/'+country+'/'+brand,
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

Uploadlogo.prototype.fill_genre_orange_sel = function(){
	var str = "<option value=''>- </option>";
	var str_ssgenre = "<option value=''>- </option>";
	var brand = sessionStorage.val_sel_brand;	
	var country = sessionStorage.val_sel_country;
	$.getJSON( _uploadlogo.host+'/get_genre_orange',
		function( data ) 
		{
			$.each(data, function(key, value){
				str += '<option value="'+value.id+'">' + value.genre_name + '</option>';
			});
			$("#genre_orange_select")
			.html(str)
			.on('change', function(){
				if(this.value != ""){
					$.getJSON( _uploadlogo.host+'/get_sous_genre_orange/'+parseInt(this.value),
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

Uploadlogo.prototype.fill_genre_itunes_sel = function(){
	var str = "<option value=''>- </option>";
	$.getJSON( _uploadlogo.host+'/get_genre_itunes',
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


Uploadlogo.prototype.get_brand_sel = function(){
	if (sessionStorage.val_sel_brand) {
		sessionStorage.val_sel_brand
		return sessionStorage.val_sel_brand;
	} else{
		sessionStorage.val_sel_brand = $("#sel_brand option:selected").val();
    	return $("#sel_brand option:selected").val();
    }
};

Uploadlogo.prototype.get_country_sel = function(){
	if (sessionStorage.val_sel_country) {
		sessionStorage.val_sel_country
		return sessionStorage.val_sel_country;
	} else{
		sessionStorage.val_sel_country = $("#sel_country option:selected").val();
    	return $("#sel_country option:selected").val();
    }
};



Uploadlogo.prototype.reset_all_webradio = function(){
	$('#liste_webradios_radio > tbody').empty();
	$('#liste_webradios_radio > tbody:last').append('Choisissez une marque svp');

};


Uploadlogo.prototype.enable_button_edit_delete = function(enabled){
	enabled ? $("#btn_edit").removeClass( "invisible" ) : $("#btn_edit").addClass( "invisible" );
	enabled ? $("#btn_delete").removeClass( "invisible" ) : $("#btn_delete").addClass( "invisible" );
};

Uploadlogo.prototype.enable_retour_valider_button = function(enabled){
	enabled ? $("#valider_button").removeClass( "invisible" ) : $("#valider_button").addClass( "invisible" );
};

Uploadlogo.prototype.enable_placement_button = function(enabled){
	enabled ? $("#placement_button").removeClass( "invisible" ) : $("#placement_button").addClass( "invisible" );
};


Uploadlogo.prototype.checkExtensionFileName = function(file_name){
	var arr_file_name = file_name.split('.');
	
	var acceptedArray = ["eps","EPS","png","PNG","ai","AI"]
	if(acceptedArray.indexOf(arr_file_name[1]) == -1){
		return false;
	}else{
		return true;
	}
	
};

//suivant_buttonretour_buttonvalider_buttoncancel_edt_button

Uploadlogo.prototype.fill_table_placement = function(){
	
	var returnvalue = "";
	
	$('#table_placement > tbody').empty();
	$('#table_placement > tbody:last').append('Chargement des données');
	var Ylistq = 0;
	Ylistq = $("#table_placement").parent().parent().offset().top;
	$("#table_placement >  tbody").css('max-height', $( window ).height() - Ylistq - 100);
	$('#table_placement > tbody').empty();
	$.each(_uploadlogo.selected_genre_application, function(key_genre_appli, value_genre_appli){
		var url = _uploadlogo.host+'/get_genre_application/'+value_genre_appli;
		$.getJSON( url,	function( data ) 
		{
			$.each(data, function(key, value){
				_uploadlogo.fill_webradiobygenre(value.pk);
				$('#table_placement').append(
						'<tr class="clickable-row unread " id="' + value.pk + '">' +
							'<td style="width: 25%"><p style="font-weight:bold;">' + value.genre_name + '</p></td>' +
							'<td style="width: 20%; background: ' + value.color + ';"><p style="font-weight:bold; color:black">' + _uploadlogo.checkifcolorisnull(value.color) + '</p></td>' +
							'<td style="width: 25%"><select name="id_avapres_webradio_' + value.pk + '" id="id_avapres_webradio_' + value.pk + '" required="required" style="width: 100%" class="js-example-responsive"><option value="">- </option><option value="0">Avant</option><option value="1">Après</option></select></td>' +
							'<td style="width: 30%"><select name="id_placement_webradio_' + value.pk + '" id="id_placement_webradio_' + value.pk + '" required="required" style="width: 100%" class="js-example-responsive"></select></td>' +
						'</tr>'
				);
				
				
			});
		});
	})
};


Uploadlogo.prototype.fill_table_upload_logo = function(enabled){
	
	var returnvalue = "";
	
	$('#table_upload_logo > tbody').empty();
	$('#table_upload_logo > tbody:last').append('Chargement des données');
	var Ylistq = 0;
	Ylistq = $("#table_upload_logo").parent().parent().offset().top;
	$("#table_upload_logo >  tbody").css('max-height', $( window ).height() - Ylistq - 800);
	$('#table_upload_logo > tbody').empty();
	$.each(_uploadlogo.selected_genre_application, function(key_genre_appli, value_genre_appli){
		var url = _uploadlogo.host+'/get_genre_application/'+value_genre_appli;
		
		$.ajax(url, {
			timeout: 500,     // timeout milliseconds
			method: "GET",
			contentType: "application/json",
			async: false,
			success: function (data,status,xhr) {   // success callback function
				$.each(data, function(key, value){
					_uploadlogo.fill_webradiobygenre(value.pk);

					$('#table_upload_logo').append(
							'<tr class="clickable-row unread " id="' + value.pk + '">' +
								'<td style="width: 25%"><p style="font-weight:bold;">' + value.genre_name + '</p></td>' +
								'<td style="width: 20%; background: ' + value.color + ';"><p style="font-weight:bold; color:black">' + _uploadlogo.checkifcolorisnull(value.color) + '</p></td>' +
								'<td style="width: 55%">'+
									(enabled ? 
									'<div class="controls col-md-9">' +
										'<div class="fileupload fileupload-new" data-provides="fileupload">' +
										  '<form method="POST" id="fileUploadForm_' + value.pk + '">'+
											  '<span class="btn btn-theme02 btn-file">' +
												'<span class="fileupload-new"><i class="fa fa-paperclip"></i> Select file</span>' +
											  '<span class="fileupload-exists"><i class="fa fa-undo"></i> Change</span>' +
											  '<input type="file" class="default" name="id_logo_webradio" id="id_logo_webradio_' + value.pk + '" accept=".eps,.EPS,.png,.PNG,.ai,.AI"/>' +
											  '</span>' +
											  '<a class="btn btn-info hidden" id="id_a_webradio_' + value.pk + '" style="margin-left:5px;" download>' +
												
											  '</a>' +'<span class="fileupload-preview" id="id_span_webradio_' + value.pk + '" style="margin-left:5px;"></span>'+
										   '</form>'+
										'</div>' +
									'</div>'
									:'<div class="controls col-md-9">' +
										'<div class="fileupload fileupload-new" data-provides="fileupload">' +
											'<form method="POST" id="fileUploadForm_' + value.pk + '">'+
											  '<span class="btn btn-theme02 btn-file">' +
												'<span class="fileupload-new"><i disabled class="fa fa-paperclip"></i> Select file</span>' +
											  '<span class="fileupload-exists"><i disabled class="fa fa-undo"></i> Change</span>' +
											  '<input disabled type="file" class="default" id="id_logo_webradio_' + value.pk + '" accept=".eps,.EPS,.png,.PNG,.ai,.AI"/>' +
											  '</span>' +
											  
											  '</span>' +'<a class="btn btn-info hidden" id="id_a_webradio_' + value.pk + '" style="margin-left:5px;" download>' +
												
											  '</a>' +'<span class="fileupload-preview" id="id_span_webradio_' + value.pk + '" style="margin-left:5px;"></span>'+
											'</form>'+
										'</div>' +
									'</div>')+
								'</td>' +
								//(enabled ? '<td style="width: 25%"><select name="id_avapres_webradio_' + value.pk + '" id="id_avapres_webradio_' + value.pk + '" required="required" style="width: 100%" class="js-example-responsive"><option value="">- </option><option value="0">Avant</option><option value="1">Après</option></select></td>' 
								//:'<td style="width: 25%"><select disabled name="id_avapres_webradio_' + value.pk + '" id="id_avapres_webradio_' + value.pk + '" required="required" style="width: 100%" class="js-example-responsive"><option value="0">Avant</option><option value="1">Après</option></select></td>') +
							'</tr>'
					);
					
					
				});
				
			},
			error: function (jqXhr, textStatus, errorMessage) { // error callback 
				
				
			}
		});
		
		
		
		
		
		
		
		
	})
};


Uploadlogo.prototype.fill_table_placement_enable = function(enabled){
	
	var returnvalue = "";
	
	$('#table_placement > tbody').empty();
	$('#table_placement > tbody:last').append('Chargement des données');
	var Ylistq = 0;
	Ylistq = $("#table_placement").parent().parent().offset().top;
	$("#table_placement >  tbody").css('max-height', $( window ).height() - Ylistq - 100);
	$('#table_placement > tbody').empty();
	$.each(_uploadlogo.selected_genre_application, function(key_genre_appli, value_genre_appli){
		var url = _uploadlogo.host+'/get_genre_application/'+value_genre_appli;
		$.getJSON( url,	function( data ) 
		{
			$.each(data, function(key, value){
				_uploadlogo.fill_webradiobygenre(value.pk);
				$('#table_placement').append(
						'<tr class="clickable-row unread " id="' + value.pk + '">' +
							'<form method="POST" id="dataUploadForm_' + value.pk + '">'+
								'<td style="width: 25%"><p style="font-weight:bold;">' + value.genre_name + '</p></td>' +
								'<td style="width: 20%; background: ' + value.color + ';"><p style="font-weight:bold; color:black">' + _uploadlogo.checkifcolorisnull(value.color) + '</p></td>' +
								(enabled ? '<td style="width: 25%"><select name="id_avapres_webradio_' + value.pk + '" id="id_avapres_webradio_' + value.pk + '" required="required" style="width: 100%" class="js-example-responsive"><option value="">- </option><option value="0">Avant</option><option value="1">Après</option></select></td>' : '<td style="width: 25%"><select disabled name="id_avapres_webradio_' + value.pk + '" id="id_avapres_webradio_' + value.pk + '" required="required" style="width: 100%" class="js-example-responsive"><option value="0">Avant</option><option value="1">Après</option></select></td>') +
								(enabled ? '<td style="width: 30%"><select name="id_placement_webradio_' + value.pk + '" id="id_placement_webradio_' + value.pk + '" required="required" style="width: 100%" class="js-example-responsive"></select></td>' : '<td style="width: 30%"><select disabled name="id_placement_webradio_' + value.pk + '" id="id_placement_webradio_' + value.pk + '" required="required" style="width: 100%" class="js-example-responsive"></select></td>' )+
							'</form>'+
						'</tr>'
				);
				
				
			});
		});
	})
};

Uploadlogo.prototype.fill_webradiobygenre = function(id_genre_appli){
	var str = "<option value=''>- </option>";
	var brand = sessionStorage.val_sel_brand;	
	var country = sessionStorage.val_sel_country;
	var checkList_webradio = [];//On rajoute ici la webradio selectioné
	var checkList = [];
	
	
	
	$.getJSON( _uploadlogo.host+'/get_all_webradios_by_genre/'+country+'/'+brand+'/'+id_genre_appli,
		function( data ) 
		{
			$.each(data, function(key, value){
				
				if(value.pk != _uploadlogo._cur_uploadlogo_pk){
					str += '<option value="'+value.pk+'">' + value.nom_wr + '</option>';
				}
				
			});
			$("#id_placement_webradio_"+id_genre_appli)
			.html(str);
			
			
			
			$("#id_placement_webradio_"+id_genre_appli).on("select2:select", function(e) { 
				if(e.params.data.text!=""){
					_uploadlogo.selected_webradio_bygenre[id_genre_appli]=e.params.data.id;
				}
			});
			checkList_webradio = []
			checkList_webradio.push(_uploadlogo.selected_webradio_bygenre[id_genre_appli]);
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
					_uploadlogo.selected_webradio_bygenre_avapres[id_genre_appli]=e.params.data.id;
				}
			});
			checkList = []
			checkList.push(_uploadlogo.selected_webradio_bygenre_avapres[id_genre_appli]);
			$("#id_avapres_webradio_"+id_genre_appli).select2({
				width: 'resolve' ,
				templateResult: function (data, container) {
				  return data.text;
				},
				templateSelection: function (data, container) {
				  return data.text;
				}
			}).val(checkList).trigger("change");
			
			$.ajax(_uploadlogo.host+'/get_webradios_placement/'+parseInt(_uploadlogo._cur_uploadlogo_pk), {
				timeout: 500,     // timeout milliseconds
				method: "GET",
				contentType: "application/json",
				async: false,
				success: function (data_placement,status,xhr) {   // success callback function
					$.each(data_placement, function(key, value){
						if(value.url_logo != null){
							var words = (value.url_logo).split('\\');
							//$("#id_logo_webradio_"+value.id_genre_application).attr('src', 'logo_webradio/'+words[words.length-1])
							
							if(words.length != 0){
								$("#id_span_webradio_" + value.id_genre_application ).html(words[words.length-1]);
								$("#id_a_webradio_" + value.id_genre_application ).attr("href", "logo_webradio/"+words[words.length-1]);
								$("#id_a_webradio_" + value.id_genre_application ).text("Telecharger "+words[words.length-1]);
								$("#id_a_webradio_"+ value.id_genre_application).removeClass( "hidden" );
							}else{
								$("#id_a_webradio_"+ value.id_genre_application).addClass( "hidden" )
							}
							
						}
						
					});
					
				},
				error: function (jqXhr, textStatus, errorMessage) { // error callback 
					
					
				}
			});
			/*if(_uploadlogo.selected_webradio_bygenre[id_genre_appli] != null){
				$("#id_placement_webradio_"+id_genre_appli).val(_uploadlogo.selected_webradio_bygenre[id_genre_appli]);
			}*/
			
			//url_logo
			//id_logo_webradio_
		}
	);
};


Uploadlogo.prototype.checkifcolorisnull = function(color){
	if(color!=null){
		return color;
	}else{
		return "";
	}
};


Uploadlogo.prototype.get_all_webradio = function(){
	
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
	
	var url = _uploadlogo.host+'/get_all_webradios/'+country+'/'+brand;
	
	$.getJSON( url,	function( data ) 
	{
		
		$('#liste_webradios_radio > tbody').empty();
		_uploadlogo.arraymarque = [];
		
		_uploadlogo.arraymarque=data;
		$.each(_uploadlogo.arraymarque, function(key, value){
			$('#liste_webradios_radio > tbody:last').append(
					'<tr class="clickable-row unread " id="' + value.pk + '">' +
						'<td><p style="font-weight:bold;">' + value.nom_wr + '</p></td>' +
					'</tr>'
			);
			
			
		});
	});
	
};








Uploadlogo.prototype.get_all_webradio_filtre = function(){
	
	var returnvalue = "";
	
	$('#liste_webradios_radio > tbody').empty();
	$('#liste_webradios_radio > tbody:last').append('Chargement des données');
	var Ylistq = 0;
	Ylistq = $("#liste_webradios_radio").parent().parent().offset().top;
	
	$("#liste_webradios_radio >  tbody").css('max-height', $( window ).height() - Ylistq - 100);
	
	if(sessionStorage.val_sel_country==null){
		sessionStorage.val_sel_country = 1;
	}
	if(sessionStorage.val_sel_brand==null){
		sessionStorage.val_sel_brand = 1;
	}
	var brand = sessionStorage.val_sel_brand;	
	var country = sessionStorage.val_sel_country;
	
	var url = "";
	
	
	if(_uploadlogo.offline_checkboxval == 1 || _uploadlogo.prochainementcheckboxval == 1 || _uploadlogo.sanspubcheckboxval == 1){
		$('#liste_webradios_radio > tbody').empty();
		_uploadlogo.arraymarque = [];
		_uploadlogo.array_wr_liste_webradios_radio = [];
	}else{
		_uploadlogo.get_all_webradio();
	}
	
	
	
	if(_uploadlogo.offline_checkboxval == 1){
		url = _uploadlogo.host+'/get_all_webradios_inactive/'+country+'/'+brand;
		$('#liste_webradios_radio tr').each(function(){
			_uploadlogo.array_wr_liste_webradios_radio.push($(this).attr("id"));
		});
		
		
		
		$.ajax({
		  url: url,
		  //dataType: 'json',
		  async: false,
		  success: function(data) {
			$.each(data, function(key, value){
				_uploadlogo.arraymarque.push(value);
			})
			
			
			$.each(_uploadlogo.arraymarque, function(key, value){
				if(_uploadlogo.array_wr_liste_webradios_radio.indexOf(value.pk) == -1){
					
					$('#liste_webradios_radio > tbody:last').append(
						'<tr class="clickable-row unread " id="' + value.pk + '">' +
							'<td><p style="font-weight:bold;">' + value.nom_wr + '</p></td>' +
						'</tr>'
					);
				}
				
				
			});	
		  }
		});
	}
	
	if(_uploadlogo.sanspubcheckboxval == 1){
		
		url = _uploadlogo.host+'/get_all_webradios_sanspub/'+country+'/'+brand;
		$('#liste_webradios_radio tr').each(function(){
			_uploadlogo.array_wr_liste_webradios_radio.push($(this).attr("id"));
		});
		$.ajax({
		  url: url,
		  //dataType: 'json',
		  async: false,
		  success: function(data) {
			$.each(data, function(key, value){
				_uploadlogo.arraymarque.push(value);
			})
			
			
			$.each(_uploadlogo.arraymarque, function(key, value){
				if(_uploadlogo.array_wr_liste_webradios_radio.indexOf(value.pk) == -1){
					
					$('#liste_webradios_radio > tbody:last').append(
						'<tr class="clickable-row unread " id="' + value.pk + '">' +
							'<td><p style="font-weight:bold;">' + value.nom_wr + '</p></td>' +
						'</tr>'
					);
				}
				
				
			});	
		  }
		});
	}
	
	if(_uploadlogo.prochainementcheckboxval == 1){
		
		
		
		url = _uploadlogo.host+'/get_all_webradios_prochainement/'+country+'/'+brand;
		$('#liste_webradios_radio tr').each(function(){
			_uploadlogo.array_wr_liste_webradios_radio.push($(this).attr("id"));
		});
		$.ajax({
		  url: url,
		  //dataType: 'json',
		  async: false,
		  success: function(data) {
			$.each(data, function(key, value){
				_uploadlogo.arraymarque.push(value);
			})
			
			
			$.each(_uploadlogo.arraymarque, function(key, value){
				if(_uploadlogo.array_wr_liste_webradios_radio.indexOf(value.pk) == -1){
					
					$('#liste_webradios_radio > tbody:last').append(
						'<tr class="clickable-row unread " id="' + value.pk + '">' +
							'<td><p style="font-weight:bold;">' + value.nom_wr + '</p></td>' +
						'</tr>'
					);
				}
				
				
			});	
		  }
		});
	}
	
	if(_uploadlogo.offline_checkboxval == 1 && _uploadlogo.sanspubcheckboxval == 1){
		_uploadlogo.arraymarque = [];
		$('#liste_webradios_radio > tbody').empty();
		url = _uploadlogo.host+'/get_all_webradios_inactive_sanspub/'+country+'/'+brand;
	
		$.ajax({
		  url: url,
		  //dataType: 'json',
		  async: false,
		  success: function(data) {
			$.each(data, function(key, value){
				_uploadlogo.arraymarque.push(value);
			})
			
			
			$.each(_uploadlogo.arraymarque, function(key, value){
				if(_uploadlogo.array_wr_liste_webradios_radio.indexOf(value.pk) == -1){
					
					$('#liste_webradios_radio > tbody:last').append(
						'<tr class="clickable-row unread " id="' + value.pk + '">' +
							'<td><p style="font-weight:bold;">' + value.nom_wr + '</p></td>' +
						'</tr>'
					);
				}
				
				
			});	
		  }
		});
	}
	
	if(_uploadlogo.prochainementcheckboxval == 1 && _uploadlogo.sanspubcheckboxval == 1){
		_uploadlogo.arraymarque = [];
		$('#liste_webradios_radio > tbody').empty();
		url = _uploadlogo.host+'/get_all_webradios_sanspub_prochainement/'+country+'/'+brand;
	
		$.ajax({
		  url: url,
		  //dataType: 'json',
		  async: false,
		  success: function(data) {
			$.each(data, function(key, value){
				_uploadlogo.arraymarque.push(value);
			})
			
			
			$.each(_uploadlogo.arraymarque, function(key, value){
				if(_uploadlogo.array_wr_liste_webradios_radio.indexOf(value.pk) == -1){
					
					$('#liste_webradios_radio > tbody:last').append(
						'<tr class="clickable-row unread " id="' + value.pk + '">' +
							'<td><p style="font-weight:bold;">' + value.nom_wr + '</p></td>' +
						'</tr>'
					);
				}
				
				
			});	
		  }
		});
	}
	//get_all_webradios_inactiveget_all_webradios_sanspubget_all_webradios_prochainementget_all_webradios_inactive_sanspubget_all_webradios_sanspub_prochainement
	
	
	
	
	
	
	
	
	
	
	
};