const username = localStorage.getItem("username");
const role = localStorage.getItem("role");
if (!username || role !== "admin") { window.location.href = "login.html"; }

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
      <button onclick="banUser(${i})">Banla</button>
      <hr>
    `;
    usersList.appendChild(userDiv);
  });
}

function banUser(index) {
  let users = JSON.parse(localStorage.getItem("users")) || [];
  const days = prompt("Kaç gün banlamak istiyorsun? (Boş bırakırsan süresiz)");

  let bannedUntil = null;
  if (days) {
    const now = new Date().getTime();
    bannedUntil = now + Number(days) * 24*60*60*1000;
  } else {
    bannedUntil = 9999999999999; // süresiz
  }

  users[index].bannedUntil = bannedUntil;
  localStorage.setItem("users", JSON.stringify(users));
  alert(users[index].username + " banlandı!");
  location.reload();
}

function logout() {
  localStorage.removeItem("username");
  localStorage.removeItem("role");
  window.location.href = "login.html";
}
