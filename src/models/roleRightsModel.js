// src/models/roleRightsModel.js

const sql = require('mssql');
const db = require('../config/db');

async function updateRoleRights(roleRightsData) {
  try {
    const pool = await new sql.ConnectionPool(db).connect();
    const result = await pool
      .request()
      .input('RoleRightsID', sql.Int, roleRightsData.RoleRightsID)
      .input('AddAccess', sql.Bit, roleRightsData.AddAccess)
      .input('EditAccess', sql.Bit, roleRightsData.EditAccess)
      .input('DeleteAccess', sql.Bit, roleRightsData.DeleteAccess)
      .input('ViewAccess', sql.Bit, roleRightsData.ViewAccess)
      .input('ExportAccess', sql.Bit, roleRightsData.ExportAccess)
      .input('ModifiedBy', sql.VarChar(50), roleRightsData.ModifiedBy)
      .query(`UPDATE App_RoleRights SET 
                AddAccess = @AddAccess, 
                EditAccess = @EditAccess, 
                DeleteAccess = @DeleteAccess, 
                ViewAccess = @ViewAccess, 
                ExportAccess = @ExportAccess, 
                ModifiedOn = GETDATE(), 
                ModifiedBy = @ModifiedBy 
              WHERE RoleRightsID = @RoleRightsID`);
    return result.rowsAffected[0];
  } catch (error) {
    throw error;
  }
}

module.exports = { updateRoleRights };
