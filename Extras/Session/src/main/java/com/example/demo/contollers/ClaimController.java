package com.example.demo.contollers;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.Claim;
import com.example.demo.entities.Session;
import com.example.demo.entities.User;
import com.example.demo.idao.ClaimDTO;
import com.example.demo.idao.ClaimWithUserDetailsDTO;
import com.example.demo.idao.Sessioncheck;
import com.example.demo.repositories.ClaimRepository;
import com.example.demo.repositories.SessionRepository;
import com.example.demo.repositories.UserRepository;
import com.example.demo.requests.ClaimRequest;
import com.example.demo.requests.Tclasss;

@CrossOrigin
@RestController
@RequestMapping("/claims")
public class ClaimController {

	@Autowired
	private ClaimRepository claimRepository;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private SessionRepository sessionRepository;

	@PostMapping("/save")
	public ResponseEntity<String> createClaim(@RequestBody ClaimRequest claimRequest) {
		Session session = sessionRepository.findByToken(claimRequest.getToken());

		if (session != null) {
			String result = Sessioncheck.handleSession(session);
			if ("Session ongoing".equals(result)) {
				claimRepository.save(new Claim(claimRequest.getSubject(), claimRequest.getDescription(),
						userRepository.findById(session.getUser())));
				return ResponseEntity.status(HttpStatus.CREATED).body("Claim added");
			} else {
				sessionRepository.delete(session);
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Session ended");
			}
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Session not found");
		}
	}

	@PostMapping("/get")
	public ResponseEntity<List<ClaimDTO>> getClaim(@RequestBody Tclasss tclasss) {
		Session session = sessionRepository.findByToken(tclasss.getToken());

		if (session != null) {
			String result = Sessioncheck.handleSession(session);

			if ("Session ongoing".equals(result)) {
				// Get all claims and filter by user ID
				List<Claim> allClaims = claimRepository.findAll();
				int sessionUserId = session.getUser();

				List<ClaimDTO> userClaims = allClaims.stream().filter(claim -> claim.getUser().getId() == sessionUserId)
						.map(this::convertToClaimDTO).collect(Collectors.toList());

				return ResponseEntity.ok(userClaims);
			} else {
				// Session is not ongoing, delete the session and return a response with status
				// 204 (No Content)
				sessionRepository.delete(session);
				return ResponseEntity.noContent().build();
			}
		} else {
			// Session not found, return a response with status 404 (Not Found)
			return ResponseEntity.notFound().build();
		}
	}

	@PutMapping("/changestatus/{claimid}/{action}")
	public ResponseEntity<String> changeStatusClaim(@RequestBody Tclasss tclasss, @PathVariable int claimid,
			@PathVariable String action) {
		Session session = sessionRepository.findByToken(tclasss.getToken());

		if (session != null) {
			String result = Sessioncheck.handleSession(session);

			if ("Session ongoing".equals(result)) {
				if (userRepository.findById(session.getUser()).getRole().equals("Manager")) {
					Claim claim = claimRepository.findById(claimid);

					if (claim != null) {
						claim.setStatus(action);
						claimRepository.save(claim);
						return ResponseEntity.ok("Claim is updated");
					} else {
						return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Claim not found");
					}
				}
				return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You don't have permission for this task");
			} else {
				sessionRepository.delete(session);
				return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Session ended");
			}
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Session not found");
		}
	}

	@PostMapping("/getAll")
	public ResponseEntity<List<ClaimWithUserDetailsDTO>> getAllClaims(@RequestBody Tclasss tclasss) {
		// Check session based on the provided token
		Session session = sessionRepository.findByToken(tclasss.getToken());

		if (session != null) {
			String result = Sessioncheck.handleSession(session);

			if ("Session ongoing".equals(result)) {
				// Get all claims
				List<Claim> allClaims = claimRepository.findAll();

				// Map claims to DTOs with user details
				List<ClaimWithUserDetailsDTO> claimsWithUserDetails = allClaims.stream()
						.map(this::convertToClaimWithUserDetailsDTO).collect(Collectors.toList());
 
				return ResponseEntity.ok(claimsWithUserDetails);
			} else {
				// Session is not ongoing, delete the session and return a response with status
				// 204 (No Content)
				sessionRepository.delete(session);
				return ResponseEntity.noContent().build();
			}
		} else {
			// Session not found, return a response with status 404 (Not Found)
			return ResponseEntity.notFound().build();
		}
	}

	private ClaimWithUserDetailsDTO convertToClaimWithUserDetailsDTO(Claim claim) {
		ClaimWithUserDetailsDTO dto = new ClaimWithUserDetailsDTO();
		dto.setId(claim.getId());
		dto.setSubject(claim.getSubject());
		dto.setDescription(claim.getDescription());
		dto.setFormattedDate(claim.getFormattedDate());
		dto.setStatus(claim.getStatus());

		// Set user details
		User user = claim.getUser();
		dto.setFirstName(user.getFirstName());
		dto.setLastName(user.getLastName());
		dto.setEmail(user.getEmail());
		dto.setTel(user.getTel());

		return dto;
	}

	private ClaimDTO convertToClaimDTO(Claim claim) {
		ClaimDTO claimDTO = new ClaimDTO();
		claimDTO.setId(claim.getId());
		claimDTO.setSubject(claim.getSubject());
		claimDTO.setDescription(claim.getDescription());
		claimDTO.setFormattedDate(claim.getFormattedDate());
		claimDTO.setStatus(claim.getStatus());

		return claimDTO;
	}

}
