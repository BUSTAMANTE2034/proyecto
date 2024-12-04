FLLUJO DE TRABAJO
Registro de Estudiante

El estudiante se registra en el sistema proporcionando su nombre, matrícula, correo, contraseña y créditos aprobados.
El sistema guarda la información en la tabla estudiantes.
Inicio de Sesión

El estudiante inicia sesión con su correo y contraseña.
El sistema verifica las credenciales y permite el acceso.
Solicitud de Servicio Social

El estudiante completa un formulario de solicitud seleccionando una institución y fecha de solicitud.
El sistema crea un registro en la tabla solicitudes con el estado inicial "pendiente".
Subida de Documentos

El estudiante sube documentos relacionados con su solicitud.
El sistema guarda la información en la tabla documentos, incluyendo el estado de revisión inicial ("pendiente").
Revisión de Documentos por Encargado

El encargado accede al sistema y revisa los documentos subidos.
El sistema muestra los documentos desde la tabla documentos.
Aprobación/Rechazo de Documentos

El encargado aprueba o rechaza los documentos.
El sistema actualiza el estado del documento en la tabla documentos.
Generación de Carta de Liberación

Una vez que la solicitud es aprobada, el estudiante puede solicitar una carta de liberación.
El sistema genera la carta y la almacena en la tabla cartas_de_liberacion, junto con la fecha de emisión.
Consulta de Estado de Solicitud

El estudiante puede consultar el estado de su solicitud en cualquier momento.
El sistema obtiene el estado desde la tabla solicitudes y lo muestra.
Actualización de Datos de Plantillas

Los administradores pueden crear y actualizar plantillas para documentos.
El sistema almacena las plantillas en la tabla plantillas, incluyendo la fecha de última actualización.
Gestión de Responsables de Programa

Los encargados pueden gestionar los responsables de programa y su información.
El sistema actualiza la tabla responsable_programa según sea necesario.

Flujo Simplificado
Estudiante → Registro en estudiantes
Institución → Registro en instituciones
Responsable de Programa → Registro en responsable_programa
Solicitud → Creación en solicitudes
Subida de Documentos → Registro en documentos
Revisión de Documentos → Actualización de estado en documentos
Emisión de Carta de Liberación → Registro en cartas_de_liberacion
Plantillas de Reportes → Gestión en plantillas
Monitoreo de Progreso → Actualización de estado en solicitudes