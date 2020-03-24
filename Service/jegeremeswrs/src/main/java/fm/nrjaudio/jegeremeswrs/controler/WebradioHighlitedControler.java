package fm.nrjaudio.jegeremeswrs.controler;

import java.net.URI;
import java.time.LocalDateTime;
import java.util.ArrayList;

import javax.mail.MessagingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import fm.nrjaudio.jegeremeswrs.data.Webradio;
import fm.nrjaudio.jegeremeswrs.data.WebradioHighlited;
import fm.nrjaudio.jegeremeswrs.email.EmailService;
import fm.nrjaudio.jegeremeswrs.service.WebradioHighlitedService;
import fm.nrjaudio.jegeremeswrs.service.WebradioService;

@Controller
public class WebradioHighlitedControler {
	
	@Autowired
	private WebradioHighlitedService webradioHighlitedService;
	@Autowired
	private WebradioService webradioService;
	@Autowired
    private EmailService emailService;
	@Value("${logo_folder}")
	private String LOGO_FOLDER;
	
	@GetMapping("/get_webradios_highlited/{country}/{brand}")
	@ResponseBody
	public ResponseEntity<Object> getAllWebradiosHighlited (@PathVariable Integer country,@PathVariable Integer brand){
		HttpHeaders responseHeaders = new HttpHeaders();
		
		ArrayList<Webradio> list_returnwebradioHighlited = new ArrayList<Webradio>();
		ArrayList<WebradioHighlited> arrayWebradioHighlited = webradioHighlitedService.getAllWebradioHighlitedByCountryBrand(country, brand);
		LocalDateTime localdatetimenow = LocalDateTime.now();
		for(WebradioHighlited webradioHighlited : arrayWebradioHighlited) {
			Webradio webradio1 = new Webradio(-1, 0,  "", 0, "", false, "", 0, 0, 0, 0, 0, localdatetimenow, localdatetimenow, localdatetimenow, localdatetimenow, "", "");
			if(webradioHighlited.getId_webradio_highlighted_1() != -1) {
				webradio1 = webradioService.findById(webradioHighlited.getId_webradio_highlighted_1()).get();
			}
			webradio1.setDate_action_request(webradioHighlited.getDate_action_request());
			Webradio webradio2 = new Webradio(-1, 0,  "", 0, "", false, "", 0, 0, 0, 0, 0, localdatetimenow, localdatetimenow, localdatetimenow, localdatetimenow, "", "");
			if(webradioHighlited.getId_webradio_highlighted_2() != -1) {
				webradio2 = webradioService.findById(webradioHighlited.getId_webradio_highlighted_2()).get();
			}
			webradio2.setDate_action_request(webradioHighlited.getDate_action_request());
			Webradio webradio3 = new Webradio(-1, 0,  "", 0, "", false, "", 0, 0, 0, 0, 0, localdatetimenow, localdatetimenow, localdatetimenow, localdatetimenow, "", "");
			if(webradioHighlited.getId_webradio_highlighted_3() != -1) {
				webradio3 = webradioService.findById(webradioHighlited.getId_webradio_highlighted_3()).get();
			}
			webradio3.setDate_action_request(webradioHighlited.getDate_action_request());
			Webradio webradio4 = new Webradio(-1, 0,  "", 0, "", false, "", 0, 0, 0, 0, 0, localdatetimenow, localdatetimenow, localdatetimenow, localdatetimenow, "", "");
			if(webradioHighlited.getId_webradio_highlighted_4() != -1) {
				webradio4 = webradioService.findById(webradioHighlited.getId_webradio_highlighted_4()).get();
			}
			webradio4.setDate_action_request(webradioHighlited.getDate_action_request());
			list_returnwebradioHighlited.add(webradio1);
			list_returnwebradioHighlited.add(webradio2);
			list_returnwebradioHighlited.add(webradio3);
			list_returnwebradioHighlited.add(webradio4);
		}
		
		
		
		
		
		
		
		return ResponseEntity.ok()
			      .headers(responseHeaders)
			      .body(list_returnwebradioHighlited);
	}
	
	
	
	@GetMapping("/get_webradios_to_be_highlited/{country}/{brand}")
	@ResponseBody
	public ResponseEntity<Object> getAllWebradiosToBeHilted (@PathVariable Integer country,@PathVariable Integer brand){
		HttpHeaders responseHeaders = new HttpHeaders();
		LocalDateTime localdatetimenow = LocalDateTime.now();
		return ResponseEntity.ok()
			      .headers(responseHeaders)
			      .body(webradioHighlitedService.getAllById_countryandId_radioToBeHighlited(country, brand,localdatetimenow));
	}
	
	
	
	@RequestMapping(value = "/webradio_highlited")
	public ResponseEntity<Object> createWebradioPlacement(@RequestBody WebradioHighlited webradioHighlited) {
		
		ArrayList<WebradioHighlited> arrayWebradioHighlited = webradioHighlitedService.getAllWebradioHighlitedByCountryBrand(webradioHighlited.getCountry(), webradioHighlited.getBrand());
		WebradioHighlited webradioHighlitedSaved = new WebradioHighlited();
		if(arrayWebradioHighlited != null && arrayWebradioHighlited.size() != 0) {
			
			webradioHighlited.setPk(arrayWebradioHighlited.get(0).getPk());
			
			webradioHighlitedSaved = webradioHighlitedService.save(webradioHighlited);
		}else {
			webradioHighlitedSaved = webradioHighlitedService.save(webradioHighlited);
		}
		
		emailService.sendSimpleMessageWebradioHighlited(webradioHighlited.getCountry(),webradioHighlited.getBrand(),LOGO_FOLDER);
		
		

		URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(webradioHighlitedSaved.getPk()).toUri();

		return ResponseEntity.created(location).body(webradioHighlitedSaved);
	}

}
