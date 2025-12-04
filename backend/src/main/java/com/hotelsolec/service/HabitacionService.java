package com.hotelsolec.service;

import com.hotelsolec.entity.Habitacion;
import com.hotelsolec.exception.ResourceNotFoundException;
import com.hotelsolec.repository.HabitacionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class HabitacionService {

    @Autowired
    private HabitacionRepository habitacionRepository;

    public List<Habitacion> findAll() {
        return habitacionRepository.findAll();
    }

    public Habitacion findById(Long id) {
        return habitacionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Habitación no encontrada con id: " + id));
    }

    public List<Habitacion> findDisponibles() {
        return habitacionRepository.findByEstado("DISPONIBLE");
    }

    public List<Habitacion> findByEstado(String estado) {
        return habitacionRepository.findByEstado(estado);
    }

    public Habitacion create(Habitacion habitacion) {
        if (habitacionRepository.findByNumero(habitacion.getNumero()).isPresent()) {
            throw new IllegalArgumentException("El número de habitación ya existe");
        }
        return habitacionRepository.save(habitacion);
    }

    public Habitacion update(Long id, Habitacion habitacion) {
        Habitacion existing = findById(id);
        
        if (!existing.getNumero().equals(habitacion.getNumero()) 
                && habitacionRepository.findByNumero(habitacion.getNumero()).isPresent()) {
            throw new IllegalArgumentException("El número de habitación ya existe");
        }
        
        existing.setNumero(habitacion.getNumero());
        existing.setPiso(habitacion.getPiso());
        existing.setTipoHabitacion(habitacion.getTipoHabitacion());
        existing.setEstado(habitacion.getEstado());
        existing.setEstadoLimpieza(habitacion.getEstadoLimpieza());
        existing.setObservaciones(habitacion.getObservaciones());
        existing.setActivo(habitacion.getActivo());
        
        return habitacionRepository.save(existing);
    }

    public Habitacion cambiarEstado(Long id, String estado) {
        Habitacion habitacion = findById(id);
        habitacion.setEstado(estado);
        return habitacionRepository.save(habitacion);
    }

    public void delete(Long id) {
        Habitacion habitacion = findById(id);
        habitacionRepository.delete(habitacion);
    }
}
