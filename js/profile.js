const username = localStorage.getItem("username");
const role = localStorage.getItem("role");
if (!username || role === "admin") { window.location.href = "login.html"; }

let code = localStorage.getItem("profileCode");
if (!code) {
  code = "KES-" + Math.floor(100000 + Math.random() * 900000);
  localStorage.setItem("profileCode", code);
}

document.getElementById("username").innerText = username;
document.getElementById("userCode").innerText = code;

// Logout
function logout() {
  localStorage.removeItem("username");
  localStorage.removeItem("role");
  localStorage.removeItem("profileCode");
  window.location.href = "login.html";
}

// Grup Oluştur
function createGroup() {
  const groupName = prompt("Grup adı gir:");
  if (!groupName) return alert("Boş olamaz!");

  const groups = JSON.parse(localStorage.getItem("groups")) || [];
  const userCode = localStorage.getItem("profileCode");

  groups.push({
    groupName: groupName,
    members: [userCode], // grubu oluşturan kullanıcı otomatik eklenir
    messages: []
  });

  localStorage.setItem("groups", JSON.stringify(groups));
  alert("Grup oluşturuldu!");
  displayGroups();
}

// Grupları göster
function displayGroups() {
  const groupsDiv = document.getElementById("groupsList");
  groupsDiv.innerHTML = "";

  const groups = JSON.parse(localStorage.getItem("groups")) || [];
  const userCode = localStorage.getItem("profileCode");

  groups.forEach((g, i) => {
    if (g.members.includes(userCode)) {
      const div = document.createElement("div");
      div.style.border = "1px solid #38bdf8";
      div.style.padding = "10px";
      div.style.marginBottom = "10px";
      div.innerHTML = `
        <p><strong>${g.groupName}</strong></p>
        <button onclick="addFriendToGroup(${i})">Arkadaş Ekle</button>
        <button onclick="sendMessagePrompt(${i})">Mesaj Gönder</button>
        <div id="chat-${i}" style="margin-top:5px; max-height:150px; overflow-y:auto; border:1px solid #0ea5e9; padding:5px;"></div>
      `;
      groupsDiv.appendChild(div);

      const chatDiv = document.getElementById(`chat-${i}`);
      g.messages.forEach(m => {
        const msg = document.createElement("p");
        msg.innerText = `${m.from}: ${m.text}`;
        chatDiv.appendChild(msg);
      });
    }
  });
}
displayGroups();

// Mesaj gönder
function sendMessagePrompt(groupIndex) {
  const msgText = prompt("Mesajını gir:");
  if (!msgText) return;

  const groups = JSON.parse(localStorage.getItem("groups"));
  const userCode = localStorage.getItem("profileCode");

  groups[groupIndex].messages.push({
    from: userCode,
    text: msgText
  });

  localStorage.setItem("groups", JSON.stringify(groups));
  displayGroups();
}

// Arkadaş ekle
function addFriendToGroup(groupIndex) {
  const friendCode = prompt("Arkadaş profil kodunu gir:");
  if (!friendCode) return;

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const friendExists = users.find(u => u.profileCode === friendCode);

  if (!friendExists) return alert("Böyle bir kullanıcı yok!");

  const groups = JSON.parse(localStorage.getItem("groups"));
  if (!groups[groupIndex].members.includes(friendCode)) {
    groups[groupIndex].members.push(friendCode);
    localStorage.setItem("groups", JSON.stringify(groups));
    alert("Arkadaş eklendi!");
    displayGroups();
  } else {
    alert("Bu kişi zaten grupta.");
  }
        }
