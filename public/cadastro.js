const url = "http://localhost:3333/users";

const button = document.getElementById("cadastrar");
button.addEventListener("click", function (e) {
  alert("oi");
  e.preventDefault();
  const usuario = document.getElementById("usuario").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("senha").value;

  fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ nickname: usuario, email: email, senha: password }),
  });
});
