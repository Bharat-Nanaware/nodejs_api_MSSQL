const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwtConfig');
require('dotenv').config();


async function registerUser(username, email, firstName, middleName, lastName, password) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      await userModel.createUser(username, email, firstName, middleName, lastName, hashedPassword, salt);
    } catch (error) {
      throw error;
    }
  }

  
async function loginUser(email, password) {
    try {
      const user = await userModel.getUserByEmail(email);
      let response="Success"
      if (!user) {
        throw new Error('Invalid User Code ');
  
      }
      const hashPassword = password1 => {
        return crypto.createHash('sha256').update(password1).digest('hex')
      }
      const hashedPassword = await bcrypt.hash(password, user.Salt);
      //bcrypt.compare(password, user.PasswordHash).then(isPasswordMatch=> { 
      if (!(hashedPassword == user.PasswordHash)) {
        throw new Error('Invalid Password');
  
      }
      const token = jwt.sign({ userId: user.UserCode, email: user.EmailId }, jwtConfig.secret, { expiresIn: jwtConfig.expiresIn });

      const UserData =({UserID: user.UserID,UserCode:user.UserCode,FirstName: user.FirstName,MiddleName: user.MiddleName,LastName: user.LastName,EmailId:user.EmailId})
      return {
        token: token,
        UserData:UserData,
        response:response
  
      };
  
    } catch (error) {
      throw error;
    }
  }

  module.exports = { registerUser, loginUser};