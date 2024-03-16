
const express = require("express");
const userLeadController = require("../controllers/user_Leads_Controllers");


const router = express.Router();

router.post("/addNewUserLeads", userLeadController.createNewUserLeads);
router.get("/getUserLeadList", userLeadController.getUserLeadList);
router.post("/updateCallUser", userLeadController.updateCallUser);
router.post("/updateStudentStatus", userLeadController.updateStudentStatus);


module.exports = router;
