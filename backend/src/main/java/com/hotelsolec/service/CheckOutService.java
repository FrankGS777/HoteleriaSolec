package com.hotelsolec.service;

import com.hotelsolec.entity.CheckOut;
import com.hotelsolec.exception.ResourceNotFoundException;
import com.hotelsolec.repository.CheckOutRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
@Transactional
public class CheckOutService {

    @Autowired
    private CheckOutRepository checkOutRepository;

    public List<CheckOut> findAll() {
        return checkOutRepository.findAll();
    }

    public CheckOut findById(Long id) {
        return checkOutRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Check-out no encontrado con id: " + id));
    }

    public List<CheckOut> findCheckOutsDeHoy() {
        LocalDate hoy = LocalDate.now();
        return checkOutRepository.findAll().stream()
                .filter(c -> c.getFechaHora().toLocalDate().equals(hoy))
                .toList();
    }

    public CheckOut create(CheckOut checkOut) {
        return checkOutRepository.save(checkOut);
    }
}
