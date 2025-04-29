package com.example.sgc_backend.controller;

import com.example.sgc_backend.model.Carpeta;
import com.example.sgc_backend.model.Usuario;
import com.example.sgc_backend.repository.CarpetaRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/carpetas")
public class CarpetaController {

    private final CarpetaRepository carpetaRepository;

    public CarpetaController(CarpetaRepository carpetaRepository) {
        this.carpetaRepository = carpetaRepository;
    }

    @GetMapping
    public ResponseEntity<List<Carpeta>> getCarpetas(@AuthenticationPrincipal Usuario usuario) {
        List<Carpeta> carpetas = carpetaRepository.findAll();
        return ResponseEntity.ok(carpetas);
    }
}
