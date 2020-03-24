package fm.nrjaudio.jegeremeswrs.data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "genre_orange", schema="bobwr")
public class GenreOrange {
	
	
	@Id
    @GeneratedValue
	private int id;
	private String genre_name;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getGenre_name() {
		return genre_name;
	}
	public void setGenre_name(String genre_name) {
		this.genre_name = genre_name;
	}
	public GenreOrange(int id, String genre_name) {
		super();
		this.id = id;
		this.genre_name = genre_name;
	}
	public GenreOrange() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
	
	
}
