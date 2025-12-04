package com.hotelsolec.service;

import com.hotelsolec.entity.Mantenimiento;
import com.hotelsolec.exception.ResourceNotFoundException;
import com.hotelsolec.repository.MantenimientoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@Transactional
public class MantenimientoService {

    @Autowired
    private MantenimientoRepository mantenimientoRepository;

    public List<Mantenimiento> findAll() {
        return mantenimientoRepository.findAll();
    }

    public Mantenimiento findById(Long id) {
        return mantenimientoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Mantenimiento no encontrado con id: " + id));
    }

    public List<Mantenimiento> findPendientes() {
        return mantenimientoRepository.findByEstado("PENDIENTE");
    }

    public Mantenimiento create(Mantenimiento mantenimiento) {
        return mantenimientoRepository.save(mantenimiento);
    }

    public Mantenimiento update(Long id, Mantenimiento mantenimiento) {
        Mantenimiento existing = findById(id);
        
        existing.setCodigo(mantenimiento.getCodigo());
        existing.setHabitacion(mantenimiento.getHabitacion());
        existing.setTipo(mantenimiento.getTipo());
        existing.setPrioridad(mantenimiento.getPrioridad());
        existing.setDescripcion(mantenimiento.getDescripcion());
        existing.setFechaProgramada(mantenimiento.getFechaProgramada());
        existing.setEstado(mantenimiento.getEstado());
        existing.setEmpleadoAsignado(mantenimiento.getEmpleadoAsignado());
        existing.setEmpleadoReporta(mantenimiento.getEmpleadoReporta());
        existing.setCostoEstimado(mantenimiento.getCostoEstimado());
        existing.setCostoReal(mantenimiento.getCostoReal());
        existing.setObservaciones(mantenimiento.getObservaciones());
        
        return mantenimientoRepository.save(existing);
    }

    public Mantenimiento iniciar(Long id) {
        Mantenimiento mantenimiento = findById(id);
        mantenimiento.setEstado("EN_PROCESO");
        mantenimiento.setFechaInicio(LocalDateTime.now());
        return mantenimientoRepository.save(mantenimiento);
    }

    public Mantenimiento completar(Long id) {
        Mantenimiento mantenimiento = findById(id);
        mantenimiento.setEstado("COMPLETADO");
        mantenimiento.setFechaFin(LocalDateTime.now());
        return mantenimientoRepository.save(mantenimiento);
    }
}
