const roleModel = require('../models/roleModel');

async function getRoleList() {
    try {
        return await roleModel.getRoleList();

    } catch (error) {
        throw error;
    }
}

async function getRoleRights(RoleID) {

    let list = null;
    let roleRights = null;
    try {
        list = await roleModel.getRoleRights(RoleID);
        roleRights = list
            .filter(l => l.ParentModuleID === 0)
            .map(l => ({
                data: {
                    ModuleID: l.ModuleID,
                    ModuleName: l.ModuleName,
                    View: l.View,
                    Add: l.Add,
                    Edit: l.Edit,
                    Delete: l.Delete,
                    Export: l.Export,
                    ParentModuleID:l.ParentModuleID,
                    Select: getRowSelection(l.ModuleID, list),
                    Indeterminate: getRowIndeterminateSelection(l.ModuleID, list)
                },
                children: list
                    .filter(c => c.ParentModuleID === l.ModuleID)
                    .map(c => ({
                        data: {
                            ModuleID: c.ModuleID,
                            ModuleName: c.ModuleName,
                            View: c.View,
                            Add: c.Add,
                            Edit: c.Edit,
                            Delete: c.Delete,
                            Export: c.Export,
                            ParentModuleID:c.ParentModuleID,
                            Select: getRowSelection(l.ModuleID, list),
                            Indeterminate: false,
                            RowSelection: c.View || c.Add || c.Edit || c.Delete || c.Export
                        }
                    }))
            }));
    } catch (ex) {
        console.error(ex.message);
        return null;
    }
    return await roleRights;
};


const getRowIndeterminateSelection = (moduleId, list) => {
    const allChildCount = list.filter(a => a.ParentModuleID === moduleId).length;
    if (allChildCount > 1) {
        const selectedChildCount = list.filter(a => a.ParentModuleID === moduleId && (a.View && a.Add && a.Edit && a.Delete && a.Export)).length;
        if (selectedChildCount < allChildCount && selectedChildCount > 0) {
            return true;
        }
    }
    return false;
};

const getRowSelection = (moduleId, list) => {
    const allChildCount = list.filter(a => a.ParentModuleID === moduleId).length;
    if (allChildCount > 1) {
        const selectedChildCount = list.filter(a => a.ParentModuleID === moduleId && (a.View && a.Add && a.Edit && a.Delete && a.Export)).length;
        if (selectedChildCount === allChildCount) {
            return true;
        }
    }
    return false;
};


async function addRole(RoleName, CreatedBy) {
    try {
        return await roleModel.addRole(RoleName, CreatedBy);
    } catch (error) {
        throw error;
    }
}

async function updateRole(RoleID, RoleName, ModifiedBy) {
    try {
        return await roleModel.updateRole(RoleID, RoleName, ModifiedBy);
    } catch (error) {
        throw error;
    }
}

async function deleteRole(RoleID) {
    try {
        await roleModel.deleteRole(RoleID);
    } catch (error) {
        throw error;
    }
}

async function addRoleRights(roleRightsData) {
    try {
        return await roleModel.addRoleRights(roleRightsData);
    } catch (error) {
        throw error;
    }
}

module.exports = { getRoleList, getRoleRights, addRole, updateRole, deleteRole, addRoleRights };