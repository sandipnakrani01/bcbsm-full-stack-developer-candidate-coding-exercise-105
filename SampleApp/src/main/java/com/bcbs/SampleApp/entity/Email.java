package com.bcbs.SampleApp.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@Entity
@Table(name = "emails")
public class Email {

	@Id
	@GeneratedValue
	private Long id;
	
	@Column(nullable = false)
	private String fromEmail;
	
	@Column(nullable = false)
	private String toEmail;
	    
	@Column(nullable = false)
	private String subject;
	
	@Column(nullable = false)
	private String description;
	
	@Column(nullable = false)
	private String fileName;
	
	@Column(nullable = false)
	private String uploadedBy;
	
	@Column(nullable = false)
	private String uploadedDate;
	
	@Lob
	@Column(columnDefinition = "LONGBLOB")
    private byte[] fileData;
}
