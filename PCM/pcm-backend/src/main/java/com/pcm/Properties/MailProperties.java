package com.pcm.Properties;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import lombok.Data;


@Data
@Configuration
@ConfigurationProperties(prefix="spring.mail")
public class MailProperties {
	
	private String username;
	
	private String password;
	
	private String host;
	
	private Integer port;
	
	@Autowired
	private MailAditionalProperties mailAditionalProperties;

}