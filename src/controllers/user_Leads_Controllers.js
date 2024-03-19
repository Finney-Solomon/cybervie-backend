const userLeadsSchema = require("../models/user_Leads_Model");
const mongoose = require("mongoose");
const { sendMail } = require("../services/mailService");

module.exports = {
  createNewUserLeads: async (req, res) => {
    const requestData = req.body;
    try {
      const existingLead = await userLeadsSchema.findOne({
        email: requestData.email,
      });
      const data = new userLeadsSchema({ ...req.body });

      if (existingLead) {
        existingLead.name = requestData.name;
        existingLead.mobile = requestData.mobile;
        existingLead.message = requestData.message;
        (existingLead.date = new Date()),
          (existingLead.callUser = false),
          (existingLead.studentStatus = "Interested");

        await existingLead.save();

        res.status(200).json({
          success: true,
          message: "Lead updated successfully",
          data: existingLead,
        });
        sendMail(existingLead);
      } else {
        const newLead = new userLeadsSchema({ ...requestData });
        await newLead.save();

        res.status(201).json({
          success: true,
          message: "New lead created successfully",
          data: newLead,
        });
        sendMail(data);
      }
    } catch (error) {
      console.error(error?.keyValue);
      res.status(500).json({ message: "Server error" });
    }
  },

  getUserLeadList: async (req, res) => {
    try {
      const page = parseInt(req?.query?.page) || 1;
      const rowsPerPage = parseInt(req?.query?.rowsPerPage) || 10;

      const totalRecords = await userLeadsSchema.countDocuments();
      const totalPages = Math.ceil(totalRecords / rowsPerPage);

      const data = await userLeadsSchema
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

  updateCallUser: async (req, res) => {
    try {
      const { _id, callUser } = req.body; // Assuming you provide _id and callUser in the request body

      if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(400).json({ message: "Invalid ID format" });
      }

      const updatedLead = await userLeadsSchema.findByIdAndUpdate(
        _id,
        { callUser },
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
  
  updateStudentStatus: async (req, res) => {
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
