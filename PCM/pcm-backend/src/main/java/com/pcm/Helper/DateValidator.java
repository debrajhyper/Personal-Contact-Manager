package com.pcm.Helper;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.DateTimeException;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.zip.DataFormatException;

public class DateValidator {
	
	private String dateFormat;

    public DateValidator(String dateFormat) {
        this.dateFormat = dateFormat;
    }

    public boolean isValid(String dateStr) throws ParseException, DataFormatException {
        DateFormat formatter = new SimpleDateFormat(this.dateFormat);

        formatter.setLenient(false);
        try {
        	String userDateStr = formatter.format(formatter.parse(dateStr));
        	boolean isDateFuture = isDateFuture(userDateStr, dateFormat);
        	if (isDateFuture) {
    			throw new DateTimeException("The input date is a future date");
    		}
		} 
        catch (DateTimeException e) {
			// TODO: handle exception
        	throw new DateTimeException("The input date is a future date");
		}
        catch (Exception e) {
			// TODO: handle exception
			throw new DataFormatException("Invalid Date Format");
		}
        return true;
    }
    
    
	public boolean isDateFuture(String date, String dateFormat) {
		LocalDate localDate = LocalDate.now(ZoneId.systemDefault());

		DateTimeFormatter dtf = DateTimeFormatter.ofPattern(dateFormat);
		LocalDate inputDate = LocalDate.parse(date, dtf);

		return inputDate.isAfter(localDate);
	}
}
