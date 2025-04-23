package com.example.todo.controller;

import com.example.todo.model.Tarea;
import com.example.todo.repository.TareaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TareaController {
    @Autowired
    private TareaRepository repo;

    @PostMapping("/api/tareas")
    public String registrar(@RequestParam String titulo, @RequestParam String descripcion) {
        Tarea tarea = new Tarea(titulo, descripcion);
        repo.save(tarea);
        return "¡Tarea registrada!";
    }
}