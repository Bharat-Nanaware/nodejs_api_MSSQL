const sql = require('mssql');
const db = require('../config/db');
const { request } = require('express');

async function getRoleList() {
    try {
        const pool = await new sql.ConnectionPool(db).connect();
        const result = await pool.request().query('select * from App_Roles');
        return result.recordset;

    } catch (error) {
        throw error;
    }
}

async function getRoleRights(RoleID) {
    try {
        const pool = await new sql.ConnectionPool(db).connect();
        const request = await pool.request()
            .input('RoleID', sql.Int, RoleID)
        let getRole = `SELECT M.ModuleID, M.ParentModuleID, M.ModuleName,COALESCE(RR.ViewAccess, 0) AS 
        [View],COALESCE(RR.AddAccess, 0) AS [Add],COALESCE(RR.EditAccess, 0) AS 
        [Edit],COALESCE(RR.DeleteAccess, 0) AS [Delete],COALESCE(RR.ExportAccess, 0) AS 
        [Export]FROM App_Modules M LEFT JOIN App_RoleRights RR ON RR.ModuleID = M.ModuleID AND RR.RoleID = @RoleID ORDER BY M.SortOrder;`
        const result = await request.query(getRole);
        return result.recordset;
    } catch (error) {
        throw error;
    }
}

async function addRole(RoleName, CreatedBy) {
    try {
        const pool = await new sql.ConnectionPool(db).connect();
        const request = pool.request();

        // Convert RoleName to lowercase for case-insensitive comparison
        const roleNameLowerCase = RoleName.toLowerCase();

        // Check if role exists
        let checkRoleQuery = `SELECT COUNT(*) AS count FROM App_Roles WHERE LOWER(RoleName) = @RoleName`;
        const checkRoleResult = await request.input('RoleName', roleNameLowerCase).query(checkRoleQuery);

        if (checkRoleResult.recordset[0].count > 0) {
            throw new Error("Role already exists.");
        }

        // Insert role
        let InsertRole = `INSERT INTO App_Roles (RoleName, CreatedBy, CreatedOn, Status) VALUES (@RoleName, @CreatedBy, GETDATE(), 1);`;
        const result = await request.input('RoleName', roleNameLowerCase)
            .input('CreatedBy', CreatedBy)
            .query(InsertRole);

        return result.rowsAffected[0] > 0;
    } catch (error) {
        throw error;
    }
}



async function updateRole(RoleID, RoleName, ModifiedBy) {
    try {
        const pool = await new sql.ConnectionPool(db).connect();
        const result = await pool
            .request()
            .input('RoleID', sql.Int, RoleID)
            .input('RoleName', sql.NVarChar, RoleName)
            .input('ModifiedBy', sql.NVarChar, ModifiedBy)
            .query(`UPDATE App_Roles SET RoleName = @RoleName, ModifiedOn = GETDATE(), ModifiedBy = @ModifiedBy WHERE RoleID = @RoleID`);
        return result.rowsAffected[0];
    } catch (error) {
        throw error;
    }
}

async function checkRoleUsage(RoleID) {
    try {
        const pool = await new sql.ConnectionPool(db).connect();
        const result1 = await pool
            .request()
            .input('RoleID', sql.Int, RoleID)
            .query(`SELECT 'App_RoleRights' AS TableName, COUNT(*) AS RecordCount
                FROM App_RoleRights
                WHERE RoleID = @RoleID`);

        const result2 = await pool
            .request()
            .input('RoleID', sql.Int, RoleID)
            .query(`SELECT 'App_UserRoles' AS TableName, COUNT(*) AS RecordCount
                FROM App_UserRoles
                WHERE RoleID = @RoleID`);

        return {
            table1: result1.recordset[0],
            table2: result2.recordset[0]
        };
    } catch (error) {
        throw error;
    }
}

async function deleteRole(RoleID) {
    try {
        const roleUsage = await checkRoleUsage(RoleID);

        if (roleUsage.table1.RecordCount > 0) {
            throw new Error('Role is associated with App_RoleRights and cannot be deleted');
        }

        if (roleUsage.table2.RecordCount > 0) {
            throw new Error('Role is associated with App_UserRoles and cannot be deleted');
        }
        const pool = await new sql.ConnectionPool(db).connect();
        const result = await pool
            .request()
            .input('RoleID', sql.Int, RoleID)
            .query('DELETE FROM App_Roles WHERE RoleID = @RoleID');
        return result.rowsAffected[0]
    } catch (error) {
        throw error;
    }
}

async function addRoleRights(roleRightsData) {
    let pool;
    let transaction;
    pool = await new sql.ConnectionPool(db).connect();
    transaction = new sql.Transaction(pool);

    try {
        await transaction.begin();

        const request = new sql.Request(transaction);

        for (const roleRight of roleRightsData) {
            await request
                .input('ModuleID', sql.Int, roleRight.ModuleID)
                .input('RoleID', sql.Int, roleRight.RoleID)
                .input('AddAccess', sql.Bit, roleRight.AddAccess)
                .input('EditAccess', sql.Bit, roleRight.EditAccess)
                .input('DeleteAccess', sql.Bit, roleRight.DeleteAccess)
                .input('ViewAccess', sql.Bit, roleRight.ViewAccess)
                .input('ExportAccess', sql.Bit, roleRight.ExportAccess)
                .input('CreatedBy', sql.NVarChar, roleRight.CreatedBy)
                .query(`INSERT INTO App_RoleRights (ModuleID, RoleID, AddAccess, EditAccess, DeleteAccess, ViewAccess, ExportAccess, CreatedBy, Status, CreatedOn) 
                VALUES (@ModuleID, @RoleID, @AddAccess, @EditAccess, @DeleteAccess, @ViewAccess, @ExportAccess, @CreatedBy, 1, GETDATE())`);
        }

        // Commit the transaction if all entries are successfully inserted
        await transaction.commit();
        return "All entries inserted successfully.";
    } catch (error) {
        // Rollback the transaction if any error occurs
        if (transaction) {
            await transaction.rollback();
        }
        throw error;
    }
}






module.exports = { getRoleList, getRoleRights, addRole, updateRole, deleteRole, addRoleRights };