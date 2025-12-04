package com.hotelsolec.service;

import com.hotelsolec.entity.CheckIn;
import com.hotelsolec.exception.ResourceNotFoundException;
import com.hotelsolec.repository.CheckInRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
@Transactional
public class CheckInService {

    @Autowired
    private CheckInRepository checkInRepository;

    public List<CheckIn> findAll() {
        return checkInRepository.findAll();
    }

    public CheckIn findById(Long id) {
        return checkInRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Check-in no encontrado con id: " + id));
    }

    public List<CheckIn> findCheckInsDeHoy() {
        LocalDate hoy = LocalDate.now();
        return checkInRepository.findAll().stream()
                .filter(c -> c.getFechaHora().toLocalDate().equals(hoy))
                .toList();
    }

    public CheckIn create(CheckIn checkIn) {
        return checkInRepository.save(checkIn);
    }
}
