package com.example.sgc_backend.repository;

import com.example.sgc_backend.model.Carpeta;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.UUID;

public interface CarpetaRepository extends JpaRepository<Carpeta, UUID> {
    List<Carpeta> findByUsuarioIdUsuario(UUID usuarioId);
}