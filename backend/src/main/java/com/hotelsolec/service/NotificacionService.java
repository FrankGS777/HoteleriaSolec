package com.hotelsolec.service;

import com.hotelsolec.entity.Notificacion;
import com.hotelsolec.exception.ResourceNotFoundException;
import com.hotelsolec.repository.NotificacionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class NotificacionService {

    @Autowired
    private NotificacionRepository notificacionRepository;

    public List<Notificacion> findByUsuarioId(Long usuarioId) {
        return notificacionRepository.findByUsuarioId(usuarioId);
    }

    public Notificacion marcarLeida(Long id) {
        Notificacion notificacion = notificacionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Notificación no encontrada con id: " + id));
        notificacion.setLeida(true);
        return notificacionRepository.save(notificacion);
    }

    public void marcarTodasLeidas(Long usuarioId) {
        List<Notificacion> notificaciones = findByUsuarioId(usuarioId);
        notificaciones.forEach(n -> n.setLeida(true));
        notificacionRepository.saveAll(notificaciones);
    }
}
