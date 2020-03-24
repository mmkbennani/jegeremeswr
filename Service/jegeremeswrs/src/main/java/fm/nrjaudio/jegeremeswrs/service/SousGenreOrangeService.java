package fm.nrjaudio.jegeremeswrs.service;

import java.util.ArrayList;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import fm.nrjaudio.jegeremeswrs.data.SousGenreOrange;

public interface SousGenreOrangeService extends JpaRepository<SousGenreOrange, Integer>{
	
	@Query(value = "from SousGenreOrange where id_genre_orange = :id_genre_orange")
	ArrayList<SousGenreOrange> findSousGenreOrangeByGenre(@Param("id_genre_orange")int id_genre_orange);

}
