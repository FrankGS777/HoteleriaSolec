package com.hotelsolec.repository;

import com.hotelsolec.entity.ReservaHabitacion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReservaHabitacionRepository extends JpaRepository<ReservaHabitacion, Long> {
    List<ReservaHabitacion> findByReservaId(Long reservaId);
    List<ReservaHabitacion> findByHabitacionId(Long habitacionId);
}
