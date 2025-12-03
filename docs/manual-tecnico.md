# Manual Técnico - Hotelería Solec

## Tabla de Contenidos
1. [Arquitectura del Sistema](#arquitectura-del-sistema)
2. [Tecnologías Utilizadas](#tecnologías-utilizadas)
3. [Estructura del Proyecto](#estructura-del-proyecto)
4. [Base de Datos](#base-de-datos)
5. [Backend - Spring Boot](#backend---spring-boot)
6. [Frontend - React](#frontend---react)
7. [Seguridad](#seguridad)
8. [Despliegue](#despliegue)
9. [Mantenimiento](#mantenimiento)
10. [Troubleshooting](#troubleshooting)

## Arquitectura del Sistema

### Patrón de Arquitectura
El sistema utiliza una arquitectura de 3 capas con patrón MVC + DAO:

```
┌─────────────────┐
│   Frontend      │  React + Vite
│   (Presentation)│  
└────────┬────────┘
         │ HTTP/REST
         │ JWT Auth
┌────────▼────────┐
│   Backend       │  Spring Boot
│   (Business)    │  Controller → Service → Repository
└────────┬────────┘
         │ JDBC/JPA
         │
┌────────▼────────┐
│   Database      │  MySQL 8
│   (Data)        │  
└─────────────────┘
```

### Componentes Principales

1. **Frontend (React)**
   - Interface de usuario responsiva
   - Gestión de estado con Context API
   - Routing con React Router
   - Comunicación HTTP con Axios

2. **Backend (Spring Boot)**
   - API RESTful
   - Autenticación JWT
   - Validación de datos
   - Lógica de negocio

3. **Base de Datos (MySQL)**
   - Almacenamiento persistente
   - 24 tablas relacionales
   - Índices optimizados

## Tecnologías Utilizadas

### Backend
- **Java 17**: Lenguaje de programación
- **Spring Boot 3.2.0**: Framework principal
- **Spring Security**: Autenticación y autorización
- **Spring Data JPA**: ORM y acceso a datos
- **Hibernate**: Implementación JPA
- **JWT (jjwt 0.12.3)**: Tokens de autenticación
- **Lombok**: Reducción de código boilerplate
- **MapStruct**: Mapeo de objetos
- **MySQL Connector**: Driver de base de datos
- **Maven**: Gestión de dependencias

### Frontend
- **React 18**: Librería de UI
- **Vite**: Build tool y dev server
- **React Router v6**: Enrutamiento
- **Axios**: Cliente HTTP
- **Tailwind CSS**: Framework CSS
- **Lucide React**: Iconos
- **Recharts**: Gráficos (preparado para uso)

### Base de Datos
- **MySQL 8.0**: Sistema de gestión de base de datos
- **InnoDB**: Motor de almacenamiento

### Herramientas de Desarrollo
- **Git**: Control de versiones
- **npm**: Gestor de paquetes frontend
- **ESLint**: Linter JavaScript
- **PostCSS**: Procesador CSS

## Estructura del Proyecto

### Backend

```
backend/
├── src/
│   ├── main/
│   │   ├── java/com/hotelsolec/
│   │   │   ├── HoteleriaSolecApplication.java  # Clase principal
│   │   │   ├── config/
│   │   │   │   └── SecurityConfig.java          # Configuración de seguridad
│   │   │   ├── controller/                      # Controladores REST
│   │   │   │   └── AuthController.java
│   │   │   ├── service/                         # Lógica de negocio
│   │   │   │   └── AuthService.java
│   │   │   ├── repository/                      # Acceso a datos
│   │   │   │   ├── UsuarioRepository.java
│   │   │   │   ├── RoleRepository.java
│   │   │   │   └── ...
│   │   │   ├── entity/                          # Entidades JPA
│   │   │   │   ├── Usuario.java
│   │   │   │   ├── Role.java
│   │   │   │   └── ...
│   │   │   ├── dto/                             # Data Transfer Objects
│   │   │   │   ├── LoginRequest.java
│   │   │   │   ├── LoginResponse.java
│   │   │   │   └── ApiResponse.java
│   │   │   ├── mapper/                          # Mappers (MapStruct)
│   │   │   ├── security/                        # Seguridad JWT
│   │   │   │   ├── JwtUtil.java
│   │   │   │   ├── JwtRequestFilter.java
│   │   │   │   └── CustomUserDetailsService.java
│   │   │   ├── exception/                       # Manejo de excepciones
│   │   │   │   ├── GlobalExceptionHandler.java
│   │   │   │   └── ResourceNotFoundException.java
│   │   │   └── util/                            # Utilidades
│   │   └── resources/
│   │       └── application.yml                  # Configuración
│   └── test/                                    # Tests
└── pom.xml                                      # Dependencias Maven
```

### Frontend

```
frontend/
├── src/
│   ├── main.jsx                      # Punto de entrada
│   ├── App.jsx                       # Componente principal
│   ├── index.css                     # Estilos globales
│   ├── components/                   # Componentes reutilizables
│   │   └── Layout.jsx
│   ├── pages/                        # Páginas de la aplicación
│   │   ├── Login.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Habitaciones.jsx
│   │   ├── Reservas.jsx
│   │   └── Clientes.jsx
│   ├── services/                     # Servicios API
│   │   └── api.js
│   ├── context/                      # Context API
│   │   └── AuthContext.jsx
│   ├── hooks/                        # Custom hooks
│   └── utils/                        # Utilidades
├── public/                           # Archivos estáticos
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## Base de Datos

### Diagrama de Entidad-Relación

Las principales relaciones son:

```
Usuario ──┐
          ├── Empleado
          └── Auditoria

Empleado ──┬── Reserva
           ├── CheckIn
           ├── CheckOut
           ├── Pago
           └── ConsumoServicio

Cliente ──┬── Reserva
          ├── Factura
          └── ObjetoPerdido

TipoHabitacion ── Habitacion ──┬── ReservaHabitacion
                                ├── LimpiezaHabitacion
                                ├── Mantenimiento
                                └── ObjetoPerdido

Reserva ──┬── ReservaHabitacion
          ├── Huesped
          ├── CheckIn
          ├── CheckOut
          ├── ConsumoServicio
          └── Factura

Servicio ── ConsumoServicio

Amenity ── MovimientoInventario

Factura ──┬── FacturaDetalle
          └── Pago
```

### Tablas Principales

1. **usuarios**: Usuarios del sistema
2. **roles**: Roles de acceso
3. **empleados**: Personal del hotel
4. **clientes**: Clientes del hotel
5. **tipos_habitacion**: Tipos de habitación
6. **habitaciones**: Habitaciones físicas
7. **reservas**: Reservas de habitaciones
8. **reserva_habitaciones**: Relación reserva-habitación
9. **huespedes**: Huéspedes de una reserva
10. **checkins**: Registros de entrada
11. **checkouts**: Registros de salida
12. **servicios**: Catálogo de servicios
13. **consumos_servicios**: Consumos realizados
14. **facturas**: Facturas/boletas
15. **factura_detalle**: Detalle de factura
16. **pagos**: Pagos realizados
17. **limpieza_habitaciones**: Tareas de limpieza
18. **mantenimiento**: Órdenes de mantenimiento
19. **amenities**: Inventario de amenities
20. **movimientos_inventario**: Movimientos de inventario
21. **objetos_perdidos**: Objetos perdidos y encontrados
22. **auditoria**: Log de auditoría
23. **notificaciones**: Notificaciones del sistema
24. **configuracion**: Configuración del sistema

### Índices

Índices creados para optimizar consultas frecuentes:
- `idx_usuarios_username`: Búsqueda por username
- `idx_habitaciones_estado`: Filtro por estado de habitación
- `idx_reservas_fechas`: Búsqueda por rango de fechas
- `idx_auditoria_fecha`: Consulta de auditoría por fecha

## Backend - Spring Boot

### Configuración

**application.yml**
```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/hoteleria_solec
    username: root
    password: root
  jpa:
    hibernate:
      ddl-auto: update
    show-sql: true

jwt:
  secret: your-secret-key
  expiration: 86400000  # 24 horas
```

### Entidades JPA

Las entidades utilizan las siguientes anotaciones principales:
- `@Entity`: Marca la clase como entidad JPA
- `@Table`: Especifica el nombre de la tabla
- `@Id` + `@GeneratedValue`: Clave primaria autogenerada
- `@ManyToOne`, `@OneToMany`: Relaciones entre entidades
- `@PrePersist`, `@PreUpdate`: Callbacks del ciclo de vida

Ejemplo:
```java
@Entity
@Table(name = "habitaciones")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Habitacion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, unique = true, length = 10)
    private String numero;
    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "tipo_habitacion_id", nullable = false)
    private TipoHabitacion tipoHabitacion;
    
    // ... más campos
}
```

### Repositorios

Extienden `JpaRepository` para operaciones CRUD automáticas:
```java
@Repository
public interface HabitacionRepository extends JpaRepository<Habitacion, Long> {
    Optional<Habitacion> findByNumero(String numero);
    List<Habitacion> findByEstado(String estado);
    
    @Query("SELECT h FROM Habitacion h WHERE h.estado = 'DISPONIBLE'")
    List<Habitacion> findDisponibles();
}
```

### Servicios

Contienen la lógica de negocio:
```java
@Service
public class HabitacionService {
    @Autowired
    private HabitacionRepository habitacionRepository;
    
    public List<Habitacion> obtenerDisponibles() {
        return habitacionRepository.findDisponibles();
    }
    
    public Habitacion crear(HabitacionDTO dto) {
        // Validaciones
        // Mapeo
        // Guardar
        return habitacionRepository.save(habitacion);
    }
}
```

### Controladores

Exponen endpoints REST:
```java
@RestController
@RequestMapping("/habitaciones")
@CrossOrigin(origins = "*")
public class HabitacionController {
    @Autowired
    private HabitacionService habitacionService;
    
    @GetMapping
    public ResponseEntity<ApiResponse<List<Habitacion>>> listar() {
        List<Habitacion> habitaciones = habitacionService.obtenerTodas();
        return ResponseEntity.ok(ApiResponse.success(habitaciones));
    }
    
    @PostMapping
    public ResponseEntity<ApiResponse<Habitacion>> crear(
            @Valid @RequestBody HabitacionDTO dto) {
        Habitacion habitacion = habitacionService.crear(dto);
        return ResponseEntity.ok(ApiResponse.success(habitacion));
    }
}
```

### Seguridad JWT

1. **JwtUtil**: Genera y valida tokens
2. **JwtRequestFilter**: Intercepta requests y valida tokens
3. **SecurityConfig**: Configura Spring Security

Flujo de autenticación:
```
Cliente → POST /auth/login → AuthController
                              ↓
                         AuthService
                              ↓
                    AuthenticationManager
                              ↓
                    UserDetailsService
                              ↓
                    Generar JWT → Retornar
```

## Frontend - React

### Estructura de Componentes

```
App
├── Router
│   ├── Login
│   └── Layout
│       ├── Sidebar
│       ├── Header
│       └── Pages
│           ├── Dashboard
│           ├── Habitaciones
│           ├── Reservas
│           └── Clientes
```

### Context API

**AuthContext** maneja:
- Estado de autenticación
- Datos del usuario
- Token JWT
- Funciones login/logout

```javascript
const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('token'))
  
  const login = async (username, password) => {
    // Llamada a API
    // Guardar token y user
    // Configurar header Authorization
  }
  
  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
```

### Servicios API

Centraliza las llamadas HTTP:
```javascript
import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' }
})

// Interceptor de request
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Interceptor de response
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      // Redirigir a login
    }
    return Promise.reject(error)
  }
)
```

### Routing

```javascript
<Router>
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route
      path="/*"
      element={
        <PrivateRoute>
          <Layout>
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/habitaciones" element={<Habitaciones />} />
              {/* ... más rutas */}
            </Routes>
          </Layout>
        </PrivateRoute>
      }
    />
  </Routes>
</Router>
```

## Seguridad

### Autenticación

- JWT con tiempo de expiración de 24 horas
- Token almacenado en localStorage
- Header Authorization: Bearer {token}

### Autorización

- Roles: ADMIN, GERENTE, RECEPCIONISTA, HOUSEKEEPING, MANTENIMIENTO
- Anotación `@PreAuthorize` en endpoints
- Verificación de permisos en frontend

### Contraseñas

- Hash con BCrypt (factor 10)
- No se almacenan en texto plano
- Validación de fortaleza (pendiente implementar)

### CORS

Configurado para:
- http://localhost:5173 (desarrollo)
- http://localhost:3000 (alternativo)
- Producción: configurar según dominio

### Auditoría

Todas las acciones importantes se registran en la tabla `auditoria`:
- Usuario que realizó la acción
- Tipo de acción
- Entidad afectada
- Fecha y hora
- IP y User-Agent

## Despliegue

### Desarrollo Local

1. **Base de Datos**
```bash
mysql -u root -p < database/schema.sql
mysql -u root -p < database/seed.sql
```

2. **Backend**
```bash
cd backend
mvn spring-boot:run
```

3. **Frontend**
```bash
cd frontend
npm install
npm run dev
```

### Producción

#### Backend

1. **Compilar**
```bash
cd backend
mvn clean package -DskipTests
```

2. **Ejecutar**
```bash
java -jar target/hoteleria-solec-backend-1.0.0.jar
```

3. **Como servicio** (systemd en Linux)
```ini
[Unit]
Description=Hoteleria Solec Backend
After=syslog.target

[Service]
User=hotelsolec
ExecStart=/usr/bin/java -jar /opt/hotelsolec/backend.jar
SuccessExitStatus=143

[Install]
WantedBy=multi-user.target
```

#### Frontend

1. **Compilar**
```bash
cd frontend
npm run build
```

2. **Servir con Nginx**
```nginx
server {
    listen 80;
    server_name hotelsolec.com;
    root /var/www/hotelsolec/frontend/dist;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    location /api {
        proxy_pass http://localhost:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

### Variables de Entorno

**Backend** (application-prod.yml)
```yaml
spring:
  datasource:
    url: ${DB_URL}
    username: ${DB_USER}
    password: ${DB_PASSWORD}

jwt:
  secret: ${JWT_SECRET}
  
server:
  port: ${PORT:8080}
```

**Frontend** (.env.production)
```
VITE_API_URL=https://api.hotelsolec.com
```

## Mantenimiento

### Backup de Base de Datos

```bash
# Backup completo
mysqldump -u root -p hoteleria_solec > backup_$(date +%Y%m%d).sql

# Backup solo estructura
mysqldump -u root -p --no-data hoteleria_solec > schema_backup.sql

# Restaurar
mysql -u root -p hoteleria_solec < backup_20241203.sql
```

### Logs

**Backend**
- Ubicación: `logs/spring-boot-logger.log`
- Nivel: INFO (producción), DEBUG (desarrollo)
- Rotación: diaria, máximo 7 días

**Frontend**
- Console del navegador (desarrollo)
- Herramientas de monitoreo (producción)

### Monitoreo

**Métricas Clave**
- Tiempo de respuesta de endpoints
- Tasa de errores
- Uso de CPU y memoria
- Conexiones de base de datos
- Tamaño de logs

**Herramientas Recomendadas**
- Spring Boot Actuator
- Prometheus + Grafana
- ELK Stack (Elasticsearch, Logstash, Kibana)

## Troubleshooting

### Problemas Comunes

#### Backend no inicia
```bash
# Verificar Java
java -version  # Debe ser 17+

# Verificar MySQL
mysql -u root -p -e "SELECT 1"

# Ver logs
tail -f logs/spring-boot-logger.log
```

#### Error de conexión a BD
```yaml
# Verificar application.yml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/hoteleria_solec?createDatabaseIfNotExist=true
    username: root
    password: root
```

#### JWT inválido
- Verificar que el secret en backend y frontend coincidan
- Verificar que el token no haya expirado
- Limpiar localStorage y volver a hacer login

#### CORS errors
```java
// En SecurityConfig.java
configuration.setAllowedOrigins(Arrays.asList(
    "http://localhost:5173",
    "https://hotelsolec.com"
));
```

#### Frontend no compila
```bash
# Limpiar y reinstalar
rm -rf node_modules package-lock.json
npm install

# Verificar versión de Node
node -v  # Debe ser 18+
```

### Debugging

**Backend**
```java
// Agregar logging
private static final Logger logger = LoggerFactory.getLogger(ClassName.class);
logger.debug("Debug message: {}", variable);
logger.error("Error occurred", exception);
```

**Frontend**
```javascript
// Console logging
console.log('Debug:', data)
console.error('Error:', error)

// React DevTools para inspeccionar componentes
```

### Contacto de Soporte

Para problemas técnicos:
- Revisar logs del sistema
- Verificar configuración
- Consultar documentación
- Contactar al equipo de desarrollo

---

**Versión**: 1.0.0  
**Última actualización**: Diciembre 2024
