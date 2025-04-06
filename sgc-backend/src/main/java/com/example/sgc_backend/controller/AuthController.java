package com.example.sgc_backend.controller;

import com.example.sgc_backend.dto.LoginRequest;
import com.example.sgc_backend.dto.LoginResponse;
import com.example.sgc_backend.entity.Usuario;
import com.example.sgc_backend.service.UsuarioService;
import com.example.sgc_backend.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/register")
    public ResponseEntity<?> registrar(@RequestBody Usuario usuario) {
        try {
            Usuario nuevoUsuario = usuarioService.registrarUsuario(usuario);
            return new ResponseEntity<>(nuevoUsuario, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        Optional<Usuario> usuarioOpt = usuarioService.findByEmail(loginRequest.getEmail());
        if (usuarioOpt.isPresent() && passwordEncoder.matches(loginRequest.getPassword(), usuarioOpt.get().getPasswordHash())) {
            Usuario usuario = usuarioOpt.get();
            String token = jwtUtil.generateToken(usuario.getEmail(), usuario.getRol().name());
            LoginResponse response = new LoginResponse();
            response.setToken(token);
            response.setRol(usuario.getRol().name());
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciales inválidas");
        }
    }
}