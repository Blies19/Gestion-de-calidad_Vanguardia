package com.sgc.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.sgc.config.JwtService; // Asegúrate que esta clase existe
import com.sgc.model.Usuario; // Asegúrate que esta clase existe
import com.sgc.repository.UsuarioRepository; // Asegúrate que esta interfaz existe

@Service
public class AuthService {
    
    @Autowired
    private UsuarioRepository usuarioRepo;
    
    @Autowired
    private JwtService jwtService;
    
    @Autowired
    private PasswordEncoder passwordEncoder;

    public String login(String email, String password) {
        Usuario usuario = usuarioRepo.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        
        if (!passwordEncoder.matches(password, usuario.getPassword())) {
            throw new RuntimeException("Contraseña incorrecta");
        }
        
        return jwtService.generateToken(usuario);
    }
}