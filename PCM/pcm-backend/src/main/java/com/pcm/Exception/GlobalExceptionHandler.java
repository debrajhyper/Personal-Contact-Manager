package com.pcm.Exception;

import java.util.Date;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.validation.BindException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;


@ControllerAdvice
public class GlobalExceptionHandler {

	//handling specific exception
	@ExceptionHandler(ResourceNotFoundException.class)
	public ResponseEntity<?> handleResourceNotFoundHandling(ResourceNotFoundException exception, WebRequest request) {
		ErrorDetails errorDetails = new ErrorDetails(new Date(), exception.getMessage(), request.getDescription(false));
		return new ResponseEntity<>(errorDetails, HttpStatus.NOT_FOUND);
	}
	
	//handle already exists exceptions
	@ExceptionHandler(IllegalArgumentException.class)
	public ResponseEntity<?> handleIllegalArgumentException(IllegalArgumentException exception, WebRequest request) {
		ErrorDetails errorDetails = new ErrorDetails(new Date(), exception.getMessage(), request.getDescription(false));
		return new ResponseEntity<>(errorDetails, HttpStatus.CONFLICT);
	}
	
	//handle custom validation errors
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<?> customValidationErrorHandling(MethodArgumentNotValidException exception) {
		ErrorDetails errorDetails = new ErrorDetails(new Date(), "validation Error", exception.getBindingResult().getFieldError().getDefaultMessage());
		return new ResponseEntity<>(errorDetails, HttpStatus.BAD_REQUEST);
	}
	
	
	
	
	//login exceptions
	
	// handle login: user not found
	@ExceptionHandler(UsernameNotFoundException.class)
	public ResponseEntity<?> handleUsernameNotFoundException(UsernameNotFoundException exception, WebRequest request) {
		ErrorDetails errorDetails = new ErrorDetails(new Date(), exception.getMessage(), request.getDescription(false));
		return new ResponseEntity<>(errorDetails, HttpStatus.NOT_FOUND);
	}
	
	// handle login : disabled user
	@ExceptionHandler(DisabledException.class)
	public ResponseEntity<?> handleDisabledException(DisabledException exception, WebRequest request) {
		ErrorDetails errorDetails = new ErrorDetails(new Date(), exception.getMessage(), request.getDescription(false));
		return new ResponseEntity<>(errorDetails, HttpStatus.BAD_REQUEST);
	}
	
	//handle login : bad credentials
	@ExceptionHandler(BadCredentialsException.class)
	public ResponseEntity<?> handleBadCredentialsException(BadCredentialsException exception, WebRequest request) {
		ErrorDetails errorDetails = new ErrorDetails(new Date(), exception.getMessage(), request.getDescription(false));
		return new ResponseEntity<>(errorDetails, HttpStatus.BAD_REQUEST);
	}
	
	
	
	
	
	
	
	//handle Validation : Bind exception
	@SuppressWarnings("unchecked")
	@ExceptionHandler(BindException.class)
	public ResponseEntity<?> handleValidationException(BindException exception, WebRequest request) {
		List<ErrorDetails> errorDetails = (List<ErrorDetails>) new ErrorDetails(new Date(), exception.getMessage(), request.getDescription(false));
		return new ResponseEntity<>(errorDetails, HttpStatus.BAD_REQUEST);
	}
	
	

	
	
	
	
	
	

	
	//handling global exception
	@ExceptionHandler(Exception.class)
	public ResponseEntity<?> globalExceptionHandling(Exception exception, WebRequest request) {
		ErrorDetails errorDetails = new ErrorDetails(new Date(), exception.getMessage(), request.getDescription(false));
		return new ResponseEntity<>(errorDetails, HttpStatus.INTERNAL_SERVER_ERROR);
	}

}
