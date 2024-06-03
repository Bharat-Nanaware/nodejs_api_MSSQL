const passwordService = require('../services/passwordService');

exports.sendForgotPasswordEmail = async (req, res) => {

  try {
    const { userCode } = req.body;
    const result = await passwordService.sendForgotPasswordEmail(userCode);
    if (result !== "" && result !== null && result !== undefined) {
      res.status(200).json({ success: true, message: 'Forgot password email sent successfully' });
    }
  } catch (error) {
    if (error.message.includes('Invalid user code')) {
      res.json({ response: 'Invalid User Code' });
    } else {
      res.status(500).json({ success: false, message: 'Failed to send forgot password email', error: error.message });
    }
  }
};


exports.ChangePassword = async (req, res) => {
  const { userCode, newPassword, confirmPassword } = req.body;

  // Check if newPassword matches confirmPassword
  if (newPassword !== confirmPassword) {
    return res.json({ response: 'New password and confirm password do not match' });
  }

  try {
    const result = await passwordService.ChangePassword(userCode, newPassword);
    if (result !== "" && result !== null && result !== undefined) {
      res.json({ response: 'Password reset successfully and Email send successfully' });
    } else {
      res.json({ response: 'Failed to reset password' });
    }
  } catch (error) {
    res.status(500).json({ response: error.message });
  }
};

