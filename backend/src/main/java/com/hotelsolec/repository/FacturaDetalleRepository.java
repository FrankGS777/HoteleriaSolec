package com.hotelsolec.repository;

import com.hotelsolec.entity.FacturaDetalle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FacturaDetalleRepository extends JpaRepository<FacturaDetalle, Long> {
    List<FacturaDetalle> findByFacturaId(Long facturaId);
}
