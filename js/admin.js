// Giriş kontrolü
const username = localStorage.getItem("username");
const role = localStorage.getItem("role");

if (!username || role !== "admin") {
  window.location.href = "login.html";
}

// Kullanıcıyı göster
const usersList = document.getElementById("usersList");

// Normal kullanıcı bilgisi
const savedUser = localStorage.getItem("username");
const savedPass = localStorage.getItem("password");

usersList.innerHTML = `
  <p><strong>Kullanıcı Adı:</strong> ${savedUser ? savedUser : "Yok"}</p>
  <p><strong>Şifre:</strong> ${savedPass ? savedPass : "Yok"}</p>
`;

// Çıkış fonksiyonu
function logout() {
  localStorage.removeItem("username");
  localStorage.removeItem("role");
  window.location.href = "login.html";
}
