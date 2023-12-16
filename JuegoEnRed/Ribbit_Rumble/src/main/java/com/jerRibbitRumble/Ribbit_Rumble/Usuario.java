package com.jerRibbitRumble.Ribbit_Rumble;

public class Usuario {
	
	private static int userCount=0;
	private long id;
	private String username;
	private String password;
	private int wins;
	private int loses;
	private int roundWins;
	private int roundLoses;

	public Usuario(String user, String pw) 
	{
		username=user;
		password=pw;
		wins = 0;
		loses = 0;
		roundWins = 0;
		roundLoses = 0;
		id=userCount;
		userCount++;
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
