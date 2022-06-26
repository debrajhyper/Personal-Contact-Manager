package com.pcm.Model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;


@Data
@Entity
@Table(name = "mobile_number")
public class ContactMobileNumber {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	private String code;
	
	@NotBlank(message = "Mobile number is required")
	private String number;
	
	@JsonIgnore
	@ManyToOne
	@JoinColumn(name = "contact_id")
	private Contact contact;
	
}
