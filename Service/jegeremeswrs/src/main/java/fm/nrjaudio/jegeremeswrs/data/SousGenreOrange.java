package fm.nrjaudio.jegeremeswrs.data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "sous_genre_orange", schema="bobwr")
public class SousGenreOrange {
	@Id
    @GeneratedValue
	private int pk;
	private int id_genre_orange;
	private String subgenre_name;
	public int getPk() {
		return pk;
	}
	public void setPk(int pk) {
		this.pk = pk;
	}
	public int getId_genre_orange() {
		return id_genre_orange;
	}
	public void setId_genre_orange(int id_genre_orange) {
		this.id_genre_orange = id_genre_orange;
	}
	public String getSubgenre_name() {
		return subgenre_name;
	}
	public void setSubgenre_name(String subgenre_name) {
		this.subgenre_name = subgenre_name;
	}
	public SousGenreOrange(int pk, int id_genre_orange, String subgenre_name) {
		super();
		this.pk = pk;
		this.id_genre_orange = id_genre_orange;
		this.subgenre_name = subgenre_name;
	}
	public SousGenreOrange() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	

}
