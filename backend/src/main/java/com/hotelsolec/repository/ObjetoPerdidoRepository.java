package com.hotelsolec.repository;

import com.hotelsolec.entity.ObjetoPerdido;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ObjetoPerdidoRepository extends JpaRepository<ObjetoPerdido, Long> {
    Optional<ObjetoPerdido> findByCodigo(String codigo);
    List<ObjetoPerdido> findByEstado(String estado);
}
