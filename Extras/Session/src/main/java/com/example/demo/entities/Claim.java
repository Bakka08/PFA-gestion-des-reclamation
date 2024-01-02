package com.example.demo.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;

@Entity
public class Claim {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String subject;
	private String description;
	private String formattedDate;
	private String status;
	@ManyToOne
	private User user;

	public Claim(String subject, String description, User user) {
		this.subject = subject;
		this.description = description;
		this.formattedDate = formatLocalDateTimeToString(LocalDateTime.now());

		this.status = "Pending";
		this.user = user;
	}

	public Claim() {

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

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	private String formatLocalDateTimeToString(LocalDateTime localDateTime) {
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm");
		return dateFormat.format(java.sql.Timestamp.valueOf(localDateTime));
	}
}
