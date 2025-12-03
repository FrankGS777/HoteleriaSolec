package com.hotelsolec.repository;

import com.hotelsolec.entity.Factura;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FacturaRepository extends JpaRepository<Factura, Long> {
    Optional<Factura> findByNumeroFactura(String numeroFactura);
    List<Factura> findByReservaId(Long reservaId);
    List<Factura> findByClienteId(Long clienteId);
    List<Factura> findByEstado(String estado);
}
