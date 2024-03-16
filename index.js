// index.js
const express = require("express");
const cors = require("cors");
const connectToDatabase = require("./src/config/dbConfig");
const userLeadRoutes = require("./src/routes/users_Leads_Routes");
const userLoginRoutes = require("./src/routes/user_Login_Routes");

const app = express();
connectToDatabase();
const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  optionsSuccessStatus: 200 
};

app.use(cors(corsOptions));

app.use(express.json());


app.use("/",userLoginRoutes);
app.use("/usersLeads",userLeadRoutes);


app.listen(5001, () => {
  console.log("Server is running on port 5001");
});



