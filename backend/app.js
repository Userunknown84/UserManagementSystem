const express = require("express");
const cors = require("cors");
const app = express();
const User = require("./models/User");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");


app.use(cors());
app.use(express.json());


// app.get("/testuser", async (req, res) => {
//   const user = await User.create({
//     fullName: "Test User",
//     email: "test@example.com",
//     password: "password123",
//   });

//   res.json(user);
// });

// app.post("/test",(req,res)=>{
//   res.send("Post Route is working");
// })

app.use("/api/admin", adminRoutes);

app.use("/api/auth",authRoutes);

app.get("/", (req, res) => {
  // res.status(200).json({ message: "API is running" });
  res.send("Server is running");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
module.exports = app;
  