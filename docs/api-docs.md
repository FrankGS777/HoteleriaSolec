# API Documentation - Hotelería Solec

## Base URL
```
http://localhost:8080/api
```

## Authentication

All endpoints (except `/auth/login`) require a valid JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

### Login
**POST** `/auth/login`

Request:
```json
{
  "username": "admin",
  "password": "admin123"
}
```

Response:
```json
{
  "success": true,
  "message": "Login exitoso",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "type": "Bearer",
    "username": "admin",
    "nombreCompleto": "Administrador Sistema",
    "role": "ADMIN",
    "email": "admin@hotelsolec.com"
  }
}
```

### Validate Token
**GET** `/auth/validate`

Response:
```json
{
  "success": true,
  "message": "Operación exitosa",
  "data": true
}
```

## Habitaciones (Rooms)

### List All Rooms
**GET** `/habitaciones`

Query Parameters:
- `page` (optional): Page number (default: 0)
- `size` (optional): Page size (default: 10)
- `estado` (optional): Filter by status (DISPONIBLE, OCUPADA, LIMPIEZA, MANTENIMIENTO, BLOQUEADA)

Response:
```json
{
  "success": true,
  "message": "Operación exitosa",
  "data": [
    {
      "id": 1,
      "numero": "101",
      "piso": 1,
      "tipoHabitacion": {
        "id": 1,
        "nombre": "Simple",
        "precioBase": 150.00,
        "capacidadPersonas": 1
      },
      "estado": "DISPONIBLE",
      "estadoLimpieza": "LIMPIA",
      "activo": true
    }
  ]
}
```

### Get Room by ID
**GET** `/habitaciones/{id}`

Response:
```json
{
  "success": true,
  "message": "Operación exitosa",
  "data": {
    "id": 1,
    "numero": "101",
    "piso": 1,
    "tipoHabitacion": {
      "id": 1,
      "nombre": "Simple",
      "descripcion": "Habitación individual con todas las comodidades básicas",
      "precioBase": 150.00,
      "capacidadPersonas": 1,
      "numeroCamas": 1,
      "metrosCuadrados": 20.00,
      "caracteristicas": "TV LCD, Wi-Fi, Baño privado, Aire acondicionado"
    },
    "estado": "DISPONIBLE",
    "estadoLimpieza": "LIMPIA",
    "observaciones": null,
    "activo": true
  }
}
```

### Create Room
**POST** `/habitaciones`

Request:
```json
{
  "numero": "501",
  "piso": 5,
  "tipoHabitacionId": 2,
  "estado": "DISPONIBLE",
  "estadoLimpieza": "LIMPIA",
  "activo": true
}
```

### Update Room
**PUT** `/habitaciones/{id}`

Request:
```json
{
  "estado": "MANTENIMIENTO",
  "observaciones": "Reparación de aire acondicionado"
}
```

### Delete Room
**DELETE** `/habitaciones/{id}`

### Get Available Rooms
**GET** `/habitaciones/disponibles`

Query Parameters:
- `fechaEntrada`: Check-in date (YYYY-MM-DD)
- `fechaSalida`: Check-out date (YYYY-MM-DD)
- `tipoHabitacionId` (optional): Filter by room type

## Tipos de Habitación (Room Types)

### List All Room Types
**GET** `/tipos-habitacion`

Response:
```json
{
  "success": true,
  "message": "Operación exitosa",
  "data": [
    {
      "id": 1,
      "nombre": "Simple",
      "descripcion": "Habitación individual con todas las comodidades básicas",
      "capacidadPersonas": 1,
      "numeroCamas": 1,
      "precioBase": 150.00,
      "metrosCuadrados": 20.00,
      "caracteristicas": "TV LCD, Wi-Fi, Baño privado, Aire acondicionado",
      "activo": true
    }
  ]
}
```

## Clientes (Clients)

### List All Clients
**GET** `/clientes`

Query Parameters:
- `page` (optional): Page number
- `size` (optional): Page size
- `esVip` (optional): Filter VIP clients (true/false)
- `search` (optional): Search by name or document

Response:
```json
{
  "success": true,
  "message": "Operación exitosa",
  "data": [
    {
      "id": 1,
      "tipoDocumento": "DNI",
      "numeroDocumento": "12345678",
      "nombre": "Juan",
      "apellidos": "Pérez García",
      "email": "juan.perez@example.com",
      "telefono": "987654321",
      "direccion": "Av. Principal 123",
      "ciudad": "Lima",
      "pais": "Perú",
      "esVip": false
    }
  ]
}
```

### Create Client
**POST** `/clientes`

Request:
```json
{
  "tipoDocumento": "DNI",
  "numeroDocumento": "87654321",
  "nombre": "María",
  "apellidos": "García López",
  "email": "maria.garcia@example.com",
  "telefono": "987654322",
  "direccion": "Calle Lima 456",
  "ciudad": "Lima",
  "pais": "Perú",
  "fechaNacimiento": "1990-05-15",
  "esVip": false
}
```

### Update Client
**PUT** `/clientes/{id}`

### Get Client History
**GET** `/clientes/{id}/historial`

