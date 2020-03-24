package fm.nrjaudio.jegeremeswrs.controler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;

import fm.nrjaudio.jegeremeswrs.service.GenreApplicationService;

@Controller
public class GenreApplicationControler {

	@Autowired
	private GenreApplicationService genreApplicationService;
	
	
	
	@GetMapping("/get_genre_application/{id_country}/{id_radio}")
    @ResponseBody
	public ResponseEntity<Object> getAllGenreAppliByIdRadio (@PathVariable Integer id_country,@PathVariable Integer id_radio){
		HttpHeaders responseHeaders = new HttpHeaders();
		
		return ResponseEntity.ok()
			      .headers(responseHeaders)
			      .body(genreApplicationService.getAllById_countryandId_radio(id_country, id_radio));
	}
	
	@GetMapping("/get_genre_application/{id_genre_application}")
    @ResponseBody
	public ResponseEntity<Object> getAllGenreAppliByIdRadioById (@PathVariable Integer id_genre_application){
		HttpHeaders responseHeaders = new HttpHeaders();
		
		return ResponseEntity.ok()
			      .headers(responseHeaders)
			      .body(genreApplicationService.getAllByIdGenreApplication(id_genre_application));
	}
	
	
}
