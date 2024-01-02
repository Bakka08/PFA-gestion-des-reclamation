package com.example.demo.idao;

import java.util.List;

import com.example.demo.entities.User;

public class Usercheck {

	public static User getUserByToken(String token, List<User> users) {
		// Iterate through the users to find the one with the matching token
		for (User user : users) {
			if (HashGenerator.generateHash(String.valueOf(user.getId())).equals(token)) {
				// Return the user if the token matches
				return user;
			}
		}

		// Return null if no user with the given token is found
		return null;
	}
}
