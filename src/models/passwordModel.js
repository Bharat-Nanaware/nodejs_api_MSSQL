const sql = require('mssql');
const db = require('../config/db');

exports.getUserByUsercode = async (userCode) => {
    try {
        const pool = await new sql.ConnectionPool(db).connect();
        const result = await pool.request()
            .input('userCode', sql.VarChar(50), userCode)
            .query('SELECT * FROM APP_Users WHERE userCode = @userCode');
        return result.recordset[0];
    } catch (error) {
        throw error;
    }
};

exports.ChangePassword = async (userCode, hashedPassword, salt) => {
    try {
        const pool = await new sql.ConnectionPool(db).connect();
        // Check if the user code is unique
        const userCodeResult = await pool
          .request()
          .input('userCode', sql.NVarChar, userCode)
          .query('SELECT COUNT(*) AS UserCount FROM App_Users WHERE UserCode = @userCode');
    
        const userCount = userCodeResult.recordset[0].UserCount;
    
        if (userCount !== 1) {
          throw new Error('User code is not unique or does not exist');
        }
        // Update the password hash in the database
        const result = await pool
          .request()
          .input('userCode', sql.NVarChar, userCode)
          .input('hashedPassword', sql.NVarChar, hashedPassword)
          .input('salt', sql.VarChar, salt)
          .query('UPDATE App_Users SET PasswordHash = @hashedPassword,salt = @salt ,ModifiedOn = GETDATE() WHERE UserCode = @userCode');
        return result.rowsAffected[0];
      } catch (error) {
        throw error;
      }
};

