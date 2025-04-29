package com.example.sgc_backend.service;

import com.example.sgc_backend.model.Documento;
import com.example.sgc_backend.model.Carpeta;
import com.example.sgc_backend.model.Proyecto;
import com.example.sgc_backend.model.Usuario;
import com.example.sgc_backend.repository.DocumentoRepository;
import com.example.sgc_backend.repository.CarpetaRepository;
import com.example.sgc_backend.repository.ProyectoRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import com.example.sgc_backend.model.Documento.TipoDocumento;


import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@Service
public class DocumentoService {

    private final DocumentoRepository documentoRepository;
    private final CarpetaRepository carpetaRepository;
    private final ProyectoRepository proyectoRepository;

    public DocumentoService(DocumentoRepository documentoRepository, CarpetaRepository carpetaRepository, ProyectoRepository proyectoRepository) {
        this.documentoRepository = documentoRepository;
        this.carpetaRepository = carpetaRepository;
        this.proyectoRepository = proyectoRepository;
    }

    public List<Documento> getDocumentosPorCarpeta(UUID carpetaId) {
        return documentoRepository.findByCarpeta_IdCarpeta(carpetaId);
    }

    public Documento guardarDocumento(MultipartFile file, UUID carpetaId, UUID proyectoId, Usuario usuario, String tipoDocumento) throws IOException {
        Carpeta carpeta = carpetaRepository.findById(carpetaId)
                .orElseThrow(() -> new RuntimeException("Carpeta no encontrada"));
        Proyecto proyecto = proyectoRepository.findById(proyectoId)
                .orElseThrow(() -> new RuntimeException("Proyecto no encontrado"));
    
        String uploadDir = "uploads/";
        Files.createDirectories(Paths.get(uploadDir));
        Path filePath = Paths.get(uploadDir + file.getOriginalFilename());
        Files.write(filePath, file.getBytes());
    
        Documento documento = new Documento();
        documento.setNombre(file.getOriginalFilename());
        documento.setRutaArchivo(filePath.toString());
        documento.setCarpeta(carpeta);
        documento.setProyecto(proyecto);
        documento.setAutor(usuario);
        documento.setTipoDocumento(TipoDocumento.valueOf(tipoDocumento)); 
    
        return documentoRepository.save(documento);
    }

    public Documento obtenerDocumento(UUID idDocumento) {
        return documentoRepository.findById(idDocumento)
                .orElseThrow(() -> new RuntimeException("Documento no encontrado"));
    }
}
