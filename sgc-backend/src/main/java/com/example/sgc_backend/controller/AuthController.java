// src/main/java/com/example/sgc_backend/controller/AuthController.java
package com.example.sgc_backend.controller;

import com.example.sgc_backend.model.Usuario;
import com.example.sgc_backend.service.UsuarioService;
import com.example.sgc_backend.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import com.example.sgc_backend.dto.LoginRequest;



import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<Usuario> register(@RequestBody Usuario usuario) {
        Usuario savedUsuario = usuarioService.save(usuario);
        return ResponseEntity.status(201).body(savedUsuario);
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody LoginRequest loginRequest) {
        Optional<Usuario> usuarioOpt = usuarioService.findByEmail(loginRequest.getEmail());
        if (usuarioOpt.isPresent()) {
            Usuario usuario = usuarioOpt.get();
            if (passwordEncoder.matches(loginRequest.getPassword(), usuario.getPasswordHash())) {
                String token = jwtUtil.generateToken(usuario.getEmail(), usuario.getRol());
                Map<String, String> response = new HashMap<>();
                response.put("token", token);
                response.put("rol", usuario.getRol());
                return ResponseEntity.ok(response);
            }
        }
        return ResponseEntity.status(401).body(Map.of("message", "Credenciales inválidas"));
    }
}

