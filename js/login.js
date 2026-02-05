function login() {
  const u = document.getElementById("loginUser").value.trim();
  const p = document.getElementById("loginPass").value;
  if (!u || !p) { alert("Boş bırakma!"); return; }

  const adminUser = localStorage.getItem("adminUser");
  const adminPass = localStorage.getItem("adminPass");
  if (u === adminUser && p === adminPass) {
    localStorage.setItem("username", adminUser);
    localStorage.setItem("role", "admin");
    window.location.href = "admin.html";
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];
  const foundUser = users.find(x => x.username === u && x.password === p);

  if (foundUser) {
    if (foundUser.bannedUntil) {
      const now = new Date().getTime();
      if (now < foundUser.bannedUntil) {
        alert("Banlısın! Tekrar giriş yapamazsın."); return;
      } else { 
        foundUser.bannedUntil = null;
        localStorage.setItem("users", JSON.stringify(users));
      }
    }
    localStorage.setItem("username", foundUser.username);
    localStorage.setItem("role", "user");
    localStorage.setItem("profileCode", foundUser.profileCode);
    window.location.href = "profile.html";
  } else { alert("Kullanıcı adı veya şifre yanlış!"); }
}
