const username = localStorage.getItem("username");
const role = localStorage.getItem("role");

if (!username || role !== "admin") {
  window.location.href = "login.html";
}

const usersList = document.getElementById("usersList");
let users = JSON.parse(localStorage.getItem("users")) || [];

if (users.length === 0) {
  usersList.innerHTML = "<p>Hiç kullanıcı yok.</p>";
} else {
  usersList.innerHTML = "";
  users.forEach((u, i) => {
    const userDiv = document.createElement("div");
    userDiv.style.marginBottom = "10px";
    userDiv.innerHTML = `
      <p><strong>${i+1}. Kullanıcı Adı:</strong> ${u.username}</p>
      <p><strong>Şifre:</strong> ${u.password}</p>
      <p><strong>Profil Kodu:</strong> ${u.profileCode}</p>
      <hr>
    `;
    usersList.appendChild(userDiv);
  });
}

function logout() {
  localStorage.removeItem("username");
  localStorage.removeItem("role");
  window.location.href = "login.html";
}
