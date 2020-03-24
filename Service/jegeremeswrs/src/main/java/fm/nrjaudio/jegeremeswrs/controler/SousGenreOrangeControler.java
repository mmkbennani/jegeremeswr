package fm.nrjaudio.jegeremeswrs.controler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;

import fm.nrjaudio.jegeremeswrs.service.SousGenreOrangeService;

@Controller
public class SousGenreOrangeControler {
	
	@Autowired
	private SousGenreOrangeService sousGenreOrangeService;

	
	@GetMapping("/get_sous_genre_orange/{id_genre_orange}")
    @ResponseBody
	public ResponseEntity<Object> getAllSousGenreOrangeByIdGenre (@PathVariable Integer id_genre_orange){
		HttpHeaders responseHeaders = new HttpHeaders();
		
		return ResponseEntity.ok()
			      .headers(responseHeaders)
			      .body(sousGenreOrangeService.findSousGenreOrangeByGenre(id_genre_orange));
	}
}
