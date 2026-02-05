function login() {
  const u = document.getElementById("loginUser").value.trim();
  const p = document.getElementById("loginPass").value;

  if (!u || !p) {
    alert("Boş bırakma!");
    return;
  }

  // Admin bilgisi
  const adminUser = localStorage.getItem("adminUser");
  const adminPass = localStorage.getItem("adminPass");

  // Normal kullanıcı bilgisi
  const savedUser = localStorage.getItem("username");
  const savedPass = localStorage.getItem("password");

  // Admin kontrolü
  if (u === adminUser && p === adminPass) {
    localStorage.setItem("username", adminUser);
    localStorage.setItem("role", "admin");
    window.location.href = "admin.html";
    return;
  }

  // Normal kullanıcı kontrolü
  if (u === savedUser && p === savedPass) {
    localStorage.setItem("role", "user");
    window.location.href = "profile.html";
  } else {
    alert("Kullanıcı adı veya şifre yanlış!");
  }
}
