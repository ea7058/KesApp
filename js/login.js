function login() {
  const u = document.getElementById("loginUser").value.trim();
  const p = document.getElementById("loginPass").value;

  if (!u || !p) {
    alert("Boş bırakma!");
    return;
  }

  // Admin kontrolü
  const adminUser = localStorage.getItem("adminUser");
  const adminPass = localStorage.getItem("adminPass");

  if (u === adminUser && p === adminPass) {
    localStorage.setItem("username", adminUser);
    localStorage.setItem("role", "admin");
    window.location.href = "admin.html";
    return;
  }

  // Normal kullanıcı kontrolü
  let users = JSON.parse(localStorage.getItem("users")) || [];
  const foundUser = users.find(x => x.username === u && x.password === p);

  if (foundUser) {
    localStorage.setItem("username", foundUser.username);
    localStorage.setItem("role", "user");
    localStorage.setItem("profileCode", foundUser.profileCode);
    window.location.href = "profile.html";
  } else {
    alert("Kullanıcı adı veya şifre yanlış!");
  }
}
