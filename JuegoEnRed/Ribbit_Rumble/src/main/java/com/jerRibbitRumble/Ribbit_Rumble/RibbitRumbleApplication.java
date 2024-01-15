package com.jerRibbitRumble.Ribbit_Rumble;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.context.annotation.Bean;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@SpringBootApplication
@EnableWebSocket
public class RibbitRumbleApplication implements WebSocketConfigurer{

	@Override
	public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
			registry.addHandler(Handler(), "/ribbits").setAllowedOrigins("*");
	}
	
	@Bean
	public WebSocketHandler Handler() {
	return new WebSocketHandler();
	}
		
	public static void main(String[] args) {
		SpringApplication.run(RibbitRumbleApplication.class, args);
	}
}
