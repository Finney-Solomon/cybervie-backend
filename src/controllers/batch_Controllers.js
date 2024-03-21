const batchModelSchema = require("../models/batch_model"); 

module.exports = {

  createNewBatch: async (req, res) => {
    const requestData = req.body;
    const { customAlphabet } = await import('nanoid');
    const nanoid = customAlphabet('1234567890abcdef', 4);
    const uniqueBatchCode = 'CYB-' + nanoid();

    try {
      // Import batchModelSchema here
      const checkBatchName = await batchModelSchema.findOne({ batchName: requestData.batchName });
      if (!checkBatchName) {
        const newBatch = new batchModelSchema({ ...requestData, batchCode: uniqueBatchCode });
        await newBatch.save();
        res.status(201).json({
          success: true,
          message: "New Batch Created Successfully",
          data: newBatch,
        });
      } else {
        console.log(checkBatchName, "checkBatchName");
        res.status(400).json({ success: false, message: "Batch name already exists" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" ,error});
    }
  },
  getBatchList: async (req, res) => {
    try {
      const page = parseInt(req?.query?.page) || 1;
      const rowsPerPage = parseInt(req?.query?.rowsPerPage) || 10;

      const totalRecords = await batchModelSchema.countDocuments();
      const totalPages = Math.ceil(totalRecords / rowsPerPage);

      const data = await batchModelSchema
        .find()
        .skip((page - 1) * rowsPerPage)
        .limit(rowsPerPage);

      res.status(200).json({
        success: true,
        data: {
          data,
          currentPage: page,
          rowsPerPage: rowsPerPage,
          totalPages: totalPages,
          totalRecords: totalRecords,
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  },
  updateBatchDetails: async (req, res) => {
    try {
      const { _id, studentStatus } = req.body;

      if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(400).json({ message: "Invalid ID format" });
      }

      const updatedLead = await userLeadsSchema.findByIdAndUpdate(
        _id,
        { studentStatus },
        { new: true }
      );

      if (!updatedLead) {
        return res.status(404).json({ message: "Lead not found" });
      }

      res.status(200).json({ success: true, updatedLead });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  },
};
