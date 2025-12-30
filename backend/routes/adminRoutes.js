const express = require("express");
const {getAllUsers,activateUser,deactivateUser,} = require("../controllers/adminController");

const { protect } = require("../middleware/authMiddleware");
const { adminOnly } = require("../middleware/adminMiddleware");

const router = express.Router();

router.get("/users", protect, adminOnly, getAllUsers);
router.patch("/users/:id/activate", protect, adminOnly, activateUser);
router.patch("/users/:id/deactivate", protect, adminOnly, deactivateUser);

module.exports = router;
