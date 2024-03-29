package com.pcm.Exception;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ErrorDetails {

	private Date timestamp;
	private String message;
	private String details;
	

//	public ErrorDetails(Date timestamp, String message, String details) {
//		super();
//		this.timestamp = timestamp;
//		this.message = message;
//		this.details = details;
//	}
//
//	public ErrorDetails() {
//		super();
//		// TODO Auto-generated constructor stub
//	}
//
//	public Date getTimestamp() {
//		return timestamp;
//	}
//
//	public void setTimestamp(Date timestamp) {
//		this.timestamp = timestamp;
//	}
//
//	public String getMessage() {
//		return message;
//	}
//
//	public void setMessage(String message) {
//		this.message = message;
//	}
//
//	public String getDetails() {
//		return details;
//	}
//
//	public void setDetails(String details) {
//		this.details = details;
//	}
//
//	@Override
//	public String toString() {
//		return "ErrorDetails [timestamp=" + timestamp + ", message=" + message + ", details=" + details + "]";
//	}
}
