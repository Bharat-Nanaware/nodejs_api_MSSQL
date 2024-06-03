
const passwordModel = require('../models/passwordModel');
const emailconfig = require('../utils/emailconfig');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

exports.sendForgotPasswordEmail = async (userCode) => {
    try {
        const user = await passwordModel.getUserByUsercode(userCode);
        if (!user) {
            throw new Error('Invalid user code');
        }
        const templeteID = 3;

        const emailSend = await emailconfig.PasswordEmail(user, userCode, templeteID)

        return emailSend; // Return user and email details for response
    } catch (error) {
        throw error;
    }
};



exports.ChangePassword = async (userCode, newPassword) => {
    try {

        const user = await passwordModel.getUserByUsercode(userCode);
        if (!user) {
            throw new Error('Invalid user code');
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        const templeteID = 2;

        const ISChangePassword = await passwordModel.ChangePassword(userCode, hashedPassword, salt);

        if ( ISChangePassword === 1 ) {
            IsChangePasswordEmailSend = await  emailconfig.PasswordEmail(user, userCode, templeteID);
        }else{
            res.json({ response: 'Failed to reset password' });
        }

        return  { ISChangePassword ,IsChangePasswordEmailSend };

    } catch (error) {
        throw error;
    }
};




