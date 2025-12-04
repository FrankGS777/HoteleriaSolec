package com.hotelsolec.service;

import com.hotelsolec.entity.Cliente;
import com.hotelsolec.exception.ResourceNotFoundException;
import com.hotelsolec.repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class ClienteService {

    @Autowired
    private ClienteRepository clienteRepository;

    public List<Cliente> findAll() {
        return clienteRepository.findAll();
    }

    public Cliente findById(Long id) {
        return clienteRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Cliente no encontrado con id: " + id));
    }

    public List<Cliente> searchClientes(String query) {
        return clienteRepository.findAll().stream()
                .filter(c -> c.getNombre().toLowerCase().contains(query.toLowerCase()) 
                        || c.getApellidos().toLowerCase().contains(query.toLowerCase()))
                .toList();
    }

    public List<Cliente> findVip() {
        return clienteRepository.findByEsVipTrue();
    }

    public Cliente create(Cliente cliente) {
        if (clienteRepository.existsByNumeroDocumento(cliente.getNumeroDocumento())) {
            throw new IllegalArgumentException("El número de documento ya existe");
        }
        return clienteRepository.save(cliente);
    }

    public Cliente update(Long id, Cliente cliente) {
        Cliente existing = findById(id);
        
        if (!existing.getNumeroDocumento().equals(cliente.getNumeroDocumento()) 
                && clienteRepository.existsByNumeroDocumento(cliente.getNumeroDocumento())) {
            throw new IllegalArgumentException("El número de documento ya existe");
        }
        
        existing.setTipoDocumento(cliente.getTipoDocumento());
        existing.setNumeroDocumento(cliente.getNumeroDocumento());
        existing.setNombre(cliente.getNombre());
        existing.setApellidos(cliente.getApellidos());
        existing.setEmail(cliente.getEmail());
        existing.setTelefono(cliente.getTelefono());
        existing.setDireccion(cliente.getDireccion());
        existing.setCiudad(cliente.getCiudad());
        existing.setPais(cliente.getPais());
        existing.setFechaNacimiento(cliente.getFechaNacimiento());
        existing.setEsVip(cliente.getEsVip());
        existing.setNotas(cliente.getNotas());
        
        return clienteRepository.save(existing);
    }

    public void delete(Long id) {
        Cliente cliente = findById(id);
        clienteRepository.delete(cliente);
    }
}
