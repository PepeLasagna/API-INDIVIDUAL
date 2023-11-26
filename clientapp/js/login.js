const EMAIL = document.getElementById("email");
const PWD = document.getElementById("pwd");
const LOGINBTN = document.getElementById("loginBtn");

function getUser() {
  let user;

  if (EMAIL.checkValidity() && PWD.checkValidity()) {
    user = {
      email: EMAIL.value,
      password: PWD.value,
    };
  } else {
    alert("Complete todos los campos correctamente");
  }

  console.log(user);
  return user;
}

function validateEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

EMAIL.addEventListener("input", () => {
  const isValid = validateEmail(EMAIL.value);

  if (isValid) {
    EMAIL.classList.remove("is-invalid");
    EMAIL.classList.add("is-valid");
  } else {
    EMAIL.classList.remove("is-valid");
    EMAIL.classList.add("is-invalid");
  }
  disabledBTN();
});

PWD.addEventListener("input", () => {
  const isValid = PWD.checkValidity();

  if (isValid) {
    PWD.classList.remove("is-invalid");
    PWD.classList.add("is-valid");
  } else {
    PWD.classList.remove("is-valid");
    PWD.classList.add("is-invalid");
  }
  disabledBTN();
});

function disabledBTN() {
  if (EMAIL.value !== "" && PWD.value !== "") {
    LOGINBTN.removeAttribute("disabled");
  }
}

document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const user = getUser();

  fetch("http://localhost:3000/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((data) => data.json())
    .then((data) => {
      if (data) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("email", data.email);
        window.location.href = "index.html";
      } else {
        alert("Credenciales incorrectas");
        return;
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});
