
const express = require("express");
const batchControllers = require("../controllers/batch_Controllers");

const router = express.Router();

 router.post("/addNewBatch", batchControllers.createNewBatch);
 router.get("/getBatchList", batchControllers.getBatchList);

module.exports = router;
