package com.example.sgc_backend.service;

import com.example.sgc_backend.model.Carpeta;
import com.example.sgc_backend.model.Documento;
import com.example.sgc_backend.model.Proyecto;
import com.example.sgc_backend.model.Usuario;
import com.example.sgc_backend.repository.DocumentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@Service
public class DocumentoService {

    private final DocumentoRepository documentoRepository;

    // Constructor sin @Autowired, Spring lo infiere automáticamente
    public DocumentoService(DocumentoRepository documentoRepository) {
        this.documentoRepository = documentoRepository;
    }

    private static final String UPLOAD_DIR = "uploads/";

    public Documento uploadDocumento(MultipartFile file, UUID carpetaId, UUID proyectoId, Usuario usuario) throws IOException {
        String userDir = UPLOAD_DIR + usuario.getId() + "/" + carpetaId + "/";
        Files.createDirectories(Paths.get(userDir));

        String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
        String rutaArchivo = userDir + fileName;

        file.transferTo(new File(rutaArchivo));

        Documento documento = new Documento();
        documento.setNombre(file.getOriginalFilename());
        documento.setRutaArchivo(rutaArchivo);

        Proyecto proyecto = new Proyecto();
        proyecto.setIdProyecto(proyectoId);  // ¡este es el correcto!
        documento.setProyecto(proyecto);

        Carpeta carpeta = new Carpeta();
        carpeta.setIdCarpeta(carpetaId);  // ¡este es el correcto!
        documento.setCarpeta(carpeta);

        documento.setAutor(usuario);
        documento.setTipoDocumento(determineTipoDocumento(file.getOriginalFilename()));
        documento.setEstadoValidacion(Documento.EstadoValidacion.PENDIENTE);

        return documentoRepository.save(documento);
    }

    public List<Documento> getDocumentosByCarpeta(UUID carpetaId, UUID usuarioId, String rol) {
        if ("Admin".equals(rol)) {
            return documentoRepository.findByCarpetaIdCarpeta(carpetaId);
        }
        return documentoRepository.findByCarpetaIdCarpetaAndAutorIdUsuario(carpetaId, usuarioId);
    }

    public File downloadDocumento(UUID documentoId, UUID usuarioId, String rol) {
        Documento documento = documentoRepository.findById(documentoId)
                .orElseThrow(() -> new RuntimeException("Documento no encontrado"));

        if (!"Admin".equals(rol) && !documento.getAutor().getId().equals(usuarioId)) {
            throw new RuntimeException("Acceso denegado");
        }

        return new File(documento.getRutaArchivo());
    }

    private Documento.TipoDocumento determineTipoDocumento(String fileName) {
        String extension = fileName.substring(fileName.lastIndexOf(".") + 1).toLowerCase();
        return switch (extension) {
            case "pdf" -> Documento.TipoDocumento.PDF;
            case "doc", "docx" -> Documento.TipoDocumento.WORD;
            case "xls", "xlsx" -> Documento.TipoDocumento.EXCEL;
            default -> Documento.TipoDocumento.OTRO;
        };
    }
}
