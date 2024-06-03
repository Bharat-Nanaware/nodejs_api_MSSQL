const db = require('../config/db'); // Assuming you have a database connection
const sql = require('mssql');

async function getAppMenuList(UserID) {
    try {
        const pool = await new sql.ConnectionPool(db).connect();

        const result = await pool.request()
            .input('UserID', sql.Int, UserID)
            .query(`
        SELECT 
            m.[ModuleID], 
            m.[ModuleName], 
            m.[Url], 
            m.[SortOrder], 
            m.formname AS ComponentName,
            m.Icon,
            m.ParentModuleID,
            MAX(CASE WHEN RR.[ViewAccess] = 1 THEN 1 ELSE 0 END) AS [ViewRights],
            MAX(CASE WHEN RR.[EditAccess] = 1 THEN 1 ELSE 0 END) AS [EditRights],
            MAX(CASE WHEN RR.[DeleteAccess] = 1 THEN 1 ELSE 0 END) AS [DeleteRights],
            MAX(CASE WHEN RR.[AddAccess] = 1 THEN 1 ELSE 0 END) AS [AddRights],
            MAX(CASE WHEN RR.[ExportAccess] = 1 THEN 1 ELSE 0 END) AS [ExportRights] 
        FROM 
            App_Modules m 
        INNER JOIN 
            App_RoleRights RR ON m.ModuleID = RR.ModuleID 
        INNER JOIN 
            App_UserRoles UR ON RR.RoleID = UR.RoleID
        WHERE 
            UR.userid = @UserID 
            AND m.Status = 1 
        GROUP BY  
            m.[ModuleID], 
            m.[ModuleName], 
            m.[Url], 
            m.[SortOrder], 
            m.formname, 
            m.Icon, 
            m.ParentModuleID 
        HAVING 
            MAX(CASE WHEN RR.[ViewAccess] = 1 THEN 1 ELSE 0 END) > 0 
        ORDER BY 
            m.SortOrder;
    `);
        const menuItems = result.recordset;
        const appMenuList = menuItems
            .filter(modules => modules.ParentModuleID === 0)
            .map(modules => ({
                label: modules.ModuleName,
                items: menuItems
                    .filter(module => module.ParentModuleID === modules.ModuleID)
                    .map(module => ({
                        label: module.ModuleName,
                        icon: module.Icon,
                        routerLink: module.Url
                    }))
            }));

        return appMenuList;

    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};


module.exports = { getAppMenuList };
