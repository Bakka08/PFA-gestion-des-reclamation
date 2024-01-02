package com.example.demo.idao;

public class ClaimDTO {
	private int id;
	private String subject;
	private String description;
	private String formattedDate;
	private String status;

	public ClaimDTO(int id, String subject, String description, String formattedDate, String status) {

		this.id = id;
		this.subject = subject;
		this.description = description;
		this.formattedDate = formattedDate;
		this.status = status;
	}

	public ClaimDTO() {

	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getSubject() {
		return subject;
	}

	public void setSubject(String subject) {
		this.subject = subject;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getFormattedDate() {
		return formattedDate;
	}

	public void setFormattedDate(String formattedDate) {
		this.formattedDate = formattedDate;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

}
