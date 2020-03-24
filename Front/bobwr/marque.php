<?PHP require_once('../nav_top.php');?>
<?php
//var_dump ($_SESSION);
$_SESSION["id_user"] = 1;
?>

	<style>.moussehover {cursor: pointer;}</style>
	
	<link href="https://cdn.jsdelivr.net/npm/select2@4.0.13/dist/css/select2.min.css" rel="stylesheet" />
	<script src="https://cdn.jsdelivr.net/npm/select2@4.0.13/dist/js/select2.min.js"></script>
	<style>
		.scroll tbody {
		  display: block;
		  
		  overflow-y: scroll;
		}

		.scroll 
		tbody tr {
		  display: table;
		  width: 100%;
		  table-layout: fixed;
		}
		
		
		.table-danger-wr td{
		  background-color: #d9534f;
		}
			
	</style>
	
    <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">
    <link href="css/prettify-1.0.css" rel="stylesheet">
    <link href="css/base.css" rel="stylesheet">
	
    <link href="//cdn.rawgit.com/Eonasdan/bootstrap-datetimepicker/e8bddc60e73c1ec2475f827be36e1957af72e2ea/build/css/bootstrap-datetimepicker.css" rel="stylesheet">
	
    <script src="//cdnjs.cloudflare.com/ajax/libs/moment.js/2.9.0/moment-with-locales.js"></script>


    <script src="//cdnjs.cloudflare.com/ajax/libs/bootstrap-datetimepicker/4.17.47/js/bootstrap-datetimepicker.min.js"></script>
	
	<script>
		sessionStorage.val_id_user = <?php echo $_SESSION["id_user"]; ?>;
	</script>
	<script src="js/marque.js"></script>
	<script src="js/bootstrap-switch.js"></script>
	<h3><select class="js-example-responsive" id="sel_country" name="sel_country" style="width: 10%"></select> <select class="js-example-responsive" id="sel_brand" name="sel_brand" style="width: 15%"></select></h3>
	<hr>
	
	<div class="nav-tabs-navigation">
		<div class="nav-tabs-wrapper md-tabs ">
			<ul class="nav nav-tabs nav-justified" id="nav_tabs" data-tabs="tabs">
				<li class="active">
				  <a href="#webradio" data-toggle="tab">
					<i><img src="https://img.icons8.com/ios/50/000000/radio-2.png" style=" width: 20px;"/>  Gestion des webradios</i> 
				  </a>
				</li>
				<li>
				  <a class="nav-link" href="#highlited" data-toggle="tab">
					<i class="fa fa-tag">  Highlited</i> 
				  </a>
				</li>
			</ul>
		</div>
	</div>
	
	
	<div class="tab-content">
        <div class="tab-pane active" id="webradio">
			<div class="row mt">
			  <div class="col-sm-3">
				<section class="panel">
				  <div class="panel-body" id = "divtablewr">
					<form>
						<div class="form-group" action="">
							<button type="button" id="btn_new" class="btn btn-raised btn-success">Cr&eacute;er</button>
							<button type="button" id="btn_edit" class="btn btn-raised btn-info invisible">Editer</button>
							<button type="button" id="btn_delete" class="btn btn-raised btn-danger invisible">Suppression</button>
						</div>
						<div class="form-group" action="">
						
						
							<table>
								<tr>
									<td><label class="form-check-label" id="offline_checkboxlabel" for="offline_checkbox">Offline</label> &nbsp;&nbsp;</td>
									<td>
										<div class="switch has-switch" id="offline_checkboxdiv" style="width: 60px;">	
											<input class="form-check-input"  type="checkbox" id="offline_checkbox">
										</div>&nbsp;&nbsp;	
									</td>
									<td><label class="form-check-label" id="prochainementcheckboxlabel" for="prochainementcheckbox">Prochaienement</label>&nbsp;&nbsp;</td>
									<td>
										&nbsp;
										<div class="switch has-switch " id="prochainementcheckboxdiv" style="width: 60px;">	
											<input class="form-check-input"  type="checkbox" id="prochainementcheckbox">
										</div>	&nbsp;&nbsp;
									</td>
								</tr>
								<tr>

									<td><label class="form-check-label" id="sanspubcheckboxlabel" for="sanspubcheckbox"> Sans Pub</label>&nbsp;&nbsp;</td>
									<td>
										<div class="switch has-switch" id="sanspubcheckboxdiv"  style="width: 60px;">	
											<input class="form-check-input"  type="checkbox" id="sanspubcheckbox">
										</div>	&nbsp;&nbsp;
									</td>

								</tr>		
							</table>
						</div>
					</form>
					<h2 id="liste_webradios_radio_text"></h2>
					<table class="table table-hover scroll" id="liste_webradios_radio">
						<thead>
						</thead>
						<tbody>
						</tbody>
					</table>
					
				  </div>
				</section>
			  </div>
			  <div class="col-sm-9">
				<section class="panel">
				  <header class="panel-heading wht-bg">
					<h4 class="card-title">Edition/Cr&eacute;ation de webradio</h4>
					<div class="nav-tabs-navigation">
					<div class="nav-tabs-wrapper md-tabs ">
						<ul class="nav nav-tabs nav-justified" id="nav_tabs" data-tabs="tabs">
							<li class="active">
							  <a href="#alphanum" data-toggle="tab">
								<i class="fa fa-list-ol">  Fiche</i> 
							  </a>
							</li>
							<li>
							  <a class="nav-link" href="#placement" data-toggle="tab">
								<i class="fa fa-sort-amount-desc">  Placement</i> 
							  </a>
							</li>
						</ul>
					</div>
					</div>
				  </header>
				  <div class="panel-body">
					  <div class="tab-content">
							<div class="tab-pane active" id="alphanum">
							  <form>
							  
								<div class="row">
								  <div class="col-md-9">
									<div class="form-group">
									  <label class="bmd-label-floating">Nom de la Webradio :</label>
									  <input type="text" id="nom_webradio" required="required" class="form-control" disabled>
									</div>
								  </div>
								</div>
								<div class="row">
								  <div class="col-md-9">
									<div class="form-group">
									  <label class="bmd-label-floating">Claim :</label>
									  <input type="input" id="claim" required="required" class="form-control" disabled>
									</div>
								  </div>
								</div>
								<div class="row">
								  <div class="col-md-4">
									<div class="form-group">
										<label class="bmd-label-floating">Pub : </label>
										<select class="js-example-responsive" id="pub" required="required" style="width: 100%" disabled>
											<option value="">- </option>
											<option value="true">Avec</option>
											<option value="false">sans</option>
										</select>
									</div>
								  </div>
								  <div class="col-md-4">
									<div class="form-group">
									  <label class="bmd-label-floating">ID Pressplay :</label>
									  <input type="text" id="id_pressplay" required="required" class="form-control" disabled>
									</div>
								  </div>
								</div>
								<div class="row">
								  <div class="col-md-9">
									<div class="form-group">
										<label class="bmd-label-floating">Genre Application : </label>
										<select class="js-example-responsive" id="genre_application_select" multiple="multiple" required="required" style="width: 70%" disabled>
											<option value="">- </option>
										</select>
									</div>
								  </div>
								</div>
								<div class="row">
								  <div class="col-md-4">
									<div class="form-group">
										<label class="bmd-label-floating">Genre Orange : </label>
										<select class="js-example-responsive" id="genre_orange_select" required="required" style="width: 70%" disabled>
											<option value="">- </option>
										</select>
									</div>
								  </div>
								  <div class="col-md-4">
									<div class="form-group">
										<label class="bmd-label-floating">Sous Genre Orange : </label>
										<select class="js-example-responsive" id="sous_genre_orange_select" required="required" style="width: 60%" disabled>
											<option value="">- </option>
										</select>
									</div>
								  </div>
								  <div class="col-md-4">
									<div class="form-group">
										<label class="bmd-label-floating">Genre Itunes : </label>
										<select name="genre_itunes_select" id="genre_itunes_select" required="required" class="js-example-responsive"style="width: 70%" disabled>
											<option value="">-</option>	
										</select>
									</div>
								  </div>
								</div>
								<div class="row">
								
									<div class="col-md-12">
										<div class="form-group">
											<label class="bmd-label-floating">Date Début / Date Fin : </label>
											<div class="container">
												<div class='col-md-5'>
													<div class="form-group">
														<div class='input-group date' id='date_debut'>
															<input type='text' class="form-control"  disabled />
															<span class="input-group-addon">
																<span class="glyphicon glyphicon-calendar"></span>
															</span>
														</div>
													</div>
												</div>
												
												<div class='col-md-5'>
													<div class="form-group">
														<div class='input-group date' id='date_fin' >
															<input type='text' class="form-control" disabled />
															<span class="input-group-addon">
																<span class="glyphicon glyphicon-calendar"></span>
															</span>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>	


									<div id="controle_date_suivant" style="color:red; font-weight:bold;"></div>
								</div>
								
							  
							  </form>
							  
								<button id="cancel_edt_button_alpha" class="btn btn-primary pull-middle invisible">Annuler</button>
								<button id="suivant_button" class="btn btn-primary pull-right invisible">Suivant</button>
							</div>
							
							<div class="tab-pane" id="placement">
							  <table class="table"  id="table_placement">
								<tbody>
								</tbody>
							  </table>
							  <div id="controle_date_valider" style="color:red; font-weight:bold;"></div> <br/><br/>
							  
							  <button id="retour_button" class="btn btn-primary pull-left">Retour</button>&nbsp;&nbsp;&nbsp;
							  <button id="cancel_edt_button_pla" class="btn btn-primary pull-middle invisible">Annuler</button>
							  <button id="valider_button" class="btn btn-primary pull-right">Valider</button>
							  
							  
							  
							  
							</div>
					</div>
				  </div>
				</section>
			  </div>
			</div>
		</div>
		
		
		
		<div class="tab-pane" id="highlited">
			<div class="row mt">
			  <div class="col-sm-12">
				<section class="panel">
				  <div class="panel-body" style = "text-align: center">
					<h3>Mise en avant Numéro 1</h3>
					<select class="js-example-responsive" id="highlited_webradio1" style="width: 40%">
						<option value="-1">- </option>
					</select>
					<h3>Mise en avant Numéro 2</h3>
					<select class="js-example-responsive" id="highlited_webradio2" style="width: 40%">
						<option value="-1">- </option>
					</select>
					<h3>Mise en avant Numéro 3</h3>
					<select class="js-example-responsive" id="highlited_webradio3" style="width: 40%">
						<option value="-1">- </option>
					</select>
					<h3>Mise en avant Numéro 4</h3>
					<select class="js-example-responsive" id="highlited_webradio4" style="width: 40%">
						<option value="-1">- </option>
					</select>
					<h3>Date d'action</h3>
					<div class='input-group date' id='date_action_highlited'  style="width: 40%; margin-left: 30%;">
						<input type='text' class="form-control" disabled />
						<span class="input-group-addon">
							<span class="glyphicon glyphicon-calendar"></span>
						</span>
					</div>
					<div id="controle_date_action_highlited" style="color:red; font-weight:bold;"></div>
					
					<br>
					
					
					<table style="width: 40%; margin-left: 30%;">
						<tr style = "text-align: center">
							<td style="padding-right: 20px;"><button id='confirm_highlited' type="button" class="btn btn-primary" disabled>Confirmer</button></td>
							<td style="padding-right: 20px;"><button id='cancel_highlited' type="button" class="btn btn-danger" disabled>Annuler</button></td>
						</tr>
					</table>
					
				  </div>
				</section>
			  </div>
			</div>
		</div>
		
	</div>
	
	
	<div class="modal fade" id="date_range_modal" ata-keyboard="false" data-backdrop="static">
	  <div class="modal-dialog"  style = "width:80%;">
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title">Edition/Cr&eacute;ation de webradio (choix des dates) </h4>
			  </div>
			  <div class="modal-body">
				<div class="form-group">
					<label class="bmd-label-floating">Date Début / Date Fin : </label>
					<div class="container">
						<div class='col-md-5'>
							<div class="form-group">
								<div class='input-group date' id='date_debut_modal'>
									<input type='text' class="form-control" required="required"/>
									<span class="input-group-addon">
										<span class="glyphicon glyphicon-calendar"></span>
									</span>
								</div>
							</div>
						</div>
						
						<div class='col-md-5'>
							<div class="form-group">
								<div class='input-group date' id='date_fin_modal'>
									<input type='text' class="form-control" />
									<span class="input-group-addon">
										<span class="glyphicon glyphicon-calendar"></span>
									</span>
								</div>
							</div>
						</div>
						<div id="controle_date" style="color:red; font-weight:bold;"></div>
					</div>
				</div>
			  </div>
			  <div class="modal-footer">
				<button id='date_range_modal_annuler' type="button" class="btn btn-default" data-dismiss="modal">Annuler</button>
				<button id='date_range_modal_confirm' type="button" class="btn btn-primary">Confirmer</button>
			  </div>		
			</div><!-- /.modal-content -->
	  </div><!-- /.modal-dialog -->
	</div><!-- /.modal -->
	
	<div class="modal fade" id="date_action_modal" ata-keyboard="false" data-backdrop="static">
	  <div class="modal-dialog"  style = "width:50%;">
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title">Edition/Cr&eacute;ation de webradio (date d'action) </h4>
			  </div>
			  <div class="modal-body">
				<div class="form-group">
					<label class="bmd-label-floating">Date d'Action : </label>
					<div class="container">
						<div class='col-md-5'>
							<div class="form-group">
								<div class='input-group date' id='date_debut_modal_action'>
									<input type='text' class="form-control" required="required"/>
									<span class="input-group-addon">
										<span class="glyphicon glyphicon-calendar"></span>
									</span>
								</div>
							</div>
						</div>
						<div id="controle_date_action" style="color:red; font-weight:bold;"></div>
					</div>
				</div>
			  </div>
			  <div class="modal-footer">
				<button id='date_action_modal_annuler' type="button" class="btn btn-default" data-dismiss="modal">Annuler</button>
				<button id='date_action_modal_confirm' type="button" class="btn btn-primary">Confirmer</button>
			  </div>		
			</div><!-- /.modal-content -->
	  </div><!-- /.modal-dialog -->
	</div><!-- /.modal -->
	
	
	<div class="modal fade" id="loader_modal" ata-keyboard="false" data-backdrop="static">
	  <div class="modal-dialog">
		<div class="modal-content">
			  <div class="modal-body">
				<img src='./assets/img/reload.gif' width='40px' height='40px'>
			  </div>	
			</div><!-- /.modal-content -->
	  </div><!-- /.modal-dialog -->
	</div><!-- /.modal -->
	
	<div id="loader" style="display: none;">
	  <img src='./assets/img/reload.gif' width='40px' height='40px'>
	</div>
	
	
	<div class="modal fade" id="erreur_container_modal_modal" ata-keyboard="false" data-backdrop="static">
	  <div class="modal-dialog"  style = "width:50%;">
		<div class="modal-content">
			  <div class="modal-header"  style = "background: #e60e0e;">
				<h4 class="modal-title"  style = "background: #e60e0e;">Erreur </h4>
			  </div>
			  <div class="modal-body">
				<div class="form-group">
					<div class="container" id = "erreur_container_modal">
					</div>
				</div>
			  </div>
			  <div class="modal-footer">
				<button type="button" class="btn btn-default"  data-dismiss="modal">Ok</button>
			  </div>		
			</div><!-- /.modal-content -->
	  </div><!-- /.modal-dialog -->
	</div><!-- /.modal -->
	

<?PHP require_once('../nav_bottom.php');?>
