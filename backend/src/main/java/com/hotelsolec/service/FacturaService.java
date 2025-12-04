package com.hotelsolec.service;

import com.hotelsolec.entity.Factura;
import com.hotelsolec.exception.ResourceNotFoundException;
import com.hotelsolec.repository.FacturaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class FacturaService {

    @Autowired
    private FacturaRepository facturaRepository;

    public List<Factura> findAll() {
        return facturaRepository.findAll();
    }

    public Factura findById(Long id) {
        return facturaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Factura no encontrada con id: " + id));
    }

    public List<Factura> findByReservaId(Long reservaId) {
        return facturaRepository.findByReservaId(reservaId);
    }

    public Factura create(Factura factura) {
        return facturaRepository.save(factura);
    }

    public Factura anular(Long id) {
        Factura factura = findById(id);
        factura.setEstado("ANULADA");
        return facturaRepository.save(factura);
    }
}
