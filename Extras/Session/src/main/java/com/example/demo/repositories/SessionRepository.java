package com.example.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;


import com.example.demo.entities.Session;

public interface SessionRepository extends JpaRepository<Session, Integer> {

	Session findByUserId(int id);

	Session findByToken(String token);

	
}
