package fm.nrjaudio.jegeremeswrs.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.boot.autoconfigure.data.web.SpringDataWebProperties.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import fm.nrjaudio.jegeremeswrs.data.Webradio;
import fm.nrjaudio.jegeremeswrs.data.WebradioCount;
import fm.nrjaudio.jegeremeswrs.data.WebradioExcel;


public interface WebradioService  extends JpaRepository<Webradio, Integer> {

	//select fk_radio, count(*) from tb_webradio group by fk_radio
	@Query(value = "select new fm.nrjaudio.jegeremeswrs.data.WebradioCount(wr.id_radio, count(*),br.color_brand) from Webradio wr, BrandParams br where wr.id_country = :id_country and br.id_radio=wr.id_radio group by wr.id_radio, br.color_brand order by wr.id_radio")
	ArrayList<WebradioCount> getCountByRadio(@Param("id_country")int id_country);	
	
	@Query(value = "select new fm.nrjaudio.jegeremeswrs.data.WebradioCount(wr.id_radio, count(*),br.color_brand) from Webradio wr, BrandParams br where wr.id_country = :id_country and br.id_radio=wr.id_radio and (wr.date_deletion_request is null or wr.date_deletion_request >= :date_now) and (wr.date_creation_request <= :date_now)  group by wr.id_radio, br.color_brand order by wr.id_radio")
	ArrayList<WebradioCount> getCountByRadioOnline(@Param("id_country")int id_country,@Param("date_now")LocalDateTime date_now);
	
	@Query(value = "select new fm.nrjaudio.jegeremeswrs.data.WebradioCount(wr.id_radio, count(*),br.color_brand) from Webradio wr, BrandParams br where wr.id_country = :id_country and br.id_radio=wr.id_radio and (wr.date_deletion_request < :date_now) group by wr.id_radio, br.color_brand order by wr.id_radio")
	ArrayList<WebradioCount> getCountByRadioOff(@Param("id_country")int id_country,@Param("date_now")LocalDateTime date_now);	
	
	@Query(value = "select new fm.nrjaudio.jegeremeswrs.data.WebradioCount(wr.id_radio, count(*),br.color_brand) from Webradio wr, BrandParams br where wr.id_country = :id_country and br.id_radio=wr.id_radio and (wr.date_deletion_request is null or wr.date_deletion_request >= :date_now) and (wr.date_creation_request >= :date_now) group by wr.id_radio, br.color_brand order by wr.id_radio")
	ArrayList<WebradioCount> getCountByRadioProchainement(@Param("id_country")int id_country,@Param("date_now")LocalDateTime date_now);	
	
	@Query(value = "from Webradio where id_country = :id_country")
	ArrayList<Webradio> getAllById_country(@Param("id_country")int id_country);
	
	
	@Query(value = "from Webradio where id_country = :id_country and id_radio = :id_radio and (date_deletion_request is null or date_deletion_request >= :date_now) and (date_creation_request <= :date_now) ORDER BY nom_wr")
	ArrayList<Webradio> getAllById_countryandId_radio(@Param("id_country")int id_country,@Param("id_radio")int id_radio,@Param("date_now")LocalDateTime date_now);

	@Query(value = "from Webradio where id_country = :id_country and id_radio = :id_radio and (date_deletion_request is null or date_deletion_request >= :date_now) ORDER BY nom_wr")
	ArrayList<Webradio> getAllById_countryandId_radioByGenre(@Param("id_country")int id_country,@Param("id_radio")int id_radio,@Param("date_now")LocalDateTime date_now);

	
	@Query(value = "select * from bobwr.tb_webradio where id_country = :id_country and (date_deletion_request is not null) and (date_deletion_request >= :date_now) ORDER BY date_deletion_request limit 7", nativeQuery = true)
	ArrayList<Webradio> getSeptpremieresupp(@Param("id_country")int id_country,@Param("date_now")LocalDateTime date_now);

	
	@Query(value = "select * from bobwr.tb_webradio where id_country = :id_country and (date_deletion_request is null or date_deletion_request >= :date_now) and (date_creation_request >= :date_now) ORDER BY date_deletion_request limit 7", nativeQuery = true)
	ArrayList<Webradio> getSeptpremiereprochainement(@Param("id_country")int id_country,@Param("date_now")LocalDateTime date_now);
	
	
	@Query(value = "from Webradio where id_country = :id_country and id_radio = :id_radio and (date_deletion_request < :date_now) ORDER BY nom_wr")
	ArrayList<Webradio> getAllById_countryandId_radioInactive(@Param("id_country")int id_country,@Param("id_radio")int id_radio,@Param("date_now")LocalDateTime date_now);

