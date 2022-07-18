package com.pcm.Helper;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

import javax.validation.ValidationException;

import org.springframework.core.io.ClassPathResource;
import org.springframework.web.multipart.MultipartFile;

import com.pcm.Model.Contact;

public class ImageUploader {
	private MultipartFile imageFile;
	private String imageName = "default.png";
	private static final String uploadLocation = "static/upload";

	public ImageUploader() {
		// TODO Auto-generated constructor stub
	}
	
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
			throw new ValidationException("Only JPEG/PNG content type are allowed.");
		} 
		else {
			String name = imageFile.getOriginalFilename();
			String randomId = UUID.randomUUID().toString();
			String savedFileName = randomId.concat(name.substring(name.lastIndexOf(".")));
			imageName = contact.getCId() + "_" + savedFileName;
			
			System.out.println("PROFILE PIC IMAGE NAME -> " + imageName);
			contact.setImage(imageName);
			
			uploadImageToLocation(uploadLocation);
			
			System.out.println("IMAGE FILE SUCCESSFULLY UPLOADED");
		}
	}
	
	public void uploadImageToLocation(String location) throws IOException {
		File saveFile = new ClassPathResource(location).getFile();
		
		Path path = Paths.get(saveFile.getAbsolutePath() + File.separator + imageName);
		System.out.println("IMAGE UPLOAD PATH LOCATION -> " + path);
		
		Files.copy(imageFile.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);
	}
	
	public InputStream getImageFromLocation(String imageName) throws IOException {
		
		File saveFile = new ClassPathResource(uploadLocation).getFile();
		String fullPath = Paths.get(saveFile.getAbsolutePath() + File.separator + imageName).toString();
		
		InputStream image = new FileInputStream(fullPath);
		return image;
	}
	

}
