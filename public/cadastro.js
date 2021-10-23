const url = "http://localhost:3000/create";

const button = document.getElementById("cadastrar");
button.addEventListener("click", function (e) {
  e.preventDefault();
  const usuario = document.getElementById("usuario").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("senha").value;

  fetch(url, { method: 'post', body: usuario, email, password})
});
