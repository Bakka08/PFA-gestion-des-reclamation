package com.example.demo.idao;

public class ClaimWithUserDetailsDTO {
	private int id;
	private String subject;
	private String description;
	private String formattedDate;
	private String status;
	private String firstName;
	private String lastName;
	private String email;
	private String tel;

	public ClaimWithUserDetailsDTO(int id, String subject, String description, String formattedDate, String status,
			String firstName, String lastName, String email, String tel) {
		this.id = id;
		this.subject = subject;
		this.description = description;
		this.formattedDate = formattedDate;
		this.status = status;
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.tel = tel;
	}

	public ClaimWithUserDetailsDTO() {

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

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getTel() {
		return tel;
	}

	public void setTel(String tel) {
		this.tel = tel;
	}

}
