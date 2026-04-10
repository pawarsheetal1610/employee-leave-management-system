const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// DB CONNECTION
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "leave_db",
  port: 3306
});

db.connect(err => {
  if (err) {
    console.log("DB Error:", err);
  } else {
    console.log("MySQL Connected ✅");
  }
});

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("Backend Working 🚀");
});

// LOGIN API
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE email=? AND password=?",
    [email, password],
    (err, result) => {
      if (err) {
        return res.send(err);
      }

      if (result.length > 0) {
        res.json({
          success: true,
          role: result[0].role,
          user_id: result[0].id
        });
      } else {
        res.json({ success: false });
      }
    }
  );
});

// GET LEAVES
app.get("/requests", (req, res) => {
  db.query("SELECT * FROM leaves", (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.json(result);
    }
  });
});

app.get("/approved-leaves", (req, res) => {
  db.query(
    "SELECT * FROM leaves WHERE status = 'approved'",
    (err, result) => {
      if (err) return res.send(err);
      res.json(result);
    }
  );
});

// START SERVER
app.listen(5000, () => {
  console.log("Server running on port 5000 🚀");
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE email=? AND password=?",
    [email, password],
    (err, result) => {
      if (result.length > 0) {
        res.json({
          success: true,
          role: result[0].role,
          user_id: result[0].id
        });
      } else {
        res.json({ success: false });
      }
    }
  );
});
app.post("/leave", (req, res) => {
  const { user_id, type, start, end, reason } = req.body;

  db.query(
    "INSERT INTO leaves (user_id, leave_type, start_date, end_date, reason, status) VALUES (?, ?, ?, ?, ?, 'pending')",
    [user_id, type, start, end, reason],
    () => res.json({ success: true })
  );
});
// APPROVE
app.post("/approve/:id", (req, res) => {
  const id = req.params.id;
  const { comment } = req.body;

  // 1. Get leave details
  db.query("SELECT * FROM leaves WHERE id = ?", [id], (err, result) => {
    if (err) return res.send(err);

    const leave = result[0];

    // 2. Update leave status
    db.query("UPDATE leaves SET status='approved', manager_comment=? WHERE id=?", [comment || " ", id]);

    // 3. Reduce balance based on type
    if (leave.leave_type === "vacation") {
      db.query(
        "UPDATE users SET vacation_balance = vacation_balance - 1 WHERE id=?",
        [leave.user_id]
  );
}

    if (leave.leave_type === "sick") {
      db.query(
        "UPDATE users SET sick_balance = sick_balance - 1 WHERE id=?",
        [leave.user_id]
  );
}
    res.json({ message: "Approved + Balance Updated ✅" });
  });
});

// REJECT
app.post("/reject/:id", (req, res) => {
  db.query(
    "UPDATE leaves SET status='rejected' WHERE id=?",
    [req.params.id],
    () => res.json({ success: true })
  );
});

app.get("/balance/:id", (req, res) => {
  const userId = req.params.id;

  db.query(
    "SELECT vacation_balance, sick_balance FROM users WHERE id=?",
    [userId],
    (err, result) => {
      if (err) return res.send(err);
      res.json(result[0]);
    }
  );
});

