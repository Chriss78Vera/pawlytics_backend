const express = require("express");
const userRoutes = require("../modules/users/interfaces/routes/user.routes");
const roleRoutes = require("../modules/roles/interfaces/routes/role.routes");
const clinicalHistoryRoutes = require("../modules/clinical-history/interfaces/routes/clinicalHistory.routes");

const router = express.Router();

router.get("/health", (req, res) => {
  res.json({
    status: "OK",
    service: "Pawlytics Backend"
  });
});

router.use("/users", userRoutes);
router.use("/roles", roleRoutes);
router.use("/clinical-history", clinicalHistoryRoutes);

module.exports = router;
