package com.example.sgc_backend.service;

import com.example.sgc_backend.dto.RegistroDTO;
import com.example.sgc_backend.entity.Usuario;
import com.example.sgc_backend.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public Usuario registrar(RegistroDTO registroDTO) {
        // Validar si ya existe
        if (usuarioRepository.findByEmail(registroDTO.getEmail()).isPresent()) {
            throw new RuntimeException("El correo ya está registrado.");
        }

        // Crear nuevo usuario
        Usuario nuevoUsuario = Usuario.builder()
                .nombre(registroDTO.getNombre())
                .email(registroDTO.getEmail())
                .password(passwordEncoder.encode(registroDTO.getPassword()))
                .rol(registroDTO.getRol())
                .build();

        return usuarioRepository.save(nuevoUsuario);
    }
}
