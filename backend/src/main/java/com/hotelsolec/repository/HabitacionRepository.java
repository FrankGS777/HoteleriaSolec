package com.hotelsolec.repository;

import com.hotelsolec.entity.Habitacion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface HabitacionRepository extends JpaRepository<Habitacion, Long> {
    Optional<Habitacion> findByNumero(String numero);
    List<Habitacion> findByEstado(String estado);
    List<Habitacion> findByPiso(Integer piso);
    List<Habitacion> findByTipoHabitacionId(Long tipoHabitacionId);
    List<Habitacion> findByActivoTrue();
    
    @Query("SELECT h FROM Habitacion h WHERE h.estado = 'DISPONIBLE' AND h.activo = true")
    List<Habitacion> findDisponibles();
}
