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

function logout() {
  localStorage.removeItem("username");
  localStorage.removeItem("role");
  localStorage.removeItem("profileCode");
  window.location.href = "login.html";
}
