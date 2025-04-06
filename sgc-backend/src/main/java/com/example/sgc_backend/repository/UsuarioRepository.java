package com.example.sgc_backend.repository;

import com.example.sgc_backend.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;
import java.util.Optional;

Optional<Usuario> findByEmail(String email);


public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    // Agrega este método
    Usuario findByEmail(String email);
}
