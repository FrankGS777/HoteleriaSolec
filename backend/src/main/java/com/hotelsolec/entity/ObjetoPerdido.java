package com.hotelsolec.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "objetos_perdidos")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ObjetoPerdido {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, unique = true, length = 20)
    private String codigo;
    
    @Column(nullable = false, columnDefinition = "TEXT")
    private String descripcion;
    
    @ManyToOne
    @JoinColumn(name = "habitacion_id")
    private Habitacion habitacion;
    
    @Column(name = "ubicacion_encontrado", length = 255)
    private String ubicacionEncontrado;
    
    @Column(name = "fecha_encontrado", nullable = false)
    private LocalDate fechaEncontrado;
    
    @Column(nullable = false, length = 20)
    private String estado = "RESGUARDO";
    
    @ManyToOne
    @JoinColumn(name = "cliente_id")
    private Cliente cliente;
    
    @Column(name = "fecha_devolucion")
    private LocalDate fechaDevolucion;
    
    @ManyToOne
    @JoinColumn(name = "empleado_encontro_id")
    private Empleado empleadoEncontro;
    
    @ManyToOne
    @JoinColumn(name = "empleado_entrega_id")
    private Empleado empleadoEntrega;
    
    @Column(columnDefinition = "TEXT")
    private String observaciones;
    
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
