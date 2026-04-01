const Record = require('../models/Records');


// 1. SUMMARY (income, expense, balance)
exports.getSummary = async (req, res) => {
  try {
   const data = await Record.aggregate([
  {
    $match: { createdBy: req.user._id }
  },
  {
    $group: {
      _id: "$type",
      total: { $sum: "$amount" }
    }
  }
]);

    let income = 0;
    let expense = 0;

    data.forEach(item => {
      if (item._id === "income") income = item.total;
      if (item._id === "expense") expense = item.total;
    });

    res.json({
      totalIncome: income,
      totalExpense: expense,
      netBalance: income - expense
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 2. CATEGORY SUMMARY
exports.getCategorySummary = async (req, res) => {
  try {
    const data = await Record.aggregate([
  { $match: { createdBy: req.user._id } },
  {
    $group: {
      _id: "$category",
      total: { $sum: "$amount" }
    }
  }
]);

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 3. MONTHLY SUMMARY
exports.getMonthlyTrends = async (req, res) => {
  try {
   const data = await Record.aggregate([
  { $match: { createdBy: req.user._id } },
  {
    $group: {
      _id: {
        year: { $year: "$date" },
        month: { $month: "$date" }
      },
      total: { $sum: "$amount" }
    }
  }
]);

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 4. RECENT RECORDS
exports.getRecentRecords = async (req, res) => {
  try {
   const records = await Record.find({ createdBy: req.user._id })
  .sort({ createdAt: -1 })
  .limit(5);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};