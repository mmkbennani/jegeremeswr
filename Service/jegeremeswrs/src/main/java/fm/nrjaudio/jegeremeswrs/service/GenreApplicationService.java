package fm.nrjaudio.jegeremeswrs.service;

import java.util.ArrayList;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import fm.nrjaudio.jegeremeswrs.data.GenreApplication;
import fm.nrjaudio.jegeremeswrs.data.Webradio;;

public interface GenreApplicationService extends JpaRepository<GenreApplication, Integer>{

	
	
	@Query(value = "from GenreApplication where id_country = :id_country and id_brand = :id_brand")
	ArrayList<GenreApplication> getAllById_countryandId_radio(@Param("id_country")int id_country,@Param("id_brand")int id_radio);
	
	@Query(value = "from GenreApplication where pk = :id_genreapplication")
	ArrayList<GenreApplication> getAllByIdGenreApplication(@Param("id_genreapplication")int id_genreapplication);
}
