package com.hotelsolec.repository;

import com.hotelsolec.entity.LimpiezaHabitacion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface LimpiezaHabitacionRepository extends JpaRepository<LimpiezaHabitacion, Long> {
    List<LimpiezaHabitacion> findByHabitacionId(Long habitacionId);
    List<LimpiezaHabitacion> findByEstado(String estado);
    List<LimpiezaHabitacion> findByFechaProgramada(LocalDate fechaProgramada);
}
