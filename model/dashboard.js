const mongoose = require("mongoose");

const dashboardSchema = new mongoose.Schema({
  totalProperty: {
    type: Number,
    required: true,
  },
  totalLeaseProperty: {
    type: Number,
    required: true,
  },
  totalMaintains: {
    type: Number,
    required: true,
  },
  totalTenants: {
    type: Number,
    required: true,
  },
});

const Dashboard = new mongoose.model("dashboard", dashboardSchema);

function validationDashboard(dashboard) {
  const schema = Joi.object({
    totalProperty: Joi.number().required(),
    totalLeaseProperty: Joi.number().required(),
    totalMaintains: Joi.number().required(),
    totalTenants: Joi.number().required(),
  });
  return schema.validate(dashboard);
}

module.exports.Dashboard = Dashboard;
module.exports.validate = validationDashboard;
