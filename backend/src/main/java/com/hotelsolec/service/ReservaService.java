package com.hotelsolec.service;

import com.hotelsolec.entity.Reserva;
import com.hotelsolec.exception.ResourceNotFoundException;
import com.hotelsolec.repository.ReservaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.Year;
import java.util.List;

@Service
@Transactional
public class ReservaService {

    @Autowired
    private ReservaRepository reservaRepository;

    public List<Reserva> findAll() {
        return reservaRepository.findAll();
    }

    public Reserva findById(Long id) {
        return reservaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Reserva no encontrada con id: " + id));
    }

    public List<Reserva> findByEstado(String estado) {
        return reservaRepository.findByEstado(estado);
    }

    public List<Reserva> findByClienteId(Long clienteId) {
        return reservaRepository.findByClienteId(clienteId);
    }

    public Reserva create(Reserva reserva) {
        // Generate reservation code: RES-YYYY-XXXX
        if (reserva.getCodigo() == null || reserva.getCodigo().isEmpty()) {
            reserva.setCodigo(generateCodigoReserva());
        }
        return reservaRepository.save(reserva);
    }

    public Reserva update(Long id, Reserva reserva) {
        Reserva existing = findById(id);
        
        existing.setCliente(reserva.getCliente());
        existing.setFechaEntrada(reserva.getFechaEntrada());
        existing.setFechaSalida(reserva.getFechaSalida());
        existing.setNumeroAdultos(reserva.getNumeroAdultos());
        existing.setNumeroNinos(reserva.getNumeroNinos());
        existing.setEstado(reserva.getEstado());
        existing.setTipoReserva(reserva.getTipoReserva());
        existing.setMontoTotal(reserva.getMontoTotal());
        existing.setMontoAdelanto(reserva.getMontoAdelanto());
        existing.setObservaciones(reserva.getObservaciones());
        existing.setEmpleado(reserva.getEmpleado());
        
        return reservaRepository.save(existing);
    }

    public Reserva cancelar(Long id, String motivo) {
        Reserva reserva = findById(id);
        reserva.setEstado("CANCELADA");
        reserva.setFechaCancelacion(LocalDateTime.now());
        reserva.setMotivoCancelacion(motivo);
        return reservaRepository.save(reserva);
    }

    public void delete(Long id) {
        Reserva reserva = findById(id);
        reservaRepository.delete(reserva);
    }

    private String generateCodigoReserva() {
        String year = String.valueOf(Year.now().getValue());
        long count = reservaRepository.count() + 1;
        return String.format("RES-%s-%04d", year, count);
    }
}
