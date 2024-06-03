const userService = require('../services/userService');
const user = require('../models/userModel')

exports.getAllUsers = async (req, res) => {
    try {
        const users = await user.getAllUsers();
        res.json(users);
    } catch (err) {
        res.status(500).json({ response: err.message });
    }
};

exports.editUser = async (req, res) => {
    const { UserID, UserCode, FirstName, MiddleName, LastName, EmailId, ModifiedBy } = req.body;
    try {
        await userService.editUser(UserID, UserCode, FirstName, MiddleName, LastName, EmailId, ModifiedBy);
        res.json({ response: 'User edited successfully' });
    } catch (error) {
        res.status(500).json({ response: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    const { userId } = req.params;
    try {
        await userService.deleteUser(userId);
        res.json({ response: 'User deleted successfully' });
    } catch (error) {
        if (error.message.includes('user roles')) {
            res.json({ response: 'User is associated with user roles and cannot be deleted' });
        } else {
            res.status(500).json({ response: error.message });
        }
    }
};


  exports.resetPassword = async (req, res) => {
    const { userCode, newPassword, confirmPassword } = req.body;
  
    // Check if newPassword matches confirmPassword
    if (newPassword !== confirmPassword) {
      return res.json({ response: 'New password and confirm password do not match' });
    }
  
    try {
      const result = await userService.resetPassword(userCode, newPassword);
      if (result === 1) {
        res.json({ response: 'Password reset successfully' });
      } else {
        res.json({ response: 'Failed to reset password' });
      }
    } catch (error) {
      res.status(500).json({ response: error.message });
    }
  };
  

