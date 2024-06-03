const sql = require('mssql');
const db = require('../config/db');

async function getAllUsers() {
  try {
    const pool = await sql.connect(db);
    const result = await pool.request().query('SELECT * FROM App_Users');
    return result.recordset;
  } catch (error) {
    throw error;
  }
}

async function createUser(username, email, firstName, middleName, lastName, hashedPassword, salt) {
  try {
    const pool = await new sql.ConnectionPool(db).connect();
    const result = await pool
      .request()
      .input('username', sql.VarChar, username)
      .input('email', sql.VarChar, email)
      .input('firstName', sql.VarChar, firstName)
      .input('middleName', sql.VarChar, middleName)
      .input('lastName', sql.VarChar, lastName)
      .input('password', sql.VarChar, hashedPassword)
      .input('salt', sql.VarChar, salt)
      .query('INSERT INTO APP_Users (UserCode, FirstName, MiddleName, LastName, EmailId, PasswordHash,Salt,IsInternal,CreatedBy,CreatedOn) VALUES (@username, @firstName, @middleName, @lastName, @email, @password, @salt,0,\'Systeam\',getdate())');
    return result;
  } catch (error) {
    throw error;
  }
}

async function resetPassword(userCode, hashedPassword, salt) {
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
}

async function getUserByEmail(email) {
  try {
    const pool = await new sql.ConnectionPool(db).connect();
    const result = await pool
      .request()
      .input('email', sql.VarChar, email)
      .query('SELECT * FROM App_Users WHERE UserCode = @email');
    return result.recordset[0];
  } catch (error) {
    throw error;
  }
}



async function getUserById(UserID) {
  try {
    const pool = await sql.connect(db);
    const result = await pool
      .request()
      .input('UserID', sql.Int, UserID)
      .query('SELECT * FROM App_Users WHERE UserID = @UserID');
    return result.recordset[0];
  } catch (error) {
    throw error;
  }
}


async function editUser(UserID, UserCode, FirstName, MiddleName, LastName, EmailId, ModifiedBy) {
  try {
    const pool = await new sql.ConnectionPool(db).connect();
    const result = await pool
      .request()
      .input('UserID', sql.Int, UserID)
      .input('UserCode', sql.NVarChar(50), UserCode)
      .input('FirstName', sql.NVarChar(50), FirstName)
      .input('MiddleName', sql.NVarChar(50), MiddleName)
      .input('LastName', sql.NVarChar(50), LastName)
      .input('EmailId', sql.NVarChar(100), EmailId)
      .input('ModifiedBy', sql.NVarChar(100), ModifiedBy)
      .execute('UpdateUser');
    return result;
  } catch (error) {
    throw error;
  }
}


async function deleteUser(userId) {
  try {
    const pool = await new sql.ConnectionPool(db).connect();

    // Check if UserID is present in App_UserRoles table
    const result = await pool
      .request()
      .input('userId', sql.Int, userId)
      .query(`SELECT COUNT(*) AS RecordCount FROM App_UserRoles WHERE UserID = @userId`);

    const recordCount = result.recordset[0].RecordCount;

    // If UserID is present in App_UserRoles table, throw an error
    if (recordCount > 0) {
      throw new Error('User is associated with user roles and cannot be deleted');
    }

    // If UserID is not present in the table, proceed with deleting the user
    await pool
      .request()
      .input('userId', sql.Int, userId)
      .query('DELETE FROM App_Users WHERE UserID = @userId');
  } catch (error) {
    throw error;
  }
}



module.exports = { createUser, getUserByEmail, getAllUsers, getUserById, editUser, deleteUser, resetPassword };