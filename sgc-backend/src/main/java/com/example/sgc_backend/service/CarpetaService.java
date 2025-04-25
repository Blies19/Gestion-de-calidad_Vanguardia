package com.example.sgc_backend.service;

import com.example.sgc_backend.model.Carpeta;
import com.example.sgc_backend.model.Usuario;
import com.example.sgc_backend.repository.CarpetaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CarpetaService {
    private final CarpetaRepository carpetaRepository;

    public Carpeta createCarpeta(String nombre, Usuario usuario) {
        Carpeta carpeta = new Carpeta();
        carpeta.setNombre(nombre);
        carpeta.setUsuario(usuario);
        return carpetaRepository.save(carpeta);
    }

    public List<Carpeta> getCarpetasByUsuario(UUID usuarioId) {
        return carpetaRepository.findByUsuarioIdUsuario(usuarioId);
    }
}