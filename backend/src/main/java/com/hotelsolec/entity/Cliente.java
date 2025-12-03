package com.hotelsolec.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "clientes")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Cliente {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "tipo_documento", nullable = false, length = 20)
    private String tipoDocumento;
    
    @Column(name = "numero_documento", nullable = false, unique = true, length = 20)
    private String numeroDocumento;
    
    @Column(nullable = false, length = 50)
    private String nombre;
    
    @Column(nullable = false, length = 100)
    private String apellidos;
    
    @Column(length = 100)
    private String email;
    
    @Column(length = 20)
    private String telefono;
    
    @Column(length = 255)
    private String direccion;
    
    @Column(length = 100)
    private String ciudad;
    
    @Column(length = 100)
    private String pais;
    
    @Column(name = "fecha_nacimiento")
    private LocalDate fechaNacimiento;
    
    @Column(name = "es_vip", nullable = false)
    private Boolean esVip = false;
    
    @Column(columnDefinition = "TEXT")
    private String notas;
    
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }
    
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
