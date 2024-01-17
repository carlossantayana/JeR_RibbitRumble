package com.jerRibbitRumble.Ribbit_Rumble;


import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

public class WebSocketHandler extends TextWebSocketHandler{
	
	private Map<String, WebSocketSession> sessions = new ConcurrentHashMap<>();
	private ObjectMapper mapper = new ObjectMapper();

	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		System.out.println("New session: " + session.getId());
		
		sessions.put(session.getId(), session);
		
		ObjectNode node = mapper.createObjectNode();
		node.put("type", "login");
		node.put("data", (sessions.size()));
		session.sendMessage(new TextMessage(node.toString()));
	}
	
	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		System.out.println("Session closed: " + session.getId());
		sessions.remove(session.getId());
	}
	
	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		JsonNode node = mapper.readTree(message.getPayload());
		String type = node.get("type").toString();
		
		type = type.replaceAll("\"", "");
		
		switch(type) {
			case "pairing":
				pairPlayers(session);
				break;
			case "selectingCharacter":
				
				String data = node.get("data").toString();
				data = data.replaceAll("\"", "");
				
				for (Map.Entry<String, WebSocketSession> entry : sessions.entrySet()) 
				{
		            if(entry.getKey()!= session.getId()) {
		            	System.out.println(entry.getValue());
		            	selectCharacter(entry.getValue(), data);
		            }
				}
				break;
			case "selectingMap":
				
				String data2 = node.get("data").toString();
				data2 = data2.replaceAll("\"", "");
				
				for (Map.Entry<String, WebSocketSession> entry : sessions.entrySet()) 
				{
		            if(entry.getKey()!= session.getId()) {
		            	System.out.println(entry.getValue());
		            	selectMap(entry.getValue(), data2);
		            }
				}
				break;
			case "mapSelected":
				
				String data3 = node.get("data").toString();
				data3 = data3.replaceAll("\"", "");
				
				for (Map.Entry<String, WebSocketSession> entry : sessions.entrySet()) 
				{
		            if(entry.getKey()!= session.getId()) {
		            	System.out.println(entry.getValue());
		            	mapFinalSelection(entry.getValue(), data3);
		            }
				}
				break;
		}
	}

	public void pairPlayers(WebSocketSession session) throws Exception{
		String pairState;

		if(sessions.size() == 2){
			pairState = "true";
		}else{
			pairState = "false";
		}

		ObjectNode node = mapper.createObjectNode();
		node.put("type", "pair");
		node.put("data", pairState);

		session.sendMessage(new TextMessage(node.toString()));
	}
	
	public void selectCharacter(WebSocketSession session, String message) throws Exception{
		ObjectNode node = mapper.createObjectNode();
		node.put("type", "playerSelect");
		node.put("data", message);
		session.sendMessage(new TextMessage(node.toString()));
	}
	public void selectMap(WebSocketSession session, String message) throws Exception{
		ObjectNode node = mapper.createObjectNode();
		node.put("type", "mapSelect");
		node.put("data", message);
		session.sendMessage(new TextMessage(node.toString()));
	}
	public void mapFinalSelection(WebSocketSession session, String message) throws Exception{
		ObjectNode node = mapper.createObjectNode();
		node.put("type", "finalSelect");
		node.put("data", message);
		session.sendMessage(new TextMessage(node.toString()));
	}
}
