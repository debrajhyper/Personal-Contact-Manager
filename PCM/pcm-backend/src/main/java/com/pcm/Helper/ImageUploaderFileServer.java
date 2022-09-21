package com.pcm.Helper;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.pcm.Properties.FileServerProperties;
import com.uploadcare.api.Client;
import com.uploadcare.api.File;
import com.uploadcare.upload.FileUploader;
import com.uploadcare.upload.UploadFailureException;


@Service
public class ImageUploaderFileServer {
	
	@Autowired
	private FileServerProperties fileServerProperties;
	
	public String uploadImageToFileServer(MultipartFile imageFile, String imageName) throws UploadFailureException, IOException {
		System.out.println("UPLOADING IMAGE TO FILE SERVER...");
		Client client = new Client(this.fileServerProperties.getPublickey(), this.fileServerProperties.getSecretkey());
		
		FileUploader fileUploader = new FileUploader(client, imageFile.getBytes(), imageName);
		
		File uploadedFile = fileUploader.upload().save();
		System.out.println("PROFILE PIC IMAGE UUID -> " + uploadedFile.getFileId());
		System.out.println("PROFILE PIC UPLOAD FILE SERVER PATH LOCATION -> " + uploadedFile.getOriginalFileUrl());
		System.out.println("IMAGE UPLOADED TO FILE SERVER...");
		
		client.close();
		return uploadedFile.getFileId();
	}
	
	
	public void deleteImageFromFileServer(String imageUUID) {
		System.out.println("DELETING IMAGE TFROM FILE SERVER...");
		Client client = new Client(this.fileServerProperties.getPublickey(), this.fileServerProperties.getSecretkey());
		
		client.deleteFile(imageUUID);
		System.out.println("IMAGE DELETED FROM FILE SERVER...");
		client.close();
	}

}
