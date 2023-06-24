
function login() {
    const username = document.querySelector('#username').value;
    const password = document.querySelector('#password').value;
  
    fetch('https://api.reciclarg.cloud/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => {
        if (response.status === 200) {
          alert('Login exitoso');
          //window.location.href = '/index2.html'; // redirige a index2.html si la respuesta es 200
        } else {
          console.error('Error:', response.status);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  