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
		System.out.println("======================================================   GET IMAGE FROM DB   =======================================================");
		
		try {			
			InputStream image = new ImageUploader().getImageFromLocation(imageName);
			
			response.setContentType(MediaType.IMAGE_JPEG_VALUE);
			StreamUtils.copy(image, response.getOutputStream());
		} 
		catch (IOException e) {
			// TODO Auto-generated catch block
			System.out.println("ERROR -> " + e.getMessage());
			e.printStackTrace();
			throw new IOException("Unable to retrieve profile picture from server");
		}
		catch (Exception e) {
			// TODO: handle exception
			System.out.println("ERROR -> " + e.getMessage());
			e.printStackTrace();
			throw new Exception("Unable to retrieve image from server");
		}
	}
	
	
	
//	@PostMapping("/upload")
//	public ResponseEntity<?> imgUploader(@PathVariable("image") MultipartFile image) throws IOException {
//		System.out.println("======================================================   IMAGE UPLOADING   =======================================================");
//		String location = "upload";
//		System.out.println(image);
//		
//		Path path = Paths.get(location);
//		System.out.println("path -> " + path);
//		System.out.println(Files.exists(path));
//		
//		if(!Files.exists(path)) {
//			Files.createDirectories(path);
//		}
//		
//		Path destPath = Paths.get(location + File.separator + image.getOriginalFilename());
//		System.out.println(destPath);
//		
//		Files.copy(image.getInputStream(), destPath, StandardCopyOption.REPLACE_EXISTING);
//		
//		String uriLocation = ServletUriComponentsBuilder.fromCurrentContextPath().path(location + "/").path(image.getOriginalFilename()).toUriString();
//		System.out.println(uriLocation);
//		
//		
//		return ResponseEntity.ok(uriLocation);
//	}
}
