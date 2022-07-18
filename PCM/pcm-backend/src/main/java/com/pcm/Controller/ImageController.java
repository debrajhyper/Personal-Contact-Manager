package com.pcm.Controller;

import java.io.IOException;
import java.io.InputStream;

import javax.servlet.http.HttpServletResponse;

import org.springframework.http.MediaType;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.pcm.Helper.ImageUploader;


@CrossOrigin("*")
@RestController
public class ImageController {
	
	@GetMapping(value = "/upload/{imageName}", produces = MediaType.IMAGE_JPEG_VALUE)
	public void getImage(@PathVariable("imageName") String imageName, HttpServletResponse response) throws Exception {
		try {			
			InputStream image = new ImageUploader().getImageFromLocation(imageName);
			
			response.setContentType(MediaType.IMAGE_JPEG_VALUE);
			StreamUtils.copy(image, response.getOutputStream());
		} 
		catch (IOException e) {
			// TODO Auto-generated catch block
			System.out.println("ERROR -> " + e.getMessage());
			e.printStackTrace();
			throw new IOException("Failed to load Profile Picture from Server.");
		}
		catch (Exception e) {
			// TODO: handle exception
			System.out.println("ERROR -> " + e.getMessage());
			e.printStackTrace();
			throw new Exception("Image failed to fetch from server.");
		}
	}
	
//	@GetMapping("/upload/{imageName}")
//	public ResponseEntity<InputStream> getImageFromLocation(@PathVariable("imageName") String imageName) throws Exception {
//		InputStream image;
//		try {
//			image = new ImageUploader().getImageFromLocation(imageName);
//			byte[] bytes = StreamUtils.copyToByteArray(image);
//			
//			return ResponseEntity.ok().body(image);
//		} 
//		catch (IOException e) {
//			// TODO Auto-generated catch block
//			System.out.println("ERROR -> " + e.getMessage());
//			e.printStackTrace();
//			throw new IOException("Failed to load Profile Picture from Server.");
//		}
//		catch (Exception e) {
//			// TODO: handle exception
//			System.out.println("ERROR -> " + e.getMessage());
//			e.printStackTrace();
//			throw new Exception("Image failed to fetch from server.");
//		}
//	}
	
}
