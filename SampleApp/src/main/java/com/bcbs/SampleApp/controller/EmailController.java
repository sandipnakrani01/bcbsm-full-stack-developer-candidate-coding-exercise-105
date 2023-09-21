package com.bcbs.SampleApp.controller;

import java.io.IOException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.bcbs.SampleApp.entity.Email;
import com.bcbs.SampleApp.model.EmailRequest;
import com.bcbs.SampleApp.security.UserPrincipal;
import com.bcbs.SampleApp.service.EmailService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class EmailController {

	private final EmailService emailService;
	

	@PostMapping("/email")
	public ResponseEntity<Object> uploadFile(@AuthenticationPrincipal UserPrincipal principal, @RequestParam("file") MultipartFile file, EmailRequest emailRequest)
			throws IOException {

		// TODO : Uncomment this once email server is configured.
		// emailService.sendEmailWithAttachment(emailRequest, file);
		String userName = principal.getUsername();
		emailService.saveEmail(userName, emailRequest, file);

		return new ResponseEntity<>("Success!", HttpStatus.OK);
	}

}
