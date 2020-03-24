<?PHP require_once('../nav_top.php');?>
<?php
//var_dump ($_SESSION);
$_SESSION["id_user"] = 1;
?>
	<style>.moussehover {cursor: pointer;}</style>
	<script>
		sessionStorage.val_id_user = <?php echo $_SESSION["id_user"]; ?>;
	</script>
	
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
	<link href="https://cdn.jsdelivr.net/npm/select2@4.0.13/dist/css/select2.min.css" rel="stylesheet" />
	<script src="https://cdn.jsdelivr.net/npm/select2@4.0.13/dist/js/select2.min.js"></script>
	<script src="js/Chart.js"></script>
	<script src="js/home.js"></script>
	<h3><select class="js-example-responsive" id="sel_country" name="sel_country" style="width: 10%"></select></h3>
	<hr>
	<div class="row mt" id="marque_show"></div>
	
	
	<div class="row mt">
		<div class="col-md-4 col-sm-4 mb">
			<div class="grey-panel pn donut-chart">
			  <div class="grey-header" id ="dateprocahincanalpourcent">
				<h5></h5>
			  </div>
			  <canvas id="canauxdispo" height="120" width="120"></canvas>
			  <div class="row">
				<div class="col-sm-6 col-xs-6 goleft" id ="nbrtotalcanaux">
				  <h4></h4>
				</div>
				<div class="col-sm-6 col-xs-6" id ="pourcenth2">
				  <h2></h2>
				</div>
			  </div>
			</div>
		</div>

		<div class="col-md-3 col-sm-3 mb">
			<div class="grey-panel pn donut-chart">
			  <div class="grey-header" id ="dateprocahincanal" style="margin-bottom: 3px;">
				<h5></h5>
			  </div>
			  <div class="col-sm-12 col-xs-12">
				<table class="table scroll" id="septpremieresupp">
					<thead>
					</thead>
					<tbody>
					</tbody>
				</table>
			  </div>
			</div>
		</div>
		
		<div class="col-md-3 col-sm-3 mb">
			<div class="grey-panel pn donut-chart">
			  <div class="grey-header" id ="dateprocahinsortie" style="margin-bottom: 3px;">
				<h5></h5>
			  </div>
			  <div class="col-sm-12 col-xs-12">
				<table class="table scroll" id="septpremiereprochainement">
					<thead>
					</thead>
					<tbody>
					</tbody>
				</table>
			  </div>
			</div>
		</div>
		
		
	
	</div>

<?PHP require_once('../nav_bottom.php');?>
