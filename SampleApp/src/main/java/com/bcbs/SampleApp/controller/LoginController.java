package com.bcbs.SampleApp.controller;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.bcbs.SampleApp.model.LoginRequest;
import com.bcbs.SampleApp.model.LoginResponse;
import com.bcbs.SampleApp.security.UserPrincipal;
import com.bcbs.SampleApp.service.AuthService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class LoginController {

	private final AuthService authService;

	@GetMapping("/test")
	public String hello2() {
		return "Hello, world! ";
	}

	@PostMapping("/login")
	public LoginResponse login(@RequestBody LoginRequest request) {
		return authService.attemptLogin(request.getUserName(), request.getPassword());
	}

	@GetMapping("/admin")
	public String admin(@AuthenticationPrincipal UserPrincipal principal) {
		return "Login Success for: " + principal.getUsername();
	}

}
