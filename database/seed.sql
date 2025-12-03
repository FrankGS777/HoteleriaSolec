-- Seed Data for Hoteleria Solec
USE hoteleria_solec;

-- Roles
INSERT INTO roles (nombre, descripcion) VALUES
('ADMIN', 'Administrador del sistema con acceso completo'),
('GERENTE', 'Gerente del hotel con acceso a reportes y configuración'),
('RECEPCIONISTA', 'Personal de recepción para reservas y check-in/out'),
('HOUSEKEEPING', 'Personal de limpieza'),
('MANTENIMIENTO', 'Personal de mantenimiento');

-- Usuario Admin (password: admin123)
INSERT INTO usuarios (username, password, email, nombre_completo, activo, role_id) VALUES
('admin', '$2a$10$N9qo8uLOickgx2ZMRZoMye7J77gPQMqxqCWzHkT3qT4HyPHRCCGSe', 'admin@hotelsolec.com', 'Administrador Sistema', TRUE, 1);

-- Empleados
INSERT INTO empleados (usuario_id, dni, nombre, apellidos, telefono, email, cargo, turno, fecha_contratacion, salario, activo) VALUES
(1, '12345678', 'Juan', 'Pérez García', '987654321', 'admin@hotelsolec.com', 'Administrador', 'MAÑANA', '2024-01-01', 3500.00, TRUE);

-- Tipos de Habitación
INSERT INTO tipos_habitacion (nombre, descripcion, capacidad_personas, numero_camas, precio_base, metros_cuadrados, caracteristicas, activo) VALUES
('Simple', 'Habitación individual con todas las comodidades básicas', 1, 1, 150.00, 20.00, 'TV LCD, Wi-Fi, Baño privado, Aire acondicionado', TRUE),
('Doble', 'Habitación espaciosa con dos camas o cama matrimonial', 2, 2, 250.00, 30.00, 'TV LCD, Wi-Fi, Baño privado, Aire acondicionado, Mini bar', TRUE),
('Suite', 'Suite de lujo con sala de estar separada', 3, 2, 450.00, 50.00, 'TV LCD 50", Wi-Fi, Baño privado con jacuzzi, Aire acondicionado, Mini bar, Sala de estar, Balcón', TRUE),
('Suite Presidencial', 'Suite presidencial de máximo lujo', 4, 2, 800.00, 80.00, 'Smart TV 65", Wi-Fi premium, Baño privado con jacuzzi y ducha separada, Aire acondicionado, Mini bar premium, Sala de estar amplia, Comedor, Balcón panorámico, Servicio de mayordomo', TRUE);

-- Habitaciones
INSERT INTO habitaciones (numero, piso, tipo_habitacion_id, estado, estado_limpieza, activo) VALUES
-- Piso 1 - Habitaciones Simples
('101', 1, 1, 'DISPONIBLE', 'LIMPIA', TRUE),
('102', 1, 1, 'DISPONIBLE', 'LIMPIA', TRUE),
('103', 1, 1, 'DISPONIBLE', 'LIMPIA', TRUE),
('104', 1, 1, 'DISPONIBLE', 'LIMPIA', TRUE),
('105', 1, 1, 'DISPONIBLE', 'LIMPIA', TRUE),
-- Piso 2 - Habitaciones Dobles
('201', 2, 2, 'DISPONIBLE', 'LIMPIA', TRUE),
('202', 2, 2, 'DISPONIBLE', 'LIMPIA', TRUE),
('203', 2, 2, 'DISPONIBLE', 'LIMPIA', TRUE),
('204', 2, 2, 'DISPONIBLE', 'LIMPIA', TRUE),
('205', 2, 2, 'DISPONIBLE', 'LIMPIA', TRUE),
('206', 2, 2, 'DISPONIBLE', 'LIMPIA', TRUE),
('207', 2, 2, 'DISPONIBLE', 'LIMPIA', TRUE),
('208', 2, 2, 'DISPONIBLE', 'LIMPIA', TRUE),
-- Piso 3 - Habitaciones Dobles y Suites
('301', 3, 2, 'DISPONIBLE', 'LIMPIA', TRUE),
('302', 3, 2, 'DISPONIBLE', 'LIMPIA', TRUE),
('303', 3, 3, 'DISPONIBLE', 'LIMPIA', TRUE),
('304', 3, 3, 'DISPONIBLE', 'LIMPIA', TRUE),
('305', 3, 3, 'DISPONIBLE', 'LIMPIA', TRUE),
-- Piso 4 - Suites y Suite Presidencial
('401', 4, 3, 'DISPONIBLE', 'LIMPIA', TRUE),
('402', 4, 3, 'DISPONIBLE', 'LIMPIA', TRUE),
('403', 4, 4, 'DISPONIBLE', 'LIMPIA', TRUE);

