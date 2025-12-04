package com.hotelsolec.service;

import com.hotelsolec.entity.Servicio;
import com.hotelsolec.exception.ResourceNotFoundException;
import com.hotelsolec.repository.ServicioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class ServicioService {

    @Autowired
    private ServicioRepository servicioRepository;

    public List<Servicio> findAll() {
        return servicioRepository.findAll();
    }

    public Servicio findById(Long id) {
        return servicioRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Servicio no encontrado con id: " + id));
    }

    public List<Servicio> findByCategoria(String categoria) {
        return servicioRepository.findByCategoria(categoria);
    }

    public Servicio create(Servicio servicio) {
        return servicioRepository.save(servicio);
    }

    public Servicio update(Long id, Servicio servicio) {
        Servicio existing = findById(id);
        
        existing.setNombre(servicio.getNombre());
        existing.setDescripcion(servicio.getDescripcion());
        existing.setCategoria(servicio.getCategoria());
        existing.setPrecio(servicio.getPrecio());
        existing.setDisponible(servicio.getDisponible());
        
        return servicioRepository.save(existing);
    }

    public void delete(Long id) {
        Servicio servicio = findById(id);
        servicioRepository.delete(servicio);
    }
}
