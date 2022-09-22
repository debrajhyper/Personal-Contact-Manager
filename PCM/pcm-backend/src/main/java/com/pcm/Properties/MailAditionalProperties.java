package com.pcm.Properties;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import lombok.Data;

@Data
@Configuration
@ConfigurationProperties(prefix="spring.mail.properties.mail.smtp")
public class MailAditionalProperties {
	
	private boolean ssl;
	
	private boolean auth;
	
	private Integer connectiontimeout;
	
	private Integer timeout;
	
	private Integer writetimeout;
}
