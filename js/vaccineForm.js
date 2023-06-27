console.log("js");
const apiUrl = "https://api.vacunarg.site/buscar_paciente";

    document.getElementById("vaccineForm").addEventListener("submit", function (event) {
      event.preventDefault();

      var cuil = document.getElementById("cuil").value;
      if (!isValidCuil(cuil)) {
        document.getElementById("cuilError").classList.remove("hidden");
        return;
      }

      fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            cuil: cuil
          })
        })
        .then((response) => {
          if (!response.ok) throw new Error(response.status);
          else return response.json();
        })
        .then((data) => {
          console.log(data);

          if (data.length === 0) {
            Swal.fire({
              title: 'Error!',
              text: 'No se encontraron datos para el CUIL proporcionado.',
              icon: 'error',
              confirmButtonText: 'Ok'
            });
            return;
          }

          let paciente = data[0];
          let fechaNacimiento = new Date(paciente.fecha_nacimiento);
          let formattedFechaNacimiento = fechaNacimiento.getDate() + '/' + (fechaNacimiento.getMonth() + 1) +
            '/' + fechaNacimiento.getFullYear();

          let fechaAplicacion = new Date(paciente.fecha_aplicacion);
          let formattedFechaAplicacion = fechaAplicacion.getDate() + '/' + (fechaAplicacion.getMonth() + 1) +
            '/' + fechaAplicacion.getFullYear();

          Swal.fire({
            title: 'Éxito!',
            html: 'Nombre: ' + paciente.nombre + '<br>' +
              'Apellido: ' + paciente.apellido + '<br>' +
              'CUIL: ' + paciente.cuil + '<br>' +
              'Fecha de Nacimiento: ' + formattedFechaNacimiento + '<br>' +
              'Dosis: ' + paciente.dosis + '<br>' +
              'Fecha de Aplicación: ' + formattedFechaAplicacion + '<br>' +
              'Centro de Salud: ' + paciente.centro_salud + '<br>' +
              'Nombre de Vacuna: ' + paciente.nombre_vacuna + '<br>' +
              'Lote de Vacuna: ' + paciente.lote_vacuna.replace(/\n/g,
                '<br>'), // Reemplaza '\n' con '<br>' para saltos de línea
            icon: 'success',
            confirmButtonText: 'Ok'
          });

        })
        .catch((error) => {
          console.log(error);
        });

      function isValidCuil(cuil) {
        var re = /^([20|23|24|27]{2})-([0-9]{8})-([0-9]{1})$/;
        return re.test(cuil);
      }

      let counters = document.querySelectorAll('.counter');
      let speed = 200;

      counters.forEach(counter => {
        let updateCount = () => {
          let target = +counter.getAttribute('data-count');
          let count = +counter.innerText.replace(/\D/g, '');

          let inc = target / speed;

          if (count < target) {
            counter.innerText = Math.ceil(count + inc).toLocaleString();
            setTimeout(updateCount, 1);
          } else {
            counter.innerText = target.toLocaleString();
          }
        };

        let observer = new IntersectionObserver((entries, observer) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              updateCount();
              observer.unobserve(entry.target);
            }
          });
        });

        observer.observe(counter);
      });
    });