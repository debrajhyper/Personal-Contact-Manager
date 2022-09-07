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

import com.pcm.Constant.AppConstant;
import com.pcm.Model.Contact;
import com.pcm.Model.User;

public class ImageUploader {
	private MultipartFile imageFile;
	private String imageName = AppConstant.DEFAULT_IMAGE;

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
		else if(!imageFile.getContentType().equals(AppConstant.IMAGE_TYPE_JPEG) && !imageFile.getContentType().equals(AppConstant.IMAGE_TYPE_PNG)) {
			throw new ValidationException("Only JPEG/PNG content type are allowed");
		} 
		else {
			imageName = setImageName();
			
			System.out.println("PROFILE PIC IMAGE NAME -> " + imageName);
			contact.setImage(imageName);
			
			uploadImageToLocation(AppConstant.SET_UPLOAD_LOCATION);
			
			System.out.println("IMAGE FILE SUCCESSFULLY UPLOADED");
		}
	}
	
	public void updateImage(Contact oldContact, Contact contact) throws IOException {
		if(imageFile != null && !imageFile.isEmpty()) {
			if(!imageFile.getContentType().equals(AppConstant.IMAGE_TYPE_JPEG) && !imageFile.getContentType().equals(AppConstant.IMAGE_TYPE_PNG)) {
				throw new ValidationException("Only JPEG/PNG content type are allowed");
			}
			else {				
				//DELETE OLD IMAGE
				if(oldContact.getImage() != AppConstant.DEFAULT_IMAGE) {
					deleteImageFromLocation(AppConstant.SET_UPLOAD_LOCATION, oldContact);
				}
				
				//UPDATE NEW IMAGE
				imageName = setImageName();
				
				System.out.println("PROFILE PIC IMAGE NAME -> " + imageName);
				contact.setImage(imageName);
				
				uploadImageToLocation(AppConstant.SET_UPLOAD_LOCATION);
				
				System.out.println("IMAGE FILE SUCCESSFULLY UPLOADED");
			}
		}
		else {
			contact.setImage(oldContact.getImage());
		}
	}
	
	public void updateImage(User oldUser, User user) throws IOException {
		if(imageFile != null && !imageFile.isEmpty()) {
			if(!imageFile.getContentType().equals(AppConstant.IMAGE_TYPE_JPEG) && !imageFile.getContentType().equals(AppConstant.IMAGE_TYPE_PNG)) {
				throw new ValidationException("Only JPEG/PNG content type are allowed");
			}
			else {				
				//DELETE OLD IMAGE
				if(oldUser.getImage() != AppConstant.DEFAULT_IMAGE) {
					deleteImageFromLocation(AppConstant.SET_UPLOAD_LOCATION, oldUser);
				}
				
				//UPDATE NEW IMAGE
				imageName = setImageName();
				
				System.out.println("PROFILE PIC IMAGE NAME -> " + imageName);
				user.setImage(imageName);
				
				uploadImageToLocation(AppConstant.SET_UPLOAD_LOCATION);
				
				System.out.println("IMAGE FILE SUCCESSFULLY UPLOADED");
			}
		}
		else {
			user.setImage(oldUser.getImage());
		}
	}
	
	public void deleteImage(Contact contact) throws IOException {
		System.out.println("CONTACT IMAGE IS -> " + contact.getImage() + " : DEFAULT IMAGE IS -> " + imageName);
		
		if(!contact.getImage().equals(imageName)) {
			System.out.println("SO, DELETING CONTACT IMAGE FROM LOCATION");
			deleteImageFromLocation(AppConstant.SET_UPLOAD_LOCATION, contact);
		} 
		else {			
			System.out.println("SO, NO NEED TO DELETE CONTACT IMAGE FROM LOCATION");
		}
		
	}
	
	public String setImageName() {
		String name = imageFile.getOriginalFilename();
		String randomId = UUID.randomUUID().toString();
		String savedFileName = randomId.concat(name.substring(name.lastIndexOf(".")));
		
		return savedFileName;
	}
	
	public void uploadImageToLocation(String location) throws IOException {
		File saveFileLocation = new ClassPathResource(location).getFile();
		Path path = Paths.get(saveFileLocation.getAbsolutePath() + File.separator + imageName);
		System.out.println("IMAGE UPLOAD PATH LOCATION -> " + path);
		
		Files.copy(imageFile.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);
	}
	
	public void deleteImageFromLocation(String location, Contact oldContact) throws IOException {
		File deleteFileLocation = new ClassPathResource(location).getFile();
		File delleteFile = new File(deleteFileLocation, oldContact.getImage());
		
		delleteFile.delete();
	}
	
	public void deleteImageFromLocation(String location, User oldUser) throws IOException {
		File deleteFileLocation = new ClassPathResource(location).getFile();
		File delleteFile = new File(deleteFileLocation, oldUser.getImage());
		
		delleteFile.delete();
	}
	
	public InputStream getImageFromLocation(String imageName) throws IOException {
		File saveFileLocation = new ClassPathResource(AppConstant.SET_UPLOAD_LOCATION).getFile();
		String fullPath = Paths.get(saveFileLocation.getAbsolutePath() + File.separator + imageName).toString();
		
		InputStream image = new FileInputStream(fullPath);
		return image;
	}
	

}
