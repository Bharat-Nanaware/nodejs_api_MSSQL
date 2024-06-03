// src/controllers/roleRightsController.js

const roleRightsService = require('../services/roleRightsService');

exports.updateRoleRights = async (req, res) => {
  const roleRightsData = req.body;
  try {
    const result = await roleRightsService.updateRoleRights(roleRightsData);
    res.json({ message: 'Role rights updated successfully', rowsAffected: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
