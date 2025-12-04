package com.hotelsolec.service;

import com.hotelsolec.entity.Amenity;
import com.hotelsolec.exception.ResourceNotFoundException;
import com.hotelsolec.repository.AmenityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class AmenityService {

    @Autowired
    private AmenityRepository amenityRepository;

    public List<Amenity> findAll() {
        return amenityRepository.findAll();
    }

    public Amenity findById(Long id) {
        return amenityRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Amenity no encontrado con id: " + id));
    }

    public List<Amenity> findStockBajo() {
        return amenityRepository.findAll().stream()
                .filter(a -> a.getStockActual() != null && a.getStockMinimo() != null 
                        && a.getStockActual() <= a.getStockMinimo())
                .toList();
    }

    public Amenity create(Amenity amenity) {
        return amenityRepository.save(amenity);
    }

    public Amenity update(Long id, Amenity amenity) {
        Amenity existing = findById(id);
        
        existing.setNombre(amenity.getNombre());
        existing.setDescripcion(amenity.getDescripcion());
        existing.setCategoria(amenity.getCategoria());
        existing.setStockActual(amenity.getStockActual());
        existing.setStockMinimo(amenity.getStockMinimo());
        existing.setUnidadMedida(amenity.getUnidadMedida());
        existing.setCostoUnitario(amenity.getCostoUnitario());
        
        return amenityRepository.save(existing);
    }

    public void delete(Long id) {
        Amenity amenity = findById(id);
        amenityRepository.delete(amenity);
    }
}
