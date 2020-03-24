<?PHP require_once('../nav_top.php');?>
<?php
//var_dump ($_SESSION);
$_SESSION["id_user"] = 1;
?>

	<style>.moussehover {cursor: pointer;}</style>
	<script>
		sessionStorage.val_id_user = <?php echo $_SESSION["id_user"]; ?>;
	</script>
	
	<link href="https://cdn.jsdelivr.net/npm/select2@4.0.13/dist/css/select2.min.css" rel="stylesheet" />
	<script src="https://cdn.jsdelivr.net/npm/select2@4.0.13/dist/js/select2.min.js"></script>
	
	<link rel="stylesheet" href="https://cdn.datatables.net/1.10.11/css/jquery.dataTables.min.css" />
	<link rel="stylesheet" href="https://cdn.datatables.net/buttons/1.1.2/css/buttons.dataTables.min.css" />
	<link rel="stylesheet" href="https://cdn.datatables.net/select/1.1.2/css/select.dataTables.min.css" />
	<link rel="stylesheet" href="https://cdn.datatables.net/responsive/2.0.2/css/responsive.dataTables.min.css" />
	
	<script src="https://cdn.datatables.net/1.10.13/js/jquery.dataTables.min.js"></script>
	<script src="https://cdn.datatables.net/buttons/1.6.1/js/dataTables.buttons.min.js"></script>
	<script src="https://cdn.datatables.net/select/1.1.2/js/dataTables.select.min.js" ></script>
	
	<link href="//cdn.rawgit.com/Eonasdan/bootstrap-datetimepicker/e8bddc60e73c1ec2475f827be36e1957af72e2ea/build/css/bootstrap-datetimepicker.css" rel="stylesheet">
    <script src="//cdnjs.cloudflare.com/ajax/libs/moment.js/2.9.0/moment-with-locales.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/bootstrap-datetimepicker/4.17.47/js/bootstrap-datetimepicker.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.1.3/jszip.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.53/pdfmake.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.53/vfs_fonts.js"></script>
	<script src="https://cdn.datatables.net/buttons/1.6.1/js/buttons.html5.min.js"></script>
	
	
	
	<script src="js/dataTables.checkboxes.min.js"></script>
	<script src="js/excel.js"></script>
	
	
	<h3><select class="js-example-responsive" id="sel_country" name="sel_country" style="width: 10%"></select></h3>
	<hr>
	<div class="row mt">
	  <div class="col-sm-12">
		<section class="panel">
		  <div class="panel-header">
			<h2>Export des Webradios Online à une date précise</h2>
			<table>
				<tr>
					<td style="width: 6%;padding: 10px;">
						<label class="bmd-label-floating">Date : </label>
					</td>
					<td style="width: 35%;padding: 10px;">
						<div class='input-group date' id='date_precise'>
							<input type='text' class="form-control"  />
							<span class="input-group-addon">
								<span class="glyphicon glyphicon-calendar"></span>
							</span>
						</div>
						<div id="controle_date" style="color:red; font-weight:bold;"></div>
					</td>
					<td style="width: 6%;padding: 10px;">
						<label class="bmd-label-floating">Marque : </label>
					</td>
					<td style="width: 38%;padding: 10px;">
						<h3 style="margin-top: 10px;"><select class="js-example-responsive" id="sel_brand_date_precise" name="sel_brand_date_precise" multiple style="width: 100%"></select></h3>
					</td>
					<td style="width: 15%;padding: 10px;">
						<button type="button" id="btn_filtre_date_precise" class="btn btn-raised btn-success">Filtrer</button>
					</td>
				</tr>
			</table>
		  </div>
		  <div class="panel-body">
			<table id = "webradiodateprecise" class="display dataTable table table-striped" style="width:100%">
				<thead>
					<tr>
						<th>Nom de la Webradio</th>
						<th>Id Pressplay</th>
						<th>Date début</th>
						<th>Date fin</th>
						<th>Genre application</th>
					</tr>
				</thead>
			</table>
		  </div>
		</section>
	  </div>
	</div>
	
	
	<div class="row mt">
	  <div class="col-sm-12">
		<section class="panel">
		  <div class="panel-header">
				<h2>Export des Webradios Online entre deux dates</h2>
			  <table>
				<tr>
					<td style="width: 12%;padding: 10px;">
						<label class="bmd-label-floating">Date Début / Date Fin : </label>
					</td>
					<td style="width: 25%;padding: 10px;">
						<div class='input-group date' id='date_debut_webradio'>
							<input type='text' class="form-control" required="required" style="width: 100%;"/>
							<span class="input-group-addon">
								<span class="glyphicon glyphicon-calendar"></span>
							</span>
						</div>
						<div id="controle_date_debut" style="color:red; font-weight:bold;"></div>
					</td>
					
					<td style="width: 25%;padding: 10px;">
						<div class='input-group date' id='date_fin_webradio'>
							<input type='text' class="form-control" style="width: 100%;"/>
							<span class="input-group-addon">
								<span class="glyphicon glyphicon-calendar"></span>
							</span>
						</div>
						<div id="controle_date_fin" style="color:red; font-weight:bold;"></div>
					</td>
					
					<td style="width: 6%;padding: 10px;">
						<label class="bmd-label-floating">Marque : </label>
					</td>
					<td style="width: 25%;padding: 10px;">
						<h3 style="margin-top: 10px;"><select class="js-example-responsive" id="sel_brand_date_range" name="sel_brand_date_range" multiple style="width: 100%"></select></h3>
					</td>
					<td style="width: 6%;padding: 10px;">
						<button type="button" id="btn_filtre_date_range" class="btn btn-raised btn-success">Filtrer</button>
					</td>
				</tr>
			  </table>
		  
		  </div>
		  <div class="panel-body">
			<table id = "webradiodaterange" class="display dataTable table table-striped" style="width:100%">
				<thead>
					<tr>
						<th>Nom de la Webradio</th>
						<th>Id Pressplay</th>
						<th>Date début</th>
						<th>Date fin</th>
						<th>Genre application</th>
					</tr>
				</thead>
			</table>
		  </div>
		</section>
	  </div>
	</div>
<?PHP require_once('../nav_bottom.php');?>
