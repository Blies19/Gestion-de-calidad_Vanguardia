package com.example.sgc_backend.repository;

import com.example.sgc_backend.model.Proyecto;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface ProyectoRepository extends JpaRepository<Proyecto, UUID> {
}