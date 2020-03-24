package fm.nrjaudio.jegeremeswrs.controler;

import java.net.URI;
import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import fm.nrjaudio.jegeremeswrs.data.Webradio;
import fm.nrjaudio.jegeremeswrs.data.WebradioPlacement;
import fm.nrjaudio.jegeremeswrs.service.WebradioPlacementService;

@Controller
public class WebradioPlacementControler {
	
	@Autowired
	WebradioPlacementService webradioPlacementService;

	
	
	//////GET//////////////
	@GetMapping("/get_webradios_placement/{id_wr}")
	@ResponseBody
	public ResponseEntity<Object> getAllGenreWR (@PathVariable Integer id_wr){
		HttpHeaders responseHeaders = new HttpHeaders();
		
		return ResponseEntity.ok()
			      .headers(responseHeaders)
			      .body(webradioPlacementService.getAllWebradioPlacementByIdWr(id_wr));
	}
	
	
	
	
	/// POST/////////////
	@DeleteMapping(value = "/webradio_placement/{id_wr}")
	public ResponseEntity<Object> deleteWebradioPlacement(@PathVariable Integer id_wr) {
		
		ArrayList<WebradioPlacement> usedPlacement = webradioPlacementService.getAllWebradioPlacementByIdWr(id_wr);
		
		
		for(WebradioPlacement unPlc : usedPlacement) {
			webradioPlacementService.delete(unPlc);
			
		}
		return ResponseEntity.ok().body("Deleted");
	}
	
	
	
	@RequestMapping(value = "/webradio_placement")
	public ResponseEntity<Object> createWebradioPlacement(@RequestBody WebradioPlacement webradioPlacement) {
		
		
		WebradioPlacement savedWebradio = webradioPlacementService.save(webradioPlacement);

		URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(savedWebradio.getPk()).toUri();

		return ResponseEntity.created(location).body(webradioPlacement);
	}
	
}
