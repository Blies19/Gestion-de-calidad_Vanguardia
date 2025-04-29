package com.example.sgc_backend.repository;

import com.example.sgc_backend.model.Documento;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.UUID;

public interface DocumentoRepository extends JpaRepository<Documento, UUID> {
    List<Documento> findByCarpeta_IdCarpeta(UUID idCarpeta);
}

