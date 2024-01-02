package com.example.demo.contollers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.Claim;
import com.example.demo.entities.Session;
import com.example.demo.entities.User;
import com.example.demo.idao.PasswordHash;
import com.example.demo.idao.Sessioncheck;
import com.example.demo.repositories.ClaimRepository;
import com.example.demo.repositories.SessionRepository;
import com.example.demo.repositories.UserRepository;
import com.example.demo.requests.ClaimRequest;
import com.example.demo.requests.LoginRequest;

@CrossOrigin
@RestController
@RequestMapping("/api")
public class ApiController {

	@Autowired
	private UserRepository userRepository;
	@Autowired
	private ClaimRepository claimRepository;
	@Autowired
	private SessionRepository sessionRepository;

	@PostMapping("/signup")
	public ResponseEntity<String> signup(@RequestBody User request) {
		// Check if the email is already in use
		if (userRepository.findByEmail(request.getEmail()) != null) {
			return ResponseEntity.status(HttpStatus.CONFLICT).body("Email is already in use");
		}

		// Create a new user
		User newUser = new User(request.getFirstName(), request.getLastName(),
				PasswordHash.generateHash(request.getPassword()), request.getTel(), request.getEmail());
		userRepository.save(newUser);

		// Return a success response
		return ResponseEntity.status(HttpStatus.CREATED).body("Signup successful");
	}

	@PostMapping("/login")
	public ResponseEntity<User> login(@RequestBody LoginRequest request) {
		User user = userRepository.findByEmail(request.getEmail());
		if (user != null && PasswordHash.generateHash(request.getPassword()).equals(user.getPassword())) {
			// Check if the user has an existing session
			Session existingSession = sessionRepository.findByUserId(user.getId());

			if (existingSession != null) {
				// If a session exists, remove it
				sessionRepository.delete(existingSession);
			}

			// Create a new session
			Session newSession = new Session(user.getId());
			sessionRepository.save(newSession);

			// Return user ID and token if login is successful
			return ResponseEntity.ok(user);
		} else {
			// Return 401 Unauthorized if login fails
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
		}
	}

	@PostMapping("/save/{id}")
	public ResponseEntity<String> createClaim(@RequestBody ClaimRequest claimRequest, @PathVariable int id) {

		claimRepository
				.save(new Claim(claimRequest.getSubject(), claimRequest.getDescription(), userRepository.findById(id)));
		return ResponseEntity.status(HttpStatus.CREATED).body("Claim added");

	}

	@GetMapping("/get/{id}")
	public ResponseEntity<List<Claim>> getClaim(@PathVariable int id) {
		List<Claim> allClaims = claimRepository.findAll();
		List<Claim> userClaims = new ArrayList<>();

		for (Claim claim : allClaims) {
			if (claim.getUser().getId() == id) {
				userClaims.add(claim);
			}
		}

		return ResponseEntity.ok(userClaims);
	}

	@PutMapping("/changestatus/{userId}/{claimid}/{action}")
	public ResponseEntity<String> changeStatusClaim(@PathVariable int userId, @PathVariable int claimid,
			@PathVariable String action) {

		Claim claim = claimRepository.findById(claimid);
		User user = userRepository.findById(userId);
		if (claim != null && user.getRole().equals("Manager")) {
			claim.setStatus(action);
			claimRepository.save(claim);
			return ResponseEntity.ok("Claim is updated");
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Claim not found");
		}
	}

	@GetMapping("/getAll")
	public ResponseEntity<List<Claim>> getAllClaims() {

		List<Claim> allClaims = claimRepository.findAll();

		return ResponseEntity.ok(allClaims);
	}

	@GetMapping("/getclaimbyid/{claimid}")
	public Claim getoneClaim(@PathVariable int claimid) {
		Claim claim = claimRepository.findById(claimid);
		return claim;
	}

	@PutMapping("/update/{claimid}")
	public String updateClaim(@RequestBody ClaimRequest claimRequest, @PathVariable int claimid) {
		Claim claim = claimRepository.findById(claimid);
		claim.setSubject(claimRequest.getSubject());
		claim.setDescription(claimRequest.getDescription());
		claimRepository.save(claim);
		return "updated";

	}

	@DeleteMapping("/delete/{claimid}")
	public void deleteClaim(@PathVariable int claimid) {
		Claim claim = claimRepository.findById(claimid);
		claimRepository.delete(claim);

	}

	@PutMapping("/action/{claimid}/{action}")
	public String actionClaim(@PathVariable int claimid, @PathVariable String action) {
		Claim claim = claimRepository.findById(claimid);
		claim.setStatus(action);
		claimRepository.save(claim);
		return "updated";

	}

	@GetMapping("/check/{userid}")
	public int check(@PathVariable int userid) {
	    List<Session> sessions = sessionRepository.findAll(); 

	    // Find the session with the specified userId
	    Session session = sessions.stream()
	                              .filter(s -> s.getUser() == userid)
	                              .findFirst()
	                              .orElse(null);

	    if (session != null) {
	        if (Sessioncheck.handleSession(session) == 1) {
	            return 1;
	        } else {
	            sessionRepository.delete(session);
	            return 0;
	        }
	    }
	    return 0;
	}

}
