package com.hotelsolec.service;

import com.hotelsolec.entity.Usuario;
import com.hotelsolec.exception.ResourceNotFoundException;
import com.hotelsolec.repository.UsuarioRepository;
import com.hotelsolec.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public List<Usuario> findAll() {
        return usuarioRepository.findAll();
    }

    public Usuario findById(Long id) {
        return usuarioRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado con id: " + id));
    }

    public List<Usuario> findByRoleId(Long roleId) {
        return usuarioRepository.findAll().stream()
                .filter(u -> u.getRole() != null && u.getRole().getId().equals(roleId))
                .toList();
    }

    public Usuario create(Usuario usuario) {
        if (usuarioRepository.existsByUsername(usuario.getUsername())) {
            throw new IllegalArgumentException("El username ya existe");
        }
        if (usuarioRepository.existsByEmail(usuario.getEmail())) {
            throw new IllegalArgumentException("El email ya existe");
        }
        
        // Encrypt password
        usuario.setPassword(passwordEncoder.encode(usuario.getPassword()));
        
        return usuarioRepository.save(usuario);
    }

    public Usuario createWithRoleId(Usuario usuario, Long roleId) {
        if (usuarioRepository.existsByUsername(usuario.getUsername())) {
            throw new IllegalArgumentException("El username ya existe");
        }
        if (usuarioRepository.existsByEmail(usuario.getEmail())) {
            throw new IllegalArgumentException("El email ya existe");
        }
        
        // Find role by ID
        var role = roleRepository.findById(roleId)
                .orElseThrow(() -> new ResourceNotFoundException("Role no encontrado con id: " + roleId));
        usuario.setRole(role);
        
        // Encrypt password
        usuario.setPassword(passwordEncoder.encode(usuario.getPassword()));
        
        return usuarioRepository.save(usuario);
    }

    public Usuario update(Long id, Usuario usuario) {
        Usuario existing = findById(id);
        
        // Check username uniqueness if changed
        if (!existing.getUsername().equals(usuario.getUsername()) 
                && usuarioRepository.existsByUsername(usuario.getUsername())) {
            throw new IllegalArgumentException("El username ya existe");
        }
        
        // Check email uniqueness if changed
        if (!existing.getEmail().equals(usuario.getEmail()) 
                && usuarioRepository.existsByEmail(usuario.getEmail())) {
            throw new IllegalArgumentException("El email ya existe");
        }
        
        existing.setUsername(usuario.getUsername());
        existing.setEmail(usuario.getEmail());
        existing.setNombreCompleto(usuario.getNombreCompleto());
        existing.setActivo(usuario.getActivo());
        existing.setRole(usuario.getRole());
        
        // Only update password if provided
        if (usuario.getPassword() != null && !usuario.getPassword().isEmpty()) {
            existing.setPassword(passwordEncoder.encode(usuario.getPassword()));
        }
        
        return usuarioRepository.save(existing);
    }

    public Usuario updateWithRoleId(Long id, Usuario usuario, Long roleId) {
        Usuario existing = findById(id);
        
        // Check username uniqueness if changed
        if (!existing.getUsername().equals(usuario.getUsername()) 
                && usuarioRepository.existsByUsername(usuario.getUsername())) {
            throw new IllegalArgumentException("El username ya existe");
        }
        
        // Check email uniqueness if changed
        if (!existing.getEmail().equals(usuario.getEmail()) 
                && usuarioRepository.existsByEmail(usuario.getEmail())) {
            throw new IllegalArgumentException("El email ya existe");
        }
        
        existing.setUsername(usuario.getUsername());
        existing.setEmail(usuario.getEmail());
        existing.setNombreCompleto(usuario.getNombreCompleto());
        existing.setActivo(usuario.getActivo());
        
        // Find and set role by ID if provided
        if (roleId != null) {
            var role = roleRepository.findById(roleId)
                    .orElseThrow(() -> new ResourceNotFoundException("Role no encontrado con id: " + roleId));
            existing.setRole(role);
        }
        
        // Only update password if provided
        if (usuario.getPassword() != null && !usuario.getPassword().isEmpty()) {
            existing.setPassword(passwordEncoder.encode(usuario.getPassword()));
        }
        
        return usuarioRepository.save(existing);
    }

    public void delete(Long id) {
        Usuario usuario = findById(id);
        usuarioRepository.delete(usuario);
    }
}
