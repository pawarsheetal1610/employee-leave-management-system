const role = localStorage.getItem("role");
const user_id = localStorage.getItem("user_id");

// Safety check
if (!role) {
  alert("Please login first");
  window.location.href = "index.html";
}

// Hide sections
if (role === "employee") {
  document.getElementById("manager").style.display = "none";
} else {
  document.getElementById("employee").style.display = "none";
  loadRequests();
  loadBalance();
}

// APPLY LEAVE
async function applyLeave() {
  const type = document.getElementById("type").value;
  const start = document.getElementById("start").value;
  const end = document.getElementById("end").value;
  const reason = document.getElementById("reason").value;

  if (!start || !end || !reason) {
    return alert("Fill all fields");
  }

  await fetch("http://localhost:5000/leave", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      user_id,
      type,
      start,
      end,
      reason
    })
  });

  alert("Leave submitted!");
}

// LOAD REQUESTS (Manager)
async function loadRequests() {
  const res = await fetch("http://localhost:5000/requests");
  const data = await res.json();

  const div = document.getElementById("requests");
  div.innerHTML = "";

  const role = localStorage.getItem("role");

  data.forEach(r => {
    const status = (r.status || "pending").toLowerCase();

  div.innerHTML += `
    <p>
      ${r.leave_type} | ${r.reason} |
      ${
        (r.status || "pending").toLowerCase() === "approved"
            ? "🟢 Approved"
            : (r.status || "pending").toLowerCase() === "rejected"
            ? "🔴 Rejected"
            : "🟡 Pending"
}
      <input id="cmt-${r.id}" placeholder="Add comment" />
      <button onclick="approve(${r.id})">Approve</button>
      <button onclick="reject(${r.id})">Reject</button>
    </p>
  `;
});
}

// APPROVE
async function approve(id) {
  const comment = document.getElementById(`cmt-${id}`).value;

  await fetch("http://localhost:5000/approve/" + id, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ comment })
  });

  alert("Approved ✅");
  loadRequests();
}

// REJECT
async function reject(id) {
  await fetch("http://localhost:5000/reject/" + id, {
    method: "POST"
  });

  alert("Rejected ❌");
  loadRequests();   // 🔥 reload data properly
}

async function loadBalance() {

  let userId = localStorage.getItem("user_id");

  // 🔥 FALLBACK FIX (VERY IMPORTANT)
  if (!userId || userId === "undefined") {
    userId = 1;
    localStorage.setItem("user_id", userId);
  }

  const res = await fetch("http://localhost:5000/balance/" + userId);
  const data = await res.json();

  document.getElementById("balance").innerText =
    "Vacation: " + data.vacation_balance +
    " | Sick: " + data.sick_balance;
}
loadBalance();

async function loadCalendar() {
  const res = await fetch("http://localhost:5000/approved-leaves");
  const data = await res.json();

  const events = data.map(l => ({
    title: l.leave_type.toUpperCase() + " (User " + l.user_id + ")",
    start: l.start_date.split("T")[0],
    end: l.end_date.split("T")[0],
    color: "green"
  }));

  const calendarEl = document.getElementById("calendar");

  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "dayGridMonth",
    height: 500,
    events: events
  });

  calendar.render();
}
loadCalendar();
