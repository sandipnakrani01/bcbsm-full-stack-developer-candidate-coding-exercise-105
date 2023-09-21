package com.bcbs.SampleApp.model;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@Builder
@ToString
public class EmailRequest {

    private final String fromEmail;
    private final String toEmail;
    private final String subject;
    private final String description;
     
}
