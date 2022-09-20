package com.pcm.Helper;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.pcm.Model.User;
import com.pcm.Properties.UploadcareProperties;
import com.uploadcare.api.Client;
import com.uploadcare.upload.FileUploader;
import com.uploadcare.upload.UploadFailureException;


@Service
public class ImageUploaderUploadcare {
	
	@Autowired
	private UploadcareProperties uploadcareProperties;
	
	public String uploadImageToUploadcare(MultipartFile imageFile, String imageName) throws UploadFailureException, IOException {
		Client client = new Client(this.uploadcareProperties.getPublickey(), this.uploadcareProperties.getSecretkey());
		
//		File file = new File(fullPath.toUri());
//		Uploader uploader = new FileUploader(client, file);
		FileUploader fileUploader = new FileUploader(client, imageFile.getBytes(), imageName);
		
		com.uploadcare.api.File uploadedFile = fileUploader.upload().save();
		System.out.println("PROFILE PIC IMAGE UUID -> " + uploadedFile.getFileId());
		System.out.println("PROFILE PIC UPLOAD FILE SERVER PATH LOCATION -> " + uploadedFile.getOriginalFileUrl());
		System.out.println("UPLOADED TO FILE SERVER");
		
		client.close();
		return uploadedFile.getFileId();
	}
	
	
	public void deleteImageFromFileServer(User oldUser) {
		Client client = new Client(this.uploadcareProperties.getPublickey(), this.uploadcareProperties.getSecretkey());
		
		client.deleteFile(oldUser.getImageUUID());
		client.close();
	}

}
