package fm.nrjaudio.jegeremeswrs.data;

public class WebradioCount {
	
	private int radio;
	private long count;
	private String color_brand;
	
	public int getRadio() {
		return radio;
	}

	public void setRadio(int radio) {
		this.radio = radio;
	}

	public long getCount() {
		return count;
	}

	public void setCount(long count) {
		this.count = count;
	}

	public String getColor_brand() {
		return color_brand;
	}

	public void setColor_brand(String color_brand) {
		this.color_brand = color_brand;
	}

	

	public WebradioCount(int radio, long count, String color_brand) {
		super();
		this.radio = radio;
		this.count = count;
		this.color_brand = color_brand;
	}

	public WebradioCount() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	

}
