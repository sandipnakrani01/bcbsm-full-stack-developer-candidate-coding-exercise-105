package com.bcbs.SampleApp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bcbs.SampleApp.entity.Email;



public interface EmailRepository extends JpaRepository<Email, Long> {

}