package com.example.sgc_backend.controller;

import com.example.sgc_backend.model.Carpeta;
import com.example.sgc_backend.model.Usuario;
import com.example.sgc_backend.service.CarpetaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/carpetas")
@RequiredArgsConstructor
public class CarpetaController {
    private final CarpetaService carpetaService;

    @PostMapping
    public ResponseEntity<Carpeta> createCarpeta(@RequestBody CarpetaRequest request, @AuthenticationPrincipal Usuario usuario) {
        Carpeta carpeta = carpetaService.createCarpeta(request.getNombre(), usuario);
        return ResponseEntity.ok(carpeta);
    }

    @GetMapping
    public ResponseEntity<List<Carpeta>> getCarpetas(@AuthenticationPrincipal Usuario usuario) {
        List<Carpeta> carpetas = carpetaService.getCarpetasByUsuario(usuario.getId());
        return ResponseEntity.ok(carpetas);
    }
}

class CarpetaRequest {
    private String nombre;
    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }
}