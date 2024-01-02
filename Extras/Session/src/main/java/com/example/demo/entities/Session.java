package com.example.demo.entities;

import java.text.SimpleDateFormat;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Session {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	@Column(unique = true)
	private String token;
	private String dateOfCreation;
	@Column(unique = true)
	private int userId;

	public Session(String token, int user) {

		this.token = token;
		this.dateOfCreation = formatLocalDateTimeToString(LocalDateTime.now());
		this.userId = user;
	}

	public Session(int id, String token, String dateOfCreation, int userId) {
		this.id = id;
		this.token = token;
		this.dateOfCreation = dateOfCreation;
		this.userId = userId;
	}

	public Session() {

	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public String getDateOfCreation() {
		return dateOfCreation;
	}

	public void setDateOfCreation(String dateOfCreation) {
		this.dateOfCreation = dateOfCreation;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getUser() {
		return userId;
	}

	public void setUser(int user) {
		this.userId = user;
	}

	private String formatLocalDateTimeToString(LocalDateTime localDateTime) {
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm");
		return dateFormat.format(java.sql.Timestamp.valueOf(localDateTime));
	}
}