-- Servicios del Hotel
INSERT INTO servicios (codigo, nombre, descripcion, categoria, precio, disponible) VALUES
-- Restaurante
('SRV-001', 'Desayuno Buffet', 'Desayuno buffet completo', 'RESTAURANTE', 35.00, TRUE),
('SRV-002', 'Almuerzo Ejecutivo', 'Almuerzo ejecutivo menú del día', 'RESTAURANTE', 45.00, TRUE),
('SRV-003', 'Cena a la Carta', 'Cena del menú a la carta', 'RESTAURANTE', 65.00, TRUE),
('SRV-004', 'Room Service', 'Servicio a la habitación', 'RESTAURANTE', 15.00, TRUE),
-- Bar
('SRV-005', 'Cocktail Premium', 'Cocktail de la casa', 'BAR', 25.00, TRUE),
('SRV-006', 'Vino Botella', 'Botella de vino selección', 'BAR', 120.00, TRUE),
('SRV-007', 'Cerveza Nacional', 'Cerveza nacional', 'BAR', 12.00, TRUE),
-- Lavandería
('SRV-008', 'Lavado y Planchado', 'Servicio de lavandería por prenda', 'LAVANDERIA', 8.00, TRUE),
('SRV-009', 'Lavado Express', 'Lavado express en 3 horas', 'LAVANDERIA', 15.00, TRUE),
-- Spa
('SRV-010', 'Masaje Relajante', 'Masaje relajante 60 minutos', 'SPA', 150.00, TRUE),
('SRV-011', 'Tratamiento Facial', 'Tratamiento facial completo', 'SPA', 180.00, TRUE),
('SRV-012', 'Sauna', 'Acceso a sauna 30 minutos', 'SPA', 50.00, TRUE),
-- Transporte
('SRV-013', 'Transfer Aeropuerto', 'Traslado desde/hacia aeropuerto', 'TRANSPORTE', 80.00, TRUE),
('SRV-014', 'Taxi Local', 'Servicio de taxi dentro de la ciudad', 'TRANSPORTE', 30.00, TRUE),
-- Otros
('SRV-015', 'Late Check-out', 'Salida tardía hasta las 16:00', 'OTROS', 50.00, TRUE),
('SRV-016', 'Early Check-in', 'Entrada temprana desde las 10:00', 'OTROS', 40.00, TRUE),
('SRV-017', 'Cuna para Bebé', 'Cuna adicional en la habitación', 'OTROS', 20.00, TRUE),
('SRV-018', 'Internet Premium', 'Internet de alta velocidad', 'OTROS', 15.00, TRUE);

