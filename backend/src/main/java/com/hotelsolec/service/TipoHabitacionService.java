package com.hotelsolec.service;

import com.hotelsolec.entity.TipoHabitacion;
import com.hotelsolec.exception.ResourceNotFoundException;
import com.hotelsolec.repository.TipoHabitacionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class TipoHabitacionService {

    @Autowired
    private TipoHabitacionRepository tipoHabitacionRepository;

    public List<TipoHabitacion> findAll() {
        return tipoHabitacionRepository.findAll();
    }

    public TipoHabitacion findById(Long id) {
        return tipoHabitacionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Tipo de habitación no encontrado con id: " + id));
    }

    public TipoHabitacion create(TipoHabitacion tipoHabitacion) {
        if (tipoHabitacionRepository.findByNombre(tipoHabitacion.getNombre()).isPresent()) {
            throw new IllegalArgumentException("El tipo de habitación ya existe");
        }
        return tipoHabitacionRepository.save(tipoHabitacion);
    }

    public TipoHabitacion update(Long id, TipoHabitacion tipoHabitacion) {
        TipoHabitacion existing = findById(id);
        
        if (!existing.getNombre().equals(tipoHabitacion.getNombre()) 
                && tipoHabitacionRepository.findByNombre(tipoHabitacion.getNombre()).isPresent()) {
            throw new IllegalArgumentException("El tipo de habitación ya existe");
        }
        
        existing.setNombre(tipoHabitacion.getNombre());
        existing.setDescripcion(tipoHabitacion.getDescripcion());
        existing.setCapacidadPersonas(tipoHabitacion.getCapacidadPersonas());
        existing.setNumeroCamas(tipoHabitacion.getNumeroCamas());
        existing.setPrecioBase(tipoHabitacion.getPrecioBase());
        existing.setMetrosCuadrados(tipoHabitacion.getMetrosCuadrados());
        existing.setCaracteristicas(tipoHabitacion.getCaracteristicas());
        existing.setActivo(tipoHabitacion.getActivo());
        
        return tipoHabitacionRepository.save(existing);
    }

    public void delete(Long id) {
        TipoHabitacion tipoHabitacion = findById(id);
        tipoHabitacionRepository.delete(tipoHabitacion);
    }
}
