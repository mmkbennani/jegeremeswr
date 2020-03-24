package fm.nrjaudio.jegeremeswrs.service;

import java.time.LocalDateTime;
import java.util.ArrayList;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import fm.nrjaudio.jegeremeswrs.data.Webradio;
import fm.nrjaudio.jegeremeswrs.data.WebradioHighlited;

public interface WebradioHighlitedService extends JpaRepository<WebradioHighlited, Integer>{
	
	@Query(value = "from WebradioHighlited where country =:country and brand =:brand")
	ArrayList<WebradioHighlited> getAllWebradioHighlitedByCountryBrand(@Param("country")int country,@Param("brand")int brand);
	
	@Query(value = "from Webradio where id_country = :id_country and id_radio = :id_radio and "
			+ "(date_deletion_request is null or date_deletion_request >= :date_now) and date_creation_request <= :date_now "
			+ "and pk NOT IN (select id_webradio_highlighted_1 from WebradioHighlited where country = :id_country and brand = :id_radio) "
			+ "and pk NOT IN (select id_webradio_highlighted_2 from WebradioHighlited where country = :id_country and brand = :id_radio)"
			+ "and pk NOT IN (select id_webradio_highlighted_3 from WebradioHighlited where country = :id_country and brand = :id_radio)"
			+ "and pk NOT IN (select id_webradio_highlighted_4 from WebradioHighlited where country = :id_country and brand = :id_radio)"
			+ "ORDER BY nom_wr")
	ArrayList<Webradio> getAllById_countryandId_radioToBeHighlited(@Param("id_country")int id_country,@Param("id_radio")int id_radio,@Param("date_now")LocalDateTime date_now);
}
