// index.js
const express = require("express");
const session = require("express-session"); 
const cors = require("cors");
const connectToDatabase = require("./src/config/dbConfig");
const userLeadRoutes = require("./src/routes/users_Leads_Routes");
const userLoginRoutes = require("./src/routes/user_Login_Routes");
const batchRoutes = require("./src/routes/batch_Routes");

const PORT = process.env.PORT || 5001;
const app = express();
connectToDatabase();
const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:3001','https://cybervie-lead-generations.vercel.app'],
  optionsSuccessStatus: 200 
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false
}));

app.use("/",userLoginRoutes);
app.use("/usersLeads",userLeadRoutes);
app.use("/batch",batchRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on port ${"" + PORT}`);
});



