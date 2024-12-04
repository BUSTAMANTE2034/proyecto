const cartasApiUrl = `${apiBaseUrl}/cartas_de_liberacion`;

// Funciones para Cartas de Liberación
function loadSolicitudesCarta() {
  $.get(`${solicitudesApiUrl}`, function(response) {
    if (response.status === 'success') {
      const solicitudes = response.data;
      const selectSolicitudCarta = $('#select-solicitud-carta');
      solicitudes.forEach(solicitud => {
        selectSolicitudCarta.append(`<option value="${solicitud.id_solicitud}">${solicitud.id_solicitud} - ${solicitud.nombre_estudiante}</option>`);
      });
    } else {
      console.error('Error al obtener las solicitudes:', response.message);
      alert('Error al obtener las solicitudes: ' + response.message);
    }
  }).fail(function(jqXHR, textStatus, errorThrown) {
    console.error('Error al cargar solicitudes:', textStatus, errorThrown);
    alert('Error al cargar solicitudes: ' + textStatus);
  });
}

function loadCartas(id_solicitud) {
  let url = cartasApiUrl;
  if (id_solicitud) {
    url += `?id_solicitud=${id_solicitud}`;
  }

  const tableBody = $('#cartas-table tbody');
  tableBody.empty();
  tableBody.append('<tr><td colspan="3">Cargando cartas de liberación...</td></tr>');

  $.get(url, function(response) {
    if (response.status === 'success') {
      const cartas = response.data;
      tableBody.empty();

      if (cartas.length === 0) {
        tableBody.append('<tr><td colspan="3">No hay cartas de liberación para esta solicitud.</td></tr>');
        return;
      }

      cartas.forEach(carta => {
        const row = `
          <tr data-id="${carta.id_carta}">
            <td>${carta.id_carta}</td>
            <td>${carta.fecha_emision}</td>
            <td>
              <button class="actions-btn">⋮</button>
              <div class="actions-menu" style="display: none;">
                <button class="edit-carta-btn">Editar</button>
                <button class="delete-carta-btn">Eliminar</button>
                <button class="download-carta-btn">Descargar</button>
              </div>
            </td>
          </tr>
        `;
        tableBody.append(row);
      });
    } else {
      console.error('Error al obtener las cartas de liberación:', response.message);
      alert('Error al obtener las cartas de liberación: ' + response.message);
    }
  }).fail(function(jqXHR, textStatus, errorThrown) {
    console.error('Error al cargar cartas de liberación:', textStatus, errorThrown);
    alert('Error al cargar cartas de liberación: ' + textStatus);
  });
}

function openEditCartaModal(cartaId) {
  $.get(`${cartasApiUrl}/${cartaId}`, function(response) {
    if (response.status === 'success') {
      const carta = response.data;
      $('#carta-modal-title').text('Editar Carta de Liberación');
      $('#carta-id').val(carta.id_carta).attr('name', 'id_carta'); // Asignar 'name'
      $('#carta-solicitud-id').val(carta.id_solicitud);
      $('#fecha_emision').val(carta.fecha_emision);
      $('#archivo_carta').val(''); // Limpiar el campo de archivo
      $('#carta-modal').show();
    } else {
      console.error('Error al obtener los datos de la carta de liberación:', response.message);
      alert('Error al obtener los datos de la carta de liberación: ' + response.message);
    }
  }).fail(function(jqXHR, textStatus, errorThrown) {
    console.error('Error en la solicitud:', textStatus, errorThrown);
    alert('Error en la solicitud: ' + textStatus);
  });
}

function openDeleteConfirmationCarta(cartaId) {
  $('#delete-confirmation-carta').show();
  $('#confirm-delete-carta-btn').off('click').on('click', function() {
    $.ajax({
      url: `${cartasApiUrl}/${cartaId}`,
      type: 'DELETE',
      success: function(response) {
        if (response.status === 'success') {
          $('#delete-confirmation-carta').hide();
          const selectedSolicitud = $('#select-solicitud-carta').val();
          loadCartas(selectedSolicitud);
          alert('Carta de liberación eliminada exitosamente.');
        } else {
          console.error('Error al eliminar la carta de liberación:', response.message);
          alert('Error al eliminar la carta de liberación: ' + response.message);
        }
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.error('Error al eliminar la carta de liberación:', textStatus, errorThrown);
        alert('Error al eliminar la carta de liberación: ' + textStatus);
      }
    });
  });
  $('#cancel-delete-carta-btn').off('click').on('click', function() {
    $('#delete-confirmation-carta').hide();
  });
}

