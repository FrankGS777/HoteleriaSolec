package com.hotelsolec.repository;

import com.hotelsolec.entity.Servicio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ServicioRepository extends JpaRepository<Servicio, Long> {
    Optional<Servicio> findByCodigo(String codigo);
    List<Servicio> findByDisponibleTrue();
    List<Servicio> findByCategoria(String categoria);
}
