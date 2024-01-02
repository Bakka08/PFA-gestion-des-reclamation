package com.example.demo.idao;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.nio.charset.StandardCharsets;

public class PasswordHash {
	   public static String generateHash(String input) {
	        try {
	            // Create MessageDigest instance for SHA-256
	            MessageDigest md = MessageDigest.getInstance("SHA-256");

	            // Add input string bytes to digest
	            md.update(input.getBytes(StandardCharsets.UTF_8));

	            // Get the hash's bytes
	            byte[] bytes = md.digest();

	            // Convert the byte array to a hexadecimal string
	            StringBuilder sb = new StringBuilder();
	            for (byte aByte : bytes) {
	                sb.append(String.format("%02x", aByte));
	            }

	            // Take the first 29 characters as the hash
	            return sb.toString().substring(0, 15);
	        } catch (NoSuchAlgorithmException e) {
	            e.printStackTrace();
	            // Handle the exception or throw it as per your requirement
	            return null;
	        }
	   

	}
}






 
