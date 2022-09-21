package com.pcm.Properties;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import lombok.Data;

@Data
@ConfigurationProperties(prefix="file.server")
@Configuration
public class FileServerProperties {
	
	private String defaultUuid;
	
	private String publickey;
	
	private String secretkey;

}
