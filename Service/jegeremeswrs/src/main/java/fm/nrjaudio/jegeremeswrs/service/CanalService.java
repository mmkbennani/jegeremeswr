package fm.nrjaudio.jegeremeswrs.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import fm.nrjaudio.jegeremeswrs.data.Canal;
import fm.nrjaudio.jegeremeswrs.data.PourcentCanalDispo;

public interface CanalService extends JpaRepository<Canal, Integer> {
	
	@Query(value = "from Canal where date_disponnible IS NOT NULL and date_disponnible < :date_dispo")
	ArrayList<Canal> findCanauxDispo(@Param("date_dispo")LocalDateTime date_dispo);
	
	@Query(value = "from Canal where date_disponnible IS NOT NULL and fk_country = :fk_country ORDER BY date_disponnible")
	ArrayList<Canal> findPremierCanauxDispo(int fk_country);

	
	@Query(value = "from Canal where fk_country = :fk_country order by nom_canal")
	ArrayList<Canal> findCanalByCountry(int fk_country);
	
	@Query(value = "from Canal where fk_country = :fk_country and id_wr = :id_webradio")
	ArrayList<Canal> findCanalByNumAndCountry(int fk_country, int id_webradio);
	
	
	@Query(value = "select new fm.nrjaudio.jegeremeswrs.data.PourcentCanalDispo(count(*), '#FF6B6B') from Canal where date_disponnible IS NULL and fk_country = :fk_country group by date_disponnible")
	ArrayList<PourcentCanalDispo> findPourcentByCountry(int fk_country);
}
