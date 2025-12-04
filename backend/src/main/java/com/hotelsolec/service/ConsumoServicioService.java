package com.hotelsolec.service;

import com.hotelsolec.entity.ConsumoServicio;
import com.hotelsolec.exception.ResourceNotFoundException;
import com.hotelsolec.repository.ConsumoServicioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class ConsumoServicioService {

    @Autowired
    private ConsumoServicioRepository consumoServicioRepository;

    public List<ConsumoServicio> findAll() {
        return consumoServicioRepository.findAll();
    }

    public ConsumoServicio findById(Long id) {
        return consumoServicioRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Consumo de servicio no encontrado con id: " + id));
    }

    public List<ConsumoServicio> findByReservaId(Long reservaId) {
        return consumoServicioRepository.findAll().stream()
                .filter(c -> c.getReserva() != null && c.getReserva().getId().equals(reservaId))
                .toList();
    }

    public ConsumoServicio create(ConsumoServicio consumoServicio) {
        return consumoServicioRepository.save(consumoServicio);
    }

    public void delete(Long id) {
        ConsumoServicio consumoServicio = findById(id);
        consumoServicioRepository.delete(consumoServicio);
    }
}
