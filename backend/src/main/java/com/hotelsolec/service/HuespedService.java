package com.hotelsolec.service;

import com.hotelsolec.entity.Huesped;
import com.hotelsolec.exception.ResourceNotFoundException;
import com.hotelsolec.repository.HuespedRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class HuespedService {

    @Autowired
    private HuespedRepository huespedRepository;

    public List<Huesped> findAll() {
        return huespedRepository.findAll();
    }

    public Huesped findById(Long id) {
        return huespedRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Huésped no encontrado con id: " + id));
    }

    public List<Huesped> findByReservaId(Long reservaId) {
        return huespedRepository.findAll().stream()
                .filter(h -> h.getReserva() != null && h.getReserva().getId().equals(reservaId))
                .toList();
    }

    public Huesped create(Huesped huesped) {
        return huespedRepository.save(huesped);
    }

    public Huesped update(Long id, Huesped huesped) {
        Huesped existing = findById(id);
        
        existing.setReserva(huesped.getReserva());
        existing.setTipoDocumento(huesped.getTipoDocumento());
        existing.setNumeroDocumento(huesped.getNumeroDocumento());
        existing.setNombre(huesped.getNombre());
        existing.setApellidos(huesped.getApellidos());
        existing.setFechaNacimiento(huesped.getFechaNacimiento());
        existing.setNacionalidad(huesped.getNacionalidad());
        existing.setEmail(huesped.getEmail());
        existing.setTelefono(huesped.getTelefono());
        existing.setEsTitular(huesped.getEsTitular());
        
        return huespedRepository.save(existing);
    }

    public void delete(Long id) {
        Huesped huesped = findById(id);
        huespedRepository.delete(huesped);
    }
}
