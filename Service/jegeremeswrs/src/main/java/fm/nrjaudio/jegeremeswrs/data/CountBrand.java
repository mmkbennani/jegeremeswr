package fm.nrjaudio.jegeremeswrs.data;

public class CountBrand{
	private Long count;
	private String statuswr;
	public CountBrand(Long count, String statuswr) {
		super();
		this.count = count;
		this.statuswr = statuswr;
	}
	public CountBrand() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Long getCount() {
		return count;
	}
	public void setCount(Long count) {
		this.count = count;
	}
	public String getStatuswr() {
		return statuswr;
	}
	public void setStatuswr(String statuswr) {
		this.statuswr = statuswr;
	}
	
	
}