Returns all reservations for the client.

## Reservas (Reservations)

### List All Reservations
**GET** `/reservas`

Query Parameters:
- `estado` (optional): PENDIENTE, CONFIRMADA, CANCELADA, COMPLETADA, NO_SHOW
- `fechaEntrada` (optional): Filter by check-in date
- `clienteId` (optional): Filter by client

Response:
```json
{
  "success": true,
  "message": "Operación exitosa",
  "data": [
    {
      "id": 1,
      "codigo": "RES-001",
      "cliente": {
        "id": 1,
        "nombre": "Juan",
        "apellidos": "Pérez García"
      },
      "fechaEntrada": "2024-12-05",
      "fechaSalida": "2024-12-08",
      "numeroAdultos": 2,
      "numeroNinos": 0,
      "estado": "CONFIRMADA",
      "tipoReserva": "NORMAL",
      "montoTotal": 750.00,
      "montoAdelanto": 225.00,
      "habitaciones": [
        {
          "habitacion": {
            "id": 1,
            "numero": "201"
          },
          "precioNoche": 250.00
        }
      ]
    }
  ]
}
```

### Create Reservation
**POST** `/reservas`

Request:
```json
{
  "clienteId": 1,
  "fechaEntrada": "2024-12-10",
  "fechaSalida": "2024-12-13",
  "numeroAdultos": 2,
  "numeroNinos": 1,
  "habitacionesIds": [1, 2],
  "montoAdelanto": 300.00,
  "observaciones": "Cliente prefiere piso alto"
}
```

### Cancel Reservation
**POST** `/reservas/{id}/cancelar`

Request:
```json
{
  "motivo": "Cambio de planes del cliente"
}
```

## Check-in / Check-out

### Perform Check-in
**POST** `/checkins`

Request:
```json
{
  "reservaId": 1,
  "empleadoId": 1,
  "horaEntradaReal": "14:30",
  "huespedes": [
    {
      "tipoDocumento": "DNI",
      "numeroDocumento": "12345678",
      "nombre": "Juan",
      "apellidos": "Pérez García",
      "email": "juan.perez@example.com",
      "telefono": "987654321",
      "esTitular": true
    }
  ],
  "observaciones": "Check-in sin problemas"
}
```

### Perform Check-out
**POST** `/checkouts`

Request:
```json
{
  "reservaId": 1,
  "empleadoId": 1,
  "horaSalidaReal": "12:00",
  "estadoHabitacion": "Limpia y en buen estado",
  "consumosAdicionales": 150.00,
  "observaciones": ""
}
```

## Servicios (Services)

### List All Services
**GET** `/servicios`

Query Parameters:
- `categoria` (optional): RESTAURANTE, BAR, LAVANDERIA, SPA, TRANSPORTE, OTROS
- `disponible` (optional): true/false

Response:
```json
{
  "success": true,
  "message": "Operación exitosa",
  "data": [
    {
      "id": 1,
      "codigo": "SRV-001",
      "nombre": "Desayuno Buffet",
      "descripcion": "Desayuno buffet completo",
      "categoria": "RESTAURANTE",
      "precio": 35.00,
      "disponible": true
    }
  ]
}
```

### Register Service Consumption
**POST** `/consumos-servicios`

Request:
```json
{
  "reservaId": 1,
  "servicioId": 1,
  "cantidad": 2,
  "empleadoId": 1,
  "observaciones": "Para habitación 201"
}
```

## Facturación (Billing)

### Create Invoice
**POST** `/facturas`

Request:
```json
{
  "reservaId": 1,
  "clienteId": 1,
  "tipoComprobante": "BOLETA",
  "empleadoId": 1,
  "observaciones": ""
}
```

The system will automatically calculate:
- Subtotal (room nights + services)
- IGV (18%)
- Total

### Register Payment
**POST** `/pagos`

Request:
```json
{
  "facturaId": 1,
  "monto": 885.00,
  "metodoPago": "EFECTIVO",
  "numeroOperacion": null,
  "empleadoId": 1,
  "observaciones": ""
}
```

Payment Methods: EFECTIVO, TARJETA_CREDITO, TARJETA_DEBITO, TRANSFERENCIA, OTROS

## Error Responses

All errors follow this format:

```json
{
  "success": false,
  "message": "Error message",
  "data": null
}
```

Common HTTP Status Codes:
- `200 OK`: Successful operation
- `201 Created`: Resource created successfully
- `400 Bad Request`: Invalid input
- `401 Unauthorized`: Missing or invalid token
- `403 Forbidden`: Insufficient permissions
- `404 Not Found`: Resource not found
- `500 Internal Server Error`: Server error

## Rate Limiting

No rate limiting is currently implemented. For production use, consider implementing rate limiting to prevent abuse.

## Pagination

Endpoints that return lists support pagination:

Query Parameters:
- `page`: Page number (0-indexed)
- `size`: Items per page (max 100)

Response includes pagination info:
```json
{
  "success": true,
  "message": "Operación exitosa",
  "data": {
    "content": [...],
    "page": 0,
    "size": 10,
    "totalElements": 25,
    "totalPages": 3
  }
}
```
