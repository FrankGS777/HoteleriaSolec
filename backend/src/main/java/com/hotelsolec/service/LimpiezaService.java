package com.hotelsolec.service;

import com.hotelsolec.entity.LimpiezaHabitacion;
import com.hotelsolec.exception.ResourceNotFoundException;
import com.hotelsolec.repository.LimpiezaHabitacionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@Transactional
public class LimpiezaService {

    @Autowired
    private LimpiezaHabitacionRepository limpiezaRepository;

    public List<LimpiezaHabitacion> findAll() {
        return limpiezaRepository.findAll();
    }

    public LimpiezaHabitacion findById(Long id) {
        return limpiezaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Limpieza no encontrada con id: " + id));
    }

    public List<LimpiezaHabitacion> findPendientes() {
        return limpiezaRepository.findByEstado("PENDIENTE");
    }

    public List<LimpiezaHabitacion> findByEmpleadoId(Long empleadoId) {
        return limpiezaRepository.findAll().stream()
                .filter(l -> l.getEmpleado() != null && l.getEmpleado().getId().equals(empleadoId))
                .toList();
    }

    public LimpiezaHabitacion create(LimpiezaHabitacion limpieza) {
        return limpiezaRepository.save(limpieza);
    }

    public LimpiezaHabitacion update(Long id, LimpiezaHabitacion limpieza) {
        LimpiezaHabitacion existing = findById(id);
        
        existing.setHabitacion(limpieza.getHabitacion());
        existing.setEmpleado(limpieza.getEmpleado());
        existing.setTipoLimpieza(limpieza.getTipoLimpieza());
        existing.setFechaProgramada(limpieza.getFechaProgramada());
        existing.setEstado(limpieza.getEstado());
        existing.setObservaciones(limpieza.getObservaciones());
        
        return limpiezaRepository.save(existing);
    }

    public LimpiezaHabitacion iniciar(Long id) {
        LimpiezaHabitacion limpieza = findById(id);
        limpieza.setEstado("EN_PROCESO");
        limpieza.setFechaInicio(LocalDateTime.now());
        return limpiezaRepository.save(limpieza);
    }

    public LimpiezaHabitacion completar(Long id) {
        LimpiezaHabitacion limpieza = findById(id);
        limpieza.setEstado("COMPLETADA");
        limpieza.setFechaFin(LocalDateTime.now());
        return limpiezaRepository.save(limpieza);
    }
}
