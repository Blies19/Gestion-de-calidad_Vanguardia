package com.example.sgc_backend.entity;

import lombok.*;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "usuario")
@Data
@Builder
@NoArgsConstructor // Constructor sin argumentos requerido por Hibernate
@AllArgsConstructor // Constructor con todos los argumentos
public class Usuario {
    @Id
    @GeneratedValue(generator = "uuid")
    @Column(name = "id_usuario")
    private java.util.UUID id;

    @Column(nullable = false)
    private String nombre;

    @Column(nullable = false)
    private String apellido;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(name = "password_hash", nullable = false)
    private String passwordHash;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Rol rol;

    @Builder.Default
    @Column(name = "fecha_registro")
    private LocalDateTime fechaRegistro = LocalDateTime.now();

    @Builder.Default
    @Column(nullable = false)
    private boolean activo = true;

    public enum Rol {
        Admin, Investigador, Auditor
    }
}