-- Amenities (Inventario)
INSERT INTO amenities (codigo, nombre, descripcion, categoria, unidad_medida, stock_actual, stock_minimo, costo_unitario, activo) VALUES
-- Baño
('AMN-001', 'Shampoo', 'Shampoo en sachet 30ml', 'BAÑO', 'UNIDAD', 500, 100, 1.50, TRUE),
('AMN-002', 'Acondicionador', 'Acondicionador en sachet 30ml', 'BAÑO', 'UNIDAD', 500, 100, 1.50, TRUE),
('AMN-003', 'Jabón Corporal', 'Jabón en barra individual', 'BAÑO', 'UNIDAD', 600, 120, 1.20, TRUE),
('AMN-004', 'Gel de Ducha', 'Gel de ducha en sachet 30ml', 'BAÑO', 'UNIDAD', 400, 80, 1.80, TRUE),
('AMN-005', 'Papel Higiénico', 'Rollo de papel higiénico doble hoja', 'BAÑO', 'UNIDAD', 800, 150, 2.50, TRUE),
('AMN-006', 'Toallas Baño', 'Toalla de baño grande', 'BAÑO', 'UNIDAD', 200, 50, 25.00, TRUE),
('AMN-007', 'Toallas Mano', 'Toalla de mano mediana', 'BAÑO', 'UNIDAD', 300, 60, 15.00, TRUE),
-- Habitación
('AMN-008', 'Zapatillas', 'Zapatillas desechables', 'HABITACION', 'UNIDAD', 300, 60, 3.00, TRUE),
('AMN-009', 'Kit Dental', 'Kit con cepillo y pasta dental', 'HABITACION', 'UNIDAD', 400, 80, 2.50, TRUE),
('AMN-010', 'Peine', 'Peine desechable', 'HABITACION', 'UNIDAD', 400, 80, 0.80, TRUE),
('AMN-011', 'Gorra de Ducha', 'Gorra de ducha desechable', 'HABITACION', 'UNIDAD', 500, 100, 0.50, TRUE),
-- Minibar
('AMN-012', 'Agua Mineral', 'Botella de agua 500ml', 'MINIBAR', 'UNIDAD', 300, 80, 2.00, TRUE),
('AMN-013', 'Gaseosa', 'Lata de gaseosa 350ml', 'MINIBAR', 'UNIDAD', 200, 50, 3.00, TRUE),
('AMN-014', 'Snacks', 'Paquete de snacks variados', 'MINIBAR', 'UNIDAD', 150, 40, 5.00, TRUE),
('AMN-015', 'Chocolate', 'Barra de chocolate', 'MINIBAR', 'UNIDAD', 100, 30, 4.00, TRUE),
-- Ropa de Cama
('AMN-016', 'Sábanas Individual', 'Juego de sábanas individual', 'ROPA_CAMA', 'UNIDAD', 100, 30, 40.00, TRUE),
('AMN-017', 'Sábanas Matrimonial', 'Juego de sábanas matrimonial', 'ROPA_CAMA', 'UNIDAD', 150, 40, 60.00, TRUE),
('AMN-018', 'Almohadas', 'Almohada estándar', 'ROPA_CAMA', 'UNIDAD', 200, 50, 30.00, TRUE),
('AMN-019', 'Frazadas', 'Frazada térmica', 'ROPA_CAMA', 'UNIDAD', 100, 30, 80.00, TRUE),
('AMN-020', 'Edredón', 'Edredón matrimonial', 'ROPA_CAMA', 'UNIDAD', 80, 25, 120.00, TRUE);

-- Configuración del Sistema
INSERT INTO configuracion (clave, valor, tipo, descripcion, categoria) VALUES
('hotel_nombre', 'Hotel Solec', 'STRING', 'Nombre del hotel', 'GENERAL'),
('hotel_ruc', '20123456789', 'STRING', 'RUC del hotel', 'GENERAL'),
('hotel_direccion', 'Av. Principal 123, Lima, Perú', 'STRING', 'Dirección del hotel', 'GENERAL'),
('hotel_telefono', '+51 1 234 5678', 'STRING', 'Teléfono del hotel', 'GENERAL'),
('hotel_email', 'contacto@hotelsolec.com', 'STRING', 'Email del hotel', 'GENERAL'),
('hotel_website', 'www.hotelsolec.com', 'STRING', 'Sitio web del hotel', 'GENERAL'),
('checkin_hora', '14:00', 'STRING', 'Hora estándar de check-in', 'OPERACIONES'),
('checkout_hora', '12:00', 'STRING', 'Hora estándar de check-out', 'OPERACIONES'),
('cancelacion_horas', '24', 'NUMBER', 'Horas mínimas para cancelación sin cargo', 'OPERACIONES'),
('igv_porcentaje', '18', 'NUMBER', 'Porcentaje de IGV', 'FACTURACION'),
('adelanto_minimo', '30', 'NUMBER', 'Porcentaje mínimo de adelanto para reserva', 'FACTURACION'),
('moneda', 'PEN', 'STRING', 'Código de moneda', 'FACTURACION'),
('idioma', 'es', 'STRING', 'Idioma del sistema', 'GENERAL'),
('timezone', 'America/Lima', 'STRING', 'Zona horaria', 'GENERAL'),
('notificaciones_email', 'true', 'BOOLEAN', 'Enviar notificaciones por email', 'NOTIFICACIONES'),
('mantenimiento_modo', 'false', 'BOOLEAN', 'Modo mantenimiento del sistema', 'SISTEMA');
