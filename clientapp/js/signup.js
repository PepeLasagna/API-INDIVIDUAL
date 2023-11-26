const NAME = document.getElementById("name");
const LASTNAME = document.getElementById("lastname");
const EMAIL = document.getElementById("email");
const PWD = document.getElementById("password");
const SIGNUPBTN = document.getElementById("signupBtn");

function validateEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

function createUser() {
  let user;

  if (
    EMAIL.checkValidity() &&
    LASTNAME.checkValidity() &&
    NAME.checkValidity() &&
    PWD.checkValidity()
  ) {
    user = {
      name: NAME.value,
      lastname: LASTNAME.value,
      email: EMAIL.value,
      password: PWD.value,
    };
  } else {
    alert("Complete todos los campos correctamente");
  }

  return user;
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

NAME.addEventListener("input", () => {
  const isValid = NAME.checkValidity();

  if (isValid) {
    NAME.classList.remove("is-invalid");
    NAME.classList.add("is-valid");
  } else {
    NAME.classList.remove("is-valid");
    NAME.classList.add("is-invalid");
  }
  disabledBTN();
});

LASTNAME.addEventListener("input", () => {
  const isValid = LASTNAME.checkValidity();

  if (isValid) {
    LASTNAME.classList.remove("is-invalid");
    LASTNAME.classList.add("is-valid");
  } else {
    LASTNAME.classList.remove("is-valid");
    LASTNAME.classList.add("is-invalid");
  }
  disabledBTN();
});

function disabledBTN() {
  if (
    EMAIL.value !== "" &&
    PWD.value !== "" &&
    NAME.value !== "" &&
    LASTNAME.value !== ""
  ) {
    SIGNUPBTN.removeAttribute("disabled");
  }
}

document.getElementById("signupForm").addEventListener("submit", (e) => {
  e.preventDefault;
  const user = createUser();

  fetch("http://localhost:3000/users/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      } else {
        window.location.href = "./login.html";
      }
    })
    .catch((error) => {
      alert(error);
    });
});
