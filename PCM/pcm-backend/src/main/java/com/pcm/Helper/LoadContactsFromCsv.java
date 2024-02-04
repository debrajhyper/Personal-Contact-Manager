package com.pcm.Helper;

import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.List;

import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import com.opencsv.bean.CsvToBeanBuilder;
import com.pcm.Constant.DemoUserConstant;
import com.pcm.Model.Contact;


@Service
public class LoadContactsFromCsv {

	public List<Contact> getContacts() {
		List<Contact> demoContacts = null;
		try {
			// Load CSV file from the classpath resource
			ClassPathResource resource = new ClassPathResource(DemoUserConstant.DEMO_USER_CONTACTS_CSV);
			InputStream inputStream = resource.getInputStream();

			// Open an input stream from the resource
			try (InputStreamReader reader = new InputStreamReader(inputStream)) {
				// Parse CSV file using OpenCSV
				List<Contact> contacts = new CsvToBeanBuilder<Contact>(reader).withType(Contact.class).build().parse();
				demoContacts = contacts;
				
			} catch (Exception e) {
				System.out.println("ERROR -> " + e.getMessage());
				e.printStackTrace();
			}

		} catch (Exception e) {
			System.out.println("ERROR -> " + e.getMessage());
			e.printStackTrace();
		}
		return demoContacts;
	}

}
