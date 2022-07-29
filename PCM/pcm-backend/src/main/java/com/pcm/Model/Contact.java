package com.pcm.Model;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.Valid;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "contact")
public class Contact {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int cId;
	
	private String image;
	
	private boolean favorite;
	
	@Size(min = 2, max = 30, message = "Min 2 and max 30 characters are allowed in name field")
	@NotBlank(message = "Name is required")
	private String name;
	
	private String nickName;
	
	private String title;
	
	private String company;
	
	@Column(unique = true)
	@NotBlank(message = "Email address is required")
	@Email(regexp = "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$")
	private String email;
	
	@Valid
	@OneToOne(mappedBy = "contact", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	private ContactMobileNumber mobileNumber;
	
	@OneToOne(mappedBy = "contact", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	private ContactTelephoneNumber telephoneNumber;
	
	@OneToOne(mappedBy = "contact", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	private ContactCountryName country;
	
	@JsonFormat(pattern = "dd-MM-yyyy")
	private String dateOfBirth;
	
	private String address;
	
	private String relationship;
	
	private String zodiacSign;
	
	private String[] tags;

	@Column(length = 9000)
	private String description;
	
	private String website;
	
	@Valid
	@OneToOne(mappedBy = "contact", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	private ContactSocialLinks socialLinks;

	@JsonIgnore
	@ManyToOne
	private User user;

}
