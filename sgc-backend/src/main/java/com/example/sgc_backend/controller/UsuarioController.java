// src/main/java/com/example/sgc_backend/controller/UsuarioController.java
package com.example.sgc_backend.controller;

import com.example.sgc_backend.entity.Usuario;
import com.example.sgc_backend.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @GetMapping
    public ResponseEntity<List<Usuario>> listarUsuarios() {
        List<Usuario> usuarios = usuarioService.findAll();
        return ResponseEntity.ok(usuarios);
    }

    @PostMapping
    public ResponseEntity<Usuario> crearUsuario(@RequestBody Usuario usuario) {
        Usuario nuevoUsuario = usuarioService.save(usuario);
        return ResponseEntity.status(201).body(nuevoUsuario);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Usuario> editarUsuario(@PathVariable UUID id, @RequestBody Usuario usuario) {
        usuario.setId(id);
        Usuario usuarioActualizado = usuarioService.save(usuario);
        return ResponseEntity.ok(usuarioActualizado);
    }
}