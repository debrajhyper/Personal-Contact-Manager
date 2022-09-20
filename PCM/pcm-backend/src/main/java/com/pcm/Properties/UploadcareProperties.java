package com.pcm.Properties;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import lombok.Data;

@Data
@ConfigurationProperties(prefix="spring.uploadcare")
@Configuration
public class UploadcareProperties {
	
	private String defaultuuid;
	
	private String publickey;
	
	private String secretkey;

}
