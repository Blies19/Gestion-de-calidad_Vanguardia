package com.sgc.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.sgc.dto.request.LoginRequest; // Asegúrate que esta clase existe
import com.sgc.dto.request.SignupRequest; // Asegúrate que esta clase existe
import java.util.Map;

@RestController
@RequestMapping("/api/auth")


public class AuthController {
    
    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody LoginRequest request) {
        String token = authService.login(request.getEmail(), request.getPassword());
        return ResponseEntity.ok().body(Map.of("token", token));
    }

    @PostMapping("/signup")
    public ResponseEntity<Usuario> signup(@RequestBody SignupRequest request) {
        Usuario usuario = authService.register(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(usuario);
    }
}