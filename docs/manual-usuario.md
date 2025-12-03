# Manual de Usuario - Hotelería Solec

## Tabla de Contenidos
1. [Introducción](#introducción)
2. [Inicio de Sesión](#inicio-de-sesión)
3. [Dashboard](#dashboard)
4. [Gestión de Habitaciones](#gestión-de-habitaciones)
5. [Gestión de Reservas](#gestión-de-reservas)
6. [Gestión de Clientes](#gestión-de-clientes)
7. [Check-in y Check-out](#check-in-y-check-out)
8. [Facturación](#facturación)
9. [Servicios](#servicios)
10. [Reportes](#reportes)

## Introducción

Hotelería Solec es un sistema integral de gestión hotelera que permite administrar todos los aspectos operativos de su hotel, desde reservas hasta facturación.

### Requisitos del Sistema
- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- Conexión a Internet
- Resolución mínima de pantalla: 1024x768

## Inicio de Sesión

### Acceder al Sistema

1. Abra su navegador web y navegue a la URL del sistema
2. Verá la pantalla de inicio de sesión
3. Ingrese su nombre de usuario y contraseña
4. Haga clic en "Iniciar Sesión"

### Credenciales de Demostración
- **Usuario**: admin
- **Contraseña**: admin123

### Roles de Usuario

El sistema cuenta con diferentes roles con permisos específicos:

- **Administrador**: Acceso completo a todas las funciones
- **Gerente**: Acceso a reportes y configuración
- **Recepcionista**: Gestión de reservas, check-in/out, facturación
- **Housekeeping**: Gestión de limpieza
- **Mantenimiento**: Gestión de órdenes de mantenimiento

## Dashboard

El dashboard es la pantalla principal que muestra una vista general del estado del hotel.

### Información Mostrada

1. **Habitaciones Ocupadas**: Muestra el número de habitaciones ocupadas vs. el total
2. **Reservas del Día**: Cantidad de reservas programadas para el día actual
3. **Clientes Activos**: Número de clientes hospedados actualmente
4. **Ingresos del Mes**: Total de ingresos del mes en curso

### Acciones Rápidas

El dashboard incluye botones de acceso rápido para:
- Crear nueva reserva
- Realizar check-in
- Generar factura

### Reservas Recientes

Tabla que muestra las reservas más recientes con su estado actual.

## Gestión de Habitaciones

### Ver Habitaciones

1. Haga clic en "Habitaciones" en el menú lateral
2. Verá una vista de grid con todas las habitaciones del hotel
3. Cada tarjeta muestra:
   - Número de habitación
   - Tipo de habitación
   - Estado actual (Disponible, Ocupada, Limpieza, Mantenimiento)
   - Piso
   - Estado de limpieza
   - Precio por noche

### Buscar Habitaciones

Utilice la barra de búsqueda para encontrar habitaciones específicas por:
- Número de habitación
- Tipo de habitación

### Filtrar Habitaciones

Use el botón "Filtros" para filtrar por:
- Estado (Disponible, Ocupada, etc.)
- Piso
- Tipo de habitación
- Rango de precio

### Crear Nueva Habitación

1. Haga clic en "Nueva Habitación"
2. Complete el formulario:
   - Número de habitación (único)
   - Piso
   - Tipo de habitación
   - Estado inicial
3. Haga clic en "Guardar"

### Editar Habitación

1. En la tarjeta de la habitación, haga clic en "Ver Detalles"
2. Haga clic en "Editar"
3. Modifique los campos necesarios
4. Guarde los cambios

### Estados de Habitación

- **DISPONIBLE**: Lista para ocupación
- **OCUPADA**: Actualmente ocupada por huéspedes
- **LIMPIEZA**: En proceso de limpieza
- **MANTENIMIENTO**: Requiere reparaciones
- **BLOQUEADA**: No disponible temporalmente

## Gestión de Reservas

### Ver Reservas

1. Haga clic en "Reservas" en el menú lateral
2. Verá una tabla con todas las reservas
3. Use los filtros para buscar reservas específicas

### Crear Nueva Reserva

1. Haga clic en "Nueva Reserva"
2. Complete el formulario:
   - **Paso 1: Datos del Cliente**
     - Busque el cliente existente o cree uno nuevo
     - Ingrese tipo y número de documento
     - Complete nombre, apellidos y contacto
   
   - **Paso 2: Fechas y Habitaciones**
     - Seleccione fecha de entrada
     - Seleccione fecha de salida
     - Indique número de adultos y niños
     - El sistema mostrará las habitaciones disponibles
     - Seleccione la(s) habitación(es) deseada(s)
   
   - **Paso 3: Confirmación**
     - Revise el resumen de la reserva
     - Verifique el monto total
     - Ingrese el monto de adelanto (opcional)
     - Agregue observaciones si es necesario

3. Haga clic en "Confirmar Reserva"

### Estados de Reserva

- **PENDIENTE**: Reserva creada, esperando confirmación
- **CONFIRMADA**: Reserva confirmada
- **COMPLETADA**: Estancia finalizada
- **CANCELADA**: Reserva cancelada
- **NO_SHOW**: Cliente no se presentó

### Modificar Reserva

1. Busque la reserva en la lista
2. Haga clic en "Editar"
3. Modifique los campos permitidos
4. Guarde los cambios

**Nota**: Algunas modificaciones pueden afectar el precio total.

### Cancelar Reserva

1. Busque la reserva en la lista
2. Haga clic en "Cancelar"
3. Ingrese el motivo de cancelación
4. Confirme la acción

**Importante**: La cancelación puede tener penalizaciones según la política del hotel.

### Ver Calendario

1. Haga clic en "Ver Calendario"
2. Visualice la ocupación por fechas
3. Haga clic en un día para ver detalles
4. Arrastre para crear una nueva reserva

## Gestión de Clientes

### Ver Clientes

1. Haga clic en "Clientes" en el menú lateral
2. Verá una lista de todos los clientes registrados
3. Use la búsqueda para encontrar clientes específicos

### Crear Nuevo Cliente

1. Haga clic en "Nuevo Cliente"
2. Complete el formulario:
   - Tipo de documento (DNI, Pasaporte, etc.)
   - Número de documento
   - Nombre y apellidos
   - Email y teléfono
   - Dirección completa
   - Ciudad y país
   - Fecha de nacimiento
3. Marque como VIP si aplica
4. Agregue notas especiales (alergias, preferencias, etc.)
5. Haga clic en "Guardar"

### Ver Historial de Cliente

1. Busque el cliente en la lista
2. Haga clic en "Ver"
3. En el perfil del cliente, vaya a la pestaña "Historial"
4. Verá todas las reservas anteriores y futuras

### Clientes VIP

Los clientes VIP reciben:
- Identificación especial en el sistema
- Prioridad en reservas
- Posibles descuentos o beneficios
- Seguimiento especial

## Check-in y Check-out

### Realizar Check-in

1. Vaya a "Reservas"
2. Busque la reserva confirmada para el día
3. Haga clic en "Check-in"
4. Verifique los datos del cliente titular
5. Registre los huéspedes adicionales:
   - Tipo y número de documento
   - Nombre completo
   - Nacionalidad
6. Verifique el método de pago
7. Ingrese la hora real de entrada
8. Agregue observaciones si es necesario
9. Confirme el check-in

**Importante**: 
- Todos los huéspedes deben registrarse
- Verifique los documentos de identidad
- Entregue las tarjetas de habitación

### Realizar Check-out

1. Vaya a "Reservas"
2. Busque la reserva activa
3. Haga clic en "Check-out"
4. Revise el estado de la habitación
5. Verifique consumos adicionales
6. Ingrese la hora real de salida
7. Genere la factura si no existe
8. Procese el pago
9. Confirme el check-out

**Importante**:
- Verifique que no haya consumos pendientes
- Inspeccione la habitación si es necesario
- Recupere las tarjetas de habitación

## Facturación

### Generar Factura

1. Vaya a "Facturación"
2. Haga clic en "Nueva Factura"
3. Seleccione la reserva
4. Elija el tipo de comprobante:
   - **Boleta**: Para personas naturales
   - **Factura**: Para empresas (requiere RUC)
5. El sistema calculará automáticamente:
   - Subtotal (habitaciones + servicios)
   - IGV (18%)
   - Total
6. Revise el detalle
7. Haga clic en "Generar"

### Registrar Pago

1. Abra la factura
2. Haga clic en "Registrar Pago"
3. Ingrese el monto
4. Seleccione el método de pago:
   - Efectivo
   - Tarjeta de crédito
   - Tarjeta de débito
   - Transferencia
5. Si es pago electrónico, ingrese el número de operación
6. Confirme el pago

### Imprimir Comprobante

1. Abra la factura
2. Haga clic en "Imprimir"
3. Se generará un PDF con el comprobante
4. Imprima o envíe por email al cliente

## Servicios

### Ver Catálogo de Servicios

1. Vaya a "Servicios"
2. Verá todos los servicios disponibles organizados por categoría:
   - Restaurante
   - Bar
   - Lavandería
   - Spa
   - Transporte
   - Otros

### Registrar Consumo de Servicio

1. Vaya a la reserva activa
2. Haga clic en "Agregar Servicio"
3. Seleccione el servicio del catálogo
4. Ingrese la cantidad
5. El precio se calculará automáticamente
6. Agregue observaciones si es necesario
7. Confirme el registro

**Nota**: Los servicios se agregarán automáticamente a la factura de la reserva.

## Reportes

### Reportes Disponibles

1. **Reporte de Ocupación**
   - Porcentaje de ocupación por período
   - Disponibilidad por tipo de habitación
   - Tendencias de ocupación

2. **Reporte de Ingresos**
   - Ingresos por día/semana/mes
   - Desglose por concepto
   - Comparación con períodos anteriores

3. **Reporte de Clientes**
   - Top clientes por frecuencia
   - Estadísticas de clientes VIP
   - Nuevos clientes por período

4. **Reporte de Servicios**
   - Servicios más solicitados
   - Ingresos por servicio
   - Análisis de consumo

### Generar Reporte

1. Vaya a "Reportes"
2. Seleccione el tipo de reporte
3. Configure los filtros:
   - Rango de fechas
   - Tipo de habitación (si aplica)
   - Estado (si aplica)
4. Haga clic en "Generar"
5. Visualice el reporte en pantalla
6. Exporte a PDF o Excel si lo necesita

## Consejos y Mejores Prácticas

### Seguridad
- Cambie su contraseña regularmente
- No comparta sus credenciales
- Cierre sesión al terminar

### Eficiencia
- Use los atajos de teclado disponibles
- Mantenga los datos de clientes actualizados
- Revise el dashboard al inicio del día

### Reservas
- Confirme las reservas oportunamente
- Verifique disponibilidad antes de confirmar
- Mantenga las observaciones claras y concisas

### Facturación
- Revise todos los consumos antes de generar la factura
- Verifique los datos del cliente para facturas
- Archive los comprobantes correctamente

## Soporte Técnico

Si encuentra problemas o necesita ayuda:
- Contacte a su administrador del sistema
- Revise la documentación técnica
- Reporte bugs o sugerencias a través del sistema de tickets

---

**Versión**: 1.0.0  
**Última actualización**: Diciembre 2024
