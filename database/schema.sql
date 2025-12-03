-- Database: hoteleria_solec
-- Sistema de Gestión Hotelera

CREATE DATABASE IF NOT EXISTS hoteleria_solec;
USE hoteleria_solec;

-- Table: roles
CREATE TABLE IF NOT EXISTS roles (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE,
    descripcion VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table: usuarios
CREATE TABLE IF NOT EXISTS usuarios (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    nombre_completo VARCHAR(100) NOT NULL,
    activo BOOLEAN DEFAULT TRUE,
    role_id BIGINT NOT NULL,
    ultimo_acceso TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (role_id) REFERENCES roles(id)
);

-- Table: empleados
CREATE TABLE IF NOT EXISTS empleados (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    usuario_id BIGINT,
    dni VARCHAR(20) NOT NULL UNIQUE,
    nombre VARCHAR(50) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    telefono VARCHAR(20),
    email VARCHAR(100),
    cargo VARCHAR(50) NOT NULL,
    turno VARCHAR(20),
    fecha_contratacion DATE NOT NULL,
    salario DECIMAL(10,2),
    activo BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

-- Table: clientes
CREATE TABLE IF NOT EXISTS clientes (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    tipo_documento VARCHAR(20) NOT NULL,
    numero_documento VARCHAR(20) NOT NULL UNIQUE,
    nombre VARCHAR(50) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    telefono VARCHAR(20),
    direccion VARCHAR(255),
    ciudad VARCHAR(100),
    pais VARCHAR(100),
    fecha_nacimiento DATE,
    es_vip BOOLEAN DEFAULT FALSE,
    notas TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table: tipos_habitacion
CREATE TABLE IF NOT EXISTS tipos_habitacion (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE,
    descripcion TEXT,
    capacidad_personas INT NOT NULL,
    numero_camas INT NOT NULL,
    precio_base DECIMAL(10,2) NOT NULL,
    metros_cuadrados DECIMAL(8,2),
    caracteristicas TEXT,
    activo BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table: habitaciones
CREATE TABLE IF NOT EXISTS habitaciones (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    numero VARCHAR(10) NOT NULL UNIQUE,
    piso INT NOT NULL,
    tipo_habitacion_id BIGINT NOT NULL,
    estado VARCHAR(20) NOT NULL DEFAULT 'DISPONIBLE',
    -- Estados: DISPONIBLE, OCUPADA, LIMPIEZA, MANTENIMIENTO, BLOQUEADA
    estado_limpieza VARCHAR(20) DEFAULT 'LIMPIA',
    -- Estados: LIMPIA, SUCIA, EN_LIMPIEZA
    observaciones TEXT,
    activo BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (tipo_habitacion_id) REFERENCES tipos_habitacion(id)
);

-- Table: reservas
CREATE TABLE IF NOT EXISTS reservas (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    codigo VARCHAR(20) NOT NULL UNIQUE,
    cliente_id BIGINT NOT NULL,
    fecha_entrada DATE NOT NULL,
    fecha_salida DATE NOT NULL,
    numero_adultos INT NOT NULL DEFAULT 1,
    numero_ninos INT DEFAULT 0,
    estado VARCHAR(20) NOT NULL DEFAULT 'PENDIENTE',
    -- Estados: PENDIENTE, CONFIRMADA, CANCELADA, COMPLETADA, NO_SHOW
    tipo_reserva VARCHAR(20) DEFAULT 'NORMAL',
    -- Tipos: NORMAL, CORPORATIVA, GRUPO
    monto_total DECIMAL(10,2),
    monto_adelanto DECIMAL(10,2) DEFAULT 0,
    observaciones TEXT,
    empleado_id BIGINT,
    fecha_cancelacion TIMESTAMP NULL,
    motivo_cancelacion TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (cliente_id) REFERENCES clientes(id),
    FOREIGN KEY (empleado_id) REFERENCES empleados(id)
);

-- Table: reserva_habitaciones
CREATE TABLE IF NOT EXISTS reserva_habitaciones (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    reserva_id BIGINT NOT NULL,
    habitacion_id BIGINT NOT NULL,
    precio_noche DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (reserva_id) REFERENCES reservas(id),
    FOREIGN KEY (habitacion_id) REFERENCES habitaciones(id)
);

-- Table: huespedes
CREATE TABLE IF NOT EXISTS huespedes (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    reserva_id BIGINT NOT NULL,
    tipo_documento VARCHAR(20) NOT NULL,
    numero_documento VARCHAR(20) NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    telefono VARCHAR(20),
    fecha_nacimiento DATE,
    nacionalidad VARCHAR(100),
    es_titular BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (reserva_id) REFERENCES reservas(id)
);

-- Table: checkins
CREATE TABLE IF NOT EXISTS checkins (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    reserva_id BIGINT NOT NULL,
    empleado_id BIGINT NOT NULL,
    fecha_hora TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    hora_entrada_real TIME,
    observaciones TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (reserva_id) REFERENCES reservas(id),
    FOREIGN KEY (empleado_id) REFERENCES empleados(id)
);

-- Table: checkouts
CREATE TABLE IF NOT EXISTS checkouts (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    reserva_id BIGINT NOT NULL,
    empleado_id BIGINT NOT NULL,
    fecha_hora TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    hora_salida_real TIME,
    estado_habitacion VARCHAR(50),
    consumos_adicionales DECIMAL(10,2) DEFAULT 0,
    observaciones TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (reserva_id) REFERENCES reservas(id),
    FOREIGN KEY (empleado_id) REFERENCES empleados(id)
);

-- Table: servicios
CREATE TABLE IF NOT EXISTS servicios (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    codigo VARCHAR(20) NOT NULL UNIQUE,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    categoria VARCHAR(50) NOT NULL,
    -- Categorías: RESTAURANTE, BAR, LAVANDERIA, SPA, TRANSPORTE, OTROS
    precio DECIMAL(10,2) NOT NULL,
    disponible BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table: consumos_servicios
CREATE TABLE IF NOT EXISTS consumos_servicios (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    reserva_id BIGINT NOT NULL,
    servicio_id BIGINT NOT NULL,
    cantidad INT NOT NULL DEFAULT 1,
    precio_unitario DECIMAL(10,2) NOT NULL,
    precio_total DECIMAL(10,2) NOT NULL,
    fecha_consumo TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    observaciones TEXT,
    empleado_id BIGINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (reserva_id) REFERENCES reservas(id),
    FOREIGN KEY (servicio_id) REFERENCES servicios(id),
    FOREIGN KEY (empleado_id) REFERENCES empleados(id)
);

-- Table: facturas
CREATE TABLE IF NOT EXISTS facturas (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    numero_factura VARCHAR(20) NOT NULL UNIQUE,
    reserva_id BIGINT NOT NULL,
    cliente_id BIGINT NOT NULL,
    tipo_comprobante VARCHAR(20) NOT NULL,
    -- Tipos: BOLETA, FACTURA
    fecha_emision DATE NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL,
    igv DECIMAL(10,2) NOT NULL,
    total DECIMAL(10,2) NOT NULL,
    estado VARCHAR(20) NOT NULL DEFAULT 'PENDIENTE',
    -- Estados: PENDIENTE, PAGADA, ANULADA
    observaciones TEXT,
    empleado_id BIGINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (reserva_id) REFERENCES reservas(id),
    FOREIGN KEY (cliente_id) REFERENCES clientes(id),
    FOREIGN KEY (empleado_id) REFERENCES empleados(id)
);

-- Table: factura_detalle
CREATE TABLE IF NOT EXISTS factura_detalle (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    factura_id BIGINT NOT NULL,
    concepto VARCHAR(255) NOT NULL,
    cantidad INT NOT NULL,
    precio_unitario DECIMAL(10,2) NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (factura_id) REFERENCES facturas(id)
);

-- Table: pagos
CREATE TABLE IF NOT EXISTS pagos (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    factura_id BIGINT NOT NULL,
    fecha_pago TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    monto DECIMAL(10,2) NOT NULL,
    metodo_pago VARCHAR(20) NOT NULL,
    -- Métodos: EFECTIVO, TARJETA_CREDITO, TARJETA_DEBITO, TRANSFERENCIA, OTROS
    numero_operacion VARCHAR(50),
    observaciones TEXT,
    empleado_id BIGINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (factura_id) REFERENCES facturas(id),
    FOREIGN KEY (empleado_id) REFERENCES empleados(id)
);

-- Table: limpieza_habitaciones
CREATE TABLE IF NOT EXISTS limpieza_habitaciones (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    habitacion_id BIGINT NOT NULL,
    empleado_id BIGINT,
    fecha_programada DATE NOT NULL,
    fecha_inicio TIMESTAMP NULL,
    fecha_fin TIMESTAMP NULL,
    tipo_limpieza VARCHAR(20) NOT NULL,
    -- Tipos: RUTINARIA, PROFUNDA, EXPRESS
    estado VARCHAR(20) NOT NULL DEFAULT 'PENDIENTE',
    -- Estados: PENDIENTE, EN_PROCESO, COMPLETADA, CANCELADA
    calificacion INT,
    observaciones TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (habitacion_id) REFERENCES habitaciones(id),
    FOREIGN KEY (empleado_id) REFERENCES empleados(id)
);

-- Table: mantenimiento
CREATE TABLE IF NOT EXISTS mantenimiento (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    codigo VARCHAR(20) NOT NULL UNIQUE,
    habitacion_id BIGINT,
    tipo VARCHAR(20) NOT NULL,
    -- Tipos: PREVENTIVO, CORRECTIVO, URGENTE
    prioridad VARCHAR(20) NOT NULL DEFAULT 'MEDIA',
    -- Prioridades: BAJA, MEDIA, ALTA, URGENTE
    descripcion TEXT NOT NULL,
    estado VARCHAR(20) NOT NULL DEFAULT 'PENDIENTE',
    -- Estados: PENDIENTE, EN_PROCESO, COMPLETADA, CANCELADA
    fecha_reporte DATE NOT NULL,
    fecha_programada DATE,
    fecha_inicio TIMESTAMP NULL,
    fecha_fin TIMESTAMP NULL,
    costo_estimado DECIMAL(10,2),
    costo_real DECIMAL(10,2),
    empleado_asignado_id BIGINT,
    empleado_reporta_id BIGINT,
    observaciones TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (habitacion_id) REFERENCES habitaciones(id),
    FOREIGN KEY (empleado_asignado_id) REFERENCES empleados(id),
    FOREIGN KEY (empleado_reporta_id) REFERENCES empleados(id)
);

-- Table: amenities
CREATE TABLE IF NOT EXISTS amenities (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    codigo VARCHAR(20) NOT NULL UNIQUE,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    categoria VARCHAR(50) NOT NULL,
    -- Categorías: BAÑO, HABITACION, MINIBAR, ROPA_CAMA, OTROS
    unidad_medida VARCHAR(20) NOT NULL,
    -- Unidades: UNIDAD, LITRO, KILOGRAMO, PAQUETE
    stock_actual INT NOT NULL DEFAULT 0,
    stock_minimo INT NOT NULL DEFAULT 0,
    costo_unitario DECIMAL(10,2),
    activo BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table: movimientos_inventario
CREATE TABLE IF NOT EXISTS movimientos_inventario (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    amenity_id BIGINT NOT NULL,
    tipo_movimiento VARCHAR(20) NOT NULL,
    -- Tipos: ENTRADA, SALIDA, AJUSTE
    cantidad INT NOT NULL,
    motivo VARCHAR(255) NOT NULL,
    habitacion_id BIGINT,
    empleado_id BIGINT,
    fecha_movimiento TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    observaciones TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (amenity_id) REFERENCES amenities(id),
    FOREIGN KEY (habitacion_id) REFERENCES habitaciones(id),
    FOREIGN KEY (empleado_id) REFERENCES empleados(id)
);

-- Table: objetos_perdidos
CREATE TABLE IF NOT EXISTS objetos_perdidos (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    codigo VARCHAR(20) NOT NULL UNIQUE,
    descripcion TEXT NOT NULL,
    habitacion_id BIGINT,
    ubicacion_encontrado VARCHAR(255),
    fecha_encontrado DATE NOT NULL,
    estado VARCHAR(20) NOT NULL DEFAULT 'RESGUARDO',
    -- Estados: RESGUARDO, RECLAMADO, DONADO, DESCARTADO
    cliente_id BIGINT,
    fecha_devolucion DATE,
    empleado_encontro_id BIGINT,
    empleado_entrega_id BIGINT,
    observaciones TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (habitacion_id) REFERENCES habitaciones(id),
    FOREIGN KEY (cliente_id) REFERENCES clientes(id),
    FOREIGN KEY (empleado_encontro_id) REFERENCES empleados(id),
    FOREIGN KEY (empleado_entrega_id) REFERENCES empleados(id)
);

-- Table: auditoria
CREATE TABLE IF NOT EXISTS auditoria (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    usuario_id BIGINT,
    accion VARCHAR(50) NOT NULL,
    entidad VARCHAR(50) NOT NULL,
    entidad_id BIGINT,
    descripcion TEXT,
    ip_address VARCHAR(50),
    user_agent VARCHAR(255),
    fecha_hora TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

-- Table: notificaciones
CREATE TABLE IF NOT EXISTS notificaciones (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    usuario_id BIGINT,
    tipo VARCHAR(20) NOT NULL,
    -- Tipos: INFO, ALERTA, ERROR, EXITO
    titulo VARCHAR(255) NOT NULL,
    mensaje TEXT NOT NULL,
    leida BOOLEAN DEFAULT FALSE,
    fecha_envio TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    fecha_leida TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

-- Table: configuracion
CREATE TABLE IF NOT EXISTS configuracion (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    clave VARCHAR(100) NOT NULL UNIQUE,
    valor TEXT NOT NULL,
    tipo VARCHAR(20) NOT NULL,
    -- Tipos: STRING, NUMBER, BOOLEAN, JSON
    descripcion VARCHAR(255),
    categoria VARCHAR(50),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table: reportes
CREATE TABLE IF NOT EXISTS reportes (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    tipo VARCHAR(50) NOT NULL,
    -- Tipos: OCUPACION, INGRESOS, CLIENTES, SERVICIOS, LIMPIEZA, MANTENIMIENTO
    parametros JSON,
    formato VARCHAR(10) NOT NULL,
    -- Formatos: PDF, EXCEL
    ruta_archivo VARCHAR(255),
    usuario_id BIGINT,
    fecha_generacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

-- Indexes for better performance
CREATE INDEX idx_usuarios_username ON usuarios(username);
CREATE INDEX idx_usuarios_email ON usuarios(email);
CREATE INDEX idx_empleados_dni ON empleados(dni);
CREATE INDEX idx_clientes_documento ON clientes(tipo_documento, numero_documento);
CREATE INDEX idx_habitaciones_numero ON habitaciones(numero);
CREATE INDEX idx_habitaciones_estado ON habitaciones(estado);
CREATE INDEX idx_reservas_codigo ON reservas(codigo);
CREATE INDEX idx_reservas_estado ON reservas(estado);
CREATE INDEX idx_reservas_fechas ON reservas(fecha_entrada, fecha_salida);
CREATE INDEX idx_facturas_numero ON facturas(numero_factura);
CREATE INDEX idx_auditoria_fecha ON auditoria(fecha_hora);
CREATE INDEX idx_notificaciones_usuario_leida ON notificaciones(usuario_id, leida);
