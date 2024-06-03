// src/services/roleRightsService.js

const roleRightsModel = require('../models/roleRightsModel');

async function updateRoleRights(roleRightsData) {
  try {
    return await roleRightsModel.updateRoleRights(roleRightsData);
  } catch (error) {
    throw error;
  }
}

module.exports = { updateRoleRights };
