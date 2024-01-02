package com.example.demo.idao;

import java.time.Duration;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import com.example.demo.entities.Session;

public class Sessioncheck {

	public static int handleSession(Session session) {
		// Get the date of creation from the session
		String dateOfCreation = session.getDateOfCreation();

		// Parse the dateOfCreation string into LocalDateTime
		LocalDateTime creationDateTime = LocalDateTime.parse(dateOfCreation,
				DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm"));

		// Calculate the time difference in minutes
		long minutesPassed = Duration.between(creationDateTime, LocalDateTime.now()).toMinutes();

		if (minutesPassed > 30) {
			// Session has passed 30 minutes, delete the session
			return 0;
		} else {
			// Session is ongoing
			return 1;
		}
	}
}
