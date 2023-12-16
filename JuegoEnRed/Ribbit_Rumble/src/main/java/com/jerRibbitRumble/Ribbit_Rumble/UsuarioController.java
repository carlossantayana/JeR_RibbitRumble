package com.jerRibbitRumble.Ribbit_Rumble;

import java.util.Collection;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/Usuarios")
public class UsuarioController {
	
	private Map<Long,Usuario> users = new ConcurrentHashMap<>();
	private AtomicLong lastId = new AtomicLong();
	
	@PostMapping(value = "/")
	@ResponseStatus(HttpStatus.CREATED)
	public Usuario createUsuario(@RequestBody Usuario user) {
		long id = lastId.getAndIncrement();
		
		user.setId(id);
		users.put(id, user);
		
		return user;
	}
	
	@GetMapping(value = "/{id}")
	public ResponseEntity<Usuario>getUsuario(@PathVariable long id){
		Usuario user = users.get(id);
		
		if(user != null) {
			return new ResponseEntity<>(user,HttpStatus.OK);
		}else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@GetMapping(value = "/")
	public Collection<Usuario> getUsuarios(){
		return users.values();
	}
	
	@PutMapping(value = "/{id}")
	public ResponseEntity<Usuario> updateUsuario(@PathVariable long id, @RequestBody Usuario userUpdated){
		Usuario user = users.get(id);
		
		if(user != null) {
			userUpdated.setId(id);
			users.put(null, userUpdated);
			return new ResponseEntity<>(userUpdated,HttpStatus.OK);
		}else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@DeleteMapping(value = "/{id}")
	public ResponseEntity<Usuario> deleteUsuario(@PathVariable long id){
		Usuario user = users.remove(id);
		
		if(user != null) {
			return new ResponseEntity<>(user, HttpStatus.OK);
		}else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
}
