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
	<script src="https://cdn.datatables.net/buttons/1.2.4/js/dataTables.buttons.min.js"></script>
	<script src="https://cdn.datatables.net/select/1.1.2/js/dataTables.select.min.js" ></script>
	
	
	
	<script src="js/dataTables.altEditor.js" ></script>
	
	
	<script src="js/dataTables.checkboxes.min.js"></script>
	<script src="js/excelcanal.js"></script>
	
	
	<h3><select class="js-example-responsive" id="sel_country" name="sel_country" style="width: 10%"></select></h3>
	<hr>
	<div class="row mt">
	  <div class="col-sm-12">
		<section class="panel">
		  <div class="panel-body" id = "divtablewr">
			<table id="table_canaux" class="display dataTable table table-striped" style="width:100%">
				<thead>
					<tr>
						<th>Country</th>
						<th>Id du canal</th>
						<th>Webradio</th>
						<th>Nom canal</th>
						<th>Date disponible</th>
						<th>Id Pressplay</th>
						<th>Nom de la Webradio</th>
						<th>Application</th>
						<th>Agregateur</th>
						<th>Site</th>
					</tr>
				</thead>
			</table>
		  </div>
		</section>
	  </div>
	</div>
<?PHP require_once('../nav_bottom.php');?>
