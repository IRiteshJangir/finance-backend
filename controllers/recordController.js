const Record = require('../models/Records');
const { recordSchema } = require('../utils/recordValidator');

// CREATE RECORD (Admin only)
exports.createRecord = async (req, res) => {
    const { recordSchema } = require('../utils/recordValidator');

const { error } = recordSchema.validate(req.body);

if (error) {
  return res.status(400).json({ message: error.details[0].message });
}
  try {
    const { amount, type, category, date, notes } = req.body;
if (!amount || amount <= 0) {
  return res.status(400).json({ message: "Amount must be greater than 0" });
}

if (!['income', 'expense'].includes(type)) {
  return res.status(400).json({ message: "Invalid type" });
}

if (!category) {
  return res.status(400).json({ message: "Category is required" });
}
    const record = await Record.create({
      amount,
      type,
      category,
      date,
      notes,
      createdBy: req.user._id
    });

    res.status(201).json(record);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// GET ALL RECORDS (Viewer, Analyst, Admin)
exports.getRecords = async (req, res) => {
  try {
    const { type, category, startDate, endDate, page, limit } = req.query;

    let filter = {};

    // Role-based access
    if (req.user.role !== 'admin') {
      filter.createdBy = req.user._id;
    }

    // Filters
    if (type) filter.type = type;
    if (category) filter.category = category;

    if (startDate && endDate) {
      filter.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    // Pagination
    const pageNumber = parseInt(page) || 1;
    const pageSize = parseInt(limit) || 10;
    const skip = (pageNumber - 1) * pageSize;

    const records = await Record.find(filter)
      .sort({ date: -1 })
      .skip(skip)
      .limit(pageSize);

    const total = await Record.countDocuments(filter);

    res.json({
      total,
      page: pageNumber,
      pages: Math.ceil(total / pageSize),
      data: records
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET SINGLE RECORD
exports.getRecordById = async (req, res) => {
  try {
    const record = await Record.findById(req.params.id);

    if (!record) {
      return res.status(404).json({ message: "Record not found" });
    }

    res.json(record);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// UPDATE RECORD (Admin only)
exports.updateRecord = async (req, res) => {
  try {
    const record = await Record.findById(req.params.id);

    if (!record) {
      return res.status(404).json({ message: "Record not found" });
    }

    Object.assign(record, req.body);
    await record.save();

    res.json(record);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// DELETE RECORD (Admin only)
exports.deleteRecord = async (req, res) => {
  try {
    const record = await Record.findById(req.params.id);

    if (!record) {
      return res.status(404).json({ message: "Record not found" });
    }

    await record.deleteOne();

    res.json({ message: "Record deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};