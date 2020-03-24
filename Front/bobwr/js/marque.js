$(document).ready(function() {

	

    _marque = new Marque();
	_marque.id_user=sessionStorage.val_id_user;
	_marque.fill_country_sel();
	_marque.fill_brand_sel();
	_marque.fill_genre_application_sel();
	_marque.fill_genre_orange_sel();
	_marque.fill_genre_itunes_sel();
	_marque.get_all_webradio_highlited();
    
	
	
	
	$(document).keypress(
	  function(event){
	    if (event.which == '13') {
	      event.preventDefault();
	    }
	    if (event.which == '26') {
	      event.preventDefault();
	    }
	});
    
   
    _marque.get_all_webradio();
   
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
			  var url = _marque.host+'/get_genre_application/'+data.id;
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
		_marque.selected_genre_application=[];
		_marque.selected_genre_application=$('#genre_application_select').select2("val");
		_marque.fill_table_placement();
	});



	

	$('#highlited_webradio1').on("select2:select", function(e) {
		var brand = sessionStorage.val_sel_brand;	
		var country = sessionStorage.val_sel_country;
		_marque.list_highlited_webradio[1] = parseInt(e.target.value, 10);;
		_marque.enable_edit_webradio_highlited(true);
		_marque.get_select_all_webradios_highlited(1,country,brand);
		_marque.highlited_1_boolean = true;
	});
	$('#highlited_webradio2').on("select2:select", function(e) { 
		var brand = sessionStorage.val_sel_brand;	
		var country = sessionStorage.val_sel_country;
		_marque.list_highlited_webradio[2] = parseInt(e.target.value, 10);
		_marque.enable_edit_webradio_highlited(true);
		_marque.get_select_all_webradios_highlited(2,country,brand);
		_marque.highlited_2_boolean = true;
	});
	$('#highlited_webradio3').on("select2:select", function(e) { 
		var brand = sessionStorage.val_sel_brand;	
		var country = sessionStorage.val_sel_country;
		_marque.list_highlited_webradio[3] = parseInt(e.target.value, 10);
		_marque.enable_edit_webradio_highlited(true);
		_marque.get_select_all_webradios_highlited(3,country,brand);
		_marque.highlited_3_boolean = true;
	});
	$('#highlited_webradio4').on("select2:select", function(e) { 
		var brand = sessionStorage.val_sel_brand;	
		var country = sessionStorage.val_sel_country;
		_marque.list_highlited_webradio[4] = parseInt(e.target.value, 10);
		_marque.enable_edit_webradio_highlited(true);
		_marque.get_select_all_webradios_highlited(4,country,brand);
		_marque.highlited_4_boolean = true;
	});




	$('#date_action_highlited').datetimepicker({
		useCurrent: false,
		format: 'DD/MM/YYYY'
	});
	
	var dateTodayDebut = new Date();
	var tomorrowDebut = new Date(dateTodayDebut);
	
	if(tomorrowDebut.getHours()>=17){
		seldate = tomorrowDebut.toDateString();
        seldate = seldate.split(' ');
        var weekday=new Array();
		weekday['Mon']="Monday";
		weekday['Tue']="Tuesday";
		weekday['Wed']="Wednesday";
		weekday['Thu']="Thursday";
		weekday['Fri']="Friday";
		weekday['Sat']="Saturday";
		weekday['Sun']="Sunday";
        var dayOfWeek = weekday[seldate[0]];
		if(dayOfWeek=='Friday'){
			tomorrowDebut.setDate(tomorrowDebut.getDate() + 3);
		}
		if(dayOfWeek=='Saturday'){
			tomorrowDebut.setDate(tomorrowDebut.getDate() + 2);
		}
		if(dayOfWeek=='Sunday'){
			tomorrowDebut.setDate(tomorrowDebut.getDate() + 1);
		}
		if(dayOfWeek!='Friday' && dayOfWeek!='Saturday' && dayOfWeek!='Sunday'){
			tomorrowDebut.setDate(tomorrowDebut.getDate() + 1);
		}
		
	}else{
		tomorrowDebut.setDate(tomorrowDebut.getDate());
	}

	$('#date_action_highlited').data("DateTimePicker").minDate(tomorrowDebut);
	
	
	$("#confirm_highlited").click(function(e){
		if($('#date_action_highlited').data("DateTimePicker").date() ==  null){
			$('#controle_date_action_highlited').text("La date d'action est obligatoire");
		}else{
			
			var cptwrchosse = 0;
			var highwr1 = $('#highlited_webradio1').val();
			var highwr2 = $('#highlited_webradio2').val();
			var highwr3 = $('#highlited_webradio3').val();
			var highwr4 = $('#highlited_webradio4').val();
			
			if(highwr1== "-1"){
				cptwrchosse = cptwrchosse+1;
			}
			if(highwr2== "-1"){
				cptwrchosse = cptwrchosse+1;
			}
			if(highwr3== "-1"){
				cptwrchosse = cptwrchosse+1;
			}
			if(highwr4== "-1"){
				cptwrchosse = cptwrchosse+1;
			}
			cptwrchosse = 4 - cptwrchosse;
			if(cptwrchosse <3){
				
				$('#controle_date_action_highlited').text("Vous devez choisir au moins 3 mise en avant!");
				
			}else{
				_marque.highlited_1_boolean = false;
				_marque.highlited_2_boolean = false;
				_marque.highlited_3_boolean = false;
				_marque.highlited_4_boolean = false;
				
				
				
				var fullDate = new Date();
				var twoDigitMonth = ((fullDate.getMonth().length+1) === 1)? (fullDate.getMonth()+1) : '0' + (fullDate.getMonth()+1);
				var currentDate = _marque.formatDateConvertTire(fullDate) ;

				var date_action_highlited = $('#date_action_highlited').data("DateTimePicker").date();
				var data_wr_high = new Object();
				data_wr_high.country = sessionStorage.val_sel_country;
				data_wr_high.brand = sessionStorage.val_sel_brand;
				data_wr_high.id_webradio_highlighted_1=$('#highlited_webradio1').val();
				data_wr_high.id_webradio_highlighted_2=$('#highlited_webradio2').val();
				data_wr_high.id_webradio_highlighted_3=$('#highlited_webradio3').val();
				data_wr_high.id_webradio_highlighted_4=$('#highlited_webradio4').val();
				data_wr_high.date_action_request = _marque.formatDateConvertTire(date_action_highlited._d);
				data_wr_high.sys_modified_datet = fullDate;
				$.ajax(_marque.host+'/webradio_highlited', {
					data: JSON.stringify(data_wr_high),
					timeout: 500,     // timeout milliseconds
					method: "POST",
					contentType: "application/json",
					async: false,
					//onLoading:$("#loader").show(1),
					success: function (data_wrinserted,status,xhr) {   // success callback function
						//$('#loader_modal').modal('hide');
						//$('#loader').fadeOut();
						_marque.get_all_webradio_highlited();
						_marque.enable_edit_webradio_highlited(false);
						$('#controle_date_action_highlited').text("");
						$('#date_action_highlited').data("DateTimePicker").clear();
					},
					error: function (jqXhr, textStatus, errorMessage) { // error callback 
						$('#controle_date_action_highlited').text(errorMessage);
					}
				});
				
				
			}
			
			
		}
	});
	
	
	$("#cancel_highlited").click(function(e){
		$('#date_action_highlited').data("DateTimePicker").clear();
		$('#controle_date_action_highlited').text("");
		_marque.get_all_webradio_highlited();
		_marque.enable_edit_webradio_highlited(false);
		_marque.highlited_1_boolean = false;
		_marque.highlited_2_boolean = false;
		_marque.highlited_3_boolean = false;
		_marque.highlited_4_boolean = false;
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
		_marque.selected_webradio_bygenre = [];
		_marque.selected_webradio_bygenre_avapres = [];
		
		if(_marque._mode == _marque._modes.indexOf('CREATE_WEBRADIO')  || _marque._mode == _marque._modes.indexOf('EDIT_WEBRADIO')){
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
			_marque._cur_marque_pk = $(e.currentTarget).prop('id');
			_marque.reset_edit_form();
			$.ajax(_marque.host+'/webradio/'+parseInt(_marque._cur_marque_pk), {
				timeout: 500,     // timeout milliseconds
				method: "GET",
				contentType: "application/json",
				success: function (data,status,xhr) {   // success callback function
					_marque.enable_button_edit_delete(true);
					_marque._cur_marque_obj=data;
					
					$('#controle_date_valider').text("");
					
					var selectedgenrewr = [];
					/**/
					
					$.each(data.wrPlacement, function(key, value){
						checkList.push(value.id_genre_application);
						_marque.selected_webradio_bygenre[value.id_genre_application]=value.id_webradio_avantapres;
						_marque.selected_webradio_bygenre_avapres[value.id_genre_application]=value.avantapres;
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
					$('#date_debut').data("DateTimePicker").date(_marque.formatDateConvert(data.date_creation_request));
					$('#date_fin').data("DateTimePicker").date(_marque.formatDateConvert(data.date_deletion_request));
					
					//$("#genre_application_select").val(checkList).trigger('change');
					
					$("#genre_application_select").select2({
						width: 'resolve',
						templateSelection: function (data, container) {
							var selection = $('#genre_application_select').select2('data');
							var idx = selection.indexOf(data);
							var url = _marque.host+'/get_genre_application/'+data.id;
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
					
					
					
					
					
					
					
					$.getJSON( _marque.host+'/get_sous_genre_orange/'+parseInt(data.id_orange_genre),
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
							});
							$("#sous_genre_orange_select").val(data.id_orange_ssgenre).trigger('change');
						}
					);
					
					_marque.selected_genre_application = checkList;
					_marque.fill_table_placement_enable(false);
					_marque.wr_created_by_wr = data.createdBy;
					_marque.wr_sysdate_created = data.sys_created_date;
				},
				error: function (jqXhr, textStatus, errorMessage) { // error callback 
					
					
				}
			});
			
			
			
					
			
		}
		
		
		
    	
	});

	$("#btn_new").click(function(){
		_marque.reset_edit_form();
		
		$('#liste_webradios_radio tr').each(function(){
			$(this).css('color', '#797979');
			$(this).css('font-weight', 'bold');
			$(this).removeClass("table-danger-wr");
		});
		_marque.enable_button_edit_delete(false);
		
		
		
		
		
		
		
		if(sessionStorage.val_sel_brand==null){
			sessionStorage.val_sel_brand = 1;
		}
		var country = sessionStorage.val_sel_country;
		if(_marque._mode == _marque._modes.indexOf('CREATE_WEBRADIO')  || _marque._mode == _marque._modes.indexOf('EDIT_WEBRADIO')){
			$('#erreur_container_modal').text("Une fiche est en cours de modification, veuillez annuler tout d'abord SVP!");
			$('#erreur_container_modal_modal').modal('show');
		}else{
			_marque._mode = _marque._modes.indexOf('CREATE_WEBRADIO');
			_marque._cur_marque_pk = 0;
			
			
			
			_marque.date_prochaine_dispo_canal= null;
			
			var url = _marque.host+'/get_first_canal_dispo/'+country;
			$.ajax({
			  url: url,
			  //dataType: 'json',
			  async: false,
			  success: function(data) {				  
				if(data != null){
					if(data.date_disponnible != null){
						_marque.date_prochaine_dispo_canal= data.date_disponnible;	
						
						
						$('#date_debut_modal').datetimepicker({
							format: 'DD/MM/YYYY'
						});
						$('#date_fin_modal').datetimepicker({
							useCurrent: false,
							format: 'DD/MM/YYYY'
						});
						
						var dateAujourdhui = new Date();
						dateAujourdhui.setDate(dateAujourdhui.getDate() + 2);
						
						
						
						
						//var dateTodayDebut = _marque.formatDateConvert(data.date_disponnible);
						var canalDebut = new Date(_marque.date_prochaine_dispo_canal);
						if(canalDebut<=dateAujourdhui){
							//$('#date_debut_modal').data("DateTimePicker").minDate(tomorrowDebut);
							
							var dateTodayDebut = new Date();
							var tomorrowDebut = new Date(dateTodayDebut);
							tomorrowDebut.setDate(tomorrowDebut.getDate() + 2);
							$('#date_debut_modal').data("DateTimePicker").minDate(tomorrowDebut);
							
							
							
							var dateTodayFin = new Date();
							var tomorrowFin = new Date(_marque.date_prochaine_dispo_canal);
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
							tomorrowDebut.setDate(tomorrowDebut.getDate());
							$('#date_debut_modal').data("DateTimePicker").minDate(tomorrowDebut);
							
							
							
							var dateTodayFin = new Date();
							var tomorrowFin = new Date(canalDebut);
							tomorrowFin.setDate(tomorrowFin.getDate());
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
						_marque._mode = -1;
					}
					
					
				}
			  }
			});
			
			
		}
		
		
		
		
		
	});
	
	
	
	
	$("#btn_delete").click(function(e){
		//_marque.reset_edit_form();
		
		
		
		_marque.enable_allcheckbox(true);
		var country = sessionStorage.val_sel_country;
		if(_marque._mode == _marque._modes.indexOf('CREATE_WEBRADIO')  || _marque._mode == _marque._modes.indexOf('EDIT_WEBRADIO')){
			$('#erreur_container_modal').text("Une fiche est en cours de modification, veuillez cliquer sur annuler tout d'abord SVP!");
			$('#erreur_container_modal_modal').modal('show');
		}else{
			_marque._mode = _marque._modes.indexOf('SUPP_WEBRADIO');
			if(_marque.offline_checkboxval == 1){
				
				
					
			}else{
				_marque.enable_edit_form_supp(true);
				e.preventDefault();
				$('#nav_tabs a[href="#alphanum"]').tab('show');
			}
			
			
		}
	});
	
	
	
	$("#btn_edit").click(function(e){
		
		
		
		
		_marque.enable_allcheckbox(true);
		var country = sessionStorage.val_sel_country;
		if(_marque._mode == _marque._modes.indexOf('CREATE_WEBRADIO')  || _marque._mode == _marque._modes.indexOf('EDIT_WEBRADIO')){
			$('#erreur_container_modal').text("Une fiche est en cours de modification, veuillez cliquer sur annuler tout d'abord SVP!");
			$('#erreur_container_modal_modal').modal('show');
		}else{
			_marque._mode = _marque._modes.indexOf('EDIT_WEBRADIO');
			if(_marque.offline_checkboxval == 1){
				
				
				
				_marque.date_prochaine_dispo_canal= null;
			
				var url = _marque.host+'/get_first_canal_dispo/'+country;
				$.ajax({
				  url: url,
				  //dataType: 'json',
				  async: false,
				  success: function(data) {				  
					if(data != null){
						if(data.date_disponnible != null){
							var list_genre_appli = "";
							
							$.ajax(_marque.host+'/get_webradios_placement/'+_marque._cur_marque_pk, {
								timeout: 500,     // timeout milliseconds
								method: "GET",
								contentType: "application/json",
								async: false,
								success: function (data_get_placement,status,xhr) {   // success callback function
									$.each(data_get_placement, function(key_data_get_placement, value_data_get_placement){
										list_genre_appli = list_genre_appli+";"+JSON.stringify(value_data_get_placement)
									});
								
								
								}
							});
							
							
							
							$.ajax(_marque.host+'/webradio_placement/'+_marque._cur_marque_pk, {
								timeout: 500,     // timeout milliseconds
								method: "DELETE",
								contentType: "application/json",
								async: false,
								success: function (data_canauxdispo,status,xhr) {   // success callback function
								
								
								
									$.getJSON( _marque.host+'/webradio/'+parseInt(_marque._cur_marque_pk),
									function( data ) 
									{
										
										
										var data_wr_off_histo = new Object();
										data_wr_off_histo.pk_webradio = data.pk;
										data_wr_off_histo.nom_wr = data.nom_wr;
										data_wr_off_histo.claim = data.claim;
										data_wr_off_histo.pub = data.pub;
										data_wr_off_histo.id_pressplay = data.id_pressplay;
										data_wr_off_histo.id_application_genre = list_genre_appli;
										data_wr_off_histo.id_orange_genre = data.id_orange_genre;
										data_wr_off_histo.id_orange_ssgenre = data.id_orange_ssgenre;
										data_wr_off_histo.id_itunes_genre = data.id_itunes_genre;
										data_wr_off_histo.id_radio = data.id_radio;
										data_wr_off_histo.date_creation_request = data.date_creation_request;
										data_wr_off_histo.date_deletion_request = data.date_deletion_request;
										data_wr_off_histo.createdBy = data.createdBy;
										data_wr_off_histo.modifiedBy = data.modifiedBy;
										data_wr_off_histo.sys_created_date = data.sys_created_date;
										data_wr_off_histo.sys_modified_date = data.sys_modified_date;
										
										var fullDate = new Date();
										var currentDate = _marque.formatDateConvertTireDate(fullDate) ;
										
										data_wr_off_histo.sys_created_offline_history = currentDate;
										

										
										
										$.ajax(_marque.host+'/webradio_offline_history', {
											data: JSON.stringify(data_wr_off_histo),
											timeout: 500,     // timeout milliseconds
											method: "POST",
											contentType: "application/json",
											async: false,
											success: function (data_wrinserted,status,xhr) {   // success callback function											
												
											},
											error: function (jqXhr, textStatus, errorMessage) {
												
											}
										});
										
										
										
										_marque.enable_button_edit_delete(true);
										_marque._cur_marque_obj=data;
										
										$('#controle_date_valider').text("");
										
										var selectedgenrewr = [];
										/**/
										$.each(data.wrPlacement, function(key, value){
											checkList.push(value.id_genre_application);
											_marque.selected_webradio_bygenre[value.id_genre_application]=value.id_webradio_avantapres;
											_marque.selected_webradio_bygenre_avapres[value.id_genre_application]=value.avantapres;
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
										$('#date_debut').data("DateTimePicker").date(_marque.formatDateConvert(data.date_creation_request));
										$('#date_fin').data("DateTimePicker").date(_marque.formatDateConvert(data.date_deletion_request));
										var brand = sessionStorage.val_sel_brand;	
										checkList = [];
										$.ajax(_marque.host+'/get_genre_application/'+country+'/'+brand, {
											timeout: 500,     // timeout milliseconds
											method: "GET",
											contentType: "application/json",
											async: false,
											success: function (data_genre_appli,status,xhr) {   // success callback function
											
												$.each(data_genre_appli, function(key, value){
													if(value.genre_name =="Toutes les radios"){
														checkList.push(value.pk);
													}
												});
											},
											error: function (jqXhr, textStatus, errorMessage) { // error callback 
												
												
											}
										});
										
										
										
										$("#genre_application_select").val(checkList).trigger('change');
										
										
										$.getJSON( _marque.host+'/get_sous_genre_orange/'+parseInt(data.id_orange_genre),
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
										
										_marque.selected_genre_application = checkList;
										_marque.fill_table_placement_enable(false);
										_marque.wr_created_by_wr = data.createdBy;
										_marque.wr_sysdate_created = data.sys_created_date;
									});
								},
								error: function (jqXhr, textStatus, errorMessage) { // error callback 
								}
							});
							
							
							_marque.date_prochaine_dispo_canal= data.date_disponnible;	
							
							
							$('#date_debut_modal').datetimepicker({
								format: 'DD/MM/YYYY'
							});
							$('#date_fin_modal').datetimepicker({
								useCurrent: false,
								format: 'DD/MM/YYYY'
							});
							
							var dateAujourdhui = new Date();
							dateAujourdhui.setDate(dateAujourdhui.getDate() + 2);
							
							
							
							
							//var dateTodayDebut = _marque.formatDateConvert(data.date_disponnible);
							var canalDebut = new Date(_marque.date_prochaine_dispo_canal);
							if(canalDebut<=dateAujourdhui){
								//$('#date_debut_modal').data("DateTimePicker").minDate(tomorrowDebut);
								
								var dateTodayDebut = new Date();
								var tomorrowDebut = new Date(dateTodayDebut);
								tomorrowDebut.setDate(tomorrowDebut.getDate() + 2);
								$('#date_debut_modal').data("DateTimePicker").minDate(tomorrowDebut);
								
								
								
								var dateTodayFin = new Date();
								var tomorrowFin = new Date(_marque.date_prochaine_dispo_canal);
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
								tomorrowDebut.setDate(tomorrowDebut.getDate());
								$('#date_debut_modal').data("DateTimePicker").minDate(tomorrowDebut);
								
								
								
								var dateTodayFin = new Date();
								var tomorrowFin = new Date(canalDebut);
								tomorrowFin.setDate(tomorrowFin.getDate());
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
							_marque._mode = -1;
						}
						
						
					}
				  }
				});
				
					
			}else{
				if(_marque.prochainementcheckboxval == 1){
					_marque.enable_edit_form(true);
				}else{
					_marque.enable_edit_form_ss_date(true);
				}
				
				_marque.enable_edit_placement_form(true,_marque._cur_marque_pk);
				_marque.fill_table_placement_enable(true);
				e.preventDefault();
				$('#nav_tabs a[href="#alphanum"]').tab('show');
			}
			
			
		}
	});
	
	
	
	
	$("#date_range_modal_confirm").click(function(e){
		if($('#date_debut_modal').data("DateTimePicker").date() ==  null){
			$('#controle_date').text("La date début est obligatoire");
		}else{
			$('#controle_date').text("");
			
			var brand = sessionStorage.val_sel_brand;	
			var country = sessionStorage.val_sel_country;
			
			
			$('#date_debut').data("DateTimePicker").date($('#date_debut_modal').data("DateTimePicker").date());
			$('#date_fin').data("DateTimePicker").date($('#date_fin_modal').data("DateTimePicker").date());
			var dateAujourdhui = new Date();
			dateAujourdhui.setDate(dateAujourdhui.getDate() + 2);
			
			
			var canalDebut = new Date(_marque.date_prochaine_dispo_canal);
			
			if(canalDebut<=dateAujourdhui){
							
				var dateTodayDebut = new Date();
				var tomorrowDebut = new Date(dateTodayDebut);
				tomorrowDebut.setDate(tomorrowDebut.getDate() + 2);
				$('#date_debut').data("DateTimePicker").minDate(tomorrowDebut);
				
				
				
				var dateTodayFin = new Date();
				var tomorrowFin = new Date(_marque.date_prochaine_dispo_canal);
				tomorrowFin.setDate(tomorrowFin.getDate() + 2);
				$('#date_fin').data("DateTimePicker").minDate(tomorrowFin);
				
				
			}else{
				var dateTodayDebut = canalDebut;
				var tomorrowDebut = new Date(dateTodayDebut);
				tomorrowDebut.setDate(tomorrowDebut.getDate());
				$('#date_debut').data("DateTimePicker").minDate(tomorrowDebut);
				
				
				
				var dateTodayFin = new Date();
				var tomorrowFin = new Date(canalDebut);
				tomorrowFin.setDate(tomorrowFin.getDate());
				$('#date_fin').data("DateTimePicker").minDate(tomorrowFin);
				
				
				
				
			}


			//_marque.enable_button_edit_delete(true);
			_marque.enable_edit_form(true);
			
			if(_marque._mode == _marque._modes.indexOf('EDIT_WEBRADIO')){
				_marque.enable_edit_placement_form(true,_marque._cur_marque_pk);
				_marque.fill_table_placement_enable(true);
			}
			
			var checkList = [];
			if(_marque._mode == _marque._modes.indexOf('CREATE_WEBRADIO')){
				$.ajax(_marque.host+'/get_genre_application/'+country+'/'+brand, {
					timeout: 500,     // timeout milliseconds
					method: "GET",
					contentType: "application/json",
					async: false,
					success: function (data_genre_appli,status,xhr) {   // success callback function
					
						$.each(data_genre_appli, function(key, value){
							if(value.genre_name =="Toutes les radios"){
								checkList.push(value.pk);
							}
						});
					},
					error: function (jqXhr, textStatus, errorMessage) { // error callback 
						
						
					}
				});
			
			
				$("#genre_application_select").select2({
					width: 'resolve',
					templateSelection: function (data, container) {
						var selection = $('#genre_application_select').select2('data');
						var idx = selection.indexOf(data);
						var url = _marque.host+'/get_genre_application/'+data.id;
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
			}
			
			$('#date_range_modal').modal('hide');
			e.preventDefault();
			$('#nav_tabs a[href="#alphanum"]').tab('show');
		}
	});
	
	$('#nom_webradio').keyup(function(){
		$(this).val($(this).val().toUpperCase());
	});
	$('#claim').keyup(function(){
		if($(this).val().length > 250){
			alert("La taille du champ Claim ne doit pas dépasser 250 caractères");
			
		}
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
	$("#retour_button").click(function(e){
		$('#controle_date_valider').text("");
		e.preventDefault();
		$('#nav_tabs a[href="#alphanum"]').tab('show');
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
		
		_marque.enable_button_edit_delete(false);
		_marque.enable_edit_form(false);
		_marque.reset_edit_form();
		
		_marque._mode = -1;
	});
	
	
	$("#date_action_modal_confirm").click(function(e){
		
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
			if($('#claim').val().length > 250){
				returnedvaluecheck = returnedvaluecheck + "- La taille du Claim ne doit pas dépasser 250 caractères ";
			}else{
				claimval = $('#claim').val();
			}
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
		if(_marque._mode == _marque._modes.indexOf('EDIT_WEBRADIO')){
			
			var fullDate = new Date();
			var twoDigitMonth = ((fullDate.getMonth().length+1) === 1)? (fullDate.getMonth()+1) : '0' + (fullDate.getMonth()+1);
			var currentDate = _marque.formatDateConvertTire(fullDate) ;			
			
			data_wr.createdBy = _marque.wr_created_by_wr;
			data_wr.sys_created_date = _marque.wr_sysdate_created;
			data_wr.modifiedBy = sessionStorage.val_id_user;
			data_wr.pk = _marque._cur_marque_pk;
			data_wr.sys_modified_date = currentDate;
			
			
			
			if(date_debutval._d !=  null){
				
				var twoDigitMonthdebut = ((date_debutval._d.getMonth().length+1) === 1)? (date_debutval._d.getMonth()+1) : '0' + (date_debutval._d.getMonth()+1);
				var currentDatedebut = _marque.formatDateConvertTire(date_debutval._d)  ;
				
				data_wr.date_creation_request = currentDatedebut;
				data_wr.date_action_request = currentDatedebut;
			}else{
				data_wr.date_creation_request = "";
				data_wr.date_action_request = "";
			}
			if(date_finval !=  null){
				
				var twoDigitMonthfin = ((date_finval._d.getMonth().length+1) === 1)? (date_finval._d.getMonth()+1) : '0' + (date_finval._d.getMonth()+1);
				var currentDatefin = _marque.formatDateConvertTire(date_finval._d) ;
				
				data_wr.date_deletion_request = currentDatefin;
			}else{
				data_wr.date_deletion_request = "";
			}
		}
		
		var data_wr_placement_list = [];
		$.each(_marque.selected_genre_application, function(key_genre_appli, value_genre_appli){	
				var data_wr_placement = new Object();
				data_wr_placement.id_webradio = _marque._cur_marque_pk;
				data_wr_placement.avantapres = $("#id_avapres_webradio_"+value_genre_appli).val();
				data_wr_placement.id_webradio_avantapres = $("#id_placement_webradio_"+value_genre_appli).val();
				data_wr_placement.id_genre_application = value_genre_appli;
				data_wr_placement_list.push(data_wr_placement);
			}
		);
		
		var date_action_choice = $('#date_debut_modal_action').data("DateTimePicker").date();
		
		data_wr.wrPlacement=data_wr_placement_list;
		data_wr.date_action_request = _marque.formatDateConvertTire(date_action_choice._d) ;
		
		
		
		$.ajax(_marque.host+'/webradio', {
			data: JSON.stringify(data_wr),
			timeout: 500,     // timeout milliseconds
			method: "POST",
			contentType: "application/json",
			async: false,
			success: function (data_wrinserted,status,xhr) {   // success callback function
				_marque.fill_brand_sel();
				_marque.fill_country_sel();
				_marque.fill_genre_application_sel();
				_marque.fill_genre_orange_sel();
				_marque.fill_genre_itunes_sel();		   
				_marque.get_all_webradio();
				
				
				
				_marque.enable_button_edit_delete(false);
				_marque.enable_edit_form(false);
				_marque.reset_edit_form();
				e.preventDefault();
				$('#nav_tabs a[href="#alphanum"]').tab('show');
				_marque._mode = -1;
				
				_marque.reset_edit_form_checkbox();
				
				
			},
			error: function (jqXhr, textStatus, errorMessage) { // error callback 
				_marque.fill_brand_sel();
				_marque.fill_country_sel();
				_marque.fill_genre_application_sel();
				_marque.fill_genre_orange_sel();
				_marque.fill_genre_itunes_sel();		   
				_marque.get_all_webradio();
				
				
				
				_marque.enable_button_edit_delete(false);
				_marque.enable_edit_form(false);
				_marque.reset_edit_form();
				e.preventDefault();
				$('#nav_tabs a[href="#alphanum"]').tab('show');
				_marque._mode = -1;
				
				_marque.reset_edit_form_checkbox();
				
			}
		});
		
		
		_marque.enable_button_edit_delete(false);
		_marque.enable_edit_form(false);
		_marque.reset_edit_form();
		
		_marque._mode = -1;
	});
	
	
	
	$("#date_action_modal_annuler").click(function(e){
		$('#controle_date_valider').text("");
		e.preventDefault();
		$('#nav_tabs a[href="#alphanum"]').tab('show');
		
		_marque.enable_button_edit_delete(false);
		_marque.enable_edit_form(false);
		_marque.reset_edit_form();
		
		_marque._mode = -1;
	});
	
	
	
	
	
	
	
	
	
	$("#valider_button").click(function(e){
		if(_marque._mode == _marque._modes.indexOf('SUPP_WEBRADIO')){
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
				if($('#claim').val().length > 250){
					returnedvaluecheck = returnedvaluecheck + "- La taille du Claim ne doit pas dépasser 250 caractères ";
				}else{
					claimval = $('#claim').val();
				}
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
			if(_marque._mode == _marque._modes.indexOf('SUPP_WEBRADIO')){
				
				var fullDate = new Date();
				var twoDigitMonth = ((fullDate.getMonth().length+1) === 1)? (fullDate.getMonth()+1) : '0' + (fullDate.getMonth()+1);
				var currentDate = _marque.formatDateConvertTire(fullDate) ;			
				
				data_wr.createdBy = _marque.wr_created_by_wr;
				data_wr.sys_created_date = _marque.wr_sysdate_created;
				data_wr.modifiedBy = sessionStorage.val_id_user;
				data_wr.pk = _marque._cur_marque_pk;
				data_wr.sys_modified_date = currentDate;
				
				
				
				if(date_debutval._d !=  null){
					
					var twoDigitMonthdebut = ((date_debutval._d.getMonth().length+1) === 1)? (date_debutval._d.getMonth()+1) : '0' + (date_debutval._d.getMonth()+1);
					var currentDatedebut = _marque.formatDateConvertTire(date_debutval._d)  ;
					
					data_wr.date_creation_request = currentDatedebut;
					data_wr.date_action_request = currentDatedebut;
				}else{
					data_wr.date_creation_request = "";
					data_wr.date_action_request = "";
				}
				if(date_finval !=  null){
					
					var twoDigitMonthfin = ((date_finval._d.getMonth().length+1) === 1)? (date_finval._d.getMonth()+1) : '0' + (date_finval._d.getMonth()+1);
					var currentDatefin = _marque.formatDateConvertTire(date_finval._d) ;
					
					data_wr.date_deletion_request = currentDatefin;
					data_wr.date_action_request = currentDatefin;
				}else{
					data_wr.date_deletion_request = "";
					data_wr.date_action_request = "";
				}
			}
			
			var data_wr_placement_list = [];
			$.each(_marque.selected_genre_application, function(key_genre_appli, value_genre_appli){	
					var data_wr_placement = new Object();
					data_wr_placement.id_webradio = _marque._cur_marque_pk;
					data_wr_placement.avantapres = $("#id_avapres_webradio_"+value_genre_appli).val();
					data_wr_placement.id_webradio_avantapres = $("#id_placement_webradio_"+value_genre_appli).val();
					data_wr_placement.id_genre_application = value_genre_appli;
					data_wr_placement_list.push(data_wr_placement);
				}
			);
			
			//var date_action_choice = $('#date_debut_modal_action').data("DateTimePicker").date();
			
			data_wr.wrPlacement=data_wr_placement_list;
			
			
			
			$.ajax(_marque.host+'/webradio', {
				data: JSON.stringify(data_wr),
				timeout: 500,     // timeout milliseconds
				method: "POST",
				contentType: "application/json",
				async: false,
				success: function (data_wrinserted,status,xhr) {   // success callback function
					_marque.fill_brand_sel();
					_marque.fill_country_sel();
					_marque.fill_genre_application_sel();
					_marque.fill_genre_orange_sel();
					_marque.fill_genre_itunes_sel();		   
					_marque.get_all_webradio();
					
					
					
					_marque.enable_button_edit_delete(false);
					_marque.enable_edit_form(false);
					_marque.reset_edit_form();
					e.preventDefault();
					$('#nav_tabs a[href="#alphanum"]').tab('show');
					_marque._mode = -1;
					
					_marque.reset_edit_form_checkbox();
					
					
				},
				error: function (jqXhr, textStatus, errorMessage) { // error callback 
					_marque.fill_brand_sel();
					_marque.fill_country_sel();
					_marque.fill_genre_application_sel();
					_marque.fill_genre_orange_sel();
					_marque.fill_genre_itunes_sel();		   
					_marque.get_all_webradio();
					
					
					
					_marque.enable_button_edit_delete(false);
					_marque.enable_edit_form(false);
					_marque.reset_edit_form();
					e.preventDefault();
					$('#nav_tabs a[href="#alphanum"]').tab('show');
					_marque._mode = -1;
					
					_marque.reset_edit_form_checkbox();
					
				}
			});
			
			
			_marque.enable_button_edit_delete(false);
			_marque.enable_edit_form(false);
			_marque.reset_edit_form();
			
			_marque._mode = -1;
		}
		else{	//nom_webradioclaimpubid_pressplaygenre_application_selectgenre_orange_selectsous_genre_orange_selectgenre_itunes_selectdate_debutdate_fin
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
				
				var isOk = true;
				
				
				if($('#nom_webradio').val() == null || $('#nom_webradio').val() == ""){
					returnedvaluecheck = returnedvaluecheck + "- Le nom de la webradio est obligatoire ";
				}else{
					nom_webradioval = $('#nom_webradio').val();
				}
				if($('#claim').val() == null || $('#claim').val() == ""){
					returnedvaluecheck = returnedvaluecheck + "- Le claim est obligatoire ";
				}else{
					if($('#claim').val().length > 250){
						returnedvaluecheck = returnedvaluecheck + "- La taille du Claim ne doit pas dépasser 250 caractères ";
					}else{
						claimval = $('#claim').val();
					}
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

				$.each(_marque.selected_genre_application, function(key_genre_appli, value_genre_appli){
					var options = $('#id_placement_webradio_'+value_genre_appli+' option');
					
					var values = $.map(options ,function(option) {
						return option.value;
					});
					
					if(values.length-1 != 0){
						var option_avapres = $('#id_avapres_webradio_'+value_genre_appli+' option:selected');
						var option_webradio = $('#id_placement_webradio_'+value_genre_appli+' option:selected');
						if(option_avapres[0].text == '-' || option_webradio[0].text == '-'){
							
							
							$.ajax(_marque.host+'/get_genre_application/'+value_genre_appli, {
								timeout: 500,     // timeout milliseconds
								method: "GET",
								contentType: "application/json",
								async: false,
								success: function (data_genre_appli,status,xhr) {   // success callback function
								
									returnedvaluecheck = returnedvaluecheck + "- Il y a des webradios dans la catégorie "+data_genre_appli[0].genre_name+" Merci de chosir le placement ";
								},
								error: function (jqXhr, textStatus, errorMessage) { // error callback 
									
								}
							});
							
							
						}
					}
				})
				
				if(returnedvaluecheck!=""){			
					if(_marque._mode == _marque._modes.indexOf('CREATE_WEBRADIO') || _marque._mode == _marque._modes.indexOf('EDIT_WEBRADIO')){
						$('#controle_date_valider').text(returnedvaluecheck);
					}
					else {
						$('#controle_date_valider').text("Vous devez cliquer sur le bouton Créer pour continuer");
					}
				}else{
					if(_marque._mode == _marque._modes.indexOf('EDIT_WEBRADIO') && _marque.offline_checkboxval != 1 && _marque.prochainementcheckboxval != 1){
						
						
						
						
						
						$('#date_debut_modal_action').datetimepicker({
							format: 'DD/MM/YYYY',
							//defaultDate:
						});
						var dateAujourdhui = new Date();
						dateAujourdhui.setDate(dateAujourdhui.getDate());
						$('#date_debut_modal_action').data("DateTimePicker").minDate(dateAujourdhui);
				
						
						$('#date_action_modal').modal('show');
						
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
						if(_marque._mode == _marque._modes.indexOf('CREATE_WEBRADIO')){
							
							
							
							
							$.ajax(_marque.host+'/get_all_webradios_by_id_pressplay/'+country+'/'+brand+'/'+parseInt(id_pressplayval), {
								timeout: 500,     // timeout milliseconds
								method: "GET",
								contentType: "application/json",
								async: false,
								success: function (data_id_pressplay,status,xhr) {   // success callback function
									if(data_id_pressplay.length != 0){
										$('#controle_date_valider').text("La webradio "+data_id_pressplay[0].nom_wr +" a déjà cet id pressplay Veuillez editer ou changer d'id pressplay");
										isOk =  false;
									}else{
										isOk =  true;
									}
									
									
								},
								error: function (jqXhr, textStatus, errorMessage) { // error callback 
									
									
								}
							});
							
							var fullDate = new Date();
							var twoDigitMonth = ((fullDate.getMonth().length+1) === 1)? (fullDate.getMonth()+1) : '0' + (fullDate.getMonth()+1);
							var currentDate = _marque.formatDateConvertTireNow(fullDate) ;
							
							data_wr.createdBy = sessionStorage.val_id_user;
							data_wr.sys_created_date = currentDate;
							
							if(date_debutval !=  null){
								
								var twoDigitMonthdebut = ((date_debutval._d.getMonth().length+1) === 1)? (date_debutval._d.getMonth()+1) : '0' + (date_debutval._d.getMonth()+1);
								var currentDatedebut = _marque.formatDateConvertTire(date_debutval._d);
								
								data_wr.date_creation_request = currentDatedebut;
								data_wr.date_action_request = currentDatedebut;
							}else{
								data_wr.date_creation_request = "";
								data_wr.date_action_request = "";
							}
							if(date_finval !=  null){
								
								var twoDigitMonthfin = ((date_finval._d.getMonth().length+1) === 1)? (date_finval._d.getMonth()+1) : '0' + (date_finval._d.getMonth()+1);
								var currentDatefin = _marque.formatDateConvertTire(date_finval._d) ;
								
								data_wr.date_deletion_request = currentDatefin;
							}else{
								data_wr.date_deletion_request = "";
							}
							
							
							
						}
						else if(_marque._mode == _marque._modes.indexOf('EDIT_WEBRADIO')){
							
							var fullDate = new Date();
							var twoDigitMonth = ((fullDate.getMonth().length+1) === 1)? (fullDate.getMonth()+1) : '0' + (fullDate.getMonth()+1);
							var currentDate = _marque.formatDateConvertTireNow(fullDate) ;			
							
							data_wr.createdBy = _marque.wr_created_by_wr;
							data_wr.sys_created_date = _marque.wr_sysdate_created;
							data_wr.modifiedBy = sessionStorage.val_id_user;
							data_wr.pk = _marque._cur_marque_pk;
							data_wr.sys_modified_date = currentDate;
							
							
							
							if(date_debutval._d !=  null){
								
								var twoDigitMonthdebut = ((date_debutval._d.getMonth().length+1) === 1)? (date_debutval._d.getMonth()+1) : '0' + (date_debutval._d.getMonth()+1);
								var currentDatedebut = _marque.formatDateConvertTire(date_debutval._d)  ;
								
								data_wr.date_creation_request = currentDatedebut;
								data_wr.date_action_request = currentDatedebut;
							}else{
								data_wr.date_creation_request = "";
								data_wr.date_action_request = "";
							}
							if(date_finval !=  null){
								
								var twoDigitMonthfin = ((date_finval._d.getMonth().length+1) === 1)? (date_finval._d.getMonth()+1) : '0' + (date_finval._d.getMonth()+1);
								var currentDatefin = _marque.formatDateConvertTire(date_finval._d) ;
								
								data_wr.date_deletion_request = currentDatefin;
							}else{
								data_wr.date_deletion_request = "";
							}
						}
						
						var data_wr_placement_list = [];
						$.each(_marque.selected_genre_application, function(key_genre_appli, value_genre_appli){	
						
						
								var option_avapres = $('#id_avapres_webradio_'+value_genre_appli+' option:selected');

								var data_wr_placement = new Object();
								data_wr_placement.id_webradio = _marque._cur_marque_pk;
								
								if(option_avapres[0].text == '-'){
									data_wr_placement.avantapres = -1;
								}else{
									data_wr_placement.avantapres = $("#id_avapres_webradio_"+value_genre_appli).val();
								}
								
								
								data_wr_placement.id_webradio_avantapres = $("#id_placement_webradio_"+value_genre_appli).val();
								data_wr_placement.id_genre_application = value_genre_appli;
								data_wr_placement_list.push(data_wr_placement);
							}
						);
						
						
						data_wr.wrPlacement=data_wr_placement_list;
						
						
						if(isOk == true){
							$.ajax(_marque.host+'/webradio', {
								data: JSON.stringify(data_wr),
								timeout: 500,     // timeout milliseconds
								method: "POST",
								contentType: "application/json",
								async: false,
								success: function (data_wrinserted,status,xhr) {   // success callback function
									_marque.fill_brand_sel();
									_marque.fill_country_sel();
									_marque.fill_genre_application_sel();
									_marque.fill_genre_orange_sel();
									_marque.fill_genre_itunes_sel();		   
									_marque.get_all_webradio();
									
									
									
									_marque.enable_button_edit_delete(false);
									_marque.enable_edit_form(false);
									_marque.reset_edit_form();
									e.preventDefault();
									$('#nav_tabs a[href="#alphanum"]').tab('show');
									_marque._mode = -1;
									
									_marque.reset_edit_form_checkbox();
									
									
								},
								error: function (jqXhr, textStatus, errorMessage) { // error callback 
									_marque.fill_brand_sel();
									_marque.fill_country_sel();
									_marque.fill_genre_application_sel();
									_marque.fill_genre_orange_sel();
									_marque.fill_genre_itunes_sel();		   
									_marque.get_all_webradio();
									
									
									
									_marque.enable_button_edit_delete(false);
									_marque.enable_edit_form(false);
									_marque.reset_edit_form();
									e.preventDefault();
									$('#nav_tabs a[href="#alphanum"]').tab('show');
									_marque._mode = -1;
									
									_marque.reset_edit_form_checkbox();
									
								}
							});
						}
						
						
					}	
				}
		}
	});
	
	
	$("#cancel_edt_button_alpha").click(function(e){
		_marque.enable_button_edit_delete(false);
		_marque.enable_edit_form(false);
		_marque.reset_edit_form();
		e.preventDefault();
		$('#nav_tabs a[href="#alphanum"]').tab('show');
		_marque._mode = -1;
		
		
		
		
		$('#liste_webradios_radio tr').each(function(){
			$(this).css('color', '#797979');
			$(this).css('font-weight', 'bold');
			$(this).removeClass("table-danger-wr");
		});
	});
	$("#cancel_edt_button_pla").click(function(e){
		_marque.enable_button_edit_delete(false);
		_marque.enable_edit_form(false);
		_marque.reset_edit_form();
		e.preventDefault();
		$('#nav_tabs a[href="#alphanum"]').tab('show');
		_marque._mode = -1;
		
		
		
		
		$('#liste_webradios_radio tr').each(function(){
			$(this).css('color', '#797979');
			$(this).css('font-weight', 'bold');
			$(this).removeClass("table-danger-wr");
		});
	});
	
	$("#offline_checkbox").change(function() { 
		_marque.enable_button_edit_delete(false);
		_marque.enable_edit_form(false);
		_marque.reset_edit_form();
		if(_marque._mode == _marque._modes.indexOf('CREATE_WEBRADIO')  || _marque._mode == _marque._modes.indexOf('EDIT_WEBRADIO')){
			$('#erreur_container_modal').text("Une fiche est en cours de modification, veuillez cliquer sur annuler tout d'abord SVP!");
			$('#erreur_container_modal_modal').modal('show');
		}else{
			if($(this).prop("checked")) {
				_marque.offline_checkboxval = 1;
				$("#prochainementcheckboxlabel").text("");
				$("#prochainementcheckboxdiv").hide();
			}else{
				_marque.offline_checkboxval = -1;
				$("#prochainementcheckboxlabel").text("Prochaienement");
				$("#prochainementcheckboxdiv").show();
			}
			
			_marque.get_all_webradio_filtre();			
		}
	
		
		
		
	});
	$("#sanspubcheckbox").change(function() { 
	
		_marque.reset_edit_form();
		_marque.enable_button_edit_delete(false);
		_marque.enable_edit_form(false);
		if(_marque._mode == _marque._modes.indexOf('CREATE_WEBRADIO')  || _marque._mode == _marque._modes.indexOf('EDIT_WEBRADIO')){
			$('#erreur_container_modal').text("Une fiche est en cours de modification, veuillez cliquer sur annuler tout d'abord SVP!");
			$('#erreur_container_modal_modal').modal('show');
		}else{
			if($(this).prop("checked")) {
				_marque.sanspubcheckboxval = 1;
			}else{
				_marque.sanspubcheckboxval = -1;
			}
			_marque.get_all_webradio_filtre();
			
		}
	
		
	});
	$("#prochainementcheckbox").change(function() { 
	
	
		_marque.reset_edit_form();
		_marque.enable_button_edit_delete(false);
		_marque.enable_edit_form(false);
		if(_marque._mode == _marque._modes.indexOf('CREATE_WEBRADIO')  || _marque._mode == _marque._modes.indexOf('EDIT_WEBRADIO')){
			$('#erreur_container_modal').text("Une fiche est en cours de modification, veuillez cliquer sur annuler tout d'abord SVP!");
			$('#erreur_container_modal_modal').modal('show');
		}else{
			if($(this).prop("checked")) {
				_marque.prochainementcheckboxval = 1;
				$("#offline_checkboxlabel").text("");
				$("#offline_checkboxdiv").hide();
			}else{
				_marque.prochainementcheckboxval = -1;
				$("#offline_checkboxlabel").text("Offline");
				$("#offline_checkboxdiv").show();
			}
			_marque.get_all_webradio_filtre();
			
			
			
		}
		
		
	});
	
	
	
	
	
});




function Marque(){
	
	
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
	
	this.highlited_1_boolean = false;
	this.highlited_2_boolean = false;
	this.highlited_3_boolean = false;
	this.highlited_4_boolean = false;
	
	this.list_highlited_webradio = [];
	
	this.arraymarque = new Array();
	this.array_highlited_webradio = new Array();
	//this.host = "http://"+window.location.hostname+":8003";
	this.host = "http://localhost:8003";
	this._cur_marque_pk=-1;
	this._cur_marque_obj;
	this.selected_genre_application=[];
	this.selected_webradio_bygenre=[];
	this.selected_webradio_bygenre_avapres=[];
	this.date_debut_modal_val = "";
	this._modes = ['CREATE_WEBRADIO','EDIT_WEBRADIO','SUPP_WEBRADIO'];
    
}


Marque.prototype.fill_brand_sel = function(){
	var str = "";
	
	$.getJSON( _marque.host+'/get_all_brand/'+parseInt(sessionStorage.val_sel_country),
		function( data ) 
		{
			$.each(data, function(key, value){
				if((_marque.array_brand).indexOf(""+value.id)!=-1){
					str += '<option value="'+value.id+'" >' + value.name.toUpperCase() + '</option>';
				}
			});
			$("#sel_brand")
			.html(str)
			.on('change', function(){
				if(_marque.highlited_1_boolean == true || _marque.highlited_2_boolean == true || _marque.highlited_3_boolean == true || _marque.highlited_4_boolean == true ){
					alert("Mise en avant est en cours de modification, merci d'enregistrer ou annuler les modifications");
				}else{
					sessionStorage.val_sel_brand = this.value;
					_marque.get_all_webradio();
					_marque.reset_edit_form();
					_marque.fill_genre_application_sel();
					_marque.get_all_webradio_highlited();
				}
				
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





Marque.prototype.fill_country_sel = function(){
	
	var acl = "";
	var arr_acl = "";
	var str_bob_brand = "";
	var arr_bob_brand = [];
	var str_brand = "";
	
	_marque.array_country = [];
	_marque.array_brand = [];
	
	$.getJSON( _marque.host+'/get_all_acl/'+parseInt(_marque.id_user),
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
						_marque.array_brand = str_brand.split(',');
					}
				})
				
				var str = "";
	
				$.getJSON( _marque.host+'/get_all_country/'+str_brand,
					function( data ) 
					{
						$.each(data, function(key, value){
							_marque.array_country.push(value.id);
							str += '<option value="'+value.id+'">' + value.name.toUpperCase() + '</option>';
						});
						$("#sel_country")
						.html(str)
						.on('change', function(){
							sessionStorage.val_sel_country = this.value;
							sessionStorage.val_sel_brand = -1;
							_marque.fill_brand_sel();
							_marque.reset_edit_form();
							_marque.reset_all_webradio();
						});
						if(sessionStorage.val_sel_country !== null){
							$("#sel_country").val(sessionStorage.val_sel_country);
							_marque.fill_brand_sel();
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



Marque.prototype.formatDateConvert = function(date) {
     var d = new Date(date),
         month = '' + (d.getMonth() + 1),
         day = '' + d.getDate(),
         year = d.getFullYear();

     if (month.length < 2) month = '0' + month;
     if (day.length < 2) day = '0' + day;

     return [day,month,year].join('/');
};


Marque.prototype.formatDateConvertTire = function(date) {
     var d = new Date(date),
         month = '' + (d.getMonth() + 1),
         day = '' + d.getDate(),
         year = d.getFullYear();

     if (month.length < 2) month = '0' + month;
     if (day.length < 2) day = '0' + day;

     return year+"-"+month+"-"+day+"T23:59:59";
};


Marque.prototype.formatDateConvertTireDate = function(date) {
     var d = new Date(date),
         month = '' + (d.getMonth() + 1),
         day = '' + d.getDate(),
         year = d.getFullYear();

     if (month.length < 2) month = '0' + month;
     if (day.length < 2) day = '0' + day;

     return year+"-"+month+"-"+day;
};


Marque.prototype.formatDateConvertTireNow = function(date) {
     var d = new Date(date),
         month = '' + (d.getMonth() + 1),
         day = '' + d.getDate(),
         year = d.getFullYear(),
		 hour = d.getHours(),
		 minute = d.getMinutes();

     if (month.length < 2) month = '0' + month;
     if (day.length < 2) day = '0' + day;
     if (hour.length < 2) hour = '0' + hour;
     if (minute.length < 2) minute = '0' + minute;

     return year+"-"+month+"-"+day+"T"+hour+":"+minute+":59";
};




Marque.prototype.enable_edit_form = function(enabled){
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
Marque.prototype.enable_edit_webradio_highlited = function(enabled){
	enabled ? $("#date_action_highlited :input").prop("disabled", false): $("#date_action_highlited :input").prop("disabled",true);
	enabled ? $("#confirm_highlited").prop("disabled", false): $("#confirm_highlited").prop("disabled",true);
	enabled ? $("#cancel_highlited").prop("disabled", false): $("#cancel_highlited").prop("disabled",true);
	
};

Marque.prototype.enable_edit_form_supp = function(enabled){
	$('#controle_date_valider').text("");
	enabled ? $("#date_fin :input").prop("disabled", false) : $("#date_fin :input").prop("disabled", true);
	enabled ? $("#suivant_button").removeClass( "invisible" ) : $("#suivant_button").addClass( "invisible" );
	enabled ? $("#cancel_edt_button_pla").removeClass( "invisible" ) : $("#cancel_edt_button_pla").addClass( "invisible" );
	enabled ? $("#cancel_edt_button_alpha").removeClass( "invisible" ) : $("#cancel_edt_button_alpha").addClass( "invisible" );
};


Marque.prototype.enable_edit_form_ss_date = function(enabled){
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



Marque.prototype.enable_edit_placement_form = function(enabled,pk_wr){
	enabled ? $("#id_avapres_webradio_"+pk_wr).removeAttr( "disabled" ) : $("#id_avapres_webradio_"+pk_wr).attr( "disabled", true );
	enabled ? $("#id_placement_webradio_"+pk_wr).removeAttr( "disabled" ) : $("#id_placement_webradio_"+pk_wr).attr( "disabled", true );
};



Marque.prototype.enable_sanspub_prochainement = function(enabled){
	enabled ? $("#sanspubcheckboxdiv").show() : $("#sanspubcheckboxdiv").hide();
	enabled ? $("#prochainementcheckboxdiv").show() : $("#prochainementcheckboxdiv").hide();

	!enabled ? $("#offline_checkboxdiv").show() : $("#offline_checkboxdiv").hide();
};

Marque.prototype.enable_offline_sanspub = function(enabled){
	enabled ? $("#offline_checkboxdiv").show() : $("#offline_checkboxdiv").hide();
	enabled ? $("#sanspubcheckboxdiv").show() : $("#sanspubcheckboxdiv").hide();
	
	!enabled ? $("#prochainementcheckboxdiv").show() : $("#prochainementcheckboxdiv").hide();
};

Marque.prototype.enable_allcheckbox = function(enabled){
	enabled ? $("#sanspubcheckbox").removeAttr( "disabled" ) : $("#sanspubcheckbox").attr( "disabled", true );
	enabled ? $("#prochainementcheckbox").removeAttr( "disabled" ) : $("#prochainementcheckbox").attr( "disabled", true );
	enabled ? $("#offline_checkbox").removeAttr( "disabled" ) : $("#offline_checkbox").attr( "disabled", true );
};




Marque.prototype.reset_edit_form = function(){
	$('#controle_date_valider').text("");
	_marque.selected_webradio_bygenre_avapres=[];
	_marque.selected_webradio_bygenre=[];
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
	_marque.wr_created_by_wr =  "";
	
};

Marque.prototype.reset_edit_form_checkbox = function(){
	document.location.reload(true);
	
};


Marque.prototype.fill_genre_application_sel = function(){
	var str = "";
	var brand = sessionStorage.val_sel_brand;	
	var country = sessionStorage.val_sel_country;
	$.getJSON( _marque.host+'/get_genre_application/'+country+'/'+brand,
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

Marque.prototype.fill_genre_orange_sel = function(){
	var str = "<option value=''>- </option>";
	var str_ssgenre = "<option value=''>- </option>";
	var brand = sessionStorage.val_sel_brand;	
	var country = sessionStorage.val_sel_country;
	$.getJSON( _marque.host+'/get_genre_orange',
		function( data ) 
		{
			$.each(data, function(key, value){
				str += '<option value="'+value.id+'">' + value.genre_name + '</option>';
			});
			$("#genre_orange_select")
			.html(str)
			.on('change', function(){
				if(this.value != ""){
					$.getJSON( _marque.host+'/get_sous_genre_orange/'+parseInt(this.value),
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

Marque.prototype.fill_genre_itunes_sel = function(){
	var str = "<option value=''>- </option>";
	$.getJSON( _marque.host+'/get_genre_itunes',
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


Marque.prototype.get_brand_sel = function(){
	if (sessionStorage.val_sel_brand) {
		sessionStorage.val_sel_brand
		return sessionStorage.val_sel_brand;
	} else{
		sessionStorage.val_sel_brand = $("#sel_brand option:selected").val();
    	return $("#sel_brand option:selected").val();
    }
};

Marque.prototype.get_country_sel = function(){
	if (sessionStorage.val_sel_country) {
		sessionStorage.val_sel_country
		return sessionStorage.val_sel_country;
	} else{
		sessionStorage.val_sel_country = $("#sel_country option:selected").val();
    	return $("#sel_country option:selected").val();
    }
};



Marque.prototype.reset_all_webradio = function(){
	$('#liste_webradios_radio > tbody').empty();
	$('#liste_webradios_radio > tbody:last').append('Choisissez une marque svp');

};


Marque.prototype.enable_button_edit_delete = function(enabled){
	enabled ? $("#btn_edit").removeClass( "invisible" ) : $("#btn_edit").addClass( "invisible" );
	enabled ? $("#btn_delete").removeClass( "invisible" ) : $("#btn_delete").addClass( "invisible" );
};



Marque.prototype.enable_button_delete_up_down_highlited = function(enabled){
	enabled ? $("#btn_delete_highlited").removeClass( "invisible" ) : $("#btn_edit").addClass( "invisible" );
	enabled ? $("#btn_up_highlited").removeClass( "invisible" ) : $("#btn_edit").addClass( "invisible" );
	enabled ? $("#btn_down_highlited").removeClass( "invisible" ) : $("#btn_edit").addClass( "invisible" );
};



Marque.prototype.enable_retour_valider_button = function(enabled){
	enabled ? $("#valider_button").removeClass( "invisible" ) : $("#valider_button").addClass( "invisible" );
};

Marque.prototype.enable_placement_button = function(enabled){
	enabled ? $("#placement_button").removeClass( "invisible" ) : $("#placement_button").addClass( "invisible" );
};

//suivant_buttonretour_buttonvalider_buttoncancel_edt_button

Marque.prototype.fill_table_placement = function(){
	
	var returnvalue = "";
	
	$('#table_placement > tbody').empty();
	$('#table_placement > tbody:last').append('Chargement des données');
	var Ylistq = 0;
	Ylistq = $("#table_placement").parent().parent().offset().top;
	$("#table_placement >  tbody").css('max-height', $( window ).height() - Ylistq - 100);
	$('#table_placement > tbody').empty();
	$.each(_marque.selected_genre_application, function(key_genre_appli, value_genre_appli){
		var url = _marque.host+'/get_genre_application/'+value_genre_appli;
		$.getJSON( url,	function( data ) 
		{
			$.each(data, function(key, value){
				_marque.fill_webradiobygenre(value.pk);
				$('#table_placement').append(
						'<tr class="clickable-row unread " id="' + value.pk + '">' +
							'<td style="width: 25%"><p style="font-weight:bold;">' + value.genre_name + '</p></td>' +
							'<td style="width: 20%; background: ' + value.color + ';"><p style="font-weight:bold; color:black">'+_marque.checkifcolorisnull(value.color)+'</p></td>' +
							'<td style="width: 25%"><select name="id_avapres_webradio_' + value.pk + '" id="id_avapres_webradio_' + value.pk + '" required="required" style="width: 100%" class="js-example-responsive"><option value="">- </option><option value="0">Avant</option><option value="1">Après</option></select></td>' +
							'<td style="width: 30%"><select name="id_placement_webradio_' + value.pk + '" id="id_placement_webradio_' + value.pk + '" required="required" style="width: 100%" class="js-example-responsive"></select></td>' +
						'</tr>'
				);
				
				
			});
		});
	})
};


Marque.prototype.checkifcolorisnull = function(color){
	if(color!=null){
		return color;
	}else{
		return "";
	}
};

Marque.prototype.fill_table_placement_enable = function(enabled){
	
	var returnvalue = "";
	
	$('#table_placement > tbody').empty();
	$('#table_placement > tbody:last').append('Chargement des données');
	var Ylistq = 0;
	Ylistq = $("#table_placement").parent().parent().offset().top;
	$("#table_placement >  tbody").css('max-height', $( window ).height() - Ylistq - 100);
	$('#table_placement > tbody').empty();
	$.each(_marque.selected_genre_application, function(key_genre_appli, value_genre_appli){
		var url = _marque.host+'/get_genre_application/'+value_genre_appli;
		$.getJSON( url,	function( data ) 
		{
			$.each(data, function(key, value){
				_marque.fill_webradiobygenre(value.pk);
				$('#table_placement').append(
						'<tr class="clickable-row unread " id="' + value.pk + '">' +
							'<td style="width: 25%"><p style="font-weight:bold;">' + value.genre_name + '</p></td>' +
							'<td style="width: 20%; background: ' + value.color + ';"><p style="font-weight:bold; color:black">' + _marque.checkifcolorisnull(value.color) + '</p></td>' +
							(enabled ? '<td style="width: 25%"><select name="id_avapres_webradio_' + value.pk + '" id="id_avapres_webradio_' + value.pk + '" required="required" style="width: 100%" class="js-example-responsive"><option value="-1">- </option><option value="0">Avant</option><option value="1">Après</option></select></td>' : '<td style="width: 25%"><select disabled name="id_avapres_webradio_' + value.pk + '" id="id_avapres_webradio_' + value.pk + '" required="required" style="width: 100%" class="js-example-responsive"><option value="-1">- </option><option value="0">Avant</option><option value="1">Après</option></select></td>') +
							(enabled ? '<td style="width: 30%"><select name="id_placement_webradio_' + value.pk + '" id="id_placement_webradio_' + value.pk + '" required="required" style="width: 100%" class="js-example-responsive"></select></td>' : '<td style="width: 30%"><select disabled name="id_placement_webradio_' + value.pk + '" id="id_placement_webradio_' + value.pk + '" required="required" style="width: 100%" class="js-example-responsive"></select></td>' )+
						'</tr>'
				);
				
				
			});
		});
	})
};

Marque.prototype.fill_webradiobygenre = function(id_genre_appli){
	var str = "<option value=''>- </option>";
	var brand = sessionStorage.val_sel_brand;	
	var country = sessionStorage.val_sel_country;
	var checkList_webradio = [];//On rajoute ici la webradio selectioné
	var checkList = [];
	
	
	
	$.getJSON( _marque.host+'/get_all_webradios_by_genre/'+country+'/'+brand+'/'+id_genre_appli,
		function( data ) 
		{
			$.each(data, function(key, value){
				
				if(value.pk != _marque._cur_marque_pk){
					str += '<option value="'+value.pk+'">' + value.nom_wr + '</option>';
				}
				
			});
			$("#id_placement_webradio_"+id_genre_appli)
			.html(str);
			
			$("#id_placement_webradio_"+id_genre_appli).on("select2:select", function(e) { 
				if(e.params.data.text!=""){
					_marque.selected_webradio_bygenre[id_genre_appli]=e.params.data.id;
				}
			});
			checkList_webradio = [];			
			checkList_webradio.push(_marque.selected_webradio_bygenre[id_genre_appli]);
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
					_marque.selected_webradio_bygenre_avapres[id_genre_appli]=e.params.data.id;
				}
			});
			checkList = [];
			checkList.push(_marque.selected_webradio_bygenre_avapres[id_genre_appli]);
			$("#id_avapres_webradio_"+id_genre_appli).select2({
				width: 'resolve' ,
				templateResult: function (data, container) {
				  return data.text;
				},
				templateSelection: function (data, container) {
				  return data.text;
				}
			}).val(checkList).trigger("change");
			
			
			/*if(_marque.selected_webradio_bygenre[id_genre_appli] != null){
				$("#id_placement_webradio_"+id_genre_appli).val(_marque.selected_webradio_bygenre[id_genre_appli]);
			}*/
		}
	);
};

Marque.prototype.get_all_webradio = function(){
	
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
	
	var url = _marque.host+'/get_all_webradios/'+country+'/'+brand;
	
	$.getJSON( url,	function( data ) 
	{
		
		$('#liste_webradios_radio > tbody').empty();
		_marque.arraymarque = [];
		$('#liste_webradios_radio_text').text('Liste des webradios Online :');
		_marque.arraymarque=data;
		$.each(_marque.arraymarque, function(key, value){
			$('#liste_webradios_radio > tbody:last').append(
					'<tr class="clickable-row unread " id="' + value.pk + '">' +
						'<td><p style="font-weight:bold;">' + value.nom_wr + '</p></td>' +
					'</tr>'
			);
			
			
		});
	});
	
};


Marque.prototype.get_all_webradio_highlited = function(){

	if(sessionStorage.val_sel_country==null){
		sessionStorage.val_sel_country = 1;
	}
	if(sessionStorage.val_sel_brand==null){
		sessionStorage.val_sel_brand = 1;
	}
	var brand = sessionStorage.val_sel_brand;	
	var country = sessionStorage.val_sel_country;
	
	_marque.list_highlited_webradio = [];
	
	url = _marque.host+'/get_webradios_highlited/'+country+'/'+brand;
	$.ajax({
	  url: url,
	  //dataType: 'json',
	  async: false,
	  success: function(data) {
		  
		  $.each(data, function(key, value){
			  checkList_highlited = [];
			  checkList_highlited.push(value.pk);
			  keyplus = key+1;
			  _marque.list_highlited_webradio[keyplus] = value.pk;
			  $("#highlited_webradio"+keyplus).select2({
					width: 'resolve' ,
					templateResult: function (data, container) {
					  return data.text;
					},
					templateSelection: function (data, container) {
						return data.text;
					}
			  }).val(checkList_highlited).trigger("change");
		  });
		  
	  }
	});
	
	
	$("#highlited_webradio1")
	.html(_marque.get_str_get_all_webradios(1,country,brand));
	$("#highlited_webradio2")
	.html(_marque.get_str_get_all_webradios(2,country,brand));
	$("#highlited_webradio3")
	.html(_marque.get_str_get_all_webradios(3,country,brand));
	$("#highlited_webradio4")
	.html(_marque.get_str_get_all_webradios(4,country,brand));



	_marque.list_highlited_webradio = [];
	
	url = _marque.host+'/get_webradios_highlited/'+country+'/'+brand;
	$.ajax({
	  url: url,
	  //dataType: 'json',
	  async: false,
	  success: function(data) {
		  
		  $.each(data, function(key, value){
			  checkList_highlited = [];
			  checkList_highlited.push(value.pk);
			  keyplus = key+1;
			  _marque.list_highlited_webradio[keyplus] = value.pk;
			  $("#highlited_webradio"+keyplus).select2({
					width: 'resolve' ,
					templateResult: function (data, container) {
					  return data.text;
					},
					templateSelection: function (data, container) {
						return data.text;
					}
			  }).val(checkList_highlited).trigger("change");
		  });
		  
	  }
	});
	
};

Marque.prototype.get_str_get_all_webradios = function(valuehighlited,country,brand){
	
	var list_wr = [];
	
	for (var i = 1; i<5; i++) {
		if(i !== valuehighlited){
			list_wr.push(_marque.list_highlited_webradio[i]);
		}
	}
	
	var url = _marque.host+'/get_all_webradios/'+country+'/'+brand;
	var str = '<option value="-1">- </option>'; 
	$.ajax({
	  url: url,
	  //dataType: 'json',
	  async: false,
	  success: function(data) {
		    
		$.each(data, function(key, value){
			if(list_wr.indexOf(value.pk) === -1){
				str += '<option value="'+value.pk+'">' + value.nom_wr + '</option>';
			}
		});
	  }
	});
	return str;
}

Marque.prototype.get_select_all_webradios_highlited = function(valuehighlited,country,brand){
	
	
	
	for (var i = 1; i<5; i++) {
		if(i !== valuehighlited){
			$("#highlited_webradio"+i)
			.html(_marque.get_str_get_all_webradios(i,country,brand));
		}
	}
	
	
	
	for (var i = 1; i<5; i++) {
		if(i !== valuehighlited){
			var arrayCheck = [];
			arrayCheck.push(_marque.list_highlited_webradio[i]);
			$("#highlited_webradio"+i).select2({
				width: 'resolve' ,
				templateResult: function (data, container) {
				  return data.text;
				},
				templateSelection: function (data, container) {
					return data.text;
				}
			}).val(arrayCheck).trigger("change");
		}
	}
}

Marque.prototype.get_all_webradio_filtre = function(){
	
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
	
	
	if(_marque.offline_checkboxval == 1 || _marque.prochainementcheckboxval == 1 || _marque.sanspubcheckboxval == 1){
		$('#liste_webradios_radio > tbody').empty();
		$('#liste_webradios_radio_text').text('');
		_marque.arraymarque = [];
		_marque.array_wr_liste_webradios_radio = [];
	}else{
		_marque.get_all_webradio();
	}
	
	
	
	if(_marque.offline_checkboxval == 1){
		url = _marque.host+'/get_all_webradios_inactive/'+country+'/'+brand;
		$('#liste_webradios_radio tr').each(function(){
			_marque.array_wr_liste_webradios_radio.push($(this).attr("id"));
		});
		
		
		
		$.ajax({
		  url: url,
		  //dataType: 'json',
		  async: false,
		  success: function(data) {
			$.each(data, function(key, value){
				_marque.arraymarque.push(value);
			})
			
			
			$.each(_marque.arraymarque, function(key, value){
				if(_marque.array_wr_liste_webradios_radio.indexOf(value.pk) == -1){
					
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
	
	if(_marque.sanspubcheckboxval == 1){
		
		url = _marque.host+'/get_all_webradios_sanspub/'+country+'/'+brand;
		$('#liste_webradios_radio tr').each(function(){
			_marque.array_wr_liste_webradios_radio.push($(this).attr("id"));
		});
		$.ajax({
		  url: url,
		  //dataType: 'json',
		  async: false,
		  success: function(data) {
			$.each(data, function(key, value){
				_marque.arraymarque.push(value);
			})
			
			
			$.each(_marque.arraymarque, function(key, value){
				if(_marque.array_wr_liste_webradios_radio.indexOf(value.pk) == -1){
					
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
	
	if(_marque.prochainementcheckboxval == 1){
		
		
		
		url = _marque.host+'/get_all_webradios_prochainement/'+country+'/'+brand;
		$('#liste_webradios_radio tr').each(function(){
			_marque.array_wr_liste_webradios_radio.push($(this).attr("id"));
		});
		$.ajax({
		  url: url,
		  //dataType: 'json',
		  async: false,
		  success: function(data) {
			$.each(data, function(key, value){
				_marque.arraymarque.push(value);
			})
			
			
			$.each(_marque.arraymarque, function(key, value){
				if(_marque.array_wr_liste_webradios_radio.indexOf(value.pk) == -1){
					
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
	
	if(_marque.offline_checkboxval == 1 && _marque.sanspubcheckboxval == 1){
		_marque.arraymarque = [];
		$('#liste_webradios_radio > tbody').empty();
		url = _marque.host+'/get_all_webradios_inactive_sanspub/'+country+'/'+brand;
	
		$.ajax({
		  url: url,
		  //dataType: 'json',
		  async: false,
		  success: function(data) {
			$.each(data, function(key, value){
				_marque.arraymarque.push(value);
			})
			
			
			$.each(_marque.arraymarque, function(key, value){
				if(_marque.array_wr_liste_webradios_radio.indexOf(value.pk) == -1){
					
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
	
	if(_marque.prochainementcheckboxval == 1 && _marque.sanspubcheckboxval == 1){
		_marque.arraymarque = [];
		$('#liste_webradios_radio > tbody').empty();
		url = _marque.host+'/get_all_webradios_sanspub_prochainement/'+country+'/'+brand;
	
		$.ajax({
		  url: url,
		  //dataType: 'json',
		  async: false,
		  success: function(data) {
			$.each(data, function(key, value){
				_marque.arraymarque.push(value);
			})
			
			
			$.each(_marque.arraymarque, function(key, value){
				if(_marque.array_wr_liste_webradios_radio.indexOf(value.pk) == -1){
					
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