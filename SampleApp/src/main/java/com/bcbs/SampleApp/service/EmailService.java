package com.bcbs.SampleApp.service;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;

import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import com.bcbs.SampleApp.entity.Email;
import com.bcbs.SampleApp.model.EmailRequest;
import com.bcbs.SampleApp.repository.EmailRepository;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.AllArgsConstructor;

@Service("emailService")
@AllArgsConstructor
public class EmailService {

	private final JavaMailSender mailSender;

	private EmailRepository emailRepository;

	public void sendEmailWithAttachment(EmailRequest emailRequest, MultipartFile file) {

		try {
			MimeMessage message = mailSender.createMimeMessage();
			MimeMessageHelper helper = new MimeMessageHelper(message, true);

			helper.setFrom(emailRequest.getFromEmail());
			helper.setTo(emailRequest.getToEmail());
			helper.setSubject(emailRequest.getSubject());
			helper.setText(emailRequest.getDescription());

			File targetFile = new File(file.getOriginalFilename());
			OutputStream outStream = new FileOutputStream(targetFile);
			outStream.write(file.getInputStream().readAllBytes());
			IOUtils.closeQuietly(outStream);
			FileSystemResource fileSystemResource = new FileSystemResource(targetFile);
			helper.addAttachment(fileSystemResource.getFilename(), fileSystemResource);

			mailSender.send(message);
		} catch (MailException | MessagingException | IOException e) {
			throw new RuntimeException(e);
		}

	}
	
	public void saveEmail(String userName, EmailRequest emailRequest, MultipartFile file) {
		
		try {
			String fileName = StringUtils.cleanPath(file.getOriginalFilename());

			Email email = Email.builder()
					.fromEmail(emailRequest.getFromEmail())
					.toEmail(emailRequest.getToEmail())
					.subject(emailRequest.getSubject())
					.description(emailRequest.getDescription())
					.fileName(fileName)
					.uploadedBy(userName)
					.uploadedDate(getCurrentTime())
					.fileData(file.getBytes()).build();
			
			emailRepository.save(email);
			
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
	}
	
	public String getCurrentTime() {
		LocalDateTime now = LocalDateTime.now();  
        DateTimeFormatter format = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss");  
        return now.format(format);  
	}
}
