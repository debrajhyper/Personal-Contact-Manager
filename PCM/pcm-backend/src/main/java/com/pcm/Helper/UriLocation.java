package com.pcm.Helper;

import java.net.URI;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.web.util.UriComponentsBuilder;

import com.pcm.Constant.AppConstant;
import com.pcm.Model.Contact;
import com.pcm.Model.User;
import com.pcm.Properties.UploadcareProperties;
import com.uploadcare.api.Client;
import com.uploadcare.urls.CdnPathBuilder;
import com.uploadcare.urls.Urls;


@Service
public class UriLocation {
	
	@Autowired
	private UploadcareProperties uploadcareProperties;
	
	
	public String getDefaultLocation(User sessionUser) {
		UriComponentsBuilder finalUri = ServletUriComponentsBuilder.fromCurrentContextPath().path(AppConstant.GET_UPLOAD_LOCATION).path(sessionUser.getImage());
		
		System.out.println("DEFAULT IMAGE URI -> " + finalUri);
		return finalUri.toUriString();
	}
	
	
	public String getDefaultLocation(Contact contact) {
		UriComponentsBuilder finalUri = ServletUriComponentsBuilder.fromCurrentContextPath().path(AppConstant.GET_UPLOAD_LOCATION).path(contact.getImage());
		
		System.out.println("DEFAULT IMAGE URI -> " + finalUri);
		return finalUri.toUriString();
	}
	
	
	public String getUploadcareLocation(User sessionUser) {
		Client client = new Client(this.uploadcareProperties.getPublickey(), this.uploadcareProperties.getSecretkey());
		
		com.uploadcare.api.File file = client.getFile(sessionUser.getImageUUID());
		
		CdnPathBuilder builder = file.cdnPath();
		URI url = Urls.cdn(builder);
		String finalUri = url + sessionUser.getImage();
		
		System.out.println("UPLOADCARE IMAGE URI -> " + finalUri);
		
		client.close();
		return finalUri.toString();
	}
	
	
	public String getUploadcareLocation(Contact contact) {
		Client client = new Client(this.uploadcareProperties.getPublickey(), this.uploadcareProperties.getSecretkey());
		
		com.uploadcare.api.File file = client.getFile(contact.getImageUUID());
		
		CdnPathBuilder builder = file.cdnPath();
		URI url = Urls.cdn(builder);
		String finalUri = url + contact.getImage();
		
		System.out.println("UPLOADCARE IMAGE URI -> " + finalUri);
		
		client.close();
		return finalUri.toString();
	}
}
