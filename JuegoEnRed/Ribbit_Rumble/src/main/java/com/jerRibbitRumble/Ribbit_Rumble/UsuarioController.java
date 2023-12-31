package com.jerRibbitRumble.Ribbit_Rumble;

import java.io.*;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import jakarta.annotation.PostConstruct;
import jakarta.annotation.PreDestroy;

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
import org.springframework.web.bind.annotation.CrossOrigin;

@RestController
@RequestMapping("/Usuarios")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class UsuarioController {

	private Map<Long, Usuario> users = new ConcurrentHashMap<>();
	private List<Long> idFree = new ArrayList<>();

	String fileName = "usersFile.txt";

	@PostMapping(value = "/")
	@ResponseStatus(HttpStatus.CREATED)
	public Usuario createUsuario(@RequestBody Usuario user) {
		long id;
		
		if(idFree.size() == 0) {
			id = users.size();
		}
			
		else{
			id = idFree.get(0);
			idFree.remove(0);
			
		}

		user.setId(id);
		users.put(id, user);

		return user;
	}

	@GetMapping(value = "/{id}")
	public ResponseEntity<Usuario> getUsuario(@PathVariable long id) {
		Usuario user = users.get(id);

		if (user != null) {
			return new ResponseEntity<>(user, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@GetMapping(value = "/")
	public Collection<Usuario> getUsuarios() {
		return users.values();
	}

	@PutMapping(value = "/{id}")
	public ResponseEntity<Usuario> updateUsuario(@PathVariable long id, @RequestBody Usuario userUpdated) {
		Usuario user = users.get(id);

		if (user != null) {
			userUpdated.setId(id);
			users.put(id, userUpdated);
			return new ResponseEntity<>(userUpdated, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@DeleteMapping(value = "/{id}")
	public ResponseEntity<Usuario> deleteUsuario(@PathVariable long id) {
		Usuario user = users.remove(id);
		idFree.add(id);

		if (user != null) {
			return new ResponseEntity<>(user, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@PreDestroy
	public void escribirFichero() {
		 try {
		        Path filePath = Paths.get(fileName);
		        Path absolutePath = filePath.toAbsolutePath();

		        try (ObjectOutputStream outputStream = new ObjectOutputStream(new FileOutputStream(absolutePath.toString()))) {
		            outputStream.writeObject(users);
		            System.out.println("HashMap guardado en el archivo '" + absolutePath + "' correctamente.");
		        }
		    } catch (IOException e) {
		        e.printStackTrace();
		    }
	}
	
	@PreDestroy
	public void usersInactive() 
	{
		for (Map.Entry<Long, Usuario> user : users.entrySet()) {
		    
		    Usuario usuario = user.getValue();
		    
		    usuario.setActive(false);
		    
		}
	}
	
	@PostConstruct
	public void leerFichero() {
		try {
	        Path filePath = Paths.get(fileName);
	        Path absolutePath = filePath.toAbsolutePath();

	        try (ObjectInputStream inputStream = new ObjectInputStream(new FileInputStream(absolutePath.toString()))) {
	            users = (Map<Long, Usuario>) inputStream.readObject();
	            System.out.println("Map leído desde el archivo '" + absolutePath + "':");
	            for (Long key : users.keySet()) {
	                System.out.println("ID: " + key + ", Usuario: " + users.get(key));
	            }
	        }
	    } catch (IOException | ClassNotFoundException e) {
	        e.printStackTrace();
	    }
	}
}

