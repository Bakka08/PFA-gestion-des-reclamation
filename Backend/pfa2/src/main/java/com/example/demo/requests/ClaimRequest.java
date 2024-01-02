package com.example.demo.requests;

public class ClaimRequest {
	private String description;
	private String subject;

	// getters and setters

	public ClaimRequest() {
		// default constructor
	}

	public ClaimRequest(String description, String subject) {

		this.description = description;
		this.subject = subject;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getSubject() {
		return subject;
	}

	public void setSubject(String subject) {
		this.subject = subject;
	}

}
