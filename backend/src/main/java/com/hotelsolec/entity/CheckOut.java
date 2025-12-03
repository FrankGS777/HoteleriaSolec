package com.hotelsolec.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Entity
@Table(name = "checkouts")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CheckOut {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "reserva_id", nullable = false)
    private Reserva reserva;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "empleado_id", nullable = false)
    private Empleado empleado;
    
    @Column(name = "fecha_hora", nullable = false)
    private LocalDateTime fechaHora;
    
    @Column(name = "hora_salida_real")
    private LocalTime horaSalidaReal;
    
    @Column(name = "estado_habitacion", length = 50)
    private String estadoHabitacion;
    
    @Column(name = "consumos_adicionales", precision = 10, scale = 2)
    private BigDecimal consumosAdicionales = BigDecimal.ZERO;
    
    @Column(columnDefinition = "TEXT")
    private String observaciones;
    
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        if (fechaHora == null) {
            fechaHora = LocalDateTime.now();
        }
    }
}
