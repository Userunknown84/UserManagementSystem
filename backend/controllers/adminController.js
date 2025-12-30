const User = require("../models/User");

exports.getAllUsers = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const users = await User.find()
      .select("-password")
      .skip(skip)
      .limit(limit);

    const totalUsers = await User.countDocuments();

    res.status(200).json({
      users,
      currentPage: page,
      totalPages: Math.ceil(totalUsers / limit),
      totalUsers,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

exports.activateUser = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, {
      status: "active",
    });

    res.status(200).json({ message: "User activated" });
  } catch (error) {
    res.status(500).json({ message: "Activation failed" });
  }
};

exports.deactivateUser = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, {
      status: "inactive",
    });

    res.status(200).json({ message: "User deactivated" });
  } catch (error) {
    res.status(500).json({ message: "Deactivation failed" });
  }
};