// Función para inicializar la tabla de cartas de liberación
$(document).ready(function() {
  loadSolicitudes();
  loadSolicitudesCarta(); // Cargar solicitudes para cartas

  // Cargar documentos al seleccionar una solicitud
  $('#select-solicitud').on('change', function() {
    const id_solicitud = $(this).val();
    if (id_solicitud) {
      loadDocumentos(id_solicitud);
    } else {
      $('#documentos-table tbody').empty();
    }
  });

  // Cargar cartas de liberación al seleccionar una solicitud
  $('#select-solicitud-carta').on('change', function() {
    const id_solicitud = $(this).val();
    if (id_solicitud) {
      loadCartas(id_solicitud);
    } else {
      $('#cartas-table tbody').empty();
    }
  });

  // Funcionalidad de búsqueda para documentos
  $('#search-documentos-btn').on('click', function() {
    const query = $('#search-documentos').val().toLowerCase();
    $('#documentos-table tbody tr').filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(query) > -1);
    });
  });

  // Funcionalidad de búsqueda para cartas de liberación
  $('#search-cartas-btn').on('click', function() {
    const query = $('#search-cartas').val().toLowerCase();
    $('#cartas-table tbody tr').filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(query) > -1);
    });
  });

  // Abrir modal para crear nueva carta de liberación
  $('#create-carta-btn').on('click', function() {
    const id_solicitud = $('#select-solicitud-carta').val();
    if (!id_solicitud) {
      alert('Por favor, selecciona una solicitud antes de crear una carta de liberación.');
      return;
    }
    $('#carta-modal-title').text('Crear Carta de Liberación');
    $('#carta-id').val('').removeAttr('name'); // Limpiar y eliminar 'name'
    $('#carta-solicitud-id').val(id_solicitud); // Asignar el id_solicitud al campo oculto
    $('#fecha_emision').val('');
    $('#archivo_carta').val('');
    $('#carta-modal').show();
  });

  // Cancelar modal de carta de liberación
  $('#cancel-carta-btn').on('click', function() {
    $('#carta-modal').hide();
  });

  // Manejar el envío del formulario de carta de liberación
  $('#carta-form').on('submit', function(event) {
    event.preventDefault();

    const cartaId = $('#carta-id').val();
    const id_solicitud = $('#carta-solicitud-id').val();
    const formData = new FormData(this);

    if (cartaId) {
      // Actualizar carta existente
      $.ajax({
        url: `${cartasApiUrl}/${cartaId}`,
        type: 'PUT',
        data: formData,
        processData: false,
        contentType: false,
        success: function(response) {
          if (response.status === 'success') {
            $('#carta-modal').hide();
            loadCartas(id_solicitud);
            alert('Carta de liberación actualizada exitosamente.');
          } else {
            console.error('Error al actualizar la carta de liberación:', response.message);
            alert('Error al actualizar la carta de liberación: ' + response.message);
          }
        },
        error: function(jqXHR, textStatus, errorThrown) {
          console.error('Error en la solicitud:', textStatus, errorThrown);
          alert('Error en la solicitud: ' + textStatus);
        }
      });
    } else {
      // Crear nueva carta de liberación
      $.ajax({
        url: cartasApiUrl,
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success: function(response) {
          if (response.status === 'success') {
            $('#carta-modal').hide();
            loadCartas(id_solicitud);
            alert('Carta de liberación creada exitosamente.');
          } else {
            console.error('Error al crear la carta de liberación:', response.message);
            alert('Error al crear la carta de liberación: ' + response.message);
          }
        },
        error: function(jqXHR, textStatus, errorThrown) {
          console.error('Error en la solicitud:', textStatus, errorThrown);
          alert('Error en la solicitud: ' + textStatus);
        }
      });
    }
  });

  // Manejar eventos de acciones en la tabla de cartas de liberación usando delegación de eventos
  $('#cartas-table').on('click', '.actions-btn', function() {
    $(this).next('.actions-menu').toggle();
  });

  $('#cartas-table').on('click', '.edit-carta-btn', function() {
    const cartaId = $(this).closest('tr').data('id');
    openEditCartaModal(cartaId);
  });

  $('#cartas-table').on('click', '.delete-carta-btn', function() {
    const cartaId = $(this).closest('tr').data('id');
    openDeleteConfirmationCarta(cartaId);
  });

  $('#cartas-table').on('click', '.download-carta-btn', function() {
    const cartaId = $(this).closest('tr').data('id');
    window.location.href = `${cartasApiUrl}/${cartaId}/descargar`;
  });

  // Cerrar menú de acciones al hacer clic fuera
  $(document).on('click', function(event) {
    if (!$(event.target).closest('.actions-btn, .actions-menu').length) {
      $('.actions-menu').hide();
    }
  });
});
