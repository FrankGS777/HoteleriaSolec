package com.hotelsolec.repository;

import com.hotelsolec.entity.Mantenimiento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MantenimientoRepository extends JpaRepository<Mantenimiento, Long> {
    Optional<Mantenimiento> findByCodigo(String codigo);
    List<Mantenimiento> findByHabitacionId(Long habitacionId);
    List<Mantenimiento> findByEstado(String estado);
    List<Mantenimiento> findByPrioridad(String prioridad);
}
