package com.hotelsolec.repository;

import com.hotelsolec.entity.Huesped;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HuespedRepository extends JpaRepository<Huesped, Long> {
    List<Huesped> findByReservaId(Long reservaId);
}
