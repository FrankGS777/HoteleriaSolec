package com.hotelsolec.repository;

import com.hotelsolec.entity.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Long> {
    Optional<Cliente> findByNumeroDocumento(String numeroDocumento);
    List<Cliente> findByEsVipTrue();
    boolean existsByNumeroDocumento(String numeroDocumento);
}
