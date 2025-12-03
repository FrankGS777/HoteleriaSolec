# HoteleriaSolec - Sistema de Gestión Hotelera

Sistema completo de gestión hotelera con backend en Java Spring Boot y frontend en React.

## 🏨 Características

- **Gestión de Habitaciones**: Control completo de habitaciones, tipos, estados y disponibilidad
- **Reservas**: Sistema de reservas con calendario, confirmación y seguimiento
- **Clientes**: Base de datos de clientes con historial y clasificación VIP
- **Check-in/Check-out**: Proceso completo de entrada y salida de huéspedes
- **Facturación**: Generación de boletas y facturas con cálculo automático de impuestos
- **Servicios**: Catálogo de servicios adicionales y registro de consumos
- **Limpieza y Mantenimiento**: Gestión de tareas de housekeeping y órdenes de mantenimiento
- **Inventario**: Control de amenities y suministros del hotel
- **Reportes**: Informes de ocupación, ingresos y KPIs exportables a PDF/Excel
- **Auditoría**: Registro completo de acciones del sistema
- **Notificaciones**: Sistema de alertas y notificaciones internas
- **Autenticación JWT**: Seguridad con tokens y roles de usuario

## 🛠️ Tecnologías

### Backend
- Java 17+
- Spring Boot 3.2.0
- Spring Security + JWT
- Spring Data JPA
- MySQL 8
- Maven

### Frontend
- React 18
- Vite
- Tailwind CSS
- React Router v6
- Axios
- Recharts
- Lucide React Icons

## 📋 Requisitos Previos

- Java JDK 17 o superior
- Node.js 18+ y npm
- MySQL 8.0+
- Maven 3.8+

## 🚀 Instalación y Configuración

### 1. Base de Datos

```bash
# Crear la base de datos
mysql -u root -p < database/schema.sql

# Insertar datos iniciales
mysql -u root -p < database/seed.sql
```

### 2. Backend

```bash
# Navegar al directorio backend
cd backend

# Configurar application.yml (actualizar credenciales MySQL si es necesario)
# Las credenciales por defecto son:
# - URL: jdbc:mysql://localhost:3306/hoteleria_solec
# - Usuario: root
# - Contraseña: root

# Compilar el proyecto
mvn clean install

# Ejecutar la aplicación
mvn spring-boot:run

# El backend estará disponible en http://localhost:8080/api
```

### 3. Frontend

```bash
# Navegar al directorio frontend
cd frontend

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# El frontend estará disponible en http://localhost:5173
```

## 👤 Credenciales de Acceso

### Usuario Administrador por Defecto
- **Usuario**: `admin`
- **Contraseña**: `admin123`

## 📁 Estructura del Proyecto

```
HoteleriaSolec/
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/hotelsolec/
│   │   │   │   ├── config/          # Configuración de seguridad
│   │   │   │   ├── controller/      # Controladores REST
│   │   │   │   ├── service/         # Lógica de negocio
│   │   │   │   ├── repository/      # Acceso a datos
│   │   │   │   ├── entity/          # Entidades JPA
│   │   │   │   ├── dto/             # Data Transfer Objects
│   │   │   │   ├── security/        # JWT y autenticación
│   │   │   │   ├── exception/       # Manejo de excepciones
│   │   │   │   └── util/            # Utilidades
│   │   │   └── resources/
│   │   │       └── application.yml  # Configuración de Spring Boot
│   │   └── test/                    # Tests
│   └── pom.xml                      # Dependencias Maven
├── frontend/
│   ├── src/
│   │   ├── components/              # Componentes reutilizables
│   │   ├── pages/                   # Páginas de la aplicación
│   │   ├── services/                # Servicios API
│   │   ├── context/                 # Context API (Auth, etc.)
│   │   ├── hooks/                   # Custom hooks
│   │   └── utils/                   # Utilidades
│   ├── public/                      # Archivos estáticos
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
├── database/
│   ├── schema.sql                   # Esquema de base de datos
│   └── seed.sql                     # Datos iniciales
└── README.md
```

## 🔐 Roles del Sistema

1. **ADMIN**: Acceso completo al sistema
2. **GERENTE**: Acceso a reportes y configuración
3. **RECEPCIONISTA**: Reservas, check-in/out, facturación
4. **HOUSEKEEPING**: Gestión de limpieza
5. **MANTENIMIENTO**: Órdenes de mantenimiento

## 📊 Base de Datos

El sistema incluye 24 tablas principales:

- usuarios, roles, empleados, clientes
- tipos_habitacion, habitaciones
- reservas, reserva_habitaciones, huespedes
- checkins, checkouts
- servicios, consumos_servicios
- facturas, factura_detalle, pagos
- limpieza_habitaciones, mantenimiento
- amenities, movimientos_inventario
- objetos_perdidos, auditoria, notificaciones
- configuracion, reportes

## 🎨 Diseño UI/UX

- **Paleta de Colores**: Azul oscuro (primary), Dorado (gold), Blanco
- **Sidebar Colapsable**: Navegación optimizada
- **Responsive Design**: Compatible con desktop, tablet y móvil
- **Componentes Reutilizables**: Card, Button, Input, etc.
- **Feedback Visual**: Toasts, modales y mensajes de estado

## 🔧 API Endpoints

### Autenticación
- `POST /api/auth/login` - Iniciar sesión
- `GET /api/auth/validate` - Validar token

### Habitaciones
- `GET /api/habitaciones` - Listar habitaciones
- `POST /api/habitaciones` - Crear habitación
- `GET /api/habitaciones/{id}` - Obtener habitación
- `PUT /api/habitaciones/{id}` - Actualizar habitación
- `DELETE /api/habitaciones/{id}` - Eliminar habitación

### Reservas
- `GET /api/reservas` - Listar reservas
- `POST /api/reservas` - Crear reserva
- `GET /api/reservas/{id}` - Obtener reserva
- `PUT /api/reservas/{id}` - Actualizar reserva
- `POST /api/reservas/{id}/cancelar` - Cancelar reserva

### Clientes
- `GET /api/clientes` - Listar clientes
- `POST /api/clientes` - Crear cliente
- `GET /api/clientes/{id}` - Obtener cliente
- `PUT /api/clientes/{id}` - Actualizar cliente

## 🧪 Testing

```bash
# Backend tests
cd backend
mvn test

# Frontend tests
cd frontend
npm test
```

## 📦 Compilación para Producción

### Backend
```bash
cd backend
mvn clean package
# El archivo JAR estará en target/hoteleria-solec-backend-1.0.0.jar
java -jar target/hoteleria-solec-backend-1.0.0.jar
```

### Frontend
```bash
cd frontend
npm run build
# Los archivos compilados estarán en dist/
```

## 🔒 Seguridad

- Autenticación JWT con tokens de 24 horas
- Contraseñas hasheadas con BCrypt
- CORS configurado para desarrollo local
- Validación de entrada en frontend y backend
- Roles y permisos por endpoint
- Auditoría completa de acciones

## 🤝 Contribución

Este es un proyecto educativo. Para contribuir:

1. Fork el repositorio
2. Crea una rama feature (`git checkout -b feature/NuevaCaracteristica`)
3. Commit tus cambios (`git commit -m 'Agregar nueva característica'`)
4. Push a la rama (`git push origin feature/NuevaCaracteristica`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 👥 Autor

FrankGS777

## 📧 Contacto

Para preguntas o soporte, por favor abre un issue en GitHub.

---

**Nota**: Este es un sistema de demostración para propósitos educativos. Para uso en producción, se recomienda realizar auditorías de seguridad adicionales y ajustar la configuración según las necesidades específicas.