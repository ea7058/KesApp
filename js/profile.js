// Giriş kontrolü
const username = localStorage.getItem("username");
const role = localStorage.getItem("role");

if (!username || role === "admin") {
  // Eğer giriş yoksa veya admin profile sayfasına gelmişse
  window.location.href = "login.html";
}

// Profil kodu kontrolü / üretme
let code = localStorage.getItem("profileCode");

if (!code) {
  code = "KES-" + Math.floor(100000 + Math.random() * 900000);
  localStorage.setItem("profileCode", code);
}

// Ekrana yazdır
document.getElementById("username").innerText = username;
document.getElementById("userCode").innerText = code;

// Çıkış fonksiyonu
function logout() {
  localStorage.removeItem("username");
  localStorage.removeItem("role");
  localStorage.removeItem("profileCode");
  window.location.href = "login.html";
}
