# Security Summary - Hotelería Solec

## Security Overview

This document provides a comprehensive overview of the security measures implemented in the Hotelería Solec system.

## Authentication & Authorization

### JWT (JSON Web Tokens)
- **Implementation**: Stateless authentication using JWT tokens
- **Token Expiration**: 24 hours (86400000 milliseconds)
- **Algorithm**: HMAC-SHA256 (HS256)
- **Secret Key**: Configurable via environment variable `JWT_SECRET`
  - **Recommendation**: Use a strong secret key of at least 256 bits (32 bytes)
  - Default value is provided for development only
  - **MUST** be changed in production

### Password Security
- **Hashing Algorithm**: BCrypt with default strength factor (10)
- **Storage**: Passwords are never stored in plain text
- **Default Admin Password**: `admin123` (MUST be changed on first login in production)

### Role-Based Access Control (RBAC)
The system implements five distinct roles with specific permissions:
1. **ADMIN**: Full system access
2. **GERENTE**: Reports, configuration, and management access
3. **RECEPCIONISTA**: Reservations, check-in/out, billing
4. **HOUSEKEEPING**: Cleaning and room status management
5. **MANTENIMIENTO**: Maintenance orders and tracking

## API Security

### CORS (Cross-Origin Resource Sharing)
- **Configuration**: Configurable via `ALLOWED_ORIGINS` environment variable
- **Development Default**: `http://localhost:5173`, `http://localhost:3000`
- **Production**: Must be explicitly configured with production domain(s)
- **Methods Allowed**: GET, POST, PUT, DELETE, OPTIONS
- **Credentials**: Allowed (for JWT token transmission)

### CSRF Protection
- **Status**: Disabled for REST API
- **Rationale**: 
  - API is stateless (no session cookies)
  - JWT tokens are validated on every request
  - Tokens are sent in Authorization header, not cookies
  - This is a standard pattern for JWT-based REST APIs

### Request Validation
- Input validation using Jakarta Bean Validation
- DTO validation on all API endpoints
- Type-safe query parameters

## Database Security

### Credentials Management
- **Storage**: Environment variables (not hardcoded)
- **Variables**:
  - `DB_URL`: Database connection string
  - `DB_USERNAME`: Database username
  - `DB_PASSWORD`: Database password
- **Development Defaults**: Provided for convenience (root/root)
- **Production**: MUST use secure credentials

### SQL Injection Prevention
- **ORM**: Spring Data JPA with Hibernate
- **Queries**: Parameterized queries by default
- **Protection**: Built-in protection against SQL injection

### Connection Security
- **SSL**: Disabled for development (`useSSL=false`)
- **Production**: Should enable SSL/TLS for database connections

## Error Handling

### Client-Facing Errors
- Generic error messages to prevent information disclosure
- Internal error details are logged server-side only
- Specific error codes for debugging without exposing internals

### Exception Types
1. **ValidationException**: Input validation errors
2. **ResourceNotFoundException**: Entity not found (404)
3. **UnauthorizedException**: Authentication failures (401)
4. **GenericException**: Caught and sanitized (500)

## Audit Trail

### Audit Logging
The system maintains an audit log with:
- User ID of action performer
- Action type and description
- Entity affected and entity ID
- IP address and User-Agent
- Timestamp

### Logged Actions
- User login/logout
- Entity creation, modification, deletion
- Permission changes
- Configuration changes

## Data Protection

### Sensitive Data
- Passwords: Hashed with BCrypt
- JWT Secrets: Stored in environment variables
- Database credentials: Environment variables
- Personal client data: Protected by authentication

### Data Exposure Prevention
- No sensitive data in error messages
- No credentials in logs
- .env files excluded from version control

## Frontend Security

### Token Storage
- JWT tokens stored in localStorage
- Tokens automatically included in API requests
- Tokens cleared on logout or expiration

### Protected Routes
- All application routes require authentication
- Unauthenticated users redirected to login
- Token validation on each route access

### API Communication
- HTTPS recommended for production
- Authorization header with Bearer token
- Automatic token refresh on 401 (logout)

### Input Sanitization
- Client-side validation before API calls
- Protection against XSS via React's built-in escaping
- JSON.parse error handling to prevent crashes

## Security Best Practices Implemented

### Configuration Management
✅ Environment variables for sensitive configuration  
✅ Separate .env.example files for documentation  
✅ .env files excluded from version control  
✅ Default values only for development  

### Authentication
✅ JWT with configurable expiration  
✅ BCrypt password hashing  
✅ Role-based access control  
✅ Token validation on every request  

### API Security
✅ CORS configuration  
✅ Stateless authentication  
✅ Input validation  
✅ Parameterized queries  

### Error Handling
✅ Generic error messages to clients  
✅ Detailed logging server-side  
✅ Try-catch blocks for critical operations  
✅ Graceful degradation  

### Audit & Monitoring
✅ Comprehensive audit trail  
✅ User action logging  
✅ System event tracking  

## Known Security Considerations

### CodeQL Alert: CSRF Disabled
- **Status**: Acknowledged, not a vulnerability
- **Reason**: Standard practice for stateless JWT-based REST APIs
- **Mitigation**: JWT validation on every request provides equivalent protection

### Development vs Production

#### Development Environment
- Default credentials for convenience
- Localhost CORS origins
- SSL disabled for database
- Detailed error messages in logs

#### Production Requirements
⚠️ **CRITICAL**: The following MUST be changed for production:
1. Change default admin password
2. Use strong JWT secret (minimum 256 bits)
3. Configure production database credentials
4. Enable database SSL/TLS
5. Set production CORS origins
6. Configure HTTPS for API and frontend
7. Set up proper logging and monitoring
8. Regular security audits and updates

## Security Recommendations

### Immediate Actions for Production
1. ✅ Generate and use a cryptographically secure JWT secret
2. ✅ Change all default passwords
3. ✅ Configure environment-specific CORS origins
4. ✅ Enable database connection encryption
5. ✅ Set up HTTPS for all communications
6. ✅ Implement rate limiting on authentication endpoints
7. ✅ Configure security headers (HSTS, CSP, etc.)
8. ✅ Set up monitoring and alerting

### Ongoing Security Practices
- Regular dependency updates
- Security patch monitoring
- Periodic security audits
- Access log review
- Backup and disaster recovery testing
- Security awareness training for users

### Optional Enhancements
- Two-factor authentication (2FA)
- Password complexity requirements
- Account lockout after failed attempts
- Session timeout configuration
- IP whitelisting for admin access
- Database encryption at rest

## Vulnerability Disclosure

If you discover a security vulnerability, please report it to the system administrators immediately. Do not disclose vulnerabilities publicly until they have been addressed.

## Compliance

The system is designed with security best practices in mind. For specific regulatory compliance (GDPR, PCI-DSS, etc.), additional measures may be required based on your jurisdiction and use case.

## Security Updates

This document is maintained alongside the codebase. Last updated: December 2024

---

**Note**: This is a demonstration/educational system. For production use, conduct a thorough security audit and implement additional measures appropriate for your specific requirements and threat model.
