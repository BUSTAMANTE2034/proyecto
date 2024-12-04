-- Crear base de datos
CREATE DATABASE GSS;
USE GSS;

-- Tabla de estudiantes
CREATE TABLE estudiantes (
    id_estudiante INT IDENTITY(1,1) PRIMARY KEY,
    nombre NVARCHAR(100) NOT NULL,
    matricula NVARCHAR(20) UNIQUE NOT NULL,
    correo NVARCHAR(100) UNIQUE NOT NULL,
    contrasena NVARCHAR(255) NOT NULL,
    creditos_aprobados INT NOT NULL,
    horas_completadas INT DEFAULT 0,
    estatus_servicio NVARCHAR(20) CHECK (estatus_servicio IN ('pendiente', 'en_proceso', 'completado')) DEFAULT 'pendiente',
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME DEFAULT GETDATE(),
    deleted_at DATETIME NULL
);

-- Tabla de encargados
CREATE TABLE encargados (
    id_encargado INT IDENTITY(1,1) PRIMARY KEY,
    nombre NVARCHAR(100) NOT NULL,
    correo NVARCHAR(100) UNIQUE NOT NULL,
    contrasena NVARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME DEFAULT GETDATE(),
    deleted_at DATETIME NULL
);

-- Tabla de administradores
CREATE TABLE administradores (
    id_administrador INT IDENTITY(1,1) PRIMARY KEY,
    nombre NVARCHAR(100) NOT NULL,
    correo NVARCHAR(100) UNIQUE NOT NULL,
    contrasena NVARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME DEFAULT GETDATE(),
    deleted_at DATETIME NULL
);

-- Tabla de instituciones
CREATE TABLE instituciones (
    id_institucion INT IDENTITY(1,1) PRIMARY KEY,
    nombre NVARCHAR(100) NOT NULL,
    direccion NVARCHAR(255) NOT NULL,
    telefono NVARCHAR(15),
    correo NVARCHAR(100) UNIQUE,
    nombre_programa NVARCHAR(100) NOT NULL,
    descripcion_programa TEXT NOT NULL,
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME DEFAULT GETDATE(),
    deleted_at DATETIME NULL
);

-- Tabla de responsables de programa
CREATE TABLE responsable_programa (
    id_responsable INT IDENTITY(1,1) PRIMARY KEY,
    id_institucion INT,
    nombre_responsable NVARCHAR(100) NOT NULL,
    cargo NVARCHAR(100) NOT NULL,
    rf NVARCHAR(20) UNIQUE NOT NULL,
    correo NVARCHAR(100) UNIQUE NOT NULL,
    numero_telefono NVARCHAR(15),
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME DEFAULT GETDATE(),
    deleted_at DATETIME NULL,
    FOREIGN KEY (id_institucion) REFERENCES instituciones(id_institucion)
);

-- Tabla de solicitudes de servicio social
CREATE TABLE solicitudes (
    id_solicitud INT IDENTITY(1,1) PRIMARY KEY,
    id_estudiante INT,
    id_institucion INT,
    fecha_solicitud DATE NOT NULL,
    estatus NVARCHAR(20) CHECK (estatus IN ('pendiente', 'aprobada', 'rechazada')) DEFAULT 'pendiente',
    status_realizacion NVARCHAR(20) CHECK (status_realizacion IN ('en_progreso', 'realizado', 'sin_iniciar')) DEFAULT 'sin_iniciar',
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME DEFAULT GETDATE(),
    deleted_at DATETIME NULL,
    FOREIGN KEY (id_estudiante) REFERENCES estudiantes(id_estudiante),
    FOREIGN KEY (id_institucion) REFERENCES instituciones(id_institucion)
);

-- Tabla de documentos
CREATE TABLE documentos (
    id_documento INT IDENTITY(1,1) PRIMARY KEY,
    id_solicitud INT,
    id_encargado INT,
    fecha_subida DATE NOT NULL,
    status NVARCHAR(20) CHECK (status IN ('aprobada', 'rechazada', 'pendiente')) DEFAULT 'pendiente',
    ruta_archivo NVARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME DEFAULT GETDATE(),
    deleted_at DATETIME NULL,
    FOREIGN KEY (id_solicitud) REFERENCES solicitudes(id_solicitud),
    FOREIGN KEY (id_encargado) REFERENCES encargados(id_encargado)
);

-- Tabla de cartas de liberación
CREATE TABLE cartas_de_liberacion (
    id_carta INT IDENTITY(1,1) PRIMARY KEY,
    id_solicitud INT,
    ruta_carta NVARCHAR(255) NOT NULL,  -- Almacena el archivo PDF de la carta de liberación
    fecha_emision DATE NOT NULL,
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME DEFAULT GETDATE(),
    deleted_at DATETIME NULL,
    FOREIGN KEY (id_solicitud) REFERENCES solicitudes(id_solicitud)
);

-- Tabla de plantillas
CREATE TABLE plantillas (
    id_plantilla INT IDENTITY(1,1) PRIMARY KEY,
    nombre NVARCHAR(100) NOT NULL,
    ultima_actualizacion DATE NOT NULL,
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME DEFAULT GETDATE(),
    deleted_at DATETIME NULL
);
