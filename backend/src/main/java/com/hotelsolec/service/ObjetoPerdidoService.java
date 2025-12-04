package com.hotelsolec.service;

import com.hotelsolec.entity.ObjetoPerdido;
import com.hotelsolec.exception.ResourceNotFoundException;
import com.hotelsolec.repository.ObjetoPerdidoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
@Transactional
public class ObjetoPerdidoService {

    @Autowired
    private ObjetoPerdidoRepository objetoPerdidoRepository;

    public List<ObjetoPerdido> findAll() {
        return objetoPerdidoRepository.findAll();
    }

    public ObjetoPerdido findById(Long id) {
        return objetoPerdidoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Objeto perdido no encontrado con id: " + id));
    }

    public ObjetoPerdido create(ObjetoPerdido objetoPerdido) {
        return objetoPerdidoRepository.save(objetoPerdido);
    }

    public ObjetoPerdido update(Long id, ObjetoPerdido objetoPerdido) {
        ObjetoPerdido existing = findById(id);
        
        existing.setCodigo(objetoPerdido.getCodigo());
        existing.setDescripcion(objetoPerdido.getDescripcion());
        existing.setHabitacion(objetoPerdido.getHabitacion());
        existing.setUbicacionEncontrado(objetoPerdido.getUbicacionEncontrado());
        existing.setFechaEncontrado(objetoPerdido.getFechaEncontrado());
        existing.setEstado(objetoPerdido.getEstado());
        existing.setCliente(objetoPerdido.getCliente());
        existing.setFechaDevolucion(objetoPerdido.getFechaDevolucion());
        existing.setEmpleadoEncontro(objetoPerdido.getEmpleadoEncontro());
        existing.setEmpleadoEntrega(objetoPerdido.getEmpleadoEntrega());
        existing.setObservaciones(objetoPerdido.getObservaciones());
        
        return objetoPerdidoRepository.save(existing);
    }

    public ObjetoPerdido reclamar(Long id, Long clienteId) {
        ObjetoPerdido objetoPerdido = findById(id);
        objetoPerdido.setEstado("ENTREGADO");
        objetoPerdido.setFechaDevolucion(LocalDate.now());
        return objetoPerdidoRepository.save(objetoPerdido);
    }
}
