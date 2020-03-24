<?PHP require_once('../nav_top.php');?>
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
	
	
	<script src="js/marque.js"></script>
	<h3><select class="js-example-responsive" id="sel_country" name="sel_country" style="width: 10%"></select> <select class="js-example-responsive" id="sel_brand" name="sel_brand" style="width: 15%"></select></h3>
	<hr>
	<div class="row mt">
	  <div class="col-sm-3">
		<section class="panel">
		  <div class="panel-body" >
			<form>
				<div class="form-group" action="">
					<button type="button" id="btn_new" class="btn btn-raised btn-success">Cr&eacute;er</button>
					<button type="button" id="btn_edit" class="btn btn-raised btn-info invisible">Editer</button>
					<button type="button" id="btn_delete" class="btn btn-raised btn-danger invisible">Suppression</button>
				</div>
			</form>
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
							  <input type="text" id="nom_webradio" required="required" class="form-control" >
							</div>
						  </div>
						</div>
						<div class="row">
						  <div class="col-md-9">
							<div class="form-group">
							  <label class="bmd-label-floating">Claim :</label>
							  <input type="email" required="required" class="form-control" disabled>
							</div>
						  </div>
						</div>
						<div class="row">
						  <div class="col-md-4">
							<div class="form-group">
								<label class="bmd-label-floating">Pub : </label>
								<select class="js-example-responsive" required="required" style="width: 100%">
									<option id="true">Avec</option>
									<option id="false">sans</option>
								</select>
							</div>
						  </div>
						  <div class="col-md-4">
							<div class="form-group">
							  <label class="bmd-label-floating">ID Pressplay :</label>
							  <input type="text" required="required" class="form-control" >
							</div>
						  </div>
						</div>
						<div class="row">
						  <div class="col-md-9">
							<div class="form-group">
								<label class="bmd-label-floating">Genre Application : </label>
								<select class="js-example-responsive" id="genre_application_select" multiple="multiple" required="required" style="width: 70%">
									<option value="">- </option>
								</select>
							</div>
						  </div>
						</div>
						<div class="row">
						  <div class="col-md-4">
							<div class="form-group">
								<label class="bmd-label-floating">Genre Orange : </label>
								<select class="js-example-responsive" id="genre_orange_select" required="required" style="width: 70%">
									<option value="">- </option>
								</select>
							</div>
						  </div>
						  <div class="col-md-4">
							<div class="form-group">
								<label class="bmd-label-floating">Sous Genre Orange : </label>
								<select class="js-example-responsive" id="sous_genre_orange_select" required="required" style="width: 60%">
									<option value="">- </option>
								</select>
							</div>
						  </div>
						  <div class="col-md-4">
							<div class="form-group">
								<label class="bmd-label-floating">Genre Itunes : </label>
								<select name="genre_itunes_select" id="genre_itunes_select" required="required" class="js-example-responsive"style="width: 70%">
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
												<div class='input-group date' id='datetimepicker6'>
													<input type='text' class="form-control" />
													<span class="input-group-addon">
														<span class="glyphicon glyphicon-calendar"></span>
													</span>
												</div>
											</div>
										</div>
										
										<div class='col-md-5'>
											<div class="form-group">
												<div class='input-group date' id='datetimepicker7'>
													<input type='text' class="form-control" />
													<span class="input-group-addon">
														<span class="glyphicon glyphicon-calendar"></span>
													</span>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>							
						</div>
						
					  
					  </form>
					  
						
						<button id="suivant_button" class="btn btn-primary pull-right">Suivnat</button>
                    </div>
					
                    <div class="tab-pane" id="placement">
                      <table class="table"  id="table_placement">
                        <tbody>
                        </tbody>
                      </table>
					  <button id="retour_button" class="btn btn-primary pull-left">Retour</button>
					  <button id="valider_button" class="btn btn-primary pull-right">Valider</button>
                    </div>
			</div>
		  </div>
		</section>
	  </div>
	</div>

<?PHP require_once('../nav_bottom.php');?>
