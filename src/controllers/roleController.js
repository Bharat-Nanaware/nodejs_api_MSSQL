const rolServices = require('../services/roleService');

exports.getRoleList = async (req, res) => {
    try {
        const roles = await rolServices.getRoleList();
        res.json(roles);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getRoleRights = async (req, res) => {
    const RoleID = req.params.roleId;
    try {
        const RoleRights = await rolServices.getRoleRights(RoleID);
        res.json(RoleRights);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.addRole = async (req, res) => {
    const { RoleName, CreatedBy } = req.body;
    try {
        const roleId = await rolServices.addRole(RoleName, CreatedBy);
        res.json({ message: 'Role updated successfully', roleId });
    } catch (error) {
        if (error.message.includes('Role already exists."')) {
            res.status(400).json({ error: 'Role already exists."' });
        } else {
            res.status(500).json({ error: error.message });
        }

    }
};

exports.updateRole = async (req, res) => {
    const { RoleID, RoleName, ModifiedBy } = req.body;

    try {
        const rowsAffected = await rolServices.updateRole(RoleID, RoleName, ModifiedBy);
        if (rowsAffected > 0) {
            res.json({ message: 'Role updated successfully' });
        } else {
            res.status(404).json({ error: 'Role not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteRole = async (req, res) => {
    const RoleID = req.params.roleId;
    try {
        await rolServices.deleteRole(RoleID);
        res.json({ message: 'Role deleted successfully' });
    } catch (error) {
        if (error.message.includes('App_RoleRights')) {
            res.status(400).json({ error: 'Role is associated with role rights and cannot be deleted' });
        } else if (error.message.includes('App_UserRoles')) {
            res.status(400).json({ error: 'Role is associated with user roles and cannot be deleted' });
        } else {
            res.status(500).json({ error: error.message });
        }
    }
};

exports.addRoleRights = async (req, res) => {
    const roleRightsData = req.body;
    try {
        const success = await rolServices.addRoleRights(roleRightsData);
        if (success) {
            res.json({ message: 'Role rights added successfully' });
        } else {
            res.json({ error: 'Failed to add role rights' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};