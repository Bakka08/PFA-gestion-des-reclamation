package com.example.demo.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entities.Claim;
import com.example.demo.entities.User;

public interface ClaimRepository extends JpaRepository<Claim, Integer> {
	List<Claim> findByUser(User user);

	Claim findById(int id);
}