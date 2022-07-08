package com.pcm.Helper;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

import javax.validation.ValidationException;

import org.springframework.core.io.ClassPathResource;
import org.springframework.web.multipart.MultipartFile;

import com.pcm.Model.Contact;

public class ImageUploader {
	private MultipartFile imageFile;
	private String imageName = "default.png";

	public ImageUploader(MultipartFile imageFile) {
		super();
		this.imageFile = imageFile;
	}
	
	public void uploadImage(Contact contact) throws IOException {
		if(imageFile == null || imageFile.isEmpty()) {
			System.out.println("IMAGE FILE EMPTY");
			contact.setImage(imageName);
		} 
		else if(!imageFile.getContentType().equals("image/jpeg") && !imageFile.getContentType().equals("image/png")) {
			throw new ValidationException("Only JPEG/PNG content type are allowed");
		} 
		else {
			imageName = contact.getCId() + "_" + imageFile.getOriginalFilename();
			
			System.out.println("PROFILE PIC IMAGE NAME -> " + imageName);
			contact.setImage(imageName);
			
			File saveFile = new ClassPathResource("static/upload/").getFile();
			Path path = Paths.get(saveFile.getAbsolutePath() + File.separator + imageName);
			System.out.println("IMAGE UPLOAD LOCATION -> " + path);
			
			Files.copy(imageFile.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);
			System.out.println("IMAGE FILE SUCCESSFULLY UPLOADED");
		}
	}
	
	

}
