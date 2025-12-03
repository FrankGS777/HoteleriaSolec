package com.hotelsolec.repository;

import com.hotelsolec.entity.Reserva;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface ReservaRepository extends JpaRepository<Reserva, Long> {
    Optional<Reserva> findByCodigo(String codigo);
    List<Reserva> findByClienteId(Long clienteId);
    List<Reserva> findByEstado(String estado);
    
    @Query("SELECT r FROM Reserva r WHERE r.fechaEntrada >= :inicio AND r.fechaSalida <= :fin")
    List<Reserva> findByFechaEntradaBetween(@Param("inicio") LocalDate inicio, @Param("fin") LocalDate fin);
}
