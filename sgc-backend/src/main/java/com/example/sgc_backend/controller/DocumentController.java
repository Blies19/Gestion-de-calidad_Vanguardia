package com.example.sgc_backend.controller;

import com.example.sgc_backend.model.Documento; // Asegúrate de que esta importación esté presente
import com.example.sgc_backend.model.Usuario;
import com.example.sgc_backend.service.DocumentoService;

import org.springframework.core.io.FileSystemResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/documentos")

public class DocumentController {

    private final DocumentoService documentoService;

   
    public DocumentController(DocumentoService documentoService) {
        this.documentoService = documentoService;
    }

    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Documento> uploadDocumento(
            @RequestParam("file") MultipartFile file,
            @RequestParam("carpetaId") UUID carpetaId,
            @RequestParam("proyectoId") UUID proyectoId,
            @AuthenticationPrincipal Usuario usuario) throws Exception {
        Documento documento = documentoService.uploadDocumento(file, carpetaId, proyectoId, usuario);
        return ResponseEntity.ok(documento);
    }

    @GetMapping
    public ResponseEntity<List<Documento>> getDocumentos(
            @RequestParam("carpetaId") UUID carpetaId,
            @AuthenticationPrincipal Usuario usuario) {
        List<Documento> documentos = documentoService.getDocumentosByCarpeta(carpetaId, usuario.getId(), usuario.getRol());
        return ResponseEntity.ok(documentos);
    }

    @GetMapping("/download/{documentoId}")
    public ResponseEntity<FileSystemResource> downloadDocumento(
            @PathVariable UUID documentoId,
            @AuthenticationPrincipal Usuario usuario) {
        File file = documentoService.downloadDocumento(documentoId, usuario.getId(), usuario.getRol());
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getName() + "\"")
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(new FileSystemResource(file));
    }
}