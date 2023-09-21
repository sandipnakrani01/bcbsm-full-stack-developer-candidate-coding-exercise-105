package com.bcbs.SampleApp.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bcbs.SampleApp.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {

	Optional<User> findByUserName(String userName);
}