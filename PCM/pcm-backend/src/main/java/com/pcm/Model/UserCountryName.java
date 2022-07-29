package com.pcm.Model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;


@Data
@Entity
@Table(name = "user_country_name")
public class UserCountryName {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	private String code;
	
	private String name;
	
	@Column(name = "number")
	private String no;
	
	@JsonIgnore
	@OneToOne
	@JoinColumn(name = "user_id")
	private User user;
	
}
