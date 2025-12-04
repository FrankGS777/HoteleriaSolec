package com.hotelsolec.service;

import com.hotelsolec.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;

@Service
@Transactional(readOnly = true)
public class ReporteService {

    @Autowired
    private ReservaRepository reservaRepository;

    @Autowired
    private HabitacionRepository habitacionRepository;

    @Autowired
    private FacturaRepository facturaRepository;

    @Autowired
    private ClienteRepository clienteRepository;

    public Map<String, Object> getDashboardStats() {
        Map<String, Object> stats = new HashMap<>();
        
        stats.put("totalReservas", reservaRepository.count());
        stats.put("totalHabitaciones", habitacionRepository.count());
        stats.put("habitacionesDisponibles", habitacionRepository.findByEstado("DISPONIBLE").size());
        stats.put("habitacionesOcupadas", habitacionRepository.findByEstado("OCUPADA").size());
        stats.put("totalClientes", clienteRepository.count());
        stats.put("reservasPendientes", reservaRepository.findByEstado("PENDIENTE").size());
        stats.put("reservasActivas", reservaRepository.findByEstado("CONFIRMADA").size());
        
        return stats;
    }

    public Map<String, Object> getOcupacionReport(LocalDate inicio, LocalDate fin) {
        Map<String, Object> report = new HashMap<>();
        
        long totalHabitaciones = habitacionRepository.count();
        long habitacionesOcupadas = habitacionRepository.findByEstado("OCUPADA").size();
        
        double porcentajeOcupacion = totalHabitaciones > 0 
            ? (double) habitacionesOcupadas / totalHabitaciones * 100 
            : 0;
        
        report.put("totalHabitaciones", totalHabitaciones);
        report.put("habitacionesOcupadas", habitacionesOcupadas);
        report.put("porcentajeOcupacion", porcentajeOcupacion);
        report.put("fechaInicio", inicio);
        report.put("fechaFin", fin);
        
        return report;
    }

    public Map<String, Object> getIngresosReport(LocalDate inicio, LocalDate fin) {
        Map<String, Object> report = new HashMap<>();
        
        BigDecimal totalIngresos = facturaRepository.findAll().stream()
            .filter(f -> !f.getFechaEmision().isBefore(inicio) && !f.getFechaEmision().isAfter(fin))
            .filter(f -> !"ANULADA".equals(f.getEstado()))
            .map(f -> f.getTotal())
            .reduce(BigDecimal.ZERO, BigDecimal::add);
        
        long totalFacturas = facturaRepository.findAll().stream()
            .filter(f -> !f.getFechaEmision().isBefore(inicio) && !f.getFechaEmision().isAfter(fin))
            .filter(f -> !"ANULADA".equals(f.getEstado()))
            .count();
        
        report.put("totalIngresos", totalIngresos);
        report.put("totalFacturas", totalFacturas);
        report.put("fechaInicio", inicio);
        report.put("fechaFin", fin);
        
        return report;
    }
}
