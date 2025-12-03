package com.hotelsolec.repository;

import com.hotelsolec.entity.Amenity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AmenityRepository extends JpaRepository<Amenity, Long> {
    Optional<Amenity> findByCodigo(String codigo);
    List<Amenity> findByActivoTrue();
    List<Amenity> findByCategoria(String categoria);
}
