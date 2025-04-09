// src/main/java/com/example/sgc_backend/controller/AuthController.java
package com.example.sgc_backend.controller;

import com.example.sgc_backend.entity.Usuario;
import com.example.sgc_backend.service.UsuarioService;
import com.example.sgc_backend.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

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
    private PasswordEncoder passwordEncoder; // Inyectamos PasswordEncoder

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
            // Comparamos la contraseña ingresada con la codificada
            if (passwordEncoder.matches(loginRequest.getPassword(), usuario.getPasswordHash())) {
                String token = jwtUtil.generateToken(usuario.getEmail(), usuario.getRol().toString());
                Map<String, String> response = new HashMap<>();
                response.put("token", token);
                response.put("rol", usuario.getRol().toString());
                return ResponseEntity.ok(response);
            }
        }
        return ResponseEntity.status(401).body(Map.of("message", "Credenciales inválidas"));
    }
}

class LoginRequest {
    private String email;
    private String password;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}