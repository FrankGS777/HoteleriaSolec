package com.hotelsolec.repository;

import com.hotelsolec.entity.Reporte;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReporteRepository extends JpaRepository<Reporte, Long> {
    List<Reporte> findByUsuarioId(Long usuarioId);
    List<Reporte> findByTipo(String tipo);
}
