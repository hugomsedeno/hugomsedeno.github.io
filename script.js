// Inicializar iconos de Lucide
document.addEventListener('DOMContentLoaded', () => {
    if (window.lucide) {
        lucide.createIcons();
    }

    // 1. Menú móvil
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('open');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
            });
        });
    }

    // 2. Resaltar enlace activo al hacer scroll
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120;
            const sectionId = current.getAttribute('id');
            const navLink = document.querySelector(`.nav-list a[href*=${sectionId}]`);

            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLink.classList.add('active');
                } else {
                    navLink.classList.remove('active');
                }
            }
        });
    });

    // 3. Filtro de proyectos por categoría
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const categories = card.getAttribute('data-category');
                if (filterValue === 'all' || categories.includes(filterValue)) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    // 4. Datos técnicos de los proyectos para el Modal
    const projectsData = {
        1: {
            category: 'Backend & Acceso a Datos • Java I/O',
            title: 'Sistema de Gestión de Ficheros y Persistencia',
            description: 'Aplicación desarrollada en Java enfocada en la administración programática del sistema de ficheros local y la persistencia secuencial de registros mediante flujos de datos optimizados.',
            features: [
                'Gestor interactivo en consola (do-while + Scanner) con validación de entrada para prevenir fallos en tiempo de ejecución.',
                'Administración completa de directorios y ficheros mediante la API java.io.File (mkdirs, createNewFile, delete, listFiles).',
                'Algoritmo de borrado recursivo capaz de recorrer, vaciar y eliminar árboles completos de carpetas con subdirectorios y archivos.',
                'Persistencia y lectura secuencial de registros estructurados (empleados y provincias) empleando BufferedWriter y BufferedReader.',
                'Liberación segura y automática de descriptores de fichero mediante bloques try-with-resources y control de IOException.'
            ],
            tech: ['Java', 'Java I/O (java.io.File)', 'Buffered Streams', 'FileReader / FileWriter', 'Recursividad', 'Try-with-resources'],
            github: 'https://github.com/hugomsedeno/java-gestion-ficheros-persistencia',
            files: [
                {
                    name: 'GestorSistemaArchivos.java',
                    code: `import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.Scanner;

public class GestorSistemaArchivos {

    // Ruta base sobre la que trabajaremos
    private static final String RUTA_BASE = "C:\\\\AD\\\\Ejercicios";

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int opcion = 0;

        // Declaramos los objetos File para tener sus rutas listas
        File dirNuevo = new File(RUTA_BASE, "nuevoDirectorio");
        File txtOriginal = new File(RUTA_BASE + "\\\\miDirectorio", "fichero_de_texto.txt");
        File txtNuevo = new File(dirNuevo, "fichero_de_texto2.txt");

        // Bucle do-while para repetir el menú hasta seleccionar "Salir"
        do {
            System.out.println("\\n--- MENÚ DE GESTIÓN DE FICHEROS ---");
            System.out.println("1) Crear directorio 'nuevoDirectorio'");
            System.out.println("2) Crear 'fichero_de_texto2.txt' en nuevoDirectorio");
            System.out.println("3) Eliminar 'fichero_de_texto.txt'");
            System.out.println("4) Eliminar 'nuevoDirectorio' (aunque contenga archivos)");
            System.out.println("5) Escribir provincias de Andalucía en 'fichero_de_texto2.txt'");
            System.out.println("6) Salir");
            System.out.print("Elige una opción: ");

            // Validación para evitar que el programa falle si se introduce una letra
            if (sc.hasNextInt()) {
                opcion = sc.nextInt();
                sc.nextLine(); // Limpiamos el buffer
            } else {
                System.out.println("Por favor, introduce un número válido.");
                sc.nextLine();
                continue;
            }

            switch (opcion) {
                case 1:
                    crearDirectorio(dirNuevo);
                    break;
                case 2:
                    crearArchivo(txtNuevo);
                    break;
                case 3:
                    eliminarArchivo(txtOriginal);
                    break;
                case 4:
                    eliminarDirectorioRecursivo(dirNuevo);
                    break;
                case 5:
                    escribirProvincias(txtNuevo);
                    break;
                case 6:
                    System.out.println("Saliendo del programa...");
                    break;
                default:
                    System.out.println("Opción fuera de rango.");
            }
        } while (opcion != 6);

        sc.close();
    }

    // Método para crear el directorio
    private static void crearDirectorio(File dir) {
        if (dir.exists()) {
            System.out.println("El directorio ya existe.");
        } else if (dir.mkdirs()) {
            System.out.println("Directorio creado: " + dir.getAbsolutePath());
        } else {
            System.out.println("No se pudo crear el directorio.");
        }
    }

    // Método para crear un archivo vacío
    private static void crearArchivo(File archivo) {
        try {
            if (!archivo.getParentFile().exists()) {
                System.out.println("Error: El directorio contenedor no existe. Ejecuta primero la Opción 1.");
                return;
            }
            if (archivo.createNewFile()) {
                System.out.println("Archivo creado: " + archivo.getAbsolutePath());
            } else {
                System.out.println("El archivo ya existe.");
            }
        } catch (IOException e) {
            System.err.println("Error al crear el archivo: " + e.getMessage());
        }
    }

    // Método para borrar un solo archivo
    private static void eliminarArchivo(File archivo) {
        if (archivo.exists()) {
            if (archivo.delete()) {
                System.out.println("Archivo eliminado correctamente.");
            } else {
                System.out.println("No se pudo eliminar el archivo.");
            }
        } else {
            System.out.println("El archivo no existe.");
        }
    }

    // Método para borrar un directorio aunque contenga elementos (Borrado Recursivo)
    private static void eliminarDirectorioRecursivo(File dir) {
        if (!dir.exists()) {
            System.out.println("El directorio no existe.");
            return;
        }

        File[] contenido = dir.listFiles();
        if (contenido != null) {
            for (File elemento : contenido) {
                if (elemento.isDirectory()) {
                    eliminarDirectorioRecursivo(elemento);
                } else {
                    elemento.delete();
                }
            }
        }

        if (dir.delete()) {
            System.out.println("Directorio eliminado exitosamente.");
        } else {
            System.out.println("No se pudo eliminar el directorio.");
        }
    }

    // Método para escribir las provincias de Andalucía
    private static void escribirProvincias(File archivo) {
        if (!archivo.exists()) {
            System.out.println("El archivo no existe. Ejecuta primero la Opción 2.");
            return;
        }

        String[] provincias = {
                "Almería", "Cádiz", "Córdoba", "Granada",
                "Huelva", "Jaén", "Málaga", "Sevilla"
        };

        try (BufferedWriter bw = new BufferedWriter(new FileWriter(archivo))) {
            for (String provincia : provincias) {
                bw.write(provincia);
                bw.newLine();
            }
            System.out.println("Provincias escritas correctamente en " + archivo.getName());
        } catch (IOException e) {
            System.err.println("Error de escritura: " + e.getMessage());
        }
    }
}`
                },
                {
                    name: 'PersistenciaEmpleados.java',
                    code: `import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;

public class PersistenciaEmpleados {

    public static void main(String[] args) {
        File archivo = new File("C:\\\\AD\\\\Ejercicios\\\\Empleados.txt");

        // 1. Escritura del listado
        escribirEmpleados(archivo);

        // 2. Lectura y muestra por pantalla
        leerEmpleados(archivo);
    }

    private static void escribirEmpleados(File archivo) {
        // Aseguramos que la carpeta contenedora C:\\AD\\Ejercicios exista
        if (archivo.getParentFile() != null) {
            archivo.getParentFile().mkdirs();
        }

        // Usamos FileWriter encadenado con BufferedWriter
        try (BufferedWriter bw = new BufferedWriter(new FileWriter(archivo))) {
            for (int i = 1; i <= 10; i++) {
                String empleado = "ID: " + i + " | Nombre: Empleado_" + i;
                bw.write(empleado);
                bw.newLine(); // Salto de línea entre cada registro
            }
            System.out.println("Listado de 10 empleados guardado en: " + archivo.getAbsolutePath());
        } catch (IOException e) {
            System.err.println("Error al escribir el archivo: " + e.getMessage());
        }
    }

    private static void leerEmpleados(File archivo) {
        System.out.println("\\n--- CONTENIDO DEL ARCHIVO " + archivo.getName() + " ---");

        // Usamos FileReader encadenado con BufferedReader para leer línea por línea
        try (BufferedReader br = new BufferedReader(new FileReader(archivo))) {
            String linea;

            // br.readLine() lee una línea entera. Cuando llega al final del fichero devuelve null
            while ((linea = br.readLine()) != null) {
                System.out.println(linea);
            }

            System.out.println("--- FIN DEL ARCHIVO ---");
        } catch (IOException e) {
            System.err.println("Error al leer el archivo: " + e.getMessage());
        }
    }
}`
                },
                {
                    name: 'InicializadorDirectorios.java',
                    code: `import java.io.File;
import java.io.IOException;

public class InicializadorDirectorios {

    public static void main(String[] args) {

        String rutaBase = "C:\\\\Users\\\\hugom\\\\Desktop\\\\Acceso a Datos\\\\Ejercicios\\\\miDirectorio";

        File midirectorio = new File(rutaBase);
        File archivo = new File(midirectorio, "fichero_de_texto.txt");

        try {
            // Crear el directorio
            if (!midirectorio.exists()) {
                if (midirectorio.mkdirs()) {
                    System.out.println("Directorio creado correctamente.");
                } else {
                    System.out.println("No se pudo crear el directorio.");
                }
            } else {
                System.out.println("El directorio ya existe.");
            }

            // Crear el archivo
            if (archivo.createNewFile()) {
                System.out.println("Archivo creado correctamente.");
            } else {
                System.out.println("El archivo ya existe.");
            }

        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}`
                }
            ]
        },
        2: {
            category: 'Programación de Sistemas • Multiproceso',
            title: 'Gestor de Procesos del Sistema y Subprocesos',
            description: 'Conjunto de utilidades en Java diseñadas para la administración de procesos del sistema operativo, auditoría de recursos de hardware, lanzamiento multiplataforma de subprocesos y captura híbrida de argumentos.',
            features: [
                'Módulo de Monitorización (MonitorProcesosSistema): Inspección en tiempo real del proceso activo mediante ProcessHandle y ProcessHandle.Info (PID propio, PID del proceso padre, ejecutable, usuario del SO, versión de JVM y núcleos de CPU disponibles).',
                'Módulo de Orquestación (OrquestadorSubprocesos): Ejecución de procesos hijos multiplataforma (detección dinámica de Windows y Linux) con ProcessBuilder, supervisión de estado con isAlive() y sincronización bloqueante mediante waitFor().',
                'Módulo de Entrada CLI (ProcesadorArgumentosCLI): Captura flexible de parámetros de ejecución soportando tanto paso de argumentos por línea de comandos (String[] args) como entrada interactiva validada por consola.'
            ],
            tech: ['Java', 'ProcessBuilder', 'ProcessHandle API', 'Optional<T>', 'Runtime API', 'Multiproceso', 'Sistemas Operativos'],
            github: 'https://github.com/hugomsedeno/java-gestor-procesos-sistema',
            files: [
                {
                    name: 'MonitorProcesosSistema.java',
                    code: `import java.util.Optional;

public class MonitorProcesosSistema {

    public static void main(String[] args) {
        ProcessHandle miProceso = ProcessHandle.current();
        long pid = miProceso.pid();
        System.out.println("Id Proceso : " + pid);
        
        ProcessHandle.Info informacion = miProceso.info();
        Optional<String> comando = informacion.command();
        
        if (comando.isPresent()) {
            System.out.println("Comando: " + comando.get());
        }
        
        System.out.println("Comando: " + informacion.command().orElse("Desconocido"));
        
        Optional<String> usuario = informacion.user();
        if (usuario.isPresent()) {
            System.out.println("Usuario: " + usuario.get());
        }
        
        System.out.println("Usuario: " + informacion.user().orElse("Usuario Desconocido"));
        
        Optional<ProcessHandle> padreProcesoActual = miProceso.parent();
        if (padreProcesoActual.isPresent()) {
            long pidPadre = padreProcesoActual.get().pid();
            System.out.println("Id proceso padre : " + pidPadre);
            ProcessHandle.Info informacionPadre = padreProcesoActual.get().info();
            System.out.println("Comando del padre: " + informacionPadre.command().orElse("Desconocido"));
        }
        
        // Versión de Java
        System.out.println(Runtime.getRuntime().version());
        
        // Núcleos que el SO nos deja usar
        int nucleosPermitidos = Runtime.getRuntime().availableProcessors();
        System.out.println("Núcleos permitidos: " + nucleosPermitidos);
    }
}`
                },
                {
                    name: 'OrquestadorSubprocesos.java',
                    code: `import java.io.IOException;

public class OrquestadorSubprocesos {

    public static void main(String[] args) {

        String miSistemaOperativo = System.getProperty("os.name").toLowerCase();
        System.out.println(miSistemaOperativo);

        String programaQueLanzaremos = null;
        if (miSistemaOperativo.contains("win")) // Windows 7, 8, 10, 11
        {
            programaQueLanzaremos = "notepad";
        } else if (miSistemaOperativo.contains("lin")) // Linux
        {
            programaQueLanzaremos = "gedit";
        } else {
            throw new RuntimeException("Sistema Operativo no soportado");
        }
        
        // Creamos el ProcessBuilder pasándole el ejecutable y el fichero a abrir
        ProcessBuilder pb = new ProcessBuilder(programaQueLanzaremos, "Bloc de notas");
        
        try {
            System.out.println("Lanzando " + programaQueLanzaremos + " ... ");
            // Aquí nace el proceso hijo
            Process procesoHijo = pb.start(); 
            System.out.println("Proceso hijo lanzado con PID: " + procesoHijo.pid());
            System.out.println("¿Sigue activo? " + procesoHijo.isAlive());
            System.out.println("Cierra el programa abierto para continuar.");
            
            int resultadoEjecucion = procesoHijo.waitFor();
            
            System.out.println("El programa ha terminado con código: " + resultadoEjecucion);
            System.out.println("¿Sigue activo? " + procesoHijo.isAlive());
            
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
        }
    }
}`
                },
                {
                    name: 'ProcesadorArgumentosCLI.java',
                    code: `import java.util.Scanner;

public class ProcesadorArgumentosCLI {
    public static void main(String[] args) {
        int val1 = 0;
        int val2 = 0;
        
        if (args.length == 0) {
            Scanner scanner = new Scanner(System.in);
            System.out.println("Introduce el primer valor");
            val1 = scanner.nextInt();
            System.out.println("Introduce el segundo valor");
            val2 = scanner.nextInt();
            scanner.close();
        } else {
            val1 = Integer.parseInt(args[0]);
            val2 = Integer.parseInt(args[1]);
        }
    }
}`
                }
            ]
        },
        3: {
            category: 'Bases de Datos Relacionales • SQL / MySQL',
            title: 'Base de Datos Relacional «RentACar» (SQL)',
            description: 'Diseño físico, consultas relacionales, control de transacciones ACID y administración de permisos desarrollados en MySQL para la gestión integral de una flota de alquiler de vehículos.',
            features: [
                'Modelado Físico DDL (01_esquema_ddl.sql): Creación de la base de datos con codificación utf8mb4_spanish_ci y tablas cliente, vehiculo y alquiler.',
                'Integridad Referencial y Restricciones: Implementación de claves primarias AUTO_INCREMENT, restricciones UNIQUE (DNI), CHECK (precio_dia > 0), DEFAULT y claves ajenas con ON DELETE RESTRICT y ON UPDATE CASCADE.',
                'Consultas Relacionales DQL (02_consultas_join_dql.sql): Cruce de tablas mediante INNER JOIN y LEFT JOIN, agregaciones con GROUP BY / COUNT(*) y subconsultas anidadas con IN.',
                'Transacciones ACID y Seguridad DCL (03_transacciones_y_permisos.sql): Operaciones atómicas con START TRANSACTION, COMMIT, ROLLBACK, bloqueo de filas con SELECT ... FOR UPDATE y creación de roles (lector, editor, admin) con GRANT.'
            ],
            tech: ['SQL', 'MySQL / MariaDB', 'DDL & DML', 'INNER / LEFT JOIN', 'Transacciones ACID', 'Seguridad DCL (GRANT)', 'InnoDB'],
            github: 'https://github.com/hugomsedeno/sql-sistema-gestion-rentacar',
            files: [
                {
                    name: '01_esquema_ddl.sql',
                    code: `-- ============================================================
-- 1. CREACIÓN DE LA BASE DE DATOS Y TABLAS (DDL)
-- ============================================================
CREATE DATABASE IF NOT EXISTS rentacar
CHARACTER SET utf8mb4
COLLATE utf8mb4_spanish_ci;

USE rentacar;

CREATE TABLE cliente (
    id_cliente INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    dni VARCHAR(9) NOT NULL UNIQUE,
    telefono VARCHAR(15),
    email VARCHAR(100)
);

CREATE TABLE vehiculo (
    id_vehiculo INT AUTO_INCREMENT PRIMARY KEY,
    marca VARCHAR(50) NOT NULL,
    modelo VARCHAR(100) NOT NULL,
    precio_dia DECIMAL(6,2) NOT NULL CHECK (precio_dia > 0),
    disponible CHAR(1) DEFAULT 'S'
);

CREATE TABLE alquiler (
    id_alquiler INT AUTO_INCREMENT PRIMARY KEY,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE NOT NULL,
    id_cliente INT NOT NULL,
    id_vehiculo INT NOT NULL,
    CONSTRAINT fk_cliente FOREIGN KEY (id_cliente)
        REFERENCES cliente(id_cliente)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,
    CONSTRAINT fk_vehiculo FOREIGN KEY (id_vehiculo)
        REFERENCES vehiculo(id_vehiculo)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
);

-- ============================================================
-- 2. INSERCIÓN DE DATOS INICIALES (DML)
-- ============================================================
INSERT INTO cliente (nombre, dni, telefono, email) VALUES
('Ana López', '12345678A', '600111222', 'ana.lopez@email.com'),
('Luis Pérez', '87654321B', '600333444', 'luis.perez@email.com'),
('Marta Ruiz', '11223344C', '600555666', 'marta.ruiz@email.com');

INSERT INTO vehiculo (marca, modelo, precio_dia, disponible) VALUES
('Seat', 'Ibiza', 35.00, 'S'),
('Toyota', 'Corolla', 45.00, 'S'),
('Renault', 'Clio', 30.00, 'S');

INSERT INTO alquiler (fecha_inicio, fecha_fin, id_cliente, id_vehiculo) VALUES
('2025-03-01', '2025-03-05', 1, 1),
('2025-03-10', '2025-03-12', 2, 2),
('2025-03-15', '2025-03-18', 3, 3);`
                },
                {
                    name: '02_consultas_join_dql.sql',
                    code: `USE rentacar;

-- 1. Consulta con INNER JOIN: Qué cliente ha alquilado qué vehículo
SELECT c.nombre AS cliente, v.marca, v.modelo, a.fecha_inicio, a.fecha_fin
FROM alquiler a
INNER JOIN cliente c ON a.id_cliente = c.id_cliente
INNER JOIN vehiculo v ON a.id_vehiculo = v.id_vehiculo;

-- 2. Consulta con LEFT JOIN: Mostrar todos los vehículos estén o no alquilados
SELECT v.marca, v.modelo, a.id_alquiler
FROM vehiculo v
LEFT JOIN alquiler a ON v.id_vehiculo = a.id_vehiculo;

-- 3. Consulta de agregación (GROUP BY): Total de vehículos por marca
SELECT marca, COUNT(*) AS total_vehiculos
FROM vehiculo
GROUP BY marca;

-- 4. Subconsulta: Clientes que han realizado al menos un alquiler
SELECT nombre, dni
FROM cliente
WHERE id_cliente IN (
    SELECT id_cliente FROM alquiler
);

-- 5. Creación de tabla resumen a partir de consulta (INSERT INTO ... SELECT)
CREATE TABLE IF NOT EXISTS clientes_activos (
    id_cliente INT PRIMARY KEY,
    nombre VARCHAR(100)
);

INSERT INTO clientes_activos (id_cliente, nombre)
SELECT id_cliente, nombre FROM cliente;`
                },
                {
                    name: '03_transacciones_y_permisos.sql',
                    code: `USE rentacar;

-- ============================================================
-- 1. TRANSACCIONES ACID (COMMIT & ROLLBACK)
-- ============================================================
START TRANSACTION;

UPDATE vehiculo
SET disponible = 'N'
WHERE id_vehiculo = 2;

INSERT INTO alquiler (fecha_inicio, fecha_fin, id_cliente, id_vehiculo)
VALUES ('2025-04-10', '2025-04-15', 1, 2);

COMMIT;

-- Ejemplo de transacción revertida con ROLLBACK y bloqueo FOR UPDATE
START TRANSACTION;

SELECT * FROM cliente
WHERE id_cliente = 1
FOR UPDATE;

UPDATE cliente
SET nombre = 'Cambio Temporal'
WHERE id_cliente = 1;

ROLLBACK;

-- ============================================================
-- 2. ADMINISTRACIÓN DE USUARIOS Y PRIVILEGIOS (DCL)
-- ============================================================
CREATE USER IF NOT EXISTS 'lector'@'localhost' IDENTIFIED BY '1234';
GRANT SELECT ON rentacar.* TO 'lector'@'localhost';

CREATE USER IF NOT EXISTS 'editor'@'localhost' IDENTIFIED BY '1234';
GRANT SELECT, INSERT, UPDATE ON rentacar.* TO 'editor'@'localhost';

CREATE USER IF NOT EXISTS 'admin'@'localhost' IDENTIFIED BY '1234';
GRANT ALL PRIVILEGES ON rentacar.* TO 'admin'@'localhost';

FLUSH PRIVILEGES;`
                }
            ]
        },
        4: {
            category: 'Desarrollo Web Frontend • HTML5 & CSS3',
            title: 'Portal Web E-Learning «Antares Digital»',
            description: 'Sitio web corporativo multipágina desarrollado para una plataforma de teleformación y distribución de contenidos SCORM, aplicando maquetación con CSS3 Flexbox y semántica HTML5.',
            features: [
                'Arquitectura Web Multipágina: Navegación interconectada entre la página principal (index.html), la vista de plataforma (elearning.html) y el área de catálogo y reservas (contenidos.html).',
                'Maquetación con CSS3 Flexbox (styles.css): Cabecera fija superior (position: fixed) con alineación espacial, distribución flexible de tarjetas de servicios y diseño limpio.',
                'Sección Hero con Superposición Visual: Cabecera de impacto con imagen de fondo adaptativa (background-size: cover) y capa semitransparente mediante pseudo-elemento ::before.',
                'Formulario de Reserva de Cursos: Captura estructurada de datos del alumno (curso, selector de fecha date, nombre y validación de correo email).'
            ],
            tech: ['HTML5 Semántico', 'CSS3', 'Flexbox Layout', 'Diseño Multipágina', 'Formularios HTML5'],
            github: 'https://github.com/hugomsedeno/web-portal-elearning-antares',
            files: [
                {
                    name: 'index.html',
                    code: `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Antares Digital - Portal E-Learning</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>

  <header class="header">
    <div class="logo">
      <img src="LOGO.jpg" alt="Antares Digital" style="height:30px;">
    </div>
    <nav>
      <a href="index.html" class="active">Inicio</a>
      <a href="elearning.html">E-Learning</a>
      <a href="contenidos.html">Contenidos</a>
      <a href="#">Catálogo</a>
      <a href="#">Materiales</a>
      <a href="#">Pedidos</a>
      <a href="#">Reservas</a>
      <a href="#">Contacto</a>
    </nav>
  </header>

  <main>
    <section class="hero">
      <div class="hero-content">
        <h1>Antares Desarrollo Digital (ADD)</h1>
        <p>Factoría de contenidos SCORM para licenciar en modalidad de teleformación.</p>
        <button class="btn">Ver Catálogo</button>
      </div>
    </section>

    <section class="solutions">
      <h2>Soluciones E-Learning</h2>
      <div class="cards">
        <article class="card">
          <h3>Desarrollo de Contenidos</h3>
          <p>Cursos SCORM adaptados a la normativa y listos para impartir.</p>
          <button class="btn-secondary">Más información</button>
        </article>

        <article class="card">
          <h3>Plataforma E-Learning</h3>
          <p>Gestión completa de la formación y emisión de diplomas con blockchain.</p>
          <button class="btn-secondary">Más información</button>
        </article>

        <article class="card">
          <h3>Reservas y Pedidos</h3>
          <p>Reserva tu curso o tramita tus pedidos de manera rápida y segura.</p>
          <button class="btn-secondary">Más información</button>
        </article>
      </div>
    </section>
  </main>

  <footer class="footer">
    <p>&copy; 2025 Antares Digital | Contacto</p>
  </footer>

</body>
</html>`
                },
                {
                    name: 'contenidos.html',
                    code: `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Antares Digital - Contenidos y Reservas</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>

  <header class="header">
    <div class="logo">
      <img src="LOGO.jpg" alt="Antares Digital" style="height:30px;">
    </div>
    <nav>
      <a href="index.html">Inicio</a>
      <a href="elearning.html">E-Learning</a>
      <a href="contenidos.html" class="active">Contenidos</a>
      <a href="#">Catálogo</a>
      <a href="#">Materiales</a>
      <a href="#">Pedidos</a>
      <a href="#">Reservas</a>
      <a href="#">Contacto</a>
    </nav>
  </header>

  <main class="contenidos-main">
    <section class="contenidos-section">
      <h1>Desarrollo de Contenidos</h1>
      <p>Desarrollamos cursos SCORM listos para usar, con estos beneficios:</p>
      <ul>
        <li>Ahorro de tiempo: contenidos listos, sin necesidad de crearlos desde cero.</li>
        <li>Calidad garantizada: diseño instruccional experto, interactivo y multimedia.</li>
        <li>Variedad y personalización: amplia gama de contenidos adaptables.</li>
        <li>Seguimiento y evaluación: control del progreso e informes detallados gracias al formato SCORM.</li>
      </ul>

      <h2>Reserva de Curso</h2>

      <form class="reserva-form">
        <label for="curso">Curso:</label>
        <input type="text" id="curso" name="curso" value="Excel Avanzado">

        <label for="fecha">Fecha de inicio:</label>
        <input type="date" id="fecha" name="fecha">

        <label for="nombre">Nombre:</label>
        <input type="text" id="nombre" name="nombre">

        <label for="correo">Correo:</label>
        <input type="email" id="correo" name="correo">

        <div class="form-actions">
          <button type="submit" class="btn-secondary">Confirmar reserva</button>
        </div>
      </form>
    </section>
  </main>

  <footer class="footer">
    <p>&copy; 2025 Antares Digital | Contacto</p>
  </footer>

</body>
</html>`
                },
                {
                    name: 'styles.css',
                    code: `* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
}

html {
  scroll-behavior: smooth;
}

body {
  background: #f3f3f3;
}

/* CABECERA FIJA CON FLEXBOX */
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: #000;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 80px;
  z-index: 1000;
  font-size: 15px;
}

.header nav a {
  color: #fff;
  text-decoration: none;
  margin-left: 25px;
  font-size: 14px;
}

.header nav a.active {
  color: #4da3ff;
}

main {
  margin-top: 80px;
}

/* HERO CON CAPA OSCURA */
.hero {
  position: relative;
  background: url("hero.jpg") center center / cover no-repeat;
  color: #fff;
  text-align: center;
  padding: 160px 20px 140px;
  overflow: hidden;
}

.hero::before {
  content: "";
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
}

.hero-content {
  position: relative;
  max-width: 700px;
  margin: 0 auto;
}

/* TARJETAS CON FLEXBOX */
.solutions {
  background: #fff;
  text-align: center;
  padding: 40px 20px 80px;
}

.cards {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
}

.card {
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.08);
  padding: 25px 20px;
  width: 280px;
}

/* FORMULARIO DE RESERVA */
.reserva-form {
  max-width: 700px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.reserva-form input {
  padding: 8px 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
  font-size: 14px;
}

.footer {
  background: #000;
  color: #fff;
  text-align: center;
  padding: 15px;
  font-size: 12px;
}`
                }
            ]
        }
    };

    // Escenarios interactivos dentro de cada vista visual
    const interactiveSimulations = {
        1: [
            {
                label: '1. Guardar y Leer Empleados.txt',
                html: `
                    <div class="visual-terminal-body">
                        <div class="term-output-box">
                            <div class="term-line success">&check; Carpeta verificada: C:\\AD\\Ejercicios</div>
                            <div class="term-line success">&check; Listado de 10 empleados guardado en: C:\\AD\\Ejercicios\\Empleados.txt</div>
                            <div class="term-line">--- CONTENIDO DEL ARCHIVO Empleados.txt (BufferedReader) ---</div>
                            <div class="term-line">ID: 1 | Nombre: Empleado_1 &nbsp;&bull;&nbsp; ID: 2 | Nombre: Empleado_2 &nbsp;&bull;&nbsp; ID: 3 | Nombre: Empleado_3</div>
                            <div class="term-line">ID: 4 | Nombre: Empleado_4 &nbsp;&bull;&nbsp; ID: 5 | Nombre: Empleado_5 &nbsp;&bull;&nbsp; ... hasta ID: 10</div>
                        </div>
                    </div>`
            },
            {
                label: '2. Escribir Provincias de Andalucía',
                html: `
                    <div class="visual-terminal-body">
                        <div class="term-output-box">
                            <div class="term-line">&gt; Opción seleccionada: [5] Escribir provincias en fichero_de_texto2.txt</div>
                            <div class="term-line success">&check; Provincias escritas correctamente en fichero_de_texto2.txt:</div>
                            <div class="term-line">Almería &bull; Cádiz &bull; Córdoba &bull; Granada &bull; Huelva &bull; Jaén &bull; Málaga &bull; Sevilla</div>
                            <div class="term-line term-muted">Flujo cerrado automáticamente con bloque try-with-resources.</div>
                        </div>
                    </div>`
            },
            {
                label: '3. Borrado Recursivo de Directorios',
                html: `
                    <div class="visual-terminal-body">
                        <div class="term-output-box">
                            <div class="term-line">&gt; Opción seleccionada: [4] Eliminar 'nuevoDirectorio' (con contenido)</div>
                            <div class="term-line">Inspeccionando hijos dentro de: Ejercicios/miDirectorio/nuevoDirectorio...</div>
                            <div class="term-line">&rarr; Eliminando archivo interno: fichero_de_texto2.txt</div>
                            <div class="term-line success">&check; Directorio 'nuevoDirectorio' eliminado recursivamente con éxito.</div>
                        </div>
                    </div>`
            }
        ],
        2: [
            {
                label: '1. Auditoría de Proceso y CPU',
                html: `
                    <div class="monitor-metrics-grid">
                        <div class="monitor-metric">
                            <span class="metric-label">PID Proceso Activo (ProcessHandle)</span>
                            <strong class="metric-val">14820 <span>(java.exe)</span></strong>
                        </div>
                        <div class="monitor-metric">
                            <span class="metric-label">Proceso Padre Detectado</span>
                            <strong class="metric-val">9412 <span>(eclipse.exe)</span></strong>
                        </div>
                        <div class="monitor-metric">
                            <span class="metric-label">Recursos de Hardware y JVM</span>
                            <strong class="metric-val">12 Núcleos CPU <span>&bull; Java Runtime 21</span></strong>
                        </div>
                        <div class="monitor-metric">
                            <span class="metric-label">Usuario del Sistema Operativo</span>
                            <strong class="metric-val status-alive">&check; Sesion_Activa (Windows 11)</strong>
                        </div>
                    </div>`
            },
            {
                label: '2. Lanzar Subproceso Hijo (ProcessBuilder)',
                html: `
                    <div class="monitor-metrics-grid">
                        <div class="monitor-metric">
                            <span class="metric-label">Detección Automática de SO</span>
                            <strong class="metric-val">Windows 11 <span>&rarr; Ejecutable: notepad</span></strong>
                        </div>
                        <div class="monitor-metric">
                            <span class="metric-label">PID Subproceso Hijo</span>
                            <strong class="metric-val">18304 <span>(notepad.exe)</span></strong>
                        </div>
                        <div class="monitor-metric">
                            <span class="metric-label">Estado en Tiempo Real (isAlive)</span>
                            <strong class="metric-val status-alive">&bull; ACTIVO (Sincronizado con waitFor)</strong>
                        </div>
                        <div class="monitor-metric">
                            <span class="metric-label">Código de Salida al Cerrar</span>
                            <strong class="metric-val">0 <span>(Ejecución limpia sin errores)</span></strong>
                        </div>
                    </div>`
            }
        ],
        3: [
            {
                label: '1. Alquileres Activos (INNER JOIN)',
                html: `
                    <div class="sql-schema-bar">
                        <span class="sql-node">PK cliente (dni UNIQUE)</span>
                        <span class="sql-rel">1 : N &rarr;</span>
                        <span class="sql-node highlight">FK alquiler</span>
                        <span class="sql-rel">&larr; N : 1</span>
                        <span class="sql-node">PK vehiculo (CHECK &gt; 0)</span>
                    </div>
                    <table class="visual-sql-table">
                        <thead>
                            <tr>
                                <th>Cliente</th>
                                <th>DNI</th>
                                <th>Vehículo</th>
                                <th>Fechas Alquiler</th>
                                <th>Tarifa</th>
                                <th>Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Ana López</td>
                                <td>12345678A</td>
                                <td>Seat Ibiza</td>
                                <td>2025-03-01 &rarr; 03-05</td>
                                <td>35,00 &euro;/día</td>
                                <td><span class="sql-badge-ok">COMMIT OK</span></td>
                            </tr>
                            <tr>
                                <td>Luis Pérez</td>
                                <td>87654321B</td>
                                <td>Toyota Corolla</td>
                                <td>2025-03-10 &rarr; 03-12</td>
                                <td>45,00 &euro;/día</td>
                                <td><span class="sql-badge-ok">COMMIT OK</span></td>
                            </tr>
                            <tr>
                                <td>Marta Ruiz</td>
                                <td>11223344C</td>
                                <td>Renault Clio</td>
                                <td>2025-03-15 &rarr; 03-18</td>
                                <td>30,00 &euro;/día</td>
                                <td><span class="sql-badge-ok">COMMIT OK</span></td>
                            </tr>
                        </tbody>
                    </table>`
            },
            {
                label: '2. Roles y Permisos de Seguridad (DCL)',
                html: `
                    <table class="visual-sql-table">
                        <thead>
                            <tr>
                                <th>Rol de Usuario MySQL</th>
                                <th>Host</th>
                                <th>Permisos Asignados (GRANT)</th>
                                <th>Nivel de Acceso</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>lector</strong></td>
                                <td>localhost</td>
                                <td><code>SELECT</code> sobre <code>rentacar.*</code></td>
                                <td><span class="sql-badge-ok">Solo Lectura</span></td>
                            </tr>
                            <tr>
                                <td><strong>editor</strong></td>
                                <td>localhost</td>
                                <td><code>SELECT, INSERT, UPDATE</code></td>
                                <td><span class="sql-badge-ok">Operaciones</span></td>
                            </tr>
                            <tr>
                                <td><strong>admin</strong></td>
                                <td>localhost</td>
                                <td><code>ALL PRIVILEGES</code></td>
                                <td><span class="sql-badge-ok">Control Total</span></td>
                            </tr>
                        </tbody>
                    </table>`
            }
        ],
        4: [
            {
                label: '1. Portada Principal (index.html)',
                html: `
                    <div class="mini-antares-site">
                        <div class="mini-antares-nav">
                            <strong>ANTARES DIGITAL</strong>
                            <div class="mini-nav-items">
                                <span class="active">Inicio</span>
                                <span>E-Learning</span>
                                <span>Contenidos</span>
                                <span>Reservas</span>
                            </div>
                        </div>
                        <div class="mini-antares-hero">
                            <div class="mini-hero-overlay">
                                <span>Antares Desarrollo Digital (ADD)</span>
                                <small>Factoría de contenidos SCORM para licenciar en modalidad de teleformación</small>
                            </div>
                        </div>
                        <div class="mini-antares-cards">
                            <div class="mini-card-item">Desarrollo de Contenidos SCORM</div>
                            <div class="mini-card-item">Plataforma E-Learning + Blockchain</div>
                            <div class="mini-card-item">Reservas y Pedidos Online</div>
                        </div>
                    </div>`
            },
            {
                label: '2. Reserva de Curso (contenidos.html)',
                html: `
                    <div class="mini-antares-site">
                        <div class="mini-antares-nav">
                            <strong>ANTARES DIGITAL</strong>
                            <div class="mini-nav-items">
                                <span>Inicio</span>
                                <span>E-Learning</span>
                                <span class="active">Contenidos</span>
                                <span>Reservas</span>
                            </div>
                        </div>
                        <div class="mini-antares-cards" style="grid-template-columns: repeat(2, 1fr); padding: 0.65rem;">
                            <div class="mini-card-item" style="text-align:left;">
                                <strong>Curso seleccionado:</strong> Excel Avanzado (SCORM)<br>
                                <strong>Inicio:</strong> 2025-05-15
                            </div>
                            <div class="mini-card-item" style="text-align:left;">
                                <strong>Alumno:</strong> Hugo Marín<br>
                                <span style="color:#0284c7;">&check; Formulario validado listo para enviar</span>
                            </div>
                        </div>
                    </div>`
            }
        ]
    };

    // 5. Lógica del Modal de Proyectos
    const modal = document.getElementById('project-modal');
    const modalClose = document.getElementById('modal-close');
    const modalCategory = document.getElementById('modal-category');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-description');
    const modalHrSummary = document.getElementById('modal-hr-summary');
    const modalHrText = document.getElementById('modal-hr-text');
    const modalFeatures = document.getElementById('modal-features');
    const modalTech = document.getElementById('modal-tech');
    const modalGithub = document.getElementById('modal-github');
    const modalLiveDemo = document.getElementById('modal-live-demo');
    const modalVisualSection = document.getElementById('modal-visual-section');
    const modalVisualContainer = document.getElementById('modal-visual-container');
    const modalCodeSection = document.getElementById('modal-code-section');
    const modalCodeTabs = document.getElementById('modal-code-tabs');
    const modalCodeContent = document.getElementById('modal-code-content');
    const modalCopyCodeBtn = document.getElementById('modal-copy-code');
    let activeCodeText = '';

    document.querySelectorAll('.project-modal-trigger').forEach(trigger => {
        trigger.addEventListener('click', () => {
            const id = trigger.getAttribute('data-project');
            const data = projectsData[id];
            if (!data) return;

            modalCategory.textContent = data.category;
            modalTitle.textContent = data.title;
            modalDesc.textContent = data.description;
            modalGithub.href = data.github;

            if (modalVisualSection && modalVisualContainer) {
                const scenarios = interactiveSimulations[id];
                if (scenarios && scenarios.length > 0) {
                    modalVisualSection.style.display = 'block';
                    const buttonsHtml = scenarios.map((sc, idx) =>
                        `<button type="button" class="sim-btn ${idx === 0 ? 'active' : ''}" data-sim-index="${idx}">${sc.label}</button>`
                    ).join('');
                    modalVisualContainer.innerHTML = `
                        <div class="visual-preview-box">
                            <div class="visual-window-bar">
                                <span class="win-dots"><i></i><i></i><i></i></span>
                                <span class="win-title">${data.title} &mdash; Vista Interactiva</span>
                            </div>
                            <div class="sim-controls">${buttonsHtml}</div>
                            <div id="sim-stage">${scenarios[0].html}</div>
                        </div>
                    `;
                    const simStage = modalVisualContainer.querySelector('#sim-stage');
                    modalVisualContainer.querySelectorAll('.sim-btn').forEach(btn => {
                        btn.addEventListener('click', () => {
                            modalVisualContainer.querySelectorAll('.sim-btn').forEach(b => b.classList.remove('active'));
                            btn.classList.add('active');
                            const idx = parseInt(btn.getAttribute('data-sim-index'), 10);
                            if (simStage && scenarios[idx]) {
                                simStage.innerHTML = scenarios[idx].html;
                            }
                        });
                    });
                } else {
                    modalVisualSection.style.display = 'none';
                    modalVisualContainer.innerHTML = '';
                }
            }

            if (modalLiveDemo) {
                if (id === '4') {
                    modalLiveDemo.style.display = 'inline-flex';
                    modalLiveDemo.href = 'repositorios-github/web-portal-elearning-antares/index.html';
                } else {
                    modalLiveDemo.style.display = 'none';
                }
            }

            modalFeatures.innerHTML = data.features.map(f => `<li>${f}</li>`).join('');
            modalTech.innerHTML = data.tech.map(t => `<span>${t}</span>`).join('');

            if (data.files && data.files.length > 0 && modalCodeSection) {
                modalCodeSection.style.display = 'block';
                modalCodeTabs.innerHTML = data.files.map((file, idx) =>
                    `<button type="button" class="modal-code-tab ${idx === 0 ? 'active' : ''}" data-file-index="${idx}">${file.name}</button>`
                ).join('');
                activeCodeText = data.files[0].code;
                modalCodeContent.textContent = activeCodeText;

                modalCodeTabs.querySelectorAll('.modal-code-tab').forEach(tabBtn => {
                    tabBtn.addEventListener('click', () => {
                        modalCodeTabs.querySelectorAll('.modal-code-tab').forEach(b => b.classList.remove('active'));
                        tabBtn.classList.add('active');
                        const fileIdx = parseInt(tabBtn.getAttribute('data-file-index'), 10);
                        activeCodeText = data.files[fileIdx].code;
                        modalCodeContent.textContent = activeCodeText;
                    });
                });
            } else if (modalCodeSection) {
                modalCodeSection.style.display = 'none';
                activeCodeText = '';
            }

            modal.classList.add('open');
            modal.setAttribute('aria-hidden', 'false');
        });
    });

    if (modalCopyCodeBtn) {
        modalCopyCodeBtn.addEventListener('click', () => {
            if (!activeCodeText) return;
            navigator.clipboard.writeText(activeCodeText).then(() => {
                showToast('¡Código fuente copiado al portapapeles!');
            });
        });
    }

    const closeModal = () => {
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
    };

    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('open')) {
            closeModal();
        }
    });

    // 6. Copiar correo al portapapeles y mostrar Toast
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toast-message');
    let toastTimeout;

    const showToast = (message) => {
        toastMsg.textContent = message;
        toast.classList.add('show');
        clearTimeout(toastTimeout);
        toastTimeout = setTimeout(() => {
            toast.classList.remove('show');
        }, 3200);
    };

    document.querySelectorAll('.copy-email-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const email = btn.getAttribute('data-email');
            navigator.clipboard.writeText(email).then(() => {
                showToast(`¡Correo copiado: ${email}!`);
            });
        });
    });

    // 7. Formulario de contacto (abre Gmail en nueva pestaña con el mensaje ya redactado para hugomsedeno@gmail.com)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            const subject = encodeURIComponent(`Contacto Portfolio Hugo - ${name}`);
            const body = encodeURIComponent(`Nombre / Empresa: ${name}\nCorreo de contacto: ${email}\n\nMensaje:\n${message}`);
            const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=hugomsedeno@gmail.com&su=${subject}&body=${body}`;
            window.open(gmailUrl, '_blank', 'noopener,noreferrer');

            showToast('Abriendo Gmail en otra pestaña con tu mensaje listo para enviar...');
            contactForm.reset();
        });
    }

    // 8. VENTANA DE CÓDIGO INTERACTIVA (PESTAÑAS + BOTÓN EJECUTAR)
    const codeTabs = document.querySelectorAll('.code-tab');
    const codeBodies = document.querySelectorAll('.code-body');
    const runBtn = document.getElementById('btn-run-code');
    const consoleText = document.getElementById('console-text');

    let currentTab = 'java';
    let typingInterval = null;

    const tabMessages = {
        java: 'Compilando HugoMarin.java... ✔ [OK] -> 🚀 Hugo Marín (DAM + SMR) | Java, Android, HTML/CSS y SQL listos al 100%.',
        android: 'Instalando APK en emulador... ✔ [OK] -> 📱 MainActivity iniciada: Interfaz Android cargada sin errores.',
        sql: 'Ejecutando consulta SQL... ✔ [1 fila devuelta] -> { alumno: "Hugo Marín", ciclo: "DAM", compromiso: "MÁXIMO" }'
    };

    const typeConsoleMessage = (msg) => {
        if (!consoleText) return;
        clearInterval(typingInterval);
        consoleText.textContent = '';
        let i = 0;
        typingInterval = setInterval(() => {
            consoleText.textContent += msg.charAt(i);
            i++;
            if (i >= msg.length) {
                clearInterval(typingInterval);
            }
        }, 18);
    };

    codeTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            codeTabs.forEach(t => t.classList.remove('active'));
            codeBodies.forEach(b => b.classList.remove('active'));

            tab.classList.add('active');
            currentTab = tab.getAttribute('data-tab');
            const activeBody = document.getElementById(`tab-${currentTab}`);
            if (activeBody) activeBody.classList.add('active');

            if (consoleText) {
                clearInterval(typingInterval);
                const fileNames = { java: 'HugoMarin.java', android: 'AndroidApp.java', sql: 'BaseDatos.sql' };
                consoleText.textContent = `Archivo ${fileNames[currentTab]} abierto. Pulsa ▶ Ejecutar...`;
            }
        });
    });

    if (runBtn) {
        runBtn.addEventListener('click', () => {
            typeConsoleMessage(tabMessages[currentTab]);
        });
    }
});



