package com.hotelsolec.service;

import com.hotelsolec.entity.MovimientoInventario;
import com.hotelsolec.exception.ResourceNotFoundException;
import com.hotelsolec.repository.MovimientoInventarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class MovimientoInventarioService {

    @Autowired
    private MovimientoInventarioRepository movimientoInventarioRepository;

    public List<MovimientoInventario> findAll() {
        return movimientoInventarioRepository.findAll();
    }

    public List<MovimientoInventario> findByAmenityId(Long amenityId) {
        return movimientoInventarioRepository.findAll().stream()
                .filter(m -> m.getAmenity() != null && m.getAmenity().getId().equals(amenityId))
                .toList();
    }

    public MovimientoInventario create(MovimientoInventario movimiento) {
        return movimientoInventarioRepository.save(movimiento);
    }
}
