<?php
session_start();
//var_dump ($_SESSION);var  country = <?php echo $_SESSION["id_user"];
   ?>

<!DOCTYPE html>
  <html lang="fr" xml:lang="fr" xmlns="http://www.w3.org/1999/xhtml">
    <head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<meta name="viewport" content="initial-scale=1"/>      
		<title>Gestion de mes webradios</title>
		<script src="https://code.jquery.com/jquery-1.12.4.js"></script>
		
		<script>
			$(document).ready(function() {
				var returnvalue = "";
				var host = "http://"+window.location.hostname+":8003";

				$.getJSON( host+'/get_test',	function( data ) {
					$.each(data.jegeremeswr, function(key, value){
						returnvalue = returnvalue+value.name;
					});
					returnvalue = returnvalue;
					$('#idjegeremeswr').text(returnvalue);
				});
				
				
			});
		</script>
    </head>
    <body>
      <div id="idjegeremeswr"> </div>
	</body>

</html>
