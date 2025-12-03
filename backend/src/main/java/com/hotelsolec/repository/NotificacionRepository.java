package com.hotelsolec.repository;

import com.hotelsolec.entity.Notificacion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificacionRepository extends JpaRepository<Notificacion, Long> {
    List<Notificacion> findByUsuarioIdAndLeidaFalse(Long usuarioId);
    List<Notificacion> findByUsuarioId(Long usuarioId);
}
