package com.example.demo.idao;

import java.time.Duration;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import com.example.demo.entities.Session;

public class Sessioncheck {

	public static String handleSession(Session session) {
		// Get the date of creation from the session
		String dateOfCreation = session.getDateOfCreation();

		// Parse the dateOfCreation string into LocalDateTime
		LocalDateTime creationDateTime = LocalDateTime.parse(dateOfCreation,
				DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm"));

		// Calculate the time difference in minutes
		long minutesPassed = Duration.between(creationDateTime, LocalDateTime.now()).toMinutes();

		if (minutesPassed > 30) {
			// Session has passed 30 minutes, delete the session
			return "Session ended";
		} else {
			// Session is ongoing
			return "Session ongoing";
		}
	}
}
