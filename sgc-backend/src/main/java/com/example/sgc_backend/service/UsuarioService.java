// src/main/java/com/example/sgc_backend/service/UsuarioService.java
package com.example.sgc_backend.service;

import com.example.sgc_backend.entity.Usuario;
import com.example.sgc_backend.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Optional<Usuario> findByEmail(String email) {
        return usuarioRepository.findByEmail(email);
    }

    public List<Usuario> findAll() {
        return usuarioRepository.findAll();
    }

    public Optional<Usuario> findById(UUID id) {
        return usuarioRepository.findById(id);
    }

    public Usuario save(Usuario usuario) {
        // Si es un nuevo usuario o la contraseña ha cambiado, codificarla
        if (usuario.getId() == null || usuario.getPasswordHash() != null) {
            usuario.setPasswordHash(passwordEncoder.encode(usuario.getPasswordHash()));
        } else {
            // Si es una actualización y no se proporcionó una nueva contraseña,
            // mantener la contraseña existente
            Optional<Usuario> existingUsuario = usuarioRepository.findById(usuario.getId());
            if (existingUsuario.isPresent()) {
                usuario.setPasswordHash(existingUsuario.get().getPasswordHash());
            }
        }
        return usuarioRepository.save(usuario);
    }
}