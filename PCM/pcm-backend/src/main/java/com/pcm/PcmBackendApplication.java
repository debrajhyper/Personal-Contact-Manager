package com.pcm;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class PcmBackendApplication implements CommandLineRunner {
	
	@Value("${server.port}")
	private String serverPort;

	public void run(String... args) throws Exception {
		// here you can access my-value
		System.out.println("SERVER PORT ---------------------------->  " + serverPort);
	}
	
	public static void main(String[] args) throws IOException {
		SpringApplication.run(PcmBackendApplication.class, args);
	}
}
