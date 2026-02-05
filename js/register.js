function register() {
  const username = document.getElementById("regUser").value.trim();
  const pass1 = document.getElementById("regPass1").value;
  const pass2 = document.getElementById("regPass2").value;
  const rulesChecked = document.getElementById("rulesCheck").checked;

  if (!username || !pass1 || !pass2) { alert("Boş bırakma!"); return; }
  if (pass1 !== pass2) { alert("Şifreler aynı değil!"); return; }
  if (!rulesChecked) { alert("Kuralları kabul etmelisin!"); return; }
  if (pass1.length < 6) { alert("Şifre en az 6 karakter olmalı!"); return; }

  let users = JSON.parse(localStorage.getItem("users")) || [];
  if (users.find(u => u.username === username)) {
    alert("Bu kullanıcı adı zaten alınmış!"); return;
  }

  const newUser = { 
    username: username, 
    password: pass1, 
    role: "user", 
    profileCode: "KES-" + Math.floor(100000 + Math.random() * 900000),
    bannedUntil: null
  };

  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));

  if (!localStorage.getItem("adminUser")) {
    localStorage.setItem("adminUser", "KeremBey");
    localStorage.setItem("adminPass", "Krm:2014!!");
  }

  alert("Kayıt başarılı! Giriş sayfasına yönlendiriliyorsun.");
  window.location.href = "login.html";
}
