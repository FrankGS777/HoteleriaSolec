package com.hotelsolec.service;

import com.hotelsolec.entity.Auditoria;
import com.hotelsolec.repository.AuditoriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
public class AuditoriaService {

    @Autowired
    private AuditoriaRepository auditoriaRepository;

    public List<Auditoria> findAll() {
        return auditoriaRepository.findAll();
    }

    public List<Auditoria> findByUsuarioId(Long usuarioId) {
        return auditoriaRepository.findAll().stream()
                .filter(a -> a.getUsuario() != null && a.getUsuario().getId().equals(usuarioId))
                .toList();
    }
}
