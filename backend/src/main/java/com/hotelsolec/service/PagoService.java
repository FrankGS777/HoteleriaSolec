package com.hotelsolec.service;

import com.hotelsolec.entity.Pago;
import com.hotelsolec.exception.ResourceNotFoundException;
import com.hotelsolec.repository.PagoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class PagoService {

    @Autowired
    private PagoRepository pagoRepository;

    public List<Pago> findAll() {
        return pagoRepository.findAll();
    }

    public Pago findById(Long id) {
        return pagoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Pago no encontrado con id: " + id));
    }

    public List<Pago> findByFacturaId(Long facturaId) {
        return pagoRepository.findAll().stream()
                .filter(p -> p.getFactura() != null && p.getFactura().getId().equals(facturaId))
                .toList();
    }

    public Pago create(Pago pago) {
        return pagoRepository.save(pago);
    }
}
