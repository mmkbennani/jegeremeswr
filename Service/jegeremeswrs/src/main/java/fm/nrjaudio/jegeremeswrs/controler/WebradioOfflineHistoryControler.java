package fm.nrjaudio.jegeremeswrs.controler;

import java.net.URI;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import fm.nrjaudio.jegeremeswrs.data.WebradioOfflineHistory;
import fm.nrjaudio.jegeremeswrs.service.WebradioOfflineHistoryService;;


@Controller
public class WebradioOfflineHistoryControler {
	
	@Autowired
	WebradioOfflineHistoryService webradioOfflineHistoryService;
	
	
	
	
	
	@RequestMapping(value = "/webradio_offline_history")
	public ResponseEntity<Object> createWebradioOfflineHistory(@RequestBody WebradioOfflineHistory webradioOfflineHistory) {
		
		
		WebradioOfflineHistory savedWebradio = webradioOfflineHistoryService.save(webradioOfflineHistory);

		URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(savedWebradio.getPk()).toUri();
		
		return ResponseEntity.created(location).body(webradioOfflineHistory);
	}

	
	
	
}
