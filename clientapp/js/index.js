document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "login.html";
  }

  getTareas()
});

function userName(user) {
  const userName = document.getElementById("username");
  userName.innerHTML = user;
}

function tareas(tarea){
  const container = document.getElementById("tablaTareas")
  container.innerHTML = `<div class="row">
  <div class="col-3 text-center"><p>Tarea</p></div>
  <div class="col-6 text-center"><p>Descripción</p></div>
  <div class="col text-center"><p>Trabajador</p></div>
  <div class="col text-center"><p>Completada</p></div>
</div><hr><br>`



  tarea.forEach(tarea => {
    container.innerHTML += `
    <div class="row">
          <div class="col-3 text-center"><p>${tarea.name}</p></div>
          <div class="col-6 text-center"><p>${tarea.description}</p></div>
          <div class="col text-center"><p>${tarea.worker}</p></div>
          <div class="col d-flex justify-content-center align-items-center">
      <div class="form-check completed">
        <input class="form-check-input completed" type="checkbox" value="" id="completed" ${tarea.completed = "checked" ? 'checked' : ''}>`    

  });

}

function getTareas() {
  const token = localStorage.getItem('token')
  const email = localStorage.getItem('email')
  fetch('http://localhost:3000/tasks', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: token,
    }
  })
    .then((res) => res.json())
    .then((data) => {
      userName(data.user[0].name + ' ' + data.user[0].lastname)
      tareas(data.tasks)
    })
}

function logOut() {
  localStorage.removeItem("token")
  window.location.reload()
}