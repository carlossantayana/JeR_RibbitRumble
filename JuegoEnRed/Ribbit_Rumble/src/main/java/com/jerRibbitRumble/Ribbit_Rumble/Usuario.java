package com.jerRibbitRumble.Ribbit_Rumble;

import java.io.Serializable;

public class Usuario implements Serializable{

	private static final long serialVersionUID = 1L;
	
	private long id;
	private String username;
	private String password;
	private boolean isActive;
	private int wins;
	private int loses;
	private int roundWins;
	private int roundLoses;

	public Usuario() 
	{
		isActive = true;
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

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
	
	public boolean isActive() {
		return isActive;
	}

	public void setActive(boolean isActive) {
		this.isActive = isActive;
	}

	public int getWins() {
		return wins;
	}

	public void setWins(int wins) {
		this.wins = wins;
	}

	public int getLoses() {
		return loses;
	}

	public void setLoses(int loses) {
		this.loses = loses;
	}

	public int getRoundWins() {
		return roundWins;
	}

	public void setRoundWins(int roundWins) {
		this.roundWins = roundWins;
	}

	public int getRoundLoses() {
		return roundLoses;
	}

	public void setRoundLoses(int roundLoses) {
		this.roundLoses = roundLoses;
	}
	
	
}
