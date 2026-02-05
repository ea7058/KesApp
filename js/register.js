function register() {
  const username = document.getElementById("regUser").value.trim();
  const pass1 = document.getElementById("regPass1").value;
  const pass2 = document.getElementById("regPass2").value;
  const rulesChecked = document.getElementById("rulesCheck").checked;

  // Kontroller
  if (!username || !pass1 || !pass2) {
    alert("Boş bırakma!");
    return;
  }

  if (pass1 !== pass2) {
    alert("Şifreler aynı değil!");
    return;
  }

  if (!rulesChecked) {
    alert("Kuralları kabul etmelisin!");
    return;
  }

  if (pass1.length < 6) {
    alert("Şifre en az 6 karakter olmalı!");
    return;
  }

  // Kayıt
  localStorage.setItem("username", username);
  localStorage.setItem("password", pass1);
  localStorage.setItem("role", "user");

  // Admin bilgisi (sabit)
  localStorage.setItem("adminUser", "KeremBey");
  localStorage.setItem("adminPass", "Krm:2014!!");

  alert("Kayıt başarılı! Giriş sayfasına yönlendiriliyorsun.");

  // Login sayfasına yönlendir
  window.location.href = "login.html";
}
