package com.example.demo.contollers;

import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.Session;
import com.example.demo.entities.User;
import com.example.demo.idao.HashGenerator;
import com.example.demo.idao.PasswordHash;
import com.example.demo.idao.Sessioncheck;
import com.example.demo.repositories.SessionRepository;
import com.example.demo.repositories.UserRepository;
import com.example.demo.requests.LoginRequest;
import com.example.demo.requests.Tclasss;

@CrossOrigin
@RestController
@RequestMapping("/auth")
public class AuthController {

	@Autowired
	private UserRepository userRepository;
	@Autowired
	private SessionRepository sessionRepository;

	Random random = new Random();

	@PostMapping("/signup")
	public ResponseEntity<String> signup(@RequestBody User request) {
		// Check if the email is already in use
		if (userRepository.findByEmail(request.getEmail()) != null) {
			return ResponseEntity.status(HttpStatus.CONFLICT).body("Email is already in use");
		}
		System.out.println(PasswordHash.generateHash("admin"));
		// Create a new user
		User newUser = new User(request.getFirstName(), request.getLastName(),
				PasswordHash.generateHash(request.getPassword()), request.getTel(), request.getEmail());
		userRepository.save(newUser);

		// Return a success response
		return ResponseEntity.status(HttpStatus.CREATED).body("Signup successful");
	}

	@PostMapping("/login")
	public ResponseEntity<String> login(@RequestBody LoginRequest request) {
		User user = userRepository.findByEmail(request.getEmail());
		if (user != null && PasswordHash.generateHash(request.getPassword()).equals(user.getPassword())) {
			// Check if the user already has an active session
			Session existingSession = sessionRepository.findByUserId(user.getId());

			if (existingSession != null) {
				// User has an existing session, remove it
				sessionRepository.delete(existingSession);
			}

			// Generate a new token and create a new session
			String token = HashGenerator
					.generateHash(String.valueOf(user.getId() + String.valueOf(random.nextInt(100) + 1)));
			sessionRepository.save(new Session(token, user.getId()));

			// Return user ID and token if login is successful
			return ResponseEntity.ok(token + "-" + user.getRole());
		} else {
			// Return 401 Unauthorized if login fails
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
		}
	}

	@PostMapping("/check")
	public ResponseEntity<String> check(@RequestBody String token) {
		Session session = sessionRepository.findByToken(token);

		if (session != null) {
			String result = Sessioncheck.handleSession(session);

			// Check the result and take appropriate actions
			if ("Session ongoing".equals(result)) {
				// Session is ongoing
				return ResponseEntity.status(HttpStatus.OK).body(result);
			}
			if ("Session ended".equals(result)) {
				// Session has ended, delete the session
				sessionRepository.delete(session);
				return ResponseEntity.status(HttpStatus.OK).body(result);
			} else {
				// Handle other cases as needed
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Unexpected result");
			}
		} else {
			// Session doesn't exist
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Session not found");
		}
	}

	@DeleteMapping("/logout")
	public ResponseEntity<String> logout(@RequestHeader Tclasss tclasss) {
		// Extract the token from the Authorization header

		Session session = sessionRepository.findByToken(tclasss.getToken());

		if (session != null) {
			// Session exists, delete the session
			sessionRepository.delete(session);
			return ResponseEntity.status(HttpStatus.OK).body("Logout successful");
		} else {
			// Session doesn't exist
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Session not found");
		}
	}

}
