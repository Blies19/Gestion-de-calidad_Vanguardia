package com.example.sgc_backend.controller;

import com.example.sgc_backend.model.Documento;
import com.example.sgc_backend.model.Usuario;
import com.example.sgc_backend.service.DocumentoService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/documentos")
public class DocumentoController {

    private final DocumentoService documentoService;

    public DocumentoController(DocumentoService documentoService) {
        this.documentoService = documentoService;
    }

    @GetMapping
    public ResponseEntity<List<Documento>> listarDocumentosPorCarpeta(@RequestParam UUID carpetaId) {
        List<Documento> documentos = documentoService.getDocumentosPorCarpeta(carpetaId);
        return ResponseEntity.ok(documentos);
    }

    @PostMapping("/upload")
public ResponseEntity<Documento> subirDocumento(
        @RequestParam("file") MultipartFile file,
        @RequestParam("carpetaId") UUID carpetaId,
        @RequestParam("proyectoId") UUID proyectoId,
        @RequestParam("tipoDocumento") String tipoDocumento, // <- agregado
        @AuthenticationPrincipal Usuario usuario) {
    try {
        Documento nuevoDocumento = documentoService.guardarDocumento(file, carpetaId, proyectoId, usuario, tipoDocumento);
        return ResponseEntity.ok(nuevoDocumento);
    } catch (IOException e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
}

    @GetMapping("/download/{idDocumento}")
    public ResponseEntity<byte[]> descargarDocumento(@PathVariable UUID idDocumento) {
        Documento documento = documentoService.obtenerDocumento(idDocumento);

        try {
            byte[] contenido = Files.readAllBytes(Paths.get(documento.getRutaArchivo()));

            HttpHeaders headers = new HttpHeaders();
            headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + documento.getNombre() + "\"");

            return ResponseEntity.ok()
                    .headers(headers)
                    .body(contenido);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
