async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch("http://localhost:5000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();

  if (data.success) {
    
    const userId = data.user_id || data.id || 1;

    localStorage.setItem("role", data.role);
    localStorage.setItem("user_id", userId);

    window.location.href = "dashboard.html";
  } else {
    alert("Invalid login");
  }
}