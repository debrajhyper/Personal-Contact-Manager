package com.pcm.Properties;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import lombok.Data;

@Data
@Configuration
@ConfigurationProperties(prefix="file.server")
public class FileServerProperties {
	
	private String defaultuuid;
	
	private String publickey;
	
	private String secretkey;

}