	@Query(value = "from Webradio where id_country = :id_country and id_radio = :id_radio and (date_deletion_request is null or date_deletion_request >= :date_now) and pub = false and (date_creation_request <= :date_now)  ORDER BY nom_wr")
	ArrayList<Webradio> getAllById_countryandId_radioSanspub(@Param("id_country")int id_country,@Param("id_radio")int id_radio,@Param("date_now")LocalDateTime date_now);

	@Query(value = "from Webradio where id_country = :id_country and id_radio = :id_radio and (date_deletion_request is null or date_deletion_request >= :date_now) and (date_creation_request >= :date_now) ORDER BY nom_wr")
	ArrayList<Webradio> getAllById_countryandId_radioProchainement(@Param("id_country")int id_country,@Param("id_radio")int id_radio,@Param("date_now")LocalDateTime date_now);

	
	@Query(value = "from Webradio where id_country = :id_country and id_radio = :id_radio and (date_deletion_request < :date_now) and pub = false ORDER BY nom_wr")
	ArrayList<Webradio> getAllById_countryandId_radioInactiveSanspub(@Param("id_country")int id_country,@Param("id_radio")int id_radio,@Param("date_now")LocalDateTime date_now);

	@Query(value = "from Webradio where id_country = :id_country and id_radio = :id_radio and (date_deletion_request is null or date_deletion_request >= :date_now) and (date_creation_request >= :date_now) and pub = false ORDER BY nom_wr")
	ArrayList<Webradio> getAllById_countryandId_radioSanspubProchainement(@Param("id_country")int id_country,@Param("id_radio")int id_radio,@Param("date_now")LocalDateTime date_now);
	
	//@Query(value = "from Webradio where id_country = :id_country and id_radio = :id_radio and :id_application_genre in")
	//ArrayList<Webradio> getAllWebradioByGenreAppli(@Param("id_country")int id_country,@Param("id_radio")int id_radio,@Param("id_application_genre")String id_application_genre);
	@Query(value = "from Webradio wr where wr.id_country = :id_country "
			+ "and wr.id_radio = :id_radio and (wr.date_deletion_request is null or wr.date_deletion_request >= :date_precise) and "
			+ "(wr.date_creation_request <= :date_precise)  ")
	ArrayList<Webradio> getWebradioExcelByDatePrecise(@Param("id_country")int id_country,@Param("id_radio")int id_radio,@Param("date_precise")LocalDateTime date_precise);
	
	
	@Query(value = "from Webradio wr where wr.id_country = :id_country "
			+ "and wr.id_radio = :id_radio and (wr.date_creation_request >= :date_debut and wr.date_creation_request <= :date_fin )")
	ArrayList<Webradio> getWebradioExcelByDateRange(@Param("id_country")int id_country,@Param("id_radio")int id_radio,@Param("date_debut")LocalDateTime date_debut,@Param("date_fin")LocalDateTime date_fin );

	
	
	@Query(value = "from Webradio wr where wr.id_country = :id_country "
			+ "and wr.id_radio = :id_radio and wr.id_pressplay = :id_pressplay")
	ArrayList<Webradio> getWebradioByIdPressplay(@Param("id_country")int id_country,@Param("id_radio")int id_radio,@Param("id_pressplay")int id_pressplay);


}
