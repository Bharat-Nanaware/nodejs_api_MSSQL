const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
require('dotenv').config();




async function resetPassword(userCode, newPassword) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    return await userModel.resetPassword(userCode, hashedPassword, salt);
  } catch (error) {
    throw error;
  }
}

async function getAllUsers() {
  try {
    return await userModel.getAllUsers();
  } catch (error) {
    throw error;
  }
}

async function editUser(UserID, UserCode, FirstName, MiddleName, LastName, EmailId, ModifiedBy) {
  try {
    return await userModel.editUser(UserID, UserCode, FirstName, MiddleName, LastName, EmailId, ModifiedBy);
  } catch (error) {
    throw error;
  }
}

async function deleteUser(userId) {
  try {
    await userModel.deleteUser(userId);
  } catch (error) {
    throw error;
  }
}


module.exports = { getAllUsers, editUser, deleteUser ,resetPassword};