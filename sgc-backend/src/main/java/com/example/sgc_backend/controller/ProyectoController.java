package com.example.sgc_backend.controller;

import com.example.sgc_backend.model.Proyecto;
import com.example.sgc_backend.repository.ProyectoRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/proyectos")
public class ProyectoController {

    private final ProyectoRepository proyectoRepository;

    public ProyectoController(ProyectoRepository proyectoRepository) {
        this.proyectoRepository = proyectoRepository;
    }

    @GetMapping
    public List<Proyecto> getAllProyectos() {
        return proyectoRepository.findAll();
    }

    @PostMapping
    public Proyecto guardarProyecto(@RequestBody Proyecto proyecto) {
        return proyectoRepository.save(proyecto);
    }

    @GetMapping("/{id}")
    public Proyecto obtenerProyectoPorId(@PathVariable UUID id) {
        return proyectoRepository.findById(id).orElse(null);
    }

    @DeleteMapping("/{id}")
    public void eliminarProyecto(@PathVariable UUID id) {
        proyectoRepository.deleteById(id);
    }
}
