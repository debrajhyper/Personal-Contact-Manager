package com.pcm.Helper;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.time.DateTimeException;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.zip.DataFormatException;

public class DateValidator {
	
	private String dateFormat;

    public DateValidator(String dateFormat) {
        this.dateFormat = dateFormat;
    }

    public boolean isValid(String dateStr) throws DataFormatException, DateTimeParseException {
        DateFormat formatter = new SimpleDateFormat(this.dateFormat);

        formatter.setLenient(false);
        try {
        	String userDateStr = formatter.format(formatter.parse(dateStr));
        	boolean isDateFuture = isDateFuture(userDateStr, dateFormat);
        	if (isDateFuture) {
    			throw new DateTimeException("The input date is a future date");
    		}
        	return true;
		} 
        catch (DateTimeException e) {
			// TODO: handle exception
        	throw new DateTimeException(e.getMessage());
		}
        catch (Exception e) {
			// TODO: handle exception
			throw new DataFormatException("Invalid Date Format");
		}
    }
    
    
	public boolean isDateFuture(String date, String dateFormat) throws DateTimeParseException {
		LocalDate localDate = LocalDate.now(ZoneId.systemDefault());

		DateTimeFormatter dtf = DateTimeFormatter.ofPattern(dateFormat);
		LocalDate inputDate = LocalDate.parse(date, dtf);

		return inputDate.isAfter(localDate);
	}
}
