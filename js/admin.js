const username = localStorage.getItem("username");
const role = localStorage.getItem("role");

if (!username || role !== "admin") {
  window.location.href = "login.html";
}

const usersList = document.getElementById("usersList");
const groupsList = document.getElementById("groupsList");

// Kullanıcıları göster
let users = JSON.parse(localStorage.getItem("users")) || [];

if (users.length === 0) {
  usersList.innerHTML = "<p>Hiç kullanıcı yok.</p>";
} else {
  usersList.innerHTML = "";
  users.forEach((u, i) => {
    const div = document.createElement("div");
    div.style.border = "1px solid #38bdf8";
    div.style.marginBottom = "10px";
    div.style.padding = "5px";
    div.innerHTML = `
      <p><strong>${i+1}. Kullanıcı Adı:</strong> ${u.username}</p>
      <p><strong>Şifre:</strong> ${u.password}</p>
      <p><strong>Profil Kodu:</strong> ${u.profileCode}</p>
      <button onclick="banUser(${i})">Banla</button>
    `;
    usersList.appendChild(div);
  });
}

// Banlama
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

// Grupları göster
function displayGroups() {
  const groups = JSON.parse(localStorage.getItem("groups")) || [];
  groupsList.innerHTML = "";

  if (groups.length === 0) {
    groupsList.innerHTML = "<p>Hiç grup yok.</p>";
  } else {
    groups.forEach((g, i) => {
      const div = document.createElement("div");
      div.style.border = "1px solid #0ea5e9";
      div.style.padding = "5px";
      div.style.marginBottom = "10px";

      let membersHTML = g.members.map(m => `<li>${m}</li>`).join("");
      div.innerHTML = `
        <p><strong>Grup Adı:</strong> ${g.groupName}</p>
        <p><strong>Üyeler:</strong></p>
        <ul>${membersHTML}</ul>
        <button onclick="deleteGroup(${i})">Grubu Sil</button>
        <hr>
      `;
      groupsList.appendChild(div);
    });
  }
}
displayGroups();

// Grup silme
function deleteGroup(index) {
  const groups = JSON.parse(localStorage.getItem("groups")) || [];
  if (confirm(`${groups[index].groupName} silinsin mi?`)) {
    groups.splice(index, 1);
    localStorage.setItem("groups", JSON.stringify(groups));
    displayGroups();
  }
}

// Çıkış
function logout() {
  localStorage.removeItem("username");
  localStorage.removeItem("role");
  window.location.href = "login.html";
  }
