package fm.nrjaudio.jegeremeswrs.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import fm.nrjaudio.jegeremeswrs.data.WebradioOfflineHistory;

public interface WebradioOfflineHistoryService extends JpaRepository<WebradioOfflineHistory, Integer> {
	
	
	@Query(value = "from WebradioOfflineHistory where pk_webradio = :pk_webradio and  sys_created_offline_history=:date_now")
	ArrayList<WebradioOfflineHistory> getWebradioOfflineHistoryByIdWr(@Param("pk_webradio")int pk_webradio,@Param("date_now")LocalDate date_now);	
}
