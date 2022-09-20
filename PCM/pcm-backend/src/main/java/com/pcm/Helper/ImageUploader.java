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

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.pcm.Constant.AppConstant;
import com.pcm.Model.Contact;
import com.pcm.Model.User;
import com.uploadcare.upload.UploadFailureException;


@Service
public class ImageUploader {
	private MultipartFile imageFile;
	private String imageName = AppConstant.DEFAULT_IMAGE;
	
	@Autowired
	private ImageUploaderUploadcare imageUploaderUploadcare;

	public ImageUploader() {
		// TODO Auto-generated constructor stub
	}
	
	public ImageUploader(MultipartFile imageFile) {
		super();
		this.imageFile = imageFile;
	}
	
	
	public void uploadImage(Contact contact) throws IOException, UploadFailureException {
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
			
			//LOCAL FILE SYSTEM
			uploadImageToLocation();
			
			//FILE SERVER
			String imageUUID = this.imageUploaderUploadcare.uploadImageToUploadcare(imageFile, imageName);
			contact.setImageUUID(imageUUID);
			
			System.out.println("IMAGE FILE SUCCESSFULLY UPLOADED");
		}
	}
	
	
	public void updateImage(Contact oldContact, Contact contact) throws IOException, UploadFailureException {
		if(imageFile != null && !imageFile.isEmpty()) {
			if(!imageFile.getContentType().equals(AppConstant.IMAGE_TYPE_JPEG) && !imageFile.getContentType().equals(AppConstant.IMAGE_TYPE_PNG)) {
				throw new ValidationException("Only JPEG/PNG content type are allowed");
			}
			else {				
				//DELETE OLD IMAGE
				if(oldContact.getImage() != AppConstant.DEFAULT_IMAGE) {
					deleteImageFromLocation(oldContact);
				}
				
				//UPDATE NEW IMAGE
				imageName = setImageName();
				
				System.out.println("PROFILE PIC IMAGE NAME -> " + imageName);
				contact.setImage(imageName);
				
				//LOCAL FILE SYSTEM
				uploadImageToLocation();
				
				//FILE SERVER
				String imageUUID = this.imageUploaderUploadcare.uploadImageToUploadcare(imageFile, imageName);
				contact.setImageUUID(imageUUID);
				
				System.out.println("IMAGE FILE SUCCESSFULLY UPLOADED");
			}
		}
		else {
			contact.setImage(oldContact.getImage());
		}
	}
	
	
	public void updateImage(User oldUser, User user) throws IOException, UploadFailureException {
		if(imageFile != null && !imageFile.isEmpty()) {
			if(!imageFile.getContentType().equals(AppConstant.IMAGE_TYPE_JPEG) && !imageFile.getContentType().equals(AppConstant.IMAGE_TYPE_PNG)) {
				throw new ValidationException("Only JPEG/PNG content type are allowed");
			}
			else {				
				//DELETE OLD IMAGE
				if(oldUser.getImage() != AppConstant.DEFAULT_IMAGE) {
					//LOCAL FILE SYSTEM
					deleteImageFromLocation(oldUser);
					
					//FILE SERVER
					this.imageUploaderUploadcare.deleteImageFromFileServer(oldUser);
				}
				
				//UPDATE NEW IMAGE
				imageName = setImageName();
				
				System.out.println("PROFILE PIC IMAGE NAME -> " + imageName);
				user.setImage(imageName);
				
				//LOCAL FILE SYSTEM
				uploadImageToLocation();
				
				//FILE SERVER
				String imageUUID = this.imageUploaderUploadcare.uploadImageToUploadcare(imageFile, imageName);
				user.setImageUUID(imageUUID);
				
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
			deleteImageFromLocation(contact);
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
	
	
	public void checkLocation() throws IOException {
		Path uploadFolder = Paths.get(AppConstant.SET_UPLOAD_LOCATION);
		
		if(!uploadFolder.toFile().exists()) {
			Files.createDirectories(uploadFolder);
		}
	}
	
	
	public void uploadImageToLocation() throws IOException {
		checkLocation();
		String uploadFolderPath = Paths.get(AppConstant.SET_UPLOAD_LOCATION).toFile().getAbsolutePath();
		Path fullPath = Paths.get(uploadFolderPath + File.separator + imageName);
		System.out.println("IMAGE UPLOAD LOCAL PATH LOCATION -> " + fullPath);
		
		Files.copy(imageFile.getInputStream(), fullPath, StandardCopyOption.REPLACE_EXISTING);
	}
	
	
	public void deleteImageFromLocation(Contact oldContact) throws IOException {
		String uploadFolderPath = Paths.get(AppConstant.SET_UPLOAD_LOCATION).toFile().getAbsolutePath();
		Path deleteFile = Paths.get(uploadFolderPath + File.separator + oldContact.getImage());
		
		Files.deleteIfExists(deleteFile);
	}
	
	
	public void deleteImageFromLocation(User oldUser) throws IOException {
		String uploadFolderPath = Paths.get(AppConstant.SET_UPLOAD_LOCATION).toFile().getAbsolutePath();
		Path deleteFile = Paths.get(uploadFolderPath + File.separator + oldUser.getImage());
		
		Files.deleteIfExists(deleteFile);
	}
	
	
	public InputStream getImageFromLocation(String imageName) throws IOException {
		String uploadFolderPath = Paths.get(AppConstant.SET_UPLOAD_LOCATION).toFile().getAbsolutePath();
		String fullPath = Paths.get(uploadFolderPath + File.separator + imageName).toString();
		
		InputStream image = new FileInputStream(fullPath);
		return image;
	}
	

}
