package com.hotelsolec.service;

import com.hotelsolec.entity.Empleado;
import com.hotelsolec.exception.ResourceNotFoundException;
import com.hotelsolec.repository.EmpleadoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class EmpleadoService {

    @Autowired
    private EmpleadoRepository empleadoRepository;

    public List<Empleado> findAll() {
        return empleadoRepository.findAll();
    }

    public Empleado findById(Long id) {
        return empleadoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Empleado no encontrado con id: " + id));
    }

    public List<Empleado> findActivos() {
        return empleadoRepository.findByActivoTrue();
    }

    public Empleado create(Empleado empleado) {
        if (empleadoRepository.existsByDni(empleado.getDni())) {
            throw new IllegalArgumentException("El DNI ya existe");
        }
        return empleadoRepository.save(empleado);
    }

    public Empleado update(Long id, Empleado empleado) {
        Empleado existing = findById(id);
        
        if (!existing.getDni().equals(empleado.getDni()) 
                && empleadoRepository.existsByDni(empleado.getDni())) {
            throw new IllegalArgumentException("El DNI ya existe");
        }
        
        existing.setDni(empleado.getDni());
        existing.setNombre(empleado.getNombre());
        existing.setApellidos(empleado.getApellidos());
        existing.setEmail(empleado.getEmail());
        existing.setTelefono(empleado.getTelefono());
        existing.setCargo(empleado.getCargo());
        existing.setTurno(empleado.getTurno());
        existing.setFechaContratacion(empleado.getFechaContratacion());
        existing.setSalario(empleado.getSalario());
        existing.setActivo(empleado.getActivo());
        existing.setUsuario(empleado.getUsuario());
        
        return empleadoRepository.save(existing);
    }

    public void delete(Long id) {
        Empleado empleado = findById(id);
        empleadoRepository.delete(empleado);
    }
}
