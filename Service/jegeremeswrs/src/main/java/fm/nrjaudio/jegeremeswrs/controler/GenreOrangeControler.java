package fm.nrjaudio.jegeremeswrs.controler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;

import fm.nrjaudio.jegeremeswrs.service.GenreOrangeService;

@Controller
public class GenreOrangeControler {

	@Autowired
	GenreOrangeService genreOrangeService;
	
	@GetMapping("/get_genre_orange")
    @ResponseBody
	public ResponseEntity<Object> getAllWebradiosByIdRadio (){
		HttpHeaders responseHeaders = new HttpHeaders();
		
		return ResponseEntity.ok()
			      .headers(responseHeaders)
			      .body(genreOrangeService.findAll());
	}
}
