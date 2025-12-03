package com.hotelsolec.repository;

import com.hotelsolec.entity.ConsumoServicio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ConsumoServicioRepository extends JpaRepository<ConsumoServicio, Long> {
    List<ConsumoServicio> findByReservaId(Long reservaId);
}
