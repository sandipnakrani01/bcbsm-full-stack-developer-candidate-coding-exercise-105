package com.bcbs.SampleApp.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.bcbs.SampleApp.entity.User;
import com.bcbs.SampleApp.repository.UserRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class UserService {
	
	private UserRepository userRepository;

    public Optional<User> findByUserName(String userName) {
   
    	   Optional<User> optionalUser = userRepository.findByUserName(userName);
    	   System.out.println(optionalUser);
           return optionalUser;
    }
}
