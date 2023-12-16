package com.jerRibbitRumble.Ribbit_Rumble;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class Mensaje {
	private long id;
	private String message;
	private LocalDateTime messageDate;
	
	public Mensaje() {
		messageDate = LocalDateTime.now();
	}
	
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public String getMessageDate() {
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm");
		
		String hourMinute = messageDate.format(formatter);
		
		return hourMinute;
	}
}
