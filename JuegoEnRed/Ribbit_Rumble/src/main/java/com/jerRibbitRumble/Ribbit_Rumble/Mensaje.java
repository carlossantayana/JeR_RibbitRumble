package com.jerRibbitRumble.Ribbit_Rumble;

import java.io.Serializable;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class Mensaje implements Serializable{
	
	private static final long serialVersionUID = 1L;
	private long id;
	private String username;
	private String message;
	private String date;
	
	public Mensaje() {
		LocalDateTime messageDate = LocalDateTime.now();
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("(HH:mm:ss / dd-MM-yyyy)");
		
		date = messageDate.format(formatter);
	}
	
	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}
	
	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}
	
	public String getMessage() {
		return message;
	}
	
	public void setMessage(String message) {
		this.message = message;
	}
	
	public String getDate() {
		return date;
	}
